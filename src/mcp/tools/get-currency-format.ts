import { z } from "zod"

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
})

/**
 * Schema for the arguments required by the getCurrencyFormat tool
 */
export const getCurrencyFormatArgsSchema = z.object({
  locale: z
    .string()
    .describe("The BCP 47 language tag that was used to format the currency"),
  currency: z.string().describe("The currency to format"),
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
  amount,
}: GetCurrencyFormatArg) {
  const currencyFormat = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  })
  const data = currencyFormatDataSchema.parse({
    locale,
    value: currencyFormat.format(amount),
    description: `The currency is written as ${currencyFormat.format(amount)}`,
  })
  return {
    content: [{ type: "text", text: JSON.stringify(data) }],
  } as GetCurrencyFormatResponse
}

export type GetCurrencyFormatArg = z.infer<typeof getCurrencyFormatArgsSchema>
export type GetCurrencyFormatResponse = z.infer<
  typeof getCurrencyFormatResponseSchema
>
