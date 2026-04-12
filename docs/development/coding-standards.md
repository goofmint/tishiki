---
title: Coding Standards
tags:
  - development
  - reference
---

# Coding Standards

## TSDoc

All exported functions and classes must have a TSDoc comment. This is enforced by CodeRabbit's Docstring Coverage check.

```typescript
/** Activates the Tishiki extension. Registers commands and sets up the wiki tree view. */
export function activate(context: vscode.ExtensionContext): void {
```

- One-liner JSDoc is sufficient for simple functions
- Multi-line JSDoc with `@param` / `@returns` for complex functions
- Internal (non-exported) functions do not require JSDoc unless the logic is non-obvious

## Markdown

Fenced code blocks must always include a language specifier (MD040):

````markdown
```typescript
const x = 1;
```

```text
plain text or directory listings
```
````

Use `text` for directory trees, plain output, and other non-code content.

## TypeScript

- Strict mode (`strict: true` in tsconfig)
- No `any` or `unknown` types
- No `class` unless absolutely necessary
- Prefer `interface` over `type` for object shapes

## Tests

- No `if` statements in tests
- No fallback values — assert exact expectations
- Tests must be independent (no shared mutable state)
- Use descriptive test names that explain the expected behavior
