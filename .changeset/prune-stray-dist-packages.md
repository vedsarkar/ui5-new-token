---
"@reltio/design": patch
---

Drop the stray `dist/packages` directory from the published package.

`tsc` infers `rootDir` as the common ancestor of every compiled file, which spans both the repo-root code folders (`components/`, `charts/`, …) and the workspace entry files (`packages/design/*.ts`) — so the entry files were emitted into `dist/packages/design/`. Those files only re-export `../../components` (i.e. `dist/components`, which is what `@reltio/design/components` already resolves to) and nothing references them, so they are now pruned during `postbuild`. No public API or import-path change.
