# @reltio/design

**@reltio/design** is the single distribution package for every UI surface a Reltio application needs — endorsed SAP Fiori (UI5) components, Reltio business components, charts, hooks, and design tokens.

- Built on React.
- Intended for Reltio internal teams developing applications.
- [Storybook with component examples is available here](https://reltio.design).

## Installation

To install, use NPM:
```bash
npm install @reltio/design
```

That's all you need. `@ui5/webcomponents-react`, `@ui5/webcomponents-icons`, and the rest of the SAP Fiori stack come transitively at the exact versions the UI Center of Excellence has tested.

## Usage

Import everything from `@reltio/design/components` (or `/charts`, `/utils`). Reltio components and endorsed UI5 components share the same `/components` subpath:

```jsx
import { Button, Chat, MessageStrip, Avatar } from "@reltio/design/components";

function App() {
  return (
    <>
      <Avatar initials="JD" />
      <MessageStrip design="Information">Welcome back</MessageStrip>
      <Chat messages={[]} />
      <Button design="Emphasized">Save</Button>
    </>
  );
}

export default App;
```

> **Always use a subpath.** This package exposes only `/components`, `/charts`, `/hooks`, and `/utils` entries — there is no `main`/`exports` target for the bare package name. A `import { X } from "@reltio/design"` resolves to nothing and breaks at install time.

| Subpath | What's in it |
|---|---|
| `@reltio/design/components` | All UI components — Reltio business components (Chat, AppSelector, Markdown, …) and endorsed UI5 (Button, Dialog, MessageStrip, …). 95% of imports go here. |
| `@reltio/design/charts` | ECharts-based visualizations (BarChart, LineChart, GeoChart, …). |
| `@reltio/design/hooks` | Shared React hooks (`useTextStream`, …). |
| `@reltio/design/utils` | Shared utilities (`classNames`, `HtmlProps`, …). |

### Why a single entry point

Apps that import only from `@reltio/design` get four guarantees that direct `@ui5/*` imports cannot provide:

1. **Pinned, tested UI5 version.** The CoE pins `@ui5/webcomponents-react` to an exact version inside `@reltio/design`. Every release of this package goes through Chromatic visual regression, accessibility (axe), and interaction tests on every story for every endorsed component. Apps inherit only the version that has cleared every check.
2. **Coordinated upgrades.** When SAP ships a UI5 release that introduces a breaking change, the CoE catches it in this repo's CI. Your app stays on the working `@reltio/design` version until a new release ships with a migration guide.
3. **Curated surface.** Anything re-exported from `@reltio/design` is endorsed for use in Reltio applications, with stories that cover the edge cases SAP did not document. Anything not re-exported is not yet endorsed — open an issue with the CoE to request endorsement.
4. **Single import contract for AI agents.** The Reltio Design MCP server indexes only `@reltio/design`. AI coding assistants (Cursor, Claude, Copilot, …) generate imports from `@reltio/design` consistently, so the same code style holds across every Reltio app.

> **Do not install `@ui5/webcomponents-react` directly.** If a UI5 component you need is missing from `@reltio/design`, request it from the CoE — do not bypass the contract.

The full rationale lives in the [UI Architecture guide](https://reltio.design/?path=/docs/guides-ui-architecture--docs).

### Overriding the pinned UI5 version (escape hatch)

Both [`npm overrides`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides) and [`yarn resolutions`](https://yarnpkg.com/configuration/manifest#resolutions) (and [`pnpm overrides`](https://pnpm.io/package_json#pnpmoverrides)) let you force a different version of `@ui5/webcomponents-react` than the one `@reltio/design` ships with:

```jsonc
// app's package.json
{
  "dependencies": { "@reltio/design": "^0.5.0" },
  "overrides": {
    "@reltio/design": {
      "@ui5/webcomponents-react": "2.22.0"
    }
  }
}
```

This is a deliberate npm feature, not a leak — we keep it available for emergencies and do not try to block it. But every override pauses the protections the single-entry-point model provides, so use it only as a temporary break-glass.

#### When an override is justified

- **Hot security patch.** A critical CVE in the pinned UI5 version that the CoE has not yet rolled into a `@reltio/design` release.
- **Critical upstream bug fix.** A blocker fix in a UI5 patch version that your app cannot wait a release cycle for.
- **Local experimentation.** Validating a candidate UI5 version in a dev branch before requesting endorsement.

#### What you give up while the override is active

- **No CoE testing coverage.** The pinned version is the one CoE has run through Chromatic visual regression, accessibility (axe), and interaction tests. Your overridden version has not been tested against Reltio components — regressions may surface in production.
- **Reltio components may break.** Components inside `@reltio/design` (Chat, AppSelector, Markdown, …) are typed against the pinned UI5 surface. If SAP changed a prop signature in your override target, those components may fail to type-check or behave unexpectedly at runtime.
- **Migration guides may not apply.** Each `@reltio/design` release ships an MDX migration note describing the path from one pinned UI5 version to the next. An arbitrary override target may have its own breaking changes that the guide does not cover.
- **Reduced support.** Reltio support for bugs that only reproduce with overridden versions will ask you to first downgrade to the pinned version.
- **Drift across apps.** If multiple apps each pick their own override target, the cross-app consistency the model provides is gone.

#### Workflow

1. **File an issue with the CoE** describing why the override is needed (CVE, upstream bug, …) and which version you're moving to. This both gives CoE early signal and lets other apps benefit.
2. **Add the `overrides` (or `resolutions`) entry** to your app's `package.json` with a code comment pointing at the issue.
3. **Remove the override** as soon as a proper `@reltio/design` release lands with the fix or new version.

If you find yourself reaching for `overrides` regularly, that's a strong signal the endorsed-version cadence isn't matching your needs — surface that with the CoE so the cadence can be adjusted, not the contract.

### Theme & Fonts

Load the SAP Horizon design tokens and SAP 72 fonts as static CSS, then set the `data-theme` attribute on any ancestor element:

```html
<link rel="stylesheet" href="https://reltio.design/variables.css" />
<link rel="stylesheet" href="https://reltio.design/fonts.css" />

<div data-theme="horizon-light">
  <!-- UI5 components and Reltio components both render in light theme -->
</div>
```

Switch the active theme by toggling `data-theme="horizon-light"` or `data-theme="horizon-dark"` on any ancestor element. Nested theming is supported — a `[data-theme]` on a child element scopes that theme to its subtree.

`variables.css` declares all `--sap*` design tokens; `fonts.css` registers the SAP 72 `@font-face` rules and points the document root at the SAP 72 stack. Both UI5 web components and Reltio components consume the same tokens, so set the attribute once and both layers re-theme together.

See the [UI Architecture](https://reltio.design/?path=/docs/guides-ui-architecture--docs), [Typography](https://reltio.design/?path=/docs/guides-typography--docs), and [Design Tokens](https://reltio.design/?path=/docs/design-tokens--docs) guides in Storybook for the full picture, the monospace stack, the `--sap*` token surface, and self-hosting instructions.

### Icons

Icons are loaded as side-effect imports — the SAP icon set ships through `@ui5/webcomponents-icons` (a transitive dependency of `@reltio/design`):

```tsx
import { Button } from "@reltio/design/components";
import "@ui5/webcomponents-icons/dist/save.js";

<Button icon="save">Save</Button>;
```

## Target Audience

The library is designed for Reltio internal teams developing applications.

If you need a UI5 component that is not yet re-exported from `@reltio/design`, contact the **UI Center of Excellence** team at [ui.coe@reltio.com](mailto:ui.coe@reltio.com) — we will add it to the endorsed surface (with proper Reltio documentation, edge-case stories, and tests) so every team uses the same vetted set.

## Contribution

Adding or modifying components is done via the monorepo: [https://bitbucket.org/reltio-ondemand/reltio-design](https://bitbucket.org/reltio-ondemand/reltio-design).

### Development Process:

1. Ensure you have write access to the monorepo.
2. Create a feature branch for your changes.
3. Run Storybook locally with `npm run dev`
4. Follow the standard pull request (PR) creation and code review processes adopted across Reltio teams.
5. After your PR is successfully merged into the main branch, run a **custom Bitbucket pipeline** to publish the component to NPM.

### Publishing:

- If the component is published from the main branch, it will be released to NPM.
- If it is published from a feature branch, the component will be versioned as `0.0.0-{BUILD_ID}` and tagged with `{BRANCH_NAME}`.

For any questions about the process, contact the **UI Center of Excellence** team via [ui.coe@reltio.com](mailto:ui.coe@reltio.com).

## License

Licensed under the [Apache License, Version 2.0](./LICENSE). See [`NOTICE`](./NOTICE) for attribution of the upstream Apache 2.0 software this package redistributes — most notably `@ui5/webcomponents-react`, `@ui5/webcomponents`, `@ui5/webcomponents-fiori`, `@ui5/webcomponents-icons`, and the SAP Horizon design tokens from `@sap-theming/theming-base-content`.

The library is built primarily for Reltio product teams, partners, and customers, but the Apache 2.0 grant means anyone can install, use, modify, and redistribute it within the terms of the License. Reltio's trademarks (including the Reltio name and logo) are not granted by this license — see Section 6 of the LICENSE for the trademark exclusion.
