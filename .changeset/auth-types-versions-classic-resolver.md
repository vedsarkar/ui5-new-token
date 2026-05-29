---
"@reltio/auth": patch
---

Fix subpath imports failing to type-check under TypeScript `moduleResolution: "node"` (classic / `node10`).

Legacy consumers on the classic resolver hit `TS2305` / `TS2307` on every subpath import because it ignores `exports`. Added a `typesVersions` map pointing each subpath at the same `.d.ts` as `exports.types`; modern resolvers keep using `exports.types`, classic-node falls back to `typesVersions`. Runtime is untouched and no consumer-side tsconfig change is needed.
