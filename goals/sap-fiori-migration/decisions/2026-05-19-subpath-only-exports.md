---
title: "Subpath-only exports for every @reltio/* package"
date: 2026-05-19
---

# Subpath-only exports for every @reltio/* package

Every workspace in `packages/*` declares its `package.json` `exports` field with **named subpaths only** — there is no `.` (bare) entry. Consumers always import from a named subpath:

```ts
// correct
import { Button } from "@reltio/design/components";
import { createNextAuth } from "@reltio/auth/next";

// resolves to ERR_PACKAGE_PATH_NOT_EXPORTED
import { Button } from "@reltio/design";
import { createNextAuth } from "@reltio/auth";
```

## Rationale

- **The subpath signals intent at the import line.** `@reltio/auth/next` clearly means "Next.js adapter"; `@reltio/auth/express` means "Express adapter". A bare `@reltio/auth` would force the reader to grep for which surface is in use.
- **Avoids "two equivalent paths to the same exports" confusion.** When both `@reltio/design` and `@reltio/design/components` work, consumers diverge: some files use one, some the other, search-and-replace breaks. Forcing one path keeps the codebase uniform.
- **Enforces module isolation.** The `exports` map prevents consumers from reaching into internal paths like `@reltio/<pkg>/src/...`. Together with the curated `index.ts` barrel pattern, internal files are unreachable by construction — no other hiding mechanism is needed.
- **Makes the package surface uniform across the platform.** Every `@reltio/*` package follows the same rule. Once a consumer learns the pattern, every package feels familiar.
