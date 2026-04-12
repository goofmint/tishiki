---
title: Testing
tags:
  - development
---

# Testing

Tests use vitest. Configuration is in `vitest.config.ts`.

## Running Tests

```bash
npm run test          # Single run
npm run test:watch    # Watch mode
```

## Test Location

Tests live in the `tests/` directory with the `.test.ts` extension.

## Configuration

```ts
// vitest.config.ts
{
  test: {
    globals: true,
    include: ["tests/**/*.test.ts"]
  }
}
```
