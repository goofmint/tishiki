---
title: Wiki Format
tags:
  - reference
---

# Wiki Format

## Frontmatter

Each page can optionally include YAML frontmatter:

```markdown
---
title: Page Title
tags:
  - api
  - reference
---
```

All fields are optional:

- **title** — Display title. Defaults to the filename
- **tags** — List of tags for categorization

## Wiki Links

Link between pages using double-bracket syntax:

- `[[page-path]]` — Links to a page, displays the page path as text
- `[[page-path|display text]]` — Links to a page with custom display text

Examples:

- `[[architecture/core]]` — Links to `docs/architecture/core.md`
- `[[mcp/index|MCP Server]]` — Links to `docs/mcp/index.md`, displays "MCP Server"

## Path Rules

- Paths are relative to `docs/`, without the `.md` extension
- `getting-started` resolves to `getting-started.md` first, then `getting-started/index.md`
- Forward slashes separate directory levels: `architecture/core`

## Directory Structure

Folder structure mirrors the Wiki hierarchy:

```
docs/
  index.md                  # Top page
  wiki-format.md            # Standalone page
  architecture/
    index.md                # Section top page
    core.md                 # Subpage
    extension.md            # Subpage
  mcp/
    index.md                # Section top page
    tools.md                # Subpage
```

## Version History

Version history is managed by git. Tishiki does not maintain its own versioning system.
