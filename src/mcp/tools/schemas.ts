import { z } from "zod"

/**
 * Base schema for locale field used across all format types
 */
export const localeSchema = z
  .string()
  .describe("The BCP 47 language tag (e.g., 'en-US', 'fr-FR')")

/**
 * Base schema for formatted value output
 */
export const formattedValueSchema = z
  .string()
  .describe("The formatted value as a string")

/**
 * Base schema for format description
 */
export const formatDescriptionSchema = z
  .string()
  .describe("A human-readable description of the format, in Markdown format")

/**
 * Schema for number format parts (group and decimal separators)
 */
export const numberFormatPartsSchema = z.object({
  group: z
    .string()
    .optional()
    .describe("The symbol used to separate groups of digits (e.g., thousands)"),
  decimal: z
    .string()
    .optional()
    .describe("The symbol used for the decimal separator"),
})

/**
 * Schema for currency format parts
 */
export const currencyFormatPartsSchema = z.object({
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
 * Date format data schema
 */
export const dateFormatDataSchema = z.object({
  locale: localeSchema,
  value: formattedValueSchema,
  description: formatDescriptionSchema,
})

/**
 * Time format data schema
 */
export const timeFormatDataSchema = z.object({
  locale: localeSchema,
  value: formattedValueSchema,
  description: formatDescriptionSchema,
  prefers24HourTime: z
    .boolean()
    .describe("Whether the time format prefers 24 hour time"),
})

/**
 * Number format data schema
 */
export const numberFormatDataSchema = z.object({
  locale: localeSchema,
  value: formattedValueSchema,
  description: formatDescriptionSchema,
  parts: numberFormatPartsSchema,
})

/**
 * Currency format data schema
 */
export const currencyFormatDataSchema = z.object({
  locale: localeSchema,
  value: formattedValueSchema,
  description: formatDescriptionSchema,
  parts: currencyFormatPartsSchema,
})

/**
 * Combined all formats data schema
 */
export const allFormatsDataSchema = z.object({
  locale: localeSchema,
  date: z.object({
    value: formattedValueSchema,
    description: formatDescriptionSchema,
  }),
  time: z.object({
    value: formattedValueSchema,
    description: formatDescriptionSchema,
  }),
  number: z.object({
    value: formattedValueSchema,
    description: formatDescriptionSchema,
  }),
  currency: z.object({
    value: formattedValueSchema,
    description: formatDescriptionSchema,
  }),
})

/**
 * Common style enum for date and time formatting
 */
export const formatStyleSchema = z
  .enum(["short", "medium", "long", "full"])
  .optional()
  .default("medium")
  .describe(
    "The style of the format, normally influences the length and verbosity of the format",
  )

/**
 * Currency display enum
 */
export const currencyDisplaySchema = z
  .enum(["code", "symbol", "narrowSymbol", "name"])
  .optional()
  .default("narrowSymbol")
  .describe(
    "The currency display style, allowing for different representations of the currency as either a symbol or string as a name",
  )
