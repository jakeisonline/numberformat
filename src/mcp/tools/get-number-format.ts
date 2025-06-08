import { z } from "zod"
import { getNumberPartTypes } from "@/lib/utils"

const numberFormatPartsSchema = z.object({
  group: z
    .string()
    .optional()
    .describe("The symbol used to separate groups of digits (e.g., thousands)"),
  decimal: z
    .string()
    .optional()
    .describe("The symbol used for the decimal separator"),
})

const numberFormatDataSchema = z.object({
  locale: z
    .string()
    .describe("The BCP 47 language tag that was used to format the number"),
  value: z.string().describe("The formatted number as a string"),
  description: z
    .string()
    .describe(
      "A human-readable description of the number format, in Markdown format",
    ),
  parts: numberFormatPartsSchema,
})

export const getNumberFormatArgsSchema = z.object({
  locale: z
    .string()
    .describe("A string with a BCP 47 language tag (e.g. en-US)"),
  number: z.number().describe("The number to format"),
})

export const getNumberFormatResponseSchema = z.object({
  content: z.array(
    z.object({
      type: z.literal("text"),
      text: z.string().refine(
        (str) => {
          try {
            const parsed = JSON.parse(str)
            numberFormatDataSchema.parse(parsed)
            return true
          } catch {
            return false
          }
        },
        { message: "Text must be a valid serialised NumberFormatData" },
      ),
    }),
  ),
})

export type GetNumberFormatArg = z.infer<typeof getNumberFormatArgsSchema>
export type GetNumberFormatResponse = z.infer<
  typeof getNumberFormatResponseSchema
>

export const getNumberFormatMeta = {
  name: "get-number-format",
  description: "Returns the number format for a given locale",
}

export function getNumberFormat({ locale, number }: GetNumberFormatArg) {
  const numberFormat = new Intl.NumberFormat(locale)
  const numberParts = numberFormat.formatToParts(number)
  const { group, decimal } = getNumberPartTypes(numberParts)
  const formatDescription = `Groups of numbers are separated by \`${group?.value || "a space"}\` and decimals with \`${decimal?.value || "."}\``

  const data = numberFormatDataSchema.parse({
    locale,
    value: numberFormat.format(number),
    description: formatDescription,
    parts: {
      group: group?.value,
      decimal: decimal?.value,
    },
  })

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data),
      },
    ],
  } as GetNumberFormatResponse
}
