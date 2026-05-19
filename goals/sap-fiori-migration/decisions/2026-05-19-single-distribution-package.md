---
title: "Single distribution package — apps install only @reltio/design"
date: 2026-05-19
---

# Single distribution package — apps install only @reltio/design

Reltio applications install `@reltio/design` and never depend on `@ui5/webcomponents-react`, `@ui5/webcomponents-icons`, `@ui5/webcomponents-fiori`, or any other UI5 package directly. The UI Center of Excellence controls UI5 version pinning; apps follow through `@reltio/design` releases.

## Rationale

- **Protects apps from upstream breaking changes.** The CoE pins UI5 at an exact version (currently `2.21.3`) and only bumps it after Chromatic + a11y + interaction tests pass on every story. Apps get a tested upgrade as a normal `@reltio/design` minor or patch release, with a migration MDX if anything changed.
- **Gives AI agents a single import path to generate.** Storybook MCP and the Manifest Debugger both rewrite snippets to `@reltio/design/components` automatically, so generated code is always correct.
- **Eliminates the "split UI5 version" failure mode.** Without this contract, two transitive paths to `@ui5/webcomponents-react` at different versions in the same app produce silent runtime errors that are very hard to diagnose. With a single distribution package, the version graph is flat.
- **Concentrates testing and validation in one repo.** Visual regression, accessibility, and interaction coverage all live here. Apps inherit that coverage for free.
