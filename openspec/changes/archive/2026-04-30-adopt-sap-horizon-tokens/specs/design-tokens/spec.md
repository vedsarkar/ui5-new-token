## ADDED Requirements

### Requirement: SAP Horizon as the single source of truth

The platform SHALL source all design tokens (colors, semantic states, typography metrics, shadow strings, border radii, focus styles, element heights, and any other visual primitives published by SAP) from SAP's Horizon theme as defined in the [SAP/theming-base-content](https://github.com/SAP/theming-base-content) repository. No design tokens SHALL be authored locally; the platform's role is to mirror, not to extend.

#### Scenario: Light theme tokens come from sap_horizon
- **WHEN** the build pipeline runs
- **THEN** every CSS custom property declared in `public/themes/horizon-light.theme.css` originates from a key in `tokens/sap_horizon.tokens.json` (the verbatim copy of SAP's `content/Base/baseLib/sap_horizon/variables.json`)
- **AND** no custom property exists in that file whose name does not appear as a key in that JSON file

#### Scenario: Dark theme tokens come from sap_horizon_dark
- **WHEN** the build pipeline runs
- **THEN** every CSS custom property declared in `public/themes/horizon-dark.theme.css` originates from a key in `tokens/sap_horizon_dark.tokens.json` (the verbatim copy of SAP's `content/Base/baseLib/sap_horizon_dark/variables.json`)
- **AND** no custom property exists in that file whose name does not appear as a key in that JSON file

#### Scenario: Both themes expose the same set of token names
- **WHEN** comparing the per-theme CSS files for light and dark
- **THEN** the set of declared CSS custom property names is identical between the two files
- **AND** only the values differ between the two files

### Requirement: Verbatim 1:1 mirror — no transformation

The build pipeline SHALL convert each key from the SAP JSON files into a CSS custom property by prepending `--` to the key, with no other transformation. Token names SHALL preserve SAP's exact casing (camelCase, including underscore separators where SAP uses them, e.g., `sapButton_Hover_Background`). Token values SHALL be emitted unchanged from the source JSON.

#### Scenario: Names preserve SAP casing
- **WHEN** inspecting any declaration in any per-theme CSS file
- **THEN** the property name matches `--<exact SAP key>` with no case folding, no kebab-case conversion, no prefix substitution

#### Scenario: Values are emitted verbatim
- **WHEN** comparing any declaration's value against the corresponding entry in the source JSON
- **THEN** the two strings are byte-identical (modulo trimming of surrounding whitespace)
- **AND** no value transformation occurs (no rem→px conversion, no rgba normalisation, no shorthand expansion)

#### Scenario: Build is deterministic and reproducible
- **WHEN** running `npm run build-tokens` twice without changing any source file
- **THEN** the resulting per-theme CSS files are byte-identical between the two runs

### Requirement: Complete, unfiltered token surface

The build pipeline SHALL emit every key present in each SAP source JSON file. The pipeline SHALL NOT curate, prune, or filter the token set. The pipeline SHALL NOT inject any token names that do not exist in the source.

#### Scenario: All SAP Horizon tokens are present
- **WHEN** counting CSS custom property declarations under `:root` in `public/themes/horizon-light.theme.css`
- **THEN** the count equals the number of keys in `tokens/sap_horizon.tokens.json` (`root` object)
- **AND** the count is at least 1500 (sanity check; current Horizon ships ~1536)

#### Scenario: No additional tokens are injected
- **WHEN** scanning the per-theme CSS files for any custom property that does not begin with `--sap`
- **THEN** no such property exists
- **AND** in particular no `--reltio-color-*` property exists in any file

### Requirement: Sources committed in-repo, sync is explicit

The two SAP JSON source files SHALL be committed verbatim in the repository at `tokens/sap_horizon.tokens.json` and `tokens/sap_horizon_dark.tokens.json` (renamed from SAP's upstream filename `variables.json` to match the project's `*.tokens.json` convention). The build pipeline SHALL NOT fetch from the network. Updating to a new SAP Horizon release is a manual operation: replace the JSON files and re-run the build.

#### Scenario: Build runs offline
- **WHEN** running `npm run build-tokens` with no network connection
- **THEN** the build succeeds
- **AND** the per-theme CSS files are regenerated from the on-disk JSON files

#### Scenario: Sync provenance is recorded
- **WHEN** inspecting the `tokens/` directory
- **THEN** the file `tokens/README.md` documents the upstream URLs, license (Apache 2.0), and the date or upstream commit SHA at which the JSON files were last fetched
- **AND** documents the manual sync procedure for future updates

### Requirement: Per-theme output files

The build pipeline SHALL emit one CSS file per theme at `public/themes/<theme>.theme.css`. Each file SHALL contain a single `:root { ... }` block with all tokens for that theme. No file SHALL contain selectors other than `:root` (and the leading comment header). Themes SHALL be mutually exclusive at runtime — only one per-theme file is intended to be loaded into the page at a time.

#### Scenario: Light theme file structure
- **WHEN** inspecting `public/themes/horizon-light.theme.css`
- **THEN** it contains exactly one CSS rule block with selector `:root`
- **AND** all declarations inside that block are the light-theme token values
- **AND** the file begins with a comment header identifying it as auto-generated, naming the source JSON file, and naming the regeneration command (`npm run build-tokens`)

#### Scenario: Dark theme file structure
- **WHEN** inspecting `public/themes/horizon-dark.theme.css`
- **THEN** it contains exactly one CSS rule block with selector `:root`
- **AND** all declarations inside that block are the dark-theme token values
- **AND** the file begins with a comment header identifying it as auto-generated, naming the source JSON file, and naming the regeneration command (`npm run build-tokens`)

#### Scenario: No `[data-theme]` selector anywhere
- **WHEN** searching any per-theme CSS file for the substring `[data-theme`
- **THEN** no match is found

#### Scenario: Per-theme file is self-contained
- **WHEN** loading any single per-theme CSS file in isolation (no other theme files loaded)
- **THEN** all 1536 SAP tokens for that theme are available on `:root` and inheritable by every element in the document

#### Scenario: Generated files are committed to the repository
- **WHEN** running `git status` after `npm run build-tokens` produces no diff
- **THEN** every file under `public/themes/` is tracked by git
- **AND** is not listed in `.gitignore`

### Requirement: Public CSS API is `--sap*` namespace

The CSS custom properties exposed by `@reltio/design` to consumer applications SHALL use the `--sap*` namespace exclusively. The `--reltio-color-*` namespace SHALL NOT exist in any generated CSS file. Consumer applications and downstream component CSS SHALL reference SAP-named variables.

#### Scenario: --reltio-color-* is fully removed
- **WHEN** searching `public/themes/*.theme.css` and `public/fonts.css` for the substring `--reltio-color-`
- **THEN** no match is found

#### Scenario: All declared variables use the --sap prefix
- **WHEN** scanning every CSS custom property declaration in the per-theme files
- **THEN** every property name starts with `--sap`

### Requirement: Build script is minimal and transformation-free

The script `scripts/build-tokens.mjs` SHALL be a thin transformer that reads the SAP JSON sources and emits each key as a CSS custom property with a `--` prefix into the corresponding per-theme CSS file. It SHALL contain no curated token lists, no value-transformation logic, no prefix-renaming logic, and no per-token special cases.

#### Scenario: Script is small and auditable
- **WHEN** measuring the size of `scripts/build-tokens.mjs`
- **THEN** it is under 400 lines of executable code (excluding comments and blank lines)

#### Scenario: Script has no per-token special cases in CSS output
- **WHEN** reading `scripts/build-tokens.mjs`
- **THEN** every value emitted into the per-theme CSS output is exactly the string read from the source JSON, with at most leading/trailing whitespace trimmed
- **AND** no per-key conditional logic appears in the CSS emission path (no `if (key === ...)`, no `switch (key)`)
- **AND** the script MAY branch on the *type* of a value when generating ancillary documentation (e.g., detecting CSS colours for Storybook swatches) without altering the emitted token strings in the theme CSS files

### Requirement: Storybook design-tokens documentation reflects the new surface

The Storybook documentation page that previously rendered Reltio color tokens SHALL be rewritten to reflect the new token surface. The page SHALL be generated entirely by `scripts/build-tokens.mjs` into `tokens/tokens.story.mdx` (do not hand-edit; run `npm run build-tokens` after upstream JSON changes). There SHALL be no separate React component for rendering the table — the MDX file is the single source of truth for both human Storybook readers and AI agents consuming Storybook via MCP.

The generator SHALL read the SAP JSON sources, group tokens by their natural prefix (e.g., `sapBrand*`, `sapContent_*`, `sapButton_*`, `sapField_*`), lay out each group in an HTML `<table>` (not GitHub-flavoured markdown tables — MDX docs may not parse `|`-syntax next to JSX), render colour values as JSX `<span style={{ ... }}>` swatches (object `style`, not a CSS string — MDX compiles to React) with the raw token value text overlaid in a contrasting foreground colour, render non-colour values as `<code>` in cells, render light and dark values in adjacent table columns, and link out to the [SAP Horizon design system documentation](https://www.sap.com/design-system/) for canonical semantic guidance.

#### Scenario: The page is renamed to reflect broader scope
- **WHEN** visiting Storybook
- **THEN** the documentation page formerly titled "Colors" is now titled to reflect the design-tokens surface (e.g., "Design Tokens" or equivalent)

#### Scenario: All SAP groups are represented
- **WHEN** the design-tokens page renders
- **THEN** every prefix group present in the source JSON appears as a section, including at minimum: `sapBrand*`, `sapContent_*`, `sapButton_*`, `sapField_*`, `sapShell_*`, `sapChart_*`, `sapElement_*`, `sapFont_*`, semantic color groups (negative/critical/positive/informative/neutral), `sapIndicationColor_*`, `sapAccent*`, `sapAvatar_*`

#### Scenario: Color tokens render as swatches
- **WHEN** a token's value is a CSS color (hex, rgb, rgba, hsl, named color)
- **THEN** the page renders a visual swatch alongside the token name and value
- **AND** the swatch shows the light and dark values side-by-side so theme contrast is visible at a glance

#### Scenario: Non-color tokens render as monospace values
- **WHEN** a token's value is not a CSS color (size, font stack, shadow string, etc.)
- **THEN** the page renders the value as monospace inline code in the table cell

### Requirement: AI-agent guidance reflects the new token surface

All AI-agent guidance files in the repository (`AGENTS.md`, `CLAUDE.md`, `components/AGENTS.md`, and any others discovered) SHALL be updated to reference the `--sap*` token namespace and the per-theme file architecture. The Figma-to-Code workflow section SHALL describe sourcing color tokens from SAP Horizon directly. The Pre-Commit Checklist SHALL be updated to reference SAP-named tokens. References to `tokens/Light.tokens.json`, `tokens/Dark.tokens.json`, and `tokens/token-map.json` SHALL be removed. References to `[data-theme="dark"]` as the activation mechanism SHALL be removed.

#### Scenario: No agent-guidance file references --reltio-color-*
- **WHEN** searching `AGENTS.md`, `CLAUDE.md`, `components/AGENTS.md` for the substring `--reltio-color-`
- **THEN** no match is found

#### Scenario: Agent guidance mentions --sap* tokens
- **WHEN** reading the CSS Styling and Global Color Tokens sections of `AGENTS.md` and `CLAUDE.md`
- **THEN** the guidance instructs agents to reference `--sap*` CSS custom properties for colors and other supported design tokens
- **AND** points to `public/themes/*.theme.css` and the underlying `tokens/sap_horizon*.tokens.json` as the source of truth

#### Scenario: Removed token files are not referenced
- **WHEN** searching agent-guidance files for any of `Light.tokens.json`, `Dark.tokens.json`, `token-map.json`, `variables.css`, `[data-theme="dark"]`
- **THEN** no reference remains
