import { z } from "zod"

/**
 * Converts a Zod schema to MCP parameter properties
 */
export function zodToMcpProperties(
  schema: z.ZodObject<any>,
): Record<string, any> {
  const properties: Record<string, any> = {}

  for (const [key, value] of Object.entries(schema.shape)) {
    properties[key] = zodToMcpProperty(value as z.ZodTypeAny)
  }

  return properties
}

/**
 * Converts a single Zod type to MCP property definition
 */
function zodToMcpProperty(zodType: z.ZodTypeAny): any {
  const baseProperty: any = {}

  // Extract description if available
  if (zodType.description) {
    baseProperty.description = zodType.description
  }

  // Handle different Zod types
  if (zodType instanceof z.ZodString) {
    baseProperty.type = "string"
  } else if (zodType instanceof z.ZodNumber) {
    baseProperty.type = "number"
  } else if (zodType instanceof z.ZodBoolean) {
    baseProperty.type = "boolean"
  } else if (zodType instanceof z.ZodEnum) {
    baseProperty.type = "string"
    baseProperty.enum = zodType.options
  } else if (zodType instanceof z.ZodOptional) {
    const innerProperty = zodToMcpProperty(zodType.unwrap())
    return { ...innerProperty, required: false }
  } else if (zodType instanceof z.ZodDefault) {
    const innerProperty = zodToMcpProperty(zodType.removeDefault())
    return { ...innerProperty, default: zodType._def.defaultValue() }
  } else if (zodType instanceof z.ZodObject) {
    baseProperty.type = "object"
    baseProperty.properties = zodToMcpProperties(zodType)
  } else if (zodType instanceof z.ZodArray) {
    baseProperty.type = "array"
    baseProperty.items = zodToMcpProperty(zodType.element)
  }

  return baseProperty
}

/**
 * Creates MCP tool capability from schemas and metadata
 */
export function createMcpCapability(
  name: string,
  description: string,
  argsSchema: z.ZodObject<any>,
  responseSchema?: z.ZodObject<any>,
) {
  const capability: any = {
    description,
    parameters: {
      type: "object",
      properties: zodToMcpProperties(argsSchema),
      required: getRequiredFields(argsSchema),
    },
  }

  if (responseSchema) {
    capability.response = {
      type: "object",
      properties: zodToMcpProperties(responseSchema),
    }
  }

  return capability
}

/**
 * Extracts required field names from a Zod object schema
 */
function getRequiredFields(schema: z.ZodObject<any>): string[] {
  const required: string[] = []

  for (const [key, value] of Object.entries(schema.shape)) {
    const zodType = value as z.ZodTypeAny

    // Check if field is not optional and not have default
    if (
      !(zodType instanceof z.ZodOptional) &&
      !(zodType instanceof z.ZodDefault)
    ) {
      required.push(key)
    }
  }

  return required
}

/**
 * Creates a standard MCP response schema with content array
 */
export function createMcpResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    content: z.array(
      z.object({
        type: z.literal("text"),
        text: z.string().refine(
          (str) => {
            try {
              const parsed = JSON.parse(str)
              dataSchema.parse(parsed)
              return true
            } catch {
              return false
            }
          },
          { message: `Text must be a valid serialised data structure` },
        ),
      }),
    ),
  })
}
