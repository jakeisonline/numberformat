import { z } from "zod"
import { getNumberPartTypes } from "@/lib/utils"
import { numberFormatDataSchema, localeSchema } from "@/mcp/tools/schemas"
import { createMcpResponseSchema } from "@/lib/schema-to-mcp"

/**
 * Schema for the arguments required by the getNumberFormat tool
 */
export const getNumberFormatArgsSchema = z.object({
  locale: localeSchema,
  number: z.number().describe("The number to format"),
})

/**
 * Schema for the response returned by the getNumberFormat tool
 */
export const getNumberFormatResponseSchema = createMcpResponseSchema(
  numberFormatDataSchema,
)

/**
 * Metadata for the getNumberFormat tool
 */
export const getNumberFormatMeta = {
  name: "get-number-format",
  description: "Returns the number format for a given locale",
}

/**
 * Formats a number according to the specified locale and extracts detailed formatting information.
 *
 * This function uses the Intl.NumberFormat API to format numeric values and provides
 * comprehensive details about the number formatting pattern, including group separators
 * and decimal notation used by the locale.
 *
 * @param args - The number formatting arguments
 * @param args.locale - A BCP 47 language tag (e.g., "en-US", "fr-FR", "ja-JP")
 * @param args.number - The numeric value to format
 *
 * @returns An MCP-formatted response containing the formatted number string and detailed formatting information
 *
 * @example
 * ```ts
 * const result = getNumberFormat({
 *   locale: "en-US",
 *   number: 1234567.89
 * });
 * // Returns formatted value: "1,234,567.89"
 * // With group separator: "," and decimal separator: "."
 * ```
 *
 * @example
 * ```ts
 * const result = getNumberFormat({
 *   locale: "de-DE",
 *   number: 1234567.89
 * });
 * // Returns formatted value: "1.234.567,89"
 * // With group separator: "." and decimal separator: ","
 * ```
 *
 * @example
 * ```ts
 * const result = getNumberFormat({
 *   locale: "fr-FR",
 *   number: 1234567.89
 * });
 * // Returns formatted value: "1 234 567,89"
 * // With group separator: " " and decimal separator: ","
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat | Intl.NumberFormat}
 */
export function getNumberFormat({ locale, number }: GetNumberFormatArg) {
  const numberFormat = new Intl.NumberFormat(locale)
  // We hardcode the number here because we want all possible groups and decimals
  const numberParts = numberFormat.formatToParts(1000.1)
  const { group, decimal } = getNumberPartTypes(numberParts)
  const formatDescription = `Groups of numbers are separated by \`${group?.value || "a space"}\` and decimals with \`${decimal?.value || "."}\``

  const data = numberFormatDataSchema.parse({
    locale,
    value: numberFormat.format(number),
    description: formatDescription,
    parts: {
      group: group?.value,
      decimal: decimal?.value,
    },
  })

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data),
      },
    ],
  } as GetNumberFormatResponse
}

export type GetNumberFormatArg = z.infer<typeof getNumberFormatArgsSchema>
export type GetNumberFormatResponse = z.infer<
  typeof getNumberFormatResponseSchema
>
