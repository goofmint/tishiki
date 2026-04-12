---
title: Architecture
tags:
  - architecture
---

# Architecture

Tishiki is a single npm package that produces three separate esbuild bundles:

| Bundle | Entry | Output | Format | Platform | Notes |
|--------|-------|--------|--------|----------|-------|
| Extension | `src/extension/extension.ts` | `dist/extension/extension.js` | cjs | node | external: `vscode` |
| MCP Server | `src/mcp/server.ts` | `dist/mcp/server.js` | cjs | node | shebang banner for npx |
| Webview | `src/webview/index.tsx` | `dist/webview/webview.js` | iife | browser (webview) | React app |

## Source Structure

```
src/
  core/               # Shared logic (extension + MCP both import)
    types.ts           # Type definitions
    parser.ts          # Markdown parsing, frontmatter, wiki-link extraction
    wiki.ts            # CRUD and listing operations
    search.ts          # Flexsearch engine (multilingual)
  extension/           # VS Code extension
    extension.ts       # activate/deactivate
    commands.ts        # Command registrations
    treeView.ts        # Sidebar wiki tree
    preview.ts         # Webview panel management
  webview/             # React (preview UI)
    index.tsx
    App.tsx
    components/
  mcp/                 # MCP server
    server.ts          # Entry point (stdio transport)
    tools/
      crud.ts
      search.ts
      list.ts
```

## Key Design Decisions

- **Single package** — VS Code extension and MCP server coexist in one package. The MCP server script is exposed via the `bin` field in package.json
- **Shared core** — Both the extension and MCP server import from `src/core/`. esbuild duplicates this into each bundle, which is acceptable given the small size
- **Pure functions** — Core module functions take `docsRoot: string` as a parameter, making them testable without VS Code APIs
- **CJS format** — VS Code extensions require CommonJS. The MCP server also uses CJS for consistency

## Sub-pages

- [[architecture/core|Core Module]]
- [[architecture/extension|VS Code Extension]]
- [[development/build|Build Pipeline]]
