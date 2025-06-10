import { z } from "zod"
import {
  dateFormatDataSchema,
  localeSchema,
  formatStyleSchema,
} from "@/mcp/tools/schemas"
import { createMcpResponseSchema } from "@/lib/schema-to-mcp"

/**
 * Schema for the arguments required by the getDateFormat tool
 */
export const getDateFormatArgsSchema = z.object({
  locale: localeSchema,
  datetime: z.string().datetime().describe("The ISO 8601 date to format"),
  style: formatStyleSchema.describe("The style of the date format"),
})

/**
 * Schema for the response returned by the getDateFormat tool
 */
export const getDateFormatResponseSchema =
  createMcpResponseSchema(dateFormatDataSchema)

/**
 * Metadata for the getDateFormat tool
 */
export const getDateFormatMeta = {
  name: "get-date-format",
  description: "Returns the date format for a given locale",
}

/**
 * Formats a date according to the specified locale and style preferences.
 *
 * This function uses the Intl.DateTimeFormat API to format date values and provides
 * a human-readable description of the date format pattern used by the locale.
 *
 * @param args - The date formatting arguments
 * @param args.locale - A BCP 47 language tag (e.g., "en-US", "fr-FR", "ja-JP")
 * @param args.datetime - An ISO 8601 datetime string to format (e.g., "2023-12-25T10:30:00Z")
 * @param args.style - The formatting style: "full", "long", "medium", or "short"
 *
 * @returns An MCP-formatted response containing the formatted date string and formatting description
 *
 * @example
 * ```ts
 * const result = getDateFormat({
 *   locale: "en-US",
 *   datetime: "2023-12-25T10:30:00Z",
 *   style: "medium"
 * });
 * // Returns formatted value: "Dec 25, 2023"
 * ```
 *
 * @example
 * ```ts
 * const result = getDateFormat({
 *   locale: "ja-JP",
 *   datetime: "2023-12-25T10:30:00Z",
 *   style: "long"
 * });
 * // Returns formatted value: "2023年12月25日"
 * ```
 *
 * @throws {Error} When the datetime string is not a valid ISO 8601 format
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat | Intl.DateTimeFormat}
 */
export function getDateFormat({
  locale,
  datetime,
  style = "medium",
}: GetDateFormatArg) {
  const dateFormat = new Intl.DateTimeFormat(locale, {
    dateStyle: style,
  })
  const dateParts = dateFormat.formatToParts(new Date(datetime))
  let decoratedDatetimeParts = ""

  // We want to wrap anything other than a literal in code markdown
  dateParts.forEach((part) => {
    if (part.type !== "literal") {
      decoratedDatetimeParts += `\`${part.type === "dayPeriod" ? "am/pm" : part.type}\``
    } else {
      decoratedDatetimeParts += `${part.value}`
    }
  })

  const formatDescription = `The ${style} date is written as ${decoratedDatetimeParts}`
  const data = dateFormatDataSchema.parse({
    locale,
    value: dateFormat.format(new Date(datetime)),
    description: formatDescription,
  })
  return {
    content: [{ type: "text", text: JSON.stringify(data) }],
  } as GetDateFormatResponse
}

export type GetDateFormatArg = z.infer<typeof getDateFormatArgsSchema>
export type GetDateFormatResponse = z.infer<typeof getDateFormatResponseSchema>
