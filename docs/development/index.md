---
title: Development
tags:
  - development
---

# Development

## Prerequisites

- Node.js v18+
- npm

## Setup

```bash
npm install
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build all 3 bundles (extension, MCP server, webview) |
| `npm run watch` | Watch mode for development |
| `npm run typecheck` | TypeScript type checking (no emit) |
| `npm run test` | Run tests (vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | ESLint |
| `npm run package` | Generate `.vsix` file |

## Running the Extension

Press F5 in VS Code to launch the Extension Development Host. The `launch.json` is pre-configured to build before launch.

## Installing the Extension

1. Run `npm run package` to generate `tishiki-{version}.vsix`
2. In VS Code: Extensions > `...` > Install from VSIX...

## Sub-pages

- [[development/build|Build Pipeline]]
- [[development/testing|Testing]]
- [[development/project-structure|Project Structure]]
