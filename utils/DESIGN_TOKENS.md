# Design tokens — contributor guide (internal)

How to add, change, or remove a Reltio design-token customization. This is an
internal how-to for `@reltio/design` contributors — not published docs. The
public overview lives in Storybook → **Design Tokens**
(`guides/design-tokens.story.mdx`).

## The one thing to understand first

We do **not** ship a full theme. The UI5 web components already inject the
complete stock **SAP Horizon** token set on `:root` at runtime, so
`public/variables.css` carries **only the tokens whose value we changed** — the
delta against stock — grouped under `[data-theme="sap-reltio-light"]` and
`[data-theme="sap-reltio-dark"]` (the legacy `horizon-light` / `horizon-dark`
values are also emitted as a deprecated alias). Everything else inherits UI5's
defaults (and tracks UI5 automatically on upgrade).

Consequences you must keep in mind:

- **`data-theme` is required.** An element with no `data-theme` ancestor renders
  with UI5's stock values, not the Reltio palette.
- **"Custom" is computed, not curated.** `build-tokens` decides what to emit by
  diffing our token files against UI5's stock bundles. You never maintain a list
  of custom tokens — you just set values.

## The files

| Path | Role |
|------|------|
| `utils/sap_horizon.tokens.json` | Source values for the **light** theme (full SAP Horizon key set, Reltio-tuned values) |
| `utils/sap_horizon_dark.tokens.json` | Source values for the **dark** theme |
| `scripts/build-tokens.mjs` | Generator — diffs the source files against UI5's stock bundles and writes the delta |
| `public/variables.css` | **Generated output.** Never edit by hand |

The stock baseline the generator compares against (useful when you need a SAP
default value):

```
node_modules/@ui5/webcomponents-theming/dist/generated/assets/themes/sap_horizon/parameters-bundle.css.json
node_modules/@ui5/webcomponents-theming/dist/generated/assets/themes/sap_horizon_dark/parameters-bundle.css.json
```

## Add or change a custom token

1. Open the token file for the theme you're changing — `sap_horizon.tokens.json`
   (light) and/or `sap_horizon_dark.tokens.json` (dark).
2. Edit the **value** of the token. Do **not** rename keys, change casing, or add
   keys that are not part of the SAP Horizon surface — the key set must stay a
   1:1 mirror of upstream.
3. Regenerate and commit:

   ```bash
   npm run build-tokens
   ```

   Commit both the edited `*.tokens.json` **and** the regenerated
   `public/variables.css`.

Light and dark are independent. A token you customize only in light appears only
in the `[data-theme="sap-reltio-light"]` block, and vice versa. If a token should
be customized in both themes, edit it in both files.

## Remove a customization (revert to the SAP default)

Because the output is delta-only, "removing" a customization just means making
our value equal the stock value — the generator then drops it from
`variables.css` automatically.

1. Find the stock value in the matching `parameters-bundle.css.json` (paths
   above) — e.g. `--sapBrandColor: #0070f2;`.
2. Set that value back in the token file(s).
3. Run `npm run build-tokens` and commit. The token disappears from
   `variables.css`; at runtime it now falls back to UI5's default.

Do **not** delete the key from the token files — keep the full key surface; only
values change.

## Good to know

- **Formatting-only differences are ignored.** `1.0` vs `1`, `.875rem` vs
  `0.875rem`, `#00c` vs `#0000cc` are treated as equal, so they are not emitted
  as customizations.
- **This is a local, one-off step.** `build-tokens` does **not** run in CI or in
  the Storybook build — the committed `variables.css` is the source of truth.
  Re-run it and commit whenever you change the token files.
- **Re-run after a UI5 upgrade.** The delta depends on UI5's stock bundle, so
  bumping `@ui5/webcomponents-*` can change what needs to be emitted. Run
  `npm run build-tokens` after the bump and commit any diff.
- **If the script fails** with a message about the UI5 bundle path/format, UI5's
  internal layout changed for that version — update the path/parser in
  `scripts/build-tokens.mjs`.

## Verify your change

```bash
npm run dev
```

- **Design Tokens** section shows the raw source values from the JSON files.
- Open a component (e.g. **Components → Button → Emphasized**) and confirm it
  renders with the expected color. The preview defaults to `sap-reltio-light`; the
  dual-theme frame shows light and dark side by side.
