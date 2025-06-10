import { z } from "zod"
import { getDateFormat } from "@/mcp/tools/get-date-format"
import { getTimeFormat } from "@/mcp/tools/get-time-format"
import { getNumberFormat } from "@/mcp/tools/get-number-format"
import { getCurrencyFormat } from "@/mcp/tools/get-currency-format"
import { allFormatsDataSchema, localeSchema } from "@/mcp/tools/schemas"
import { createMcpResponseSchema } from "@/lib/schema-to-mcp"

/**
 * Schema for the arguments required by the getAllFormats tool
 */
export const getAllFormatsArgsSchema = z.object({
  locale: localeSchema,
})

/**
 * Schema for the response returned by the getAllFormats tool
 */
export const getAllFormatsResponseSchema =
  createMcpResponseSchema(allFormatsDataSchema)

/**
 * Metadata for the getAllFormats tool
 */
export const getAllFormatsMeta = {
  name: "get-all-formats",
  description:
    "Returns all formats for a given locale, but doesn't allow you to provide a value to format",
}

/**
 * Retrieves all formatting information for a given locale using standardised example values.
 *
 * This function combines date, time, number, and currency formatting by calling individual
 * format functions with predefined example values. It provides a comprehensive overview
 * of how different data types are formatted in the specified locale.
 *
 * @param args - The formatting arguments
 * @param args.locale - A BCP 47 language tag (e.g., "en-US", "fr-FR", "ja-JP")
 *
 * @returns An MCP-formatted response containing all format types with their descriptions
 *
 * @example
 * ```ts
 * const result = getAllFormats({ locale: "en-US" });
 * // Returns combined formatting info for:
 * // - Date: "6/10/25" (short style)
 * // - Time: "8:58 PM" (short style)
 * // - Number: "1,234,567,890.123"
 * // - Currency: "$1,234,567,890.12" (USD)
 * ```
 *
 * @example
 * ```ts
 * const result = getAllFormats({ locale: "de-DE" });
 * // Returns German formatting:
 * // - Date: "10.06.25"
 * // - Time: "20:58"
 * // - Number: "1.234.567.890,123"
 * // - Currency: "1.234.567.890,12 $"
 * ```
 *
 * @see {@link getDateFormat} - For detailed date formatting
 * @see {@link getTimeFormat} - For detailed time formatting
 * @see {@link getNumberFormat} - For detailed number formatting
 * @see {@link getCurrencyFormat} - For detailed currency formatting
 */
export function getAllFormats({ locale }: GetAllFormatsArg) {
  const exampleDateTime = "2025-06-10T20:58:00Z"
  const exampleNumber = 1234567.89
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
