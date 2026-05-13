---
"@reltio/design": patch
---

Slim down the published dependency tree.

- Drop the unused `rc-tree` dependency. It lingered from a removed `TreeList` component and was no longer imported anywhere.
- Drop the unused `@storybook/mcp` dependency. It is only needed in development via the `@storybook/addon-mcp` devDependency and was never used at runtime.
- Correct `react`/`react-dom` peer ranges from `">=17 <20"` to `"^18 || ^19"` to match the actual requirement of the bundled `@ui5/webcomponents-react@2.21.3`. React 17 never worked in practice — UI5 React 2.x requires React 18 or 19 — so installs now produce an honest peer-dep warning instead of silently failing at runtime.
