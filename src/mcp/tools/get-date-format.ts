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
