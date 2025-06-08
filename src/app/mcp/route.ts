import { createMcpHandler } from "@vercel/mcp-adapter"
import {
  getNumberFormat,
  getNumberFormatArgsSchema,
  getNumberFormatMeta,
  type GetNumberFormatArg,
  type GetNumberFormatResponse,
} from "@/mcp/tools/get-number-format"
import {
  getDateFormat,
  getDateFormatArgsSchema,
  getDateFormatMeta,
  type GetDateFormatArg,
  type GetDateFormatResponse,
} from "@/mcp/tools/get-date-format"
import {
  getTimeFormat,
  GetTimeFormatArg,
  getTimeFormatMeta,
  GetTimeFormatResponse,
} from "@/mcp/tools/get-time-format"
import { getTimeFormatArgsSchema } from "@/mcp/tools/get-time-format"
import {
  getCurrencyFormat,
  GetCurrencyFormatArg,
  getCurrencyFormatArgsSchema,
  getCurrencyFormatMeta,
  GetCurrencyFormatResponse,
} from "@/mcp/tools/get-currency-format"

interface GetNumberFormatArgs {
  locale: string
  number: number
}

const handler = createMcpHandler(
  async (server) => {
    server.tool(
      getNumberFormatMeta.name,
      getNumberFormatMeta.description,
      {
        ...getNumberFormatArgsSchema.shape,
      },
      async ({
        locale,
        number,
      }: GetNumberFormatArg): Promise<GetNumberFormatResponse> => {
        return getNumberFormat({ locale, number })
      },
    )

    server.tool(
      getDateFormatMeta.name,
      getDateFormatMeta.description,
      {
        ...getDateFormatArgsSchema.shape,
      },
      async ({
        locale,
        datetime,
        style,
      }: GetDateFormatArg): Promise<GetDateFormatResponse> => {
        return getDateFormat({ locale, datetime, style })
      },
    )

    server.tool(
      getTimeFormatMeta.name,
      getTimeFormatMeta.description,
      {
        ...getTimeFormatArgsSchema.shape,
      },
      async ({
        locale,
        datetime,
        style,
      }: GetTimeFormatArg): Promise<GetTimeFormatResponse> => {
        return getTimeFormat({ locale, datetime, style })
      },
    )

    server.tool(
      getCurrencyFormatMeta.name,
      getCurrencyFormatMeta.description,
      {
        ...getCurrencyFormatArgsSchema.shape,
      },
      async ({
        locale,
        currency,
        amount,
      }: GetCurrencyFormatArg): Promise<GetCurrencyFormatResponse> => {
        return getCurrencyFormat({ locale, currency, amount })
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
        [getNumberFormatMeta.name]: {
          description: getNumberFormatMeta.description,
          parameters: {
            type: "object",
            properties: {
              ...getNumberFormatArgsSchema.shape,
            },
          },
          response: {
            type: "object",
            properties: {
              value: {
                type: "string",
                description:
                  "The number formatted according to the requested locale.",
                example: "12 345,67",
              },
              description: {
                type: "string",
                description:
                  "A human-readable description of how numbers are formatted in this locale.",
                example:
                  "groups of numbers are separated by a space and decimals with a ,",
              },
              parts: {
                type: "object",
                description:
                  "Symbols used for grouping and decimal separation.",
                properties: {
                  group: {
                    type: "string",
                    description:
                      "The symbol used to separate groups of digits (e.g., thousands).",
                    example: " ",
                  },
                  decimal: {
                    type: "string",
                    description: "The symbol used for the decimal separator.",
                    example: ",",
                  },
                },
              },
            },
            examples: [
              {
                value: "12,345.67",
                description:
                  "groups of numbers are separated by a `,` and decimals with a `.`",
                formatParts: { groups: ",", decimals: "." },
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
