import { z } from "zod"
import { getDatetimePartTypes } from "@/lib/utils"

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
})

/**
 * Schema for the arguments required by the getTimeFormat tool
 */
export const getTimeFormatArgsSchema = z.object({
  locale: z
    .string()
    .describe("The BCP 47 language tag that was used to format the time"),
  time: z.string().describe("The time to format"),
  style: z
    .enum(["short", "medium", "long", "full"])
    .optional()
    .default("short")
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

export function getTimeFormat({ locale, time, style }: GetTimeFormatArg) {
  const timeFormat = new Intl.DateTimeFormat(locale, {
    timeStyle: style,
  })
  const timeParts = timeFormat.formatToParts(new Date(time))
  const { hour, minute, second, dayPeriod } = getDatetimePartTypes(timeParts)
  const formatDescription = `The time is written as ${hour?.value} ${minute?.value} ${second?.value} ${dayPeriod?.value}`
  const data = timeFormatDataSchema.parse({
    locale,
    value: timeFormat.format(new Date(time)),
    description: formatDescription,
  })
  return {
    content: [{ type: "text", text: JSON.stringify(data) }],
  } as GetTimeFormatResponse
}

export type GetTimeFormatArg = z.infer<typeof getTimeFormatArgsSchema>
export type GetTimeFormatResponse = z.infer<typeof getTimeFormatResponseSchema>
