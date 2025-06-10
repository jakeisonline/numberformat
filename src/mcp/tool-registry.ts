import { z } from "zod"
import { createMcpCapability } from "@/lib/schema-to-mcp"

// Import all tools and their schemas
import {
  getAllFormats,
  getAllFormatsArgsSchema,
  getAllFormatsMeta,
} from "@/mcp/tools/get-all-formats"

import {
  getNumberFormat,
  getNumberFormatArgsSchema,
  getNumberFormatMeta,
} from "@/mcp/tools/get-number-format"

import {
  getDateFormat,
  getDateFormatArgsSchema,
  getDateFormatMeta,
} from "@/mcp/tools/get-date-format"

import {
  getTimeFormat,
  getTimeFormatArgsSchema,
  getTimeFormatMeta,
} from "@/mcp/tools/get-time-format"

import {
  getCurrencyFormat,
  getCurrencyFormatArgsSchema,
  getCurrencyFormatMeta,
} from "@/mcp/tools/get-currency-format"

/**
 * Tool definition interface
 */
interface ToolDefinition<TArgs, TResponse> {
  meta: {
    name: string
    description: string
  }
  argsSchema: z.ZodObject<any>
  handler: (args: TArgs) => TResponse
  capability: any
}

/**
 * Helper function to create a tool definition
 */
function createTool<TArgs, TResponse>(
  meta: { name: string; description: string },
  argsSchema: z.ZodObject<any>,
  handler: (args: TArgs) => TResponse,
): ToolDefinition<TArgs, TResponse> {
  return {
    meta,
    argsSchema,
    handler,
    capability: createMcpCapability(meta.name, meta.description, argsSchema),
  }
}

/**
 * Generate MCP capabilities from all registered tools
 */
export function generateCapabilities() {
  const capabilities: Record<string, any> = {}

  for (const tool of tools) {
    capabilities[tool.meta.name] = tool.capability
  }

  return { tools: capabilities }
}

/**
 * Registry of all available tools
 */
export const tools = [
  createTool(getAllFormatsMeta, getAllFormatsArgsSchema, getAllFormats),
  createTool(getNumberFormatMeta, getNumberFormatArgsSchema, getNumberFormat),
  createTool(getDateFormatMeta, getDateFormatArgsSchema, getDateFormat),
  createTool(getTimeFormatMeta, getTimeFormatArgsSchema, getTimeFormat),
  createTool(
    getCurrencyFormatMeta,
    getCurrencyFormatArgsSchema,
    getCurrencyFormat,
  ),
] as const
