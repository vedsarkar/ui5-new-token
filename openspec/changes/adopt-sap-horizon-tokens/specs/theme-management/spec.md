## ADDED Requirements

### Requirement: ThemeProvider React component

The package SHALL expose a `ThemeProvider` React component that, when wrapped around an application, activates a Reltio theme by injecting a `<link rel="stylesheet">` element pointing at the corresponding per-theme CSS file and injects a `<style>` element containing SAP 72 `@font-face` rules. The component SHALL render its `children` prop unchanged and produce no DOM output of its own beyond the side-effects in `<head>`.

#### Scenario: Provider activates the default theme on mount
- **WHEN** an application is wrapped in `<ThemeProvider defaultTheme="horizon-light">` and rendered
- **THEN** a `<link rel="stylesheet">` element appears in `<head>` whose `href` resolves to the URL of `horizon-light.theme.css`
- **AND** a `<style>` element appears in `<head>` containing `@font-face` rules for the SAP 72 family

#### Scenario: Provider cleans up on unmount
- **WHEN** a `<ThemeProvider>` is unmounted
- **THEN** the `<link>` it inserted is removed from `<head>`
- **AND** the `<style>` element it inserted is removed from `<head>`

#### Scenario: Provider produces no DOM markup of its own
- **WHEN** a `<ThemeProvider>{children}</ThemeProvider>` renders
- **THEN** the rendered output is exactly `children`, with no wrapper element

### Requirement: Default theme resolution and `auto` mode

`ThemeProvider` SHALL accept a `defaultTheme` prop with values `"auto" | "horizon-light" | "horizon-dark"`. When `defaultTheme` is `"auto"` (the default), the provider SHALL resolve the active theme from the user's system preference via the `prefers-color-scheme` media query and SHALL update the active theme reactively when the system preference changes.

#### Scenario: defaultTheme defaults to auto
- **WHEN** `<ThemeProvider>` is used with no `defaultTheme` prop
- **THEN** the resolved theme is selected based on `prefers-color-scheme` (dark → `horizon-dark`, otherwise → `horizon-light`)

#### Scenario: Auto mode reacts to system preference change
- **WHEN** `<ThemeProvider defaultTheme="auto">` is mounted and the user changes their system color scheme
- **THEN** the `<link>` `href` is updated to point at the newly resolved theme's CSS file
- **AND** the change happens without a remount

#### Scenario: Explicit theme overrides system preference
- **WHEN** `<ThemeProvider defaultTheme="horizon-light">` is used while the system preference is dark
- **THEN** the resolved theme is `horizon-light` regardless of the system preference

### Requirement: useTheme hook

The package SHALL expose a `useTheme()` hook that returns an object containing the user's selected theme, the resolved active theme, and a setter to change the selection. Calling `setTheme` SHALL re-resolve the active theme and update the injected `<link>` accordingly.

#### Scenario: Hook returns current state
- **WHEN** any descendant of `<ThemeProvider>` calls `useTheme()`
- **THEN** the returned object includes a `theme` property whose value matches the user's current selection (`"auto" | "horizon-light" | "horizon-dark"`)
- **AND** a `resolved` property whose value matches the currently active theme (`"horizon-light" | "horizon-dark"`)
- **AND** a `setTheme(next)` function that accepts the same values as `defaultTheme`

#### Scenario: setTheme updates the active theme
- **WHEN** a component calls `useTheme().setTheme("horizon-dark")`
- **THEN** the resolved theme becomes `horizon-dark`
- **AND** the injected `<link>` `href` is updated to the dark theme's CSS file
- **AND** the change happens without remounting `ThemeProvider`

#### Scenario: setTheme back to auto re-engages system preference tracking
- **WHEN** a component calls `useTheme().setTheme("auto")` after previously setting an explicit theme
- **THEN** the resolved theme is determined by `prefers-color-scheme`
- **AND** the provider resumes reacting to system preference changes

#### Scenario: Hook outside ThemeProvider throws
- **WHEN** `useTheme()` is called from a component not descended from any `<ThemeProvider>`
- **THEN** the call throws an Error explaining that `useTheme` must be used within a `ThemeProvider`

### Requirement: Theme URL resolution and consumer override

For every theme to be activated, `ThemeProvider` SHALL resolve the URL of its CSS file using the following fall-through chain, in order:
1. `themeUrls[<theme>]` — per-theme override prop (highest priority).
2. `<themeBaseUrl>/<theme>.theme.css` — base-URL prop construction.
3. `https://reltio.design/themes/<theme>.theme.css` — CDN default.

#### Scenario: themeUrls per-file override wins
- **WHEN** `<ThemeProvider themeUrls={{ "horizon-dark": "/my/dark.css" }} themeBaseUrl="/static/themes" defaultTheme="horizon-dark">` is rendered
- **THEN** the injected `<link>` `href` is `/my/dark.css`

#### Scenario: themeBaseUrl is used when themeUrls lacks the active theme
- **WHEN** `<ThemeProvider themeBaseUrl="/static/themes" defaultTheme="horizon-light">` is rendered with no `themeUrls`
- **THEN** the injected `<link>` `href` is `/static/themes/horizon-light.theme.css`

#### Scenario: CDN default is used when neither override is present
- **WHEN** `<ThemeProvider defaultTheme="horizon-light">` is rendered with no `themeUrls` and no `themeBaseUrl`
- **THEN** the injected `<link>` `href` is `https://reltio.design/themes/horizon-light.theme.css`

#### Scenario: Partial override mixes with CDN default
- **WHEN** `<ThemeProvider themeUrls={{ "horizon-dark": "/my/dark.css" }} defaultTheme="horizon-light">` is rendered
- **AND** the user later switches to dark via `setTheme("horizon-dark")`
- **THEN** initially the `<link>` `href` is `https://reltio.design/themes/horizon-light.theme.css`
- **AND** after the switch the `<link>` `href` is `/my/dark.css`

### Requirement: Font URL resolution and consumer override

`ThemeProvider` SHALL inject `@font-face` rules covering all 10 SAP 72 face variants (Light, Regular, Italic, Semibold, SemiboldDuplex, Bold, BoldItalic, Black, Mono Regular, Mono Bold), each in two unicode-range subsets (Latin base and `-full` extended), for a total of 20 `@font-face` rules. For each rule, the `src` URL SHALL be resolved using the following fall-through chain, in order:
1. `fontUrls[<basename>]` — per-file override prop (highest priority).
2. `<fontBaseUrl>/<basename>.woff2` — base-URL prop construction.
3. `https://reltio.design/fonts/<basename>.woff2` — CDN default.

The `basename` for each rule SHALL match the `.woff2` filename without extension (e.g., `72-Regular`, `72-Regular-full`, `72-SemiboldDuplex`, `72Mono-Bold-full`).

#### Scenario: All 10 face variants are registered
- **WHEN** `<ThemeProvider>` is mounted
- **THEN** the injected `<style>` contains exactly 20 `@font-face` declarations
- **AND** the `font-family` values across them cover the SAP 72 set: `"72"`, `"72full"`, `"72-Light"`, `"72-Lightfull"`, `"72-Bold"`, `"72-Boldfull"`, `"72-Semibold"`, `"72-Semiboldfull"`, `"72-SemiboldDuplex"`, `"72-SemiboldDuplexfull"`, `"72Black"`, `"72Blackfull"`, `"72-BoldItalic"`, `"72-BoldItalicfull"`, `"72 Mono"`, `"72-MonoFull"` (and equivalent canonical names per SAP convention)

#### Scenario: fontUrls per-file override wins
- **WHEN** `<ThemeProvider fontUrls={{ "72-Regular": "/my/font.woff2" }}>` is mounted
- **THEN** the `@font-face` rule whose `src` corresponds to the `72-Regular.woff2` file uses `/my/font.woff2`
- **AND** all other `@font-face` rules use their respective default URLs

#### Scenario: fontBaseUrl is used when fontUrls lacks the file
- **WHEN** `<ThemeProvider fontBaseUrl="/static/fonts">` is mounted with no `fontUrls`
- **THEN** every `@font-face` `src` resolves to `/static/fonts/<basename>.woff2`

#### Scenario: CDN default is used when neither override is present
- **WHEN** `<ThemeProvider>` is mounted with no `fontUrls` and no `fontBaseUrl`
- **THEN** every `@font-face` `src` resolves to `https://reltio.design/fonts/<basename>.woff2`

#### Scenario: Every font-face rule sets font-display: swap
- **WHEN** inspecting any `@font-face` rule injected by `ThemeProvider`
- **THEN** `font-display: swap` is set
- **AND** fallback fonts render immediately during the initial font fetch

### Requirement: Dual access model — React API plus raw CSS imports

The package SHALL expose, in addition to the React API, raw CSS files that can be imported or linked directly without using `ThemeProvider`. These SHALL be byte-equivalent to what `ThemeProvider` resolves to in its default (CDN) configuration. Non-React consumers (static sites, MDX docs, server-rendered pages without React control over `<head>`) SHALL be able to use the package via these raw imports.

#### Scenario: Per-theme CSS files are exported via package.json
- **WHEN** a consumer writes `import "@reltio/design/themes/horizon-light.css"`
- **THEN** the import resolves to the published `public/themes/horizon-light.theme.css` file
- **AND** loading the file activates the light theme

#### Scenario: fonts.css is exported via package.json
- **WHEN** a consumer writes `import "@reltio/design/fonts.css"`
- **THEN** the import resolves to the published `public/fonts.css` file
- **AND** loading the file registers all SAP 72 `@font-face` rules with URLs pointing at `https://reltio.design`

#### Scenario: CDN URLs work via direct link
- **WHEN** a consumer writes `<link rel="stylesheet" href="https://reltio.design/themes/horizon-light.theme.css">` in plain HTML
- **THEN** the request returns the same per-theme CSS file
- **AND** appropriate CORS headers permit cross-origin loading

#### Scenario: fonts.css default path is on CDN
- **WHEN** a consumer writes `<link rel="stylesheet" href="https://reltio.design/fonts.css">` in plain HTML
- **THEN** the request returns the regenerated `fonts.css` with all 10 SAP 72 face variants
- **AND** appropriate CORS headers permit cross-origin loading

### Requirement: Scoped (subtree) theming is unsupported

The platform SHALL NOT support nested or subtree theme switching. Only one theme is intended to be active per page at any given time. The previous `[data-theme="dark"]` attribute mechanism, which permitted island themes inside a parent theme, SHALL NOT be re-introduced. No documentation SHALL recommend nesting `<ThemeProvider>` instances.

#### Scenario: No [data-theme] selector in generated CSS
- **WHEN** searching the per-theme CSS files and any guide-related CSS for the substring `[data-theme`
- **THEN** no match is found

#### Scenario: Documentation does not recommend nesting providers
- **WHEN** reading developer guides and component documentation
- **THEN** no example shows a `<ThemeProvider>` nested inside another `<ThemeProvider>`
- **AND** no example uses `data-theme` as a substree theme override

#### Scenario: Storybook switches via toolbar, not via DOM-scoped overrides
- **WHEN** changing the theme in Storybook
- **THEN** the active theme is changed by re-mounting or re-configuring the single `ThemeProvider` at the Storybook decorator level
- **AND** no per-story `data-theme` attribute is applied

### Requirement: Storybook integration

Storybook SHALL be wired with a single root `ThemeProvider` and a toolbar control allowing the developer to switch the active theme between the available options. Switching the theme via the toolbar SHALL update the injected `<link>` without reloading the iframe.

#### Scenario: Toolbar control is present
- **WHEN** a developer opens Storybook
- **THEN** a toolbar control labelled "Theme" (or equivalent) is visible
- **AND** its options include at minimum `auto`, `horizon-light`, `horizon-dark`

#### Scenario: Switching the toolbar updates the active theme
- **WHEN** a developer selects a different theme from the toolbar
- **THEN** the active per-theme CSS file is swapped without iframe reload
- **AND** the visual change is immediate (subject to network fetch on first switch)

#### Scenario: Storybook docs page reflects the active theme
- **WHEN** the toolbar theme changes
- **THEN** all components rendered on the current Storybook page re-resolve their CSS variables to the newly active theme
- **AND** the change is global to the iframe (no scoped overrides)

### Requirement: Component file structure

The `ThemeProvider` component SHALL follow the project's standard component file structure (per `components/AGENTS.md`), excluding only files not applicable for a non-rendering component. Specifically, the component SHALL ship as: `components/ThemeProvider/ThemeProvider.tsx`, `components/ThemeProvider/ThemeProvider.types.ts`, `components/ThemeProvider/ThemeProvider.stories.tsx`, and `components/ThemeProvider/index.ts`. The component SHALL NOT ship a `.module.css` file because it produces no rendered markup. The `useTheme` hook SHALL be co-exported from the same `index.ts`.

#### Scenario: Folder layout matches the project convention
- **WHEN** inspecting the `components/ThemeProvider/` directory
- **THEN** it contains the four files listed above
- **AND** no `.module.css` file is present
- **AND** `index.ts` re-exports both `ThemeProvider` and `useTheme`

#### Scenario: Types live in a separate file
- **WHEN** inspecting `ThemeProvider.tsx`
- **THEN** all type declarations for the component's props live in `ThemeProvider.types.ts`
- **AND** the `.tsx` file imports them from there

#### Scenario: Stories demonstrate primary scenarios
- **WHEN** opening `ThemeProvider.stories.tsx` in Storybook
- **THEN** stories cover at minimum: default (CDN, auto), explicit light, explicit dark, custom themeBaseUrl, and custom fontBaseUrl

### Requirement: CDN delivery of themes and fonts at reltio.design

The deployment configuration (`vercel.json`) SHALL serve `/themes/*` paths from the published `public/themes/` directory with the same cache and CORS headers currently configured for `/fonts/*` and `/fonts.css`. The new font files (`72-SemiboldDuplex*.woff2`, `72-Black*.woff2`) SHALL be served from `/fonts/*` alongside the existing files.

#### Scenario: Per-theme files are CDN-accessible
- **WHEN** issuing a GET request to `https://reltio.design/themes/horizon-light.theme.css`
- **THEN** the response status is 200
- **AND** the body matches the contents of `public/themes/horizon-light.theme.css`
- **AND** the response headers include `Access-Control-Allow-Origin: *` (or equivalent permissive CORS configuration)

#### Scenario: New font files are CDN-accessible
- **WHEN** issuing a GET request to `https://reltio.design/fonts/72-SemiboldDuplex.woff2`
- **THEN** the response status is 200
- **AND** the response is a valid `.woff2` font file
- **AND** the same applies to `72-SemiboldDuplex-full.woff2`, `72-Black.woff2`, and `72-Black-full.woff2`
