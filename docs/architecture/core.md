---
title: Core Module
tags:
  - architecture
---

# Core Module

`src/core/` contains shared logic used by both the VS Code extension and the MCP server.

## types.ts

Type definitions shared across the project:

- **WikiPageMeta** — title, tags, path, filePath
- **WikiPage** — extends WikiPageMeta with content and rawContent
- **WikiTreeNode** — name, path, type (file/directory), children
- **WikiSearchResult** — page metadata with matching lines
- **WikiLink** — raw match, resolved target, display text

## parser.ts

Markdown and frontmatter processing:

- **parseFrontmatter()** — Uses gray-matter to extract YAML frontmatter and body content
- **extractWikiLinks()** — Regex extraction of `[[target]]` and `[[target|display]]` patterns
- **renderMarkdown()** — Planned for `src/core/`. Currently, Markdown rendering lives in `src/webview/markdown.ts` using `marked` with a custom WikiLink extension
- **resolveWikiPath()** — Resolves link targets relative to the current page or as absolute from docs root

## wiki.ts

All functions take `docsRoot: string` as their first parameter:

- **readPage(docsRoot, pagePath)** — Reads a page. Tries `pagePath.md`, falls back to `pagePath/index.md`
- **writePage(docsRoot, pagePath, content, meta?)** — Writes a page with optional frontmatter. Creates directories as needed
- **deletePage(docsRoot, pagePath)** — Deletes a page and cleans up empty parent directories
- **listPages(docsRoot)** — Returns the full tree structure of `docs/`
- **listPagesMeta(docsRoot)** — Returns a flat list of all pages with metadata
- **listByTag(docsRoot, tag)** — Filters pages by tag

## search.ts

See [[search]] for the full search engine design.
