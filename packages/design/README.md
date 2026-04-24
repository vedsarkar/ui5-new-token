
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

### Theme & Fonts (recommended — React)

Wrap your application in `<ThemeProvider>`. It activates the active SAP Horizon theme (Morning Horizon by default in light environments, Evening Horizon in dark environments) **and** registers all SAP 72 `@font-face` rules in one step:

```jsx
import { ThemeProvider } from "@reltio/design";

export default function App() {
	return (
		<ThemeProvider>
			<YourApp />
		</ThemeProvider>
	);
}
```

All `--sap*` design tokens become available on `:root`, components render in SAP 72, and the active theme tracks the user's `prefers-color-scheme`. Pin the theme with `<ThemeProvider defaultTheme="horizon-light">` (or `"horizon-dark"`); override CDN URLs for self-hosting via the `themeUrls` / `themeBaseUrl` / `fontUrls` / `fontBaseUrl` props (see Storybook for examples).

### Theme & Fonts (alternative — non-React)

Static sites and server-rendered pages without React control over `<head>` can load the same files via raw `<link>`:

```html
<link rel="stylesheet" href="https://reltio.design/themes/horizon-light.theme.css" />
<link rel="stylesheet" href="https://reltio.design/fonts.css" />
```

Or via npm subpath import (any bundler that handles CSS-as-asset):

```js
import "@reltio/design/themes/horizon-light.css";
import "@reltio/design/fonts.css";
```

The npm versions contain the same `@font-face` rules but with absolute CDN URLs to the font files, so no extra static-asset setup is needed.

See the [Typography](https://reltio.design/?path=/docs/guides-typography--docs) and Design Tokens guides in Storybook for the full list of available weights, the monospace stack, the SAP `--sap*` token surface, and self-hosting instructions.

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
