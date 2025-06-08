import { z } from "zod"

/**
 * Schema defining the complete time format data structure
 * @internal
 */
const timeFormatDataSchema = z.object({
  locale: z
    .string()
    .describe("The BCP 47 language tag that was used to format the time"),
  value: z.string().describe("The formatted time as a string"),
  description: z
    .string()
    .describe(
      "A human-readable description of the time format, in Markdown format",
    ),
  prefers24HourTime: z
    .boolean()
    .describe("Whether the time format prefers 24 hour time"),
})

/**
 * Schema for the arguments required by the getTimeFormat tool
 */
export const getTimeFormatArgsSchema = z.object({
  locale: z
    .string()
    .describe("The BCP 47 language tag that was used to format the time"),
  datetime: z.string().datetime().describe("The ISO 8601 date to format"),
  style: z
    .enum(["short", "medium", "long", "full"])
    .optional()
    .default("medium")
    .describe("The style of the time format"),
})

/**
 * Schema for the response returned by the getTimeFormat tool
 */
export const getTimeFormatResponseSchema = z.object({
  content: z.array(
    z.object({
      type: z.literal("text"),
      text: z.string().refine(
        (str) => {
          try {
            const parsed = JSON.parse(str)
            timeFormatDataSchema.parse(parsed)
            return true
          } catch {
            return false
          }
        },
        { message: "Text must be a valid serialised TimeFormatData" },
      ),
    }),
  ),
})

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
