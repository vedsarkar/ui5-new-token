
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

Example usage of the **Button** component:

```jsx
import React from 'react';
import { Button } from '@reltio/design';

function App() {
  return <Button>Touch me</Button>;
}

export default App;
```

**Important:** React is listed as peer dependencies. Make sure it's added to your project.

### Design Tokens

To use Reltio color tokens (CSS custom properties for theming and dark mode), import the variables stylesheet:

```js
import "@reltio/design/variables.css";
```

This provides all `--reltio-color-*` variables on `:root` (light mode) and `[data-theme="dark"]` (dark mode). See the [Component Customization](https://reltio.design/?path=/docs/guides-component-customization--docs) guide for details.

### Fonts (SAP 72)

Components are designed to render in **SAP 72** (text) and **72 Mono** (monospace). The recommended way to load the fonts is a single `<link>` to our CDN:

```html
<link rel="stylesheet" href="https://reltio.design/fonts.css" />
```

As an alternative, you can import the same stylesheet from the npm package:

```js
import "@reltio/design/fonts.css";
```

The npm version contains the same `@font-face` rules but with absolute CDN URLs to the font files, so no extra static-asset setup is needed in your bundler.

Either way, set the root `font-family` in your global CSS:

```css
:root {
	font-family: "72", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		sans-serif;
}
```

See the [Typography](https://reltio.design/?path=/docs/guides-typography--docs) guide for the full list of available weights, the monospace stack, and self-hosting instructions.

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
