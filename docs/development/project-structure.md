---
title: Project Structure
tags:
  - development
---

# Project Structure

```text
tishiki/
  package.json            # VS Code extension manifest + npm package
  tsconfig.json           # TypeScript config (strict, no emit)
  esbuild.config.mjs      # 3-bundle build config
  eslint.config.mjs       # ESLint flat config (TypeScript)
  vitest.config.ts        # Test config
  LICENSE                 # MIT
  .gitignore
  .vscodeignore           # Excludes src/, tests/, docs/ from .vsix
  .coderabbit.yaml        # CodeRabbit review config
  .vscode/
    launch.json            # F5 to launch Extension Development Host
    tasks.json             # Build/watch tasks
  media/
    icon.svg               # Extension icon (Activity Bar)
  src/
    extension/
      extension.ts         # activate/deactivate, commands, event listeners
      preview.ts           # WebviewPanel lifecycle and message handling
    mcp/
      server.ts            # MCP server entry point (stub with validation)
    webview/
      index.tsx            # React app with state management and link handling
      markdown.ts          # marked + WikiLink extension, frontmatter stripping
      styles.ts            # VS Code theme-aware CSS
      vscode.d.ts          # Type declarations for acquireVsCodeApi
    core/                  # Shared logic (not yet implemented)
  tests/
    setup.test.ts          # Test infrastructure verification
  docs/                    # Wiki content (this documentation)
  dist/                    # Build output (gitignored)
```

## Key Files

- **package.json** — Dual-purpose: VS Code extension manifest (`contributes`, `activationEvents`, `main`) and npm package (`bin` for MCP server)
- **esbuild.config.mjs** — Produces 3 bundles. See [[development/build]]
- **.vscodeignore** — Keeps the `.vsix` package lean (source, tests, docs excluded)
