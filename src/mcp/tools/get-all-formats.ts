import { z } from "zod"
import { getDateFormat } from "@/mcp/tools/get-date-format"
import { getTimeFormat } from "@/mcp/tools/get-time-format"
import { getNumberFormat } from "@/mcp/tools/get-number-format"
import { getCurrencyFormat } from "@/mcp/tools/get-currency-format"

const allFormatsDataSchema = z.object({
  locale: z
    .string()
    .describe("The BCP 47 language tag that was used for each format example"),
  date: z.object({
    value: z.string().describe("The formatted date as a string"),
    description: z
      .string()
      .describe(
        "A human-readable description of the date format, in Markdown format",
      ),
  }),
  time: z.object({
    value: z.string().describe("The formatted time as a string"),
    description: z
      .string()
      .describe(
        "A human-readable description of the time format, in Markdown format",
      ),
  }),
  number: z.object({
    value: z.string().describe("The formatted number as a string"),
    description: z
      .string()
      .describe(
        "A human-readable description of the number format, in Markdown format",
      ),
  }),
  currency: z.object({
    value: z.string().describe("The formatted currency as a string"),
    description: z
      .string()
      .describe(
        "A human-readable description of the currency format, in Markdown format",
      ),
  }),
})

export const getAllFormatsArgsSchema = z.object({
  locale: z
    .string()
    .describe("The BCP 47 language tag that was used to format the number"),
})

/**
 * Schema for the response returned by the getAllFormats tool
 */
export const getAllFormatsResponseSchema = z.object({
  content: z.array(
    z.object({
      type: z.literal("text"),
      text: z.string().refine(
        (str) => {
          try {
            const parsed = JSON.parse(str)
            allFormatsDataSchema.parse(parsed)
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
export const getAllFormatsMeta = {
  name: "get-all-formats",
  description:
    "Returns all formats for a given locale, but doesn't allow you to provide a value to format",
}

export function getAllFormats({ locale }: GetAllFormatsArg) {
  const exampleDateTime = "2025-06-10T20:58:00Z"
  const exampleNumber = 1234567890.123
  const exampleCurrency = "USD"

  const dateFormat = getDateFormat({
    locale,
    datetime: exampleDateTime,
    style: "short",
  })
  const timeFormat = getTimeFormat({
    locale,
    datetime: exampleDateTime,
    style: "short",
  })
  const numberFormat = getNumberFormat({ locale, number: exampleNumber })
  const currencyFormat = getCurrencyFormat({
    locale,
    currency: exampleCurrency,
    currencyDisplay: "symbol",
    amount: exampleNumber,
  })
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          locale,
          date: dateFormat,
          time: timeFormat,
          number: numberFormat,
          currency: currencyFormat,
        }),
      },
    ],
  } as GetAllFormatsResponse
}

export type GetAllFormatsArg = z.infer<typeof getAllFormatsArgsSchema>
export type GetAllFormatsResponse = z.infer<typeof getAllFormatsResponseSchema>
