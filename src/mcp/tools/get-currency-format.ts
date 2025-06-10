import { getCurrencyPartTypes } from "@/lib/utils"
import { z } from "zod"
import {
  currencyFormatDataSchema,
  localeSchema,
  currencyDisplaySchema,
} from "@/mcp/tools/schemas"
import { createMcpResponseSchema } from "@/lib/schema-to-mcp"

/**
 * Schema for the arguments required by the getCurrencyFormat tool
 */
export const getCurrencyFormatArgsSchema = z.object({
  locale: localeSchema,
  currency: z.string().describe("The currency to format"),
  currencyDisplay: currencyDisplaySchema,
  amount: z.number().describe("The amount to format"),
})

/**
 * Schema for the response returned by the getCurrencyFormat tool
 */
export const getCurrencyFormatResponseSchema = createMcpResponseSchema(
  currencyFormatDataSchema,
)

/**
 * Metadata for the getCurrencyFormat tool
 */
export const getCurrencyFormatMeta = {
  name: "get-currency-format",
  description: "Returns the currency format for a given locale",
}

export function getCurrencyFormat({
  locale,
  currency,
  currencyDisplay = "narrowSymbol",
  amount,
}: GetCurrencyFormatArg) {
  const currencyFormat = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay,
  })
  const {
    currency: currencySymbol,
    group,
    decimal,
    currencyPos,
    currencySpace,
    compact,
  } = getCurrencyPartTypes(currencyFormat.formatToParts(1000000000.1))
  const data = currencyFormatDataSchema.parse({
    locale,
    value: currencyFormat.format(amount),
    description: `Currency symbol is placed ${currencyPos === "prefix" ? "before" : "after"} the amount with ${currencySpace ? "a space" : "no space"} in-between, with groups of numbers separated by \`${group?.value || "a space"}\` and decimals with \`${decimal?.value || "."}\``,
    parts: {
      currency: currencySymbol?.value,
      currencyPos,
      currencySpace,
      group: group?.value,
      decimal: decimal?.value,
      compact: compact?.value,
    },
  })
  return {
    content: [{ type: "text", text: JSON.stringify(data) }],
  } as GetCurrencyFormatResponse
}

export type GetCurrencyFormatArg = z.infer<typeof getCurrencyFormatArgsSchema>
export type GetCurrencyFormatResponse = z.infer<
  typeof getCurrencyFormatResponseSchema
>
