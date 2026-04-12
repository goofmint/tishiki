---
title: VS Code Extension
tags:
  - architecture
---

# VS Code Extension

## Activation

The extension activates when a `docs/` folder exists at the workspace root (`workspaceContains:docs/`).

On activation:

1. Determines `docsRoot` from the first workspace folder
2. Creates a FileSystemWatcher on `docs/**/*.md`
3. Registers commands and the tree view provider
4. Stores disposables in `context.subscriptions`

## Tree View

`WikiTreeDataProvider` implements `vscode.TreeDataProvider`:

- Displays the Wiki page hierarchy in the sidebar (Activity Bar)
- File nodes trigger `tishiki.openPage` on click
- Auto-refreshes when files change via FileSystemWatcher
- Manual refresh via `tishiki.refreshTree` command

## Commands

| Command | Description |
|---------|-------------|
| `tishiki.openPage` | Open a wiki page in the text editor |
| `tishiki.newPage` | Create a new page (prompts for path) |
| `tishiki.deletePage` | Delete a page (with confirmation) |
| `tishiki.previewPage` | Open HTML preview in a Webview panel |
| `tishiki.refreshTree` | Manually refresh the wiki tree |

## Webview Preview

- Uses `vscode.WebviewPanel` to display rendered HTML
- Loads the bundled React app (`dist/webview/webview.js`)
- CSP restricts scripts to the extension's own resources
- Respects VS Code theme variables for dark/light mode

### Message Protocol

Extension to Webview:
- `{ type: 'update', html, title, path }` — Update displayed content

Webview to Extension:
- `{ type: 'navigate', path }` — Request navigation to a wiki page (triggered by wiki-link click)
