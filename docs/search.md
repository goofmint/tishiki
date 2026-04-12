---
title: Search Engine
tags:
  - architecture
---

# Search Engine

Tishiki uses Flexsearch for multilingual full-text search with persistent incremental indexing.

## Why Flexsearch

- Pure JavaScript — no native dependencies, works in both VS Code extension and MCP server
- Supports custom encoders for CJK languages
- Index export/import for persistence
- Individual document add/update/remove for incremental updates

## CJK Encoder

CJK languages (Japanese, Chinese, Korean) do not use spaces between words. Instead of relying on morphological analysis (which requires large dictionaries), Tishiki uses a **bigram tokenizer**:

- **Latin text** — Whitespace-separated, lowercased
- **CJK text** — Bigram (2-character sliding window)

Example: "検索機能" produces tokens: ["検索", "索機", "機能"]

This approach:
- Requires no external dictionaries
- Works across Japanese, Chinese, and Korean with the same logic
- Provides good precision for queries of 2+ characters

## Persistent Index

Index data is stored in `{docsRoot}/.tishiki/`:

| File | Purpose |
|------|---------|
| `search-index.json` | Flexsearch exported index data |
| `file-state.json` | mtime record for each indexed file |

## Incremental Update Flow

1. On startup, load `file-state.json` and compare mtimes with actual files in `docs/`
2. **Modified files** — Re-read content, call `index.update()`
3. **New files** — Read content, call `index.add()`
4. **Deleted files** — Call `index.remove()`
5. **No changes** — Restore index from `search-index.json` (fast startup)

After any updates, the index and file state are re-exported to disk.

## Implementation

Located in `src/core/search.ts`. Key functions:

- **initSearchIndex(docsRoot)** — Initialize or restore the search index
- **updateSearchIndex(docsRoot)** — Perform incremental update based on file changes
- **searchPages(docsRoot, query)** — Execute a search query and return results
