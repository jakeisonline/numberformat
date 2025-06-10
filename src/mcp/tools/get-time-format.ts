import { z } from "zod"
import {
  timeFormatDataSchema,
  localeSchema,
  formatStyleSchema,
} from "@/mcp/tools/schemas"
import { createMcpResponseSchema } from "@/lib/schema-to-mcp"

/**
 * Schema for the arguments required by the getTimeFormat tool
 */
export const getTimeFormatArgsSchema = z.object({
  locale: localeSchema,
  datetime: z.string().datetime().describe("The ISO 8601 date to format"),
  style: formatStyleSchema.describe("The style of the time format"),
})

/**
 * Schema for the response returned by the getTimeFormat tool
 */
export const getTimeFormatResponseSchema =
  createMcpResponseSchema(timeFormatDataSchema)

/**
 * Metadata for the getTimeFormat tool
 */
export const getTimeFormatMeta = {
  name: "get-time-format",
  description: "Returns the time format for a given locale",
}

/**
 * Formats a time according to the specified locale and style preferences.
 *
 * This function uses the Intl.DateTimeFormat API to format time values and provides
 * information about the time format pattern, including whether the locale prefers
 * 24-hour or 12-hour time format.
 *
 * @param args - The time formatting arguments
 * @param args.locale - A BCP 47 language tag (e.g., "en-US", "fr-FR", "ja-JP")
 * @param args.datetime - An ISO 8601 datetime string to format (e.g., "2023-12-25T10:30:00Z")
 * @param args.style - The formatting style: "full", "long", "medium", or "short"
 *
 * @returns An MCP-formatted response containing the formatted time string, description, and 24-hour preference
 *
 * @example
 * ```ts
 * const result = getTimeFormat({
 *   locale: "en-US",
 *   datetime: "2023-12-25T20:58:00Z",
 *   style: "short"
 * });
 * // Returns formatted value: "8:58 PM" (12-hour format)
 * ```
 *
 * @example
 * ```ts
 * const result = getTimeFormat({
 *   locale: "de-DE",
 *   datetime: "2023-12-25T20:58:00Z",
 *   style: "short"
 * });
 * // Returns formatted value: "20:58" (24-hour format)
 * ```
 *
 * @example
 * ```ts
 * const result = getTimeFormat({
 *   locale: "ja-JP",
 *   datetime: "2023-12-25T08:30:00Z",
 *   style: "medium"
 * });
 * // Returns formatted value: "8:30:00"
 * ```
 *
 * @throws {Error} When the datetime string is not a valid ISO 8601 format
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat | Intl.DateTimeFormat}
 */
export function getTimeFormat({
  locale,
  datetime,
  style = "medium",
}: GetTimeFormatArg) {
  const timeFormat = new Intl.DateTimeFormat(locale, {
    timeStyle: style,
  })
  const timeParts = timeFormat.formatToParts(new Date(datetime))

  let decoratedDatetimeParts = ""

  // We want to wrap anything other than a literal in code markdown
  timeParts.forEach((part) => {
    if (part.type !== "literal") {
      decoratedDatetimeParts += `\`${part.type === "dayPeriod" ? "am/pm" : part.type}\``
    } else {
      decoratedDatetimeParts += `${part.value}`
    }
  })

  const prefers24HourTime = !timeParts.some((part) => part.type === "dayPeriod")

  const formatDescription = `The ${style} time is written as ${decoratedDatetimeParts}`

  const data = timeFormatDataSchema.parse({
    locale,
    value: timeFormat.format(new Date(datetime)),
    description: formatDescription,
    prefers24HourTime,
  })
  return {
    content: [{ type: "text", text: JSON.stringify(data) }],
  } as GetTimeFormatResponse
}

export type GetTimeFormatArg = z.infer<typeof getTimeFormatArgsSchema>
export type GetTimeFormatResponse = z.infer<typeof getTimeFormatResponseSchema>
