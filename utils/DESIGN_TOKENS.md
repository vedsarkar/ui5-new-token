# Design tokens — contributor guide (internal)

How to add, change, or remove a Reltio design-token customization. This is an
internal how-to for `@reltio/design` contributors — not published docs. The
public overview lives in Storybook → **Design Tokens**
(`guides/design-tokens.story.mdx`).

## The one thing to understand first

We don't re-ship values that UI5 already provides. The UI5 web components inject
their **active** theme at runtime — the default is `sap_horizon` (light), and we
never call `setTheme`, so the stock **light** token set always lands on `:root`.
UI5 does **not** read our `data-theme` attribute and injects **no** dark set.

So `public/variables.css` omits a token only when it equals the stock light value
in **both** themes (UI5 supplies those); every other token is emitted for **both**
themes under `[data-theme="sap-reltio-light"]` and `[data-theme="sap-reltio-dark"]`
(plus the legacy `horizon-light` / `horizon-dark` alias). Both blocks carry the
**same** key set so switching themes — including a dark panel nested inside a
light one — always re-applies every non-constant token.

Consequences you must keep in mind:

- **`data-theme` is required.** An element with no `data-theme` ancestor renders
  with UI5's stock light values, not the Reltio palette.
- **The dark block is not small.** Dark differs from stock light in most tokens
  and UI5 injects no dark values, so the dark block carries them all — that's
  expected, not a bug.
- **The emitted set is computed, not curated.** `build-tokens` decides what to
  emit by diffing our token files against UI5's stock light bundle. You never
  maintain a list — you just set values.

## The files

| Path | Role |
|------|------|
| `utils/sap_horizon.tokens.json` | Source values for the **light** theme (full SAP Horizon key set, Reltio-tuned values) |
| `utils/sap_horizon_dark.tokens.json` | Source values for the **dark** theme |
| `scripts/build-tokens.mjs` | Generator — diffs the source files against UI5's stock light bundle and writes the emitted set |
| `public/variables.css` | **Generated output.** Never edit by hand |

The stock baseline the generator compares against (useful when you need a SAP
default value):

```
node_modules/@ui5/webcomponents-theming/dist/generated/assets/themes/sap_horizon/parameters-bundle.css.json
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

Edit the light and dark values independently in their respective files. A token
is emitted for **both** themes whenever it varies in either — and each block then
carries that theme's own value — so you don't need to touch both files unless
both values change.

## Remove a customization (revert to the SAP default)

The generator omits a token only when it equals UI5's stock **light** value in
**both** themes. So "removing" means making both theme values match stock light.

1. Find the stock value in `sap_horizon/parameters-bundle.css.json` (path above)
   — e.g. `--sapBrandColor: #0070f2;`.
2. Set that value in **both** `sap_horizon.tokens.json` and
   `sap_horizon_dark.tokens.json`.
3. Run `npm run build-tokens` and commit. The token disappears from
   `variables.css`; at runtime it falls back to UI5's stock value.

If the two themes should keep different values (e.g. a dark-mode background), the
token stays in the output — that is correct, not a leftover customization. Do
**not** delete keys from the token files — keep the full key surface; only values
change.

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
