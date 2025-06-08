import { createMcpHandler } from "@vercel/mcp-adapter"
import { z } from "zod"

interface GetNumberFormatArgs {
  locale: string
  number: number
}

interface NumberFormatParts {
  groups: string
  decimals: string
}

interface NumberFormatResponse {
  value: string
  description: string
  parts: NumberFormatParts
}

const handler = createMcpHandler(
  async (server) => {
    server.tool(
      "get-number-format",
      "Returns the number format for a given locale",
      {
        locale: z.string(),
        number: z.number(),
      },
      async ({ locale, number }: GetNumberFormatArgs) => {
        const numberFormat = new Intl.NumberFormat(locale)
        const numberParts = numberFormat.formatToParts(number)
        const groupPart =
          numberParts.find((part) => part.type === "group")?.value || " "
        const decimalPart =
          numberParts.find((part) => part.type === "decimal")?.value || "."
        const formatDescription = `groups of numbers are separated by ${groupPart === " " ? "a space" : groupPart} and decimals with ${decimalPart}`

        const content: NumberFormatResponse = {
          value: numberFormat.format(number),
          description: formatDescription,
          parts: {
            groups: groupPart,
            decimals: decimalPart,
          },
        }

        return content
      },
    )
  },
  {
    capabilities: {
      "tools": {
        "get-all-formats": {
          description: "Returns all formats for a given locale",
          parameters: {
            type: "object",
            properties: {
              locale: { type: "string" },
            },
          },
        },
        "get-number-format": {
          description: "Returns the number format for a given locale",
          parameters: {
            type: "object",
            properties: {
              number: { type: "string" },
              locale: { type: "string" },
            },
          },
          response: {
            type: "object",
            properties: {
              formattedValue: {
                type: "string",
                description:
                  "The number formatted according to the requested locale.",
                example: "12 345,67",
              },
              formatDescription: {
                type: "string",
                description:
                  "A human-readable description of how numbers are formatted in this locale.",
                example:
                  "groups of numbers are separated by a space and decimals with a ,",
              },
              formatParts: {
                type: "object",
                description:
                  "Symbols used for grouping and decimal separation.",
                properties: {
                  groups: {
                    type: "string",
                    description:
                      "The symbol used to separate groups of digits (e.g., thousands).",
                    example: " ",
                  },
                  decimals: {
                    type: "string",
                    description: "The symbol used for the decimal separator.",
                    example: ",",
                  },
                },
              },
            },
            examples: [
              {
                formattedValue: "12 345,67",
                formatDescription:
                  "groups of numbers are separated by a space and decimals with a ,",
                formatParts: { groups: " ", decimals: "," },
              },
            ],
          },
        },
        "get-date-format": {
          description: "Returns the date format for a given locale",
          parameters: {
            type: "object",
            properties: {
              date: { type: "string" },
              locale: { type: "string" },
            },
          },
        },
      },
      "get-time-format": {
        description: "Returns the time format for a given locale",
        parameters: {
          type: "object",
          properties: {
            time: { type: "string" },
            locale: { type: "string" },
          },
        },
      },
      "get-currency-format": {
        description: "Returns the currency format for a given locale",
        parameters: {
          type: "object",
          properties: {
            currency: { type: "string" },
            locale: { type: "string" },
          },
        },
      },
      "get-measurement-format": {
        description: "Returns the measurement format for a given locale",
        parameters: {
          type: "object",
          properties: {
            measurement: { type: "string" },
            locale: { type: "string" },
          },
        },
      },
    },
  },
)

export { handler as GET, handler as POST }
