# Tishiki

A local Wiki engine as a VS Code extension. Helps AI coding agents persist and reference project knowledge, preventing knowledge loss across sessions.

## Features

- **Markdown-based** — Content lives in the `docs/` folder, with folder structure mirroring the Wiki hierarchy
- **VS Code integration** — Tree view in the sidebar for page navigation, Webview panel for preview, text editor for editing
- **Built-in MCP server** — Run `npx tishiki-mcp` to start an MCP server, enabling AI agents to perform CRUD operations
- **Wiki links** — Link between pages with `[[page-path]]` or `[[page-path|display text]]`
- **Full-text search** — Multilingual search (English, Japanese, Chinese, etc.) with persistent incremental indexing via Flexsearch
- **Tag management** — Assign tags in frontmatter and list pages by tag

## Architecture

```
tishiki/
  src/
    core/           # Shared logic (CRUD, search, parser)
    extension/      # VS Code extension (tree view, preview, commands)
    webview/        # React (preview UI)
    mcp/            # MCP server (AI agent tools)
  docs/             # Wiki content
```

Three separate esbuild bundles:

| Bundle | Purpose | Format | Platform |
|--------|---------|--------|----------|
| Extension | VS Code extension host | cjs | node |
| MCP Server | AI agent CLI | cjs | node |
| Webview | Preview panel in VS Code | iife | browser (webview) |

## Wiki Content Format

```markdown
---
title: Page Title
tags:
  - api
  - reference
---

Body text. Link to [[other-page]] or [[path/to/page|display text]].
```

- All frontmatter fields are optional. Title defaults to the filename
- Paths are relative to `docs/`, without file extension (e.g., `api/overview`)
- `getting-started` resolves to `getting-started.md` first, then `getting-started/index.md`

## MCP Server

### Usage

```bash
npx tishiki-mcp /path/to/docs
```

### Configuration Example

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

### Tools

| Tool | Description |
|------|-------------|
| `create_page` | Create a new page |
| `read_page` | Read a page |
| `update_page` | Update a page |
| `delete_page` | Delete a page |
| `search` | Full-text search |
| `list_pages` | List all pages (tree structure) |
| `list_by_tag` | List pages by tag |

## Development

```bash
npm install
npm run build       # Build
npm run watch       # Watch mode
npm run lint        # ESLint
npm run test        # Test (vitest)
npm run package     # VSIX packaging
```

Debug the VS Code extension by pressing F5 to launch the Extension Development Host.

## Tech Stack

- TypeScript (strict)
- esbuild
- React (Webview)
- marked + gray-matter
- Flexsearch (multilingual full-text search with bigram tokenization for CJK)
- @modelcontextprotocol/sdk
- zod

## License

MIT
