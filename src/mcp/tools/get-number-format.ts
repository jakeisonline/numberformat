import { z } from "zod"
import { getNumberPartTypes } from "@/lib/utils"
import { numberFormatDataSchema, localeSchema } from "@/mcp/tools/schemas"
import { createMcpResponseSchema } from "@/lib/schema-to-mcp"

/**
 * Schema for the arguments required by the getNumberFormat tool
 */
export const getNumberFormatArgsSchema = z.object({
  locale: localeSchema,
  number: z.number().describe("The number to format"),
})

/**
 * Schema for the response returned by the getNumberFormat tool
 */
export const getNumberFormatResponseSchema = createMcpResponseSchema(
  numberFormatDataSchema,
)

/**
 * Metadata for the getNumberFormat tool
 */
export const getNumberFormatMeta = {
  name: "get-number-format",
  description: "Returns the number format for a given locale",
}

/**
 * Formats a number according to the specified locale and returns information about the formatting.
 *
 * @param args - The arguments for number formatting
 * @param args.locale - A BCP 47 language tag (e.g., "en-US", "fr-FR")
 * @param args.number - The number to be formatted
 *
 * @returns An object containing the formatted number and formatting details
 *
 * @example
 * ```ts
 * const result = getNumberFormat({ locale: "en-US", number: 1234.56 });
 * // Returns information about how numbers are formatted in US English
 * ```
 */
export function getNumberFormat({ locale, number }: GetNumberFormatArg) {
  const numberFormat = new Intl.NumberFormat(locale)
  // We hardcode the number here because we want all possible groups and decimals
  const numberParts = numberFormat.formatToParts(1000.1)
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

export type GetNumberFormatArg = z.infer<typeof getNumberFormatArgsSchema>
export type GetNumberFormatResponse = z.infer<
  typeof getNumberFormatResponseSchema
>
