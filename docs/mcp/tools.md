---
title: MCP Tools
tags:
  - mcp
  - reference
---

# MCP Tools

All tools operate on pages within the configured `docsRoot` directory.

## create_page

Create a new wiki page.

- **path** (string, required) — Page path relative to docs/, without `.md` extension
- **content** (string, required) — Markdown content (body only, without frontmatter)
- **title** (string, optional) — Page title
- **tags** (string[], optional) — List of tags

Returns an error if the page already exists.

## read_page

Read a wiki page.

- **path** (string, required) — Page path

Returns page content, title, tags, and file path. Tries `path.md` first, then `path/index.md`.

## update_page

Update an existing wiki page.

- **path** (string, required) — Page path
- **content** (string, required) — New Markdown content
- **title** (string, optional) — New title
- **tags** (string[], optional) — New tags

Returns an error if the page does not exist.

## delete_page

Delete a wiki page.

- **path** (string, required) — Page path

Removes the `.md` file and cleans up empty parent directories.

## search

Full-text search across all wiki pages. See [[search]] for engine details.

- **query** (string, required) — Search query

Returns matching pages with line numbers and matching text.

## list_pages

List all wiki pages as a tree structure.

No parameters. Returns a nested tree reflecting the `docs/` directory hierarchy.

## list_by_tag

List pages filtered by a specific tag.

- **tag** (string, required) — Tag to filter by

Returns a flat list of pages that have the specified tag in their frontmatter.
