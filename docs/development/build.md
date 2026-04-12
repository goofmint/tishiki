---
title: Build Pipeline
tags:
  - development
---

# Build Pipeline

Tishiki uses esbuild to produce three independent bundles from `esbuild.config.mjs`.

## Bundles

| Bundle | Entry | Output | Format | Platform |
|--------|-------|--------|--------|----------|
| Extension | `src/extension/extension.ts` | `dist/extension/extension.js` | cjs | node |
| MCP Server | `src/mcp/server.ts` | `dist/mcp/server.js` | cjs | node |
| Webview | `src/webview/index.tsx` | `dist/webview/webview.js` | iife | browser (webview) |

## Bundle Details

### Extension

- `external: ["vscode"]` — The `vscode` module is provided by the VS Code runtime
- CJS format required by VS Code

### MCP Server

- Shebang banner (`#!/usr/bin/env node`) for `npx` execution
- Fully self-contained (no external dependencies at runtime)

### Webview

- IIFE format (no module system in webview)
- JSX transform: automatic (React 18+)
- No sourcemaps (webview CSP complications)

## Watch Mode

```bash
npm run watch
```

Creates esbuild contexts for all three bundles and watches for file changes.
