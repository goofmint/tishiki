---
title: MCP Server
tags:
  - mcp
---

# MCP Server

Tishiki includes an MCP server that allows AI coding agents to read, write, search, and manage Wiki pages.

## Usage

```bash
npx tishiki-mcp /path/to/docs
```

The server uses stdio transport. The `docsRoot` path is passed as a CLI argument, defaulting to `./docs` relative to the current working directory.

## Configuration

Add to your AI client's MCP settings:

```json
{
  "mcpServers": {
    "tishiki": {
      "command": "npx",
      "args": ["tishiki-mcp", "/absolute/path/to/project/docs"]
    }
  }
}
```

## Tools

See [[mcp/tools]] for detailed tool specifications.

| Tool | Description |
|------|-------------|
| `create_page` | Create a new page |
| `read_page` | Read a page |
| `update_page` | Update a page |
| `delete_page` | Delete a page |
| `search` | Full-text search |
| `list_pages` | List all pages (tree structure) |
| `list_by_tag` | List pages by tag |

## Implementation

- Entry point: `src/mcp/server.ts`
- Uses `@modelcontextprotocol/sdk` with `StdioServerTransport`
- Tool inputs validated with zod schemas
- All tool handlers delegate to `src/core/` functions
