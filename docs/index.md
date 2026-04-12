---
title: Tishiki
tags:
  - overview
---

# Tishiki

Tishiki is a local Wiki engine built as a VS Code extension. Its primary purpose is to help AI coding agents persist and reference project knowledge, preventing knowledge loss across sessions.

## Key Features

- **Markdown-based** — Content lives in the `docs/` folder, with folder structure mirroring the Wiki hierarchy
- **VS Code integration** — Tree view for navigation, Webview panel for preview, text editor for editing
- **Built-in MCP server** — AI agents perform CRUD operations via `npx tishiki-mcp`
- **Wiki links** — `[[page-path]]` or `[[page-path|display text]]` for inter-page linking
- **Full-text search** — Multilingual (English, Japanese, Chinese, etc.) with persistent incremental indexing
- **Tag management** — Optional frontmatter tags for categorization

## Architecture Overview

The project is a single npm package containing three components:

- **VS Code Extension** — UI layer (tree view, preview, commands). See [[architecture/extension]]
- **MCP Server** — AI agent interface (CRUD, search, listing). See [[mcp/index]]
- **Core Module** — Shared logic used by both. See [[architecture/core]]

All three are built as separate esbuild bundles from a single codebase.

## Tech Stack

- TypeScript (strict)
- esbuild (3 bundles: extension, MCP server, webview)
- React (Webview preview UI)
- markdown-it + gray-matter (Markdown rendering and frontmatter parsing)
- Flexsearch (multilingual full-text search)
- @modelcontextprotocol/sdk (MCP server)
- zod (input validation)

## Wiki Content Format

See [[wiki-format]] for details on how to write Wiki pages.

## Pages

- [[architecture/index|Architecture]]
- [[mcp/index|MCP Server]]
- [[development/index|Development]]
- [[wiki-format|Wiki Format]]
- [[search|Search Engine]]
