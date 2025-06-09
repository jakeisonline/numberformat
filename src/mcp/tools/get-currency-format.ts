import { getCurrencyPartTypes } from "@/lib/utils"
import { z } from "zod"

/**
 * Schema defining the structure of number format parts (group and decimal separators)
 * @internal
 */
const numberFormatPartsSchema = z.object({
  currency: z.string().optional().describe("The currency symbol"),
  currencyPos: z
    .enum(["prefix", "suffix"])
    .optional()
    .describe("The position of the currency symbol"),
  currencySpace: z
    .boolean()
    .optional()
    .describe(
      "Whether there is a space between the currency symbol and the amount",
    ),
  group: z
    .string()
    .optional()
    .describe("The symbol used to separate groups of digits (e.g., thousands)"),
  decimal: z
    .string()
    .optional()
    .describe("The symbol used for the decimal separator"),
  compact: z
    .string()
    .optional()
    .describe("The symbol used for the compact notation"),
})

/**
 * Schema defining the complete currency format data structure
 * @internal
 */
const currencyFormatDataSchema = z.object({
  locale: z
    .string()
    .describe("The BCP 47 language tag that was used to format the currency"),
  value: z.string().describe("The formatted currency as a string"),
  description: z
    .string()
    .describe(
      "A human-readable description of the currency format, in Markdown format",
    ),
  parts: numberFormatPartsSchema,
})

/**
 * Schema for the arguments required by the getCurrencyFormat tool
 */
export const getCurrencyFormatArgsSchema = z.object({
  locale: z
    .string()
    .describe("The BCP 47 language tag that was used to format the currency"),
  currency: z.string().describe("The currency to format"),
  currencyDisplay: z
    .enum(["code", "symbol", "narrowSymbol", "name"])
    .optional()
    .default("narrowSymbol")
    .describe("The currency display style"),
  amount: z.number().describe("The amount to format"),
})

/**
 * Schema for the response returned by the getCurrencyFormat tool
 */
export const getCurrencyFormatResponseSchema = z.object({
  content: z.array(
    z.object({
      type: z.literal("text"),
      text: z.string().refine(
        (str) => {
          try {
            const parsed = JSON.parse(str)
            currencyFormatDataSchema.parse(parsed)
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
