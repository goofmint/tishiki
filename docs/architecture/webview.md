---
title: Webview Preview
tags:
  - architecture
---

# Webview Preview

The webview is a React application that renders Markdown content inside VS Code.

## Source Files

- `src/webview/index.tsx` — React app entry point and main `App` component
- `src/webview/markdown.ts` — Markdown rendering with WikiLink extension
- `src/webview/styles.ts` — VS Code theme-aware CSS styles
- `src/webview/vscode.d.ts` — Type declarations for `acquireVsCodeApi()`

## Markdown Rendering

Uses the `marked` library with a custom extension for WikiLink syntax.

### WikiLink Extension

Tokenizes `[[target]]` and `[[target|display]]` patterns:

- `[[api/overview]]` renders as a link with text "api/overview"
- `[[api/overview|API Docs]]` renders as a link with text "API Docs"

Output: `<a href="#" data-wiki-link="target">display</a>`

### Frontmatter Stripping

YAML frontmatter (delimited by `---`) is removed before rendering so it does not appear in the preview.

## Link Handling

All link clicks in the rendered content are intercepted:

| Link Type | Detection | Action |
|-----------|-----------|--------|
| WikiLink | `data-wiki-link` attribute | `navigate` message to extension, which updates the preview and opens the destination page in the editor |
| External URL | `http://` or `https://` prefix | `openExternal` message to extension |
| Relative path | No prefix | `navigate` message (stripped `.md`) with the same preview + editor sync behavior |

## Theme Integration

All styles use VS Code CSS variables:

- `--vscode-editor-background` / `--vscode-editor-foreground` — Base colors
- `--vscode-textLink-foreground` — Link colors
- `--vscode-textCodeBlock-background` — Code block background
- `--vscode-widget-border` — Borders and separators
- `--vscode-button-background` / `--vscode-button-foreground` — Edit button

The preview adapts automatically to light/dark/high-contrast themes.

## Security

- Content Security Policy (CSP) restricts scripts to a single nonce'd script
- `localResourceRoots` limits file access to `dist/webview/`
- `dangerouslySetInnerHTML` is used for rendered Markdown (necessary for HTML output from marked)
