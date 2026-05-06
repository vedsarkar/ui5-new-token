
**@reltio/design** is a public JavaScript library that contains key components and utilities for developing Reltio UI applications.

- Built on ReactJS.
- Intended for Reltio internal teams developing applications.
- [Storybook with component examples is available here](https://reltio.design).

## Installation

To install, use NPM:  
```bash
npm install @reltio/design
```
## Usage

Reltio Design provides MDM-specific business components and primitives built on top of [`@ui5/webcomponents-react`](https://sap.github.io/ui5-webcomponents-react/). For base UI controls (Button, Input, Dialog, ...) import directly from UI5; for Reltio MDM components import from `@reltio/design`:

```jsx
import { Button } from "@ui5/webcomponents-react/Button";
import { Chat } from "@reltio/design";

function App() {
	return (
		<>
			<Button design="Emphasized">Save</Button>
			<Chat messages={[]} />
		</>
	);
}

export default App;
```

**Important:** React, `@ui5/webcomponents-react`, and `@ui5/webcomponents-icons` are listed as peer dependencies. Make sure they are added to your project.

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

`variables.css` declares all `--sap*` design tokens; `fonts.css` registers the SAP 72 `@font-face` rules and points the document root at the SAP 72 stack. Both UI5 web components (`@ui5/webcomponents-react`) and Reltio components consume the same tokens, so set the attribute once and both layers re-theme together.

See the [UI Architecture](https://reltio.design/?path=/docs/guides-ui-architecture--docs), [Typography](https://reltio.design/?path=/docs/guides-typography--docs), and [Design Tokens](https://reltio.design/?path=/docs/design-tokens--docs) guides in Storybook for the full picture, the monospace stack, the `--sap*` token surface, and self-hosting instructions.

## Target Audience

The library is designed for Reltio internal teams developing applications.

If you need additional components from the [Storybook](https://reltio.design), contact the **UI Center of Excellence** team at [ui.coe@reltio.com](mailto:ui.coe@reltio.com).

## Contribution

Adding or modifying components is done via the monorepo: [https://bitbucket.org/reltio-ondemand/reltio-design](https://bitbucket.org/reltio-ondemand/reltio-design).

### Development Process:

1. Ensure you have write access to the monorepo.
2. Create a feature branch for your changes.
3. Run Storybook locally with `npm run dev`
3. Follow the standard pull request (PR) creation and code review processes adopted across Reltio teams.
4. After your PR is successfully merged into the main branch, run a **custom Bitbucket pipeline** to publish the component to NPM.

### Publishing:

- If the component is published from the main branch, it will be released to NPM.
- If it is published from a feature branch, the component will be versioned as `0.0.0-{BUILD_ID}` and tagged with `{BRANCH_NAME}`.

For any questions about the process, contact the **UI Center of Excellence** team via [ui.coe@reltio.com](mailto:ui.coe@reltio.com).

## License

This library is distributed under Reltio’s corporate license and is intended for internal use only.
