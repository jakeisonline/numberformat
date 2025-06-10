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
