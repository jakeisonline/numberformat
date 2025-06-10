import { z } from "zod"
import { getDateFormat } from "@/mcp/tools/get-date-format"
import { getTimeFormat } from "@/mcp/tools/get-time-format"
import { getNumberFormat } from "@/mcp/tools/get-number-format"
import { getCurrencyFormat } from "@/mcp/tools/get-currency-format"
import { allFormatsDataSchema, localeSchema } from "@/mcp/tools/schemas"
import { createMcpResponseSchema } from "@/lib/schema-to-mcp"

export const getAllFormatsArgsSchema = z.object({
  locale: localeSchema,
})

/**
 * Schema for the response returned by the getAllFormats tool
 */
export const getAllFormatsResponseSchema =
  createMcpResponseSchema(allFormatsDataSchema)

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

  // Extract the data from each format response
  const dateData = JSON.parse(dateFormat.content[0].text)
  const timeData = JSON.parse(timeFormat.content[0].text)
  const numberData = JSON.parse(numberFormat.content[0].text)
  const currencyData = JSON.parse(currencyFormat.content[0].text)

  const data = allFormatsDataSchema.parse({
    locale,
    date: {
      value: dateData.value,
      description: dateData.description,
    },
    time: {
      value: timeData.value,
      description: timeData.description,
    },
    number: {
      value: numberData.value,
      description: numberData.description,
    },
    currency: {
      value: currencyData.value,
      description: currencyData.description,
    },
  })

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data),
      },
    ],
  } as GetAllFormatsResponse
}

export type GetAllFormatsArg = z.infer<typeof getAllFormatsArgsSchema>
export type GetAllFormatsResponse = z.infer<typeof getAllFormatsResponseSchema>
