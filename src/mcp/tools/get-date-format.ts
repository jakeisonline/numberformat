import { z } from "zod"
import { getDatetimePartTypes } from "@/lib/utils"

/**
 * Schema defining the complete date format data structure
 * @internal
 */
const dateFormatDataSchema = z.object({
  locale: z
    .string()
    .describe("The BCP 47 language tag that was used to format the date"),
  value: z.string().describe("The formatted date as a string"),
  description: z
    .string()
    .describe(
      "A human-readable description of the date format, in Markdown format",
    ),
})

/**
 * Schema for the arguments required by the getDateFormat tool
 */
export const getDateFormatArgsSchema = z.object({
  locale: z
    .string()
    .describe("The BCP 47 language tag that was used to format the number"),
  date: z.string().datetime().describe("The ISO 8601 date to format"),
  style: z
    .enum(["short", "medium", "long", "full"])
    .optional()
    .default("short")
    .describe("The style of the date format"),
})

/**
 * Schema for the response returned by the getDateFormat tool
 */
export const getDateFormatResponseSchema = z.object({
  content: z.array(
    z.object({
      type: z.literal("text"),
      text: z.string().refine(
        (str) => {
          try {
            const parsed = JSON.parse(str)
            dateFormatDataSchema.parse(parsed)
            return true
          } catch {
            return false
          }
        },
        { message: "Text must be a valid serialised DateFormatData" },
      ),
    }),
  ),
})

/**
 * Metadata for the getDateFormat tool
 */
export const getDateFormatMeta = {
  name: "get-date-format",
  description: "Returns the date format for a given locale",
}

export function getDateFormat({
  locale,
  date,
  style = "short",
}: GetDateFormatArg) {
  const dateFormat = new Intl.DateTimeFormat(locale, {
    dateStyle: style,
  })
  const dateParts = dateFormat.formatToParts(new Date(date))
  const { year, month, day } = getDatetimePartTypes(dateParts)
  // TODO: add literal parts, account for multiple styles, and dynamically generate the description
  const formatDescription = `The date is written as ${year?.value} ${month?.value} ${day?.value}`
  const data = dateFormatDataSchema.parse({
    locale,
    value: dateFormat.format(new Date(date)),
    description: formatDescription,
  })
  return {
    content: [{ type: "text", text: JSON.stringify(data) }],
  } as GetDateFormatResponse
}

export type GetDateFormatArg = z.infer<typeof getDateFormatArgsSchema>
export type GetDateFormatResponse = z.infer<typeof getDateFormatResponseSchema>
