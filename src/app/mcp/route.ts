import { createMcpHandler } from "@vercel/mcp-adapter"
import { tools, generateCapabilities } from "@/mcp/tool-registry"

const handler = createMcpHandler(
  async (server) => {
    // Register each tool with the server
    for (const tool of tools) {
      server.tool(
        tool.meta.name,
        tool.meta.description,
        {
          ...tool.argsSchema.shape,
        },
        async (args: any) => {
          return tool.handler(args)
        },
      )
    }
  },
  {
    capabilities: generateCapabilities(),
  },
)

export { handler as GET, handler as POST }
