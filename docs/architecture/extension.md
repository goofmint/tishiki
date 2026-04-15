---
title: VS Code Extension
tags:
  - architecture
---

# VS Code Extension

> **Current status**: Preview panel is fully functional (Markdown rendering, WikiLink navigation with editor sync, edit button, auto-preview, file save watch). Commands other than `previewPage` are stubs. Tree view has a stub provider (empty tree).

## Activation

The extension activates when a `docs/` folder exists at the workspace root (`workspaceContains:docs/`).

On activation:

1. Determines `docsRoot` from the first workspace folder
2. Creates a `PreviewManager` instance for webview lifecycle management
3. Registers commands and the tree view provider
4. Registers document open/save listeners for auto-preview and live update
5. Stores all disposables in `context.subscriptions`

## Preview (src/extension/preview.ts)

`PreviewManager` manages the WebviewPanel lifecycle:

- **Panel creation**: `vscode.window.createWebviewPanel` with `enableScripts: true` and scoped `localResourceRoots`
- **Panel reuse**: If a panel already exists, it is revealed and content is updated (no duplicate panels)
- **Content delivery**: Reads the file via `vscode.workspace.fs.readFile`, sends raw markdown to the webview via `postMessage`
- **Editor sync**: Internal navigation opens the resolved Markdown file in editor column One and moves keyboard focus there
- **HTML template**: Generates a CSP-secured HTML shell that loads `dist/webview/webview.js` with a nonce

### Message Protocol

Extension to Webview:

- `{ type: 'content', markdown: string, filePath: string }` — Send page content

Webview to Extension:

- `{ type: 'edit', filePath: string }` — Open the file in the text editor in column One
- `{ type: 'navigate', targetPath: string }` — Navigate to a wiki page (resolves `.md` then `/index.md`), update the preview, and open the destination file in the text editor
- `{ type: 'openExternal', url: string }` — Open an external URL in the browser

### Auto-Preview

- `onDidOpenTextDocument`: When a `.md` file under `docs/` is opened, the preview panel opens automatically
- `onDidSaveTextDocument`: When the currently previewed file is saved, the content is re-sent to the webview

## Tree View

`WikiTreeProvider` implements `vscode.TreeDataProvider` (stub, returns empty tree).

## Commands

| Command | Description | Status |
|---------|-------------|--------|
| `tishiki.openPage` | Open a wiki page in the text editor | Stub |
| `tishiki.newPage` | Create a new page (prompts for path) | Stub |
| `tishiki.deletePage` | Delete a page (with confirmation) | Stub |
| `tishiki.previewPage` | Open HTML preview in a Webview panel | Implemented |
| `tishiki.refreshTree` | Manually refresh the wiki tree | Stub |
