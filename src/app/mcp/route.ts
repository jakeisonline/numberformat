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
        currencyDisplay = "symbol",
        amount,
      }: GetCurrencyFormatArg): Promise<GetCurrencyFormatResponse> => {
        return getCurrencyFormat({ locale, currency, currencyDisplay, amount })
      },
    )
  },
  {
    capabilities: {
      tools: {
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
        [getDateFormatMeta.name]: {
          description: getDateFormatMeta.description,
          parameters: {
            type: "object",
            properties: {
              ...getDateFormatArgsSchema.shape,
            },
          },
        },
        [getTimeFormatMeta.name]: {
          description: getTimeFormatMeta.description,
          parameters: {
            type: "object",
            properties: {
              ...getTimeFormatArgsSchema.shape,
            },
          },
        },
        [getCurrencyFormatMeta.name]: {
          description: getCurrencyFormatMeta.description,
          parameters: {
            type: "object",
            properties: {
              ...getCurrencyFormatArgsSchema.shape,
            },
          },
        },
      },
    },
  },
)

export { handler as GET, handler as POST }
