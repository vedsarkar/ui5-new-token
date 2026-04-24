# Tokens directory

This directory mirrors design-token files published by SAP. The files are committed verbatim
into this repository as the single source of truth for all `--sap*` CSS custom properties
exposed by `@reltio/design`. There is no transformation step; `scripts/build-tokens.mjs`
emits each JSON key as a CSS custom property with a `--` prefix.

## Files

| File | Upstream URL | Bytes (approx.) |
| --- | --- | --- |
| `sap_horizon.tokens.json` | https://raw.githubusercontent.com/SAP/theming-base-content/master/content/Base/baseLib/sap_horizon/variables.json | ~77 KB |
| `sap_horizon_dark.tokens.json` | https://raw.githubusercontent.com/SAP/theming-base-content/master/content/Base/baseLib/sap_horizon_dark/variables.json | ~77 KB |

In addition, the following font files in `public/fonts/` are sourced from the same upstream
repository under `content/Base/baseLib/baseTheme/fonts/`:

- `72-SemiboldDuplex.woff2`, `72-SemiboldDuplex-full.woff2`
- `72-Black.woff2`, `72-Black-full.woff2`

The other 16 SAP 72 font files in `public/fonts/` (Light, Regular, Italic, Semibold, Bold,
BoldItalic, Mono Regular, Mono Bold, each in regular and `-full` variants) were sourced from
the same upstream prior to this change and are kept as-is.

## License

All files in this mirror are subject to the upstream Apache License 2.0:

> Copyright 2012-2025 SAP SE or an SAP affiliate company and Theming Base Content contributors.
> Licensed under the Apache License, Version 2.0.
> https://github.com/SAP/theming-base-content/blob/master/LICENSE.txt

## Last fetched

- Upstream commit SHA: `09d9e99`
- Upstream commit date: 2026-04-15
- Fetched on: 2026-04-23

## Manual sync procedure

There is no automated upstream sync. To pull a newer SAP Horizon release into this
repository, do the following from the repo root:

```sh
# 1. Pull the latest JSON sources.
curl -fsSL -o tokens/sap_horizon.tokens.json \
  https://raw.githubusercontent.com/SAP/theming-base-content/master/content/Base/baseLib/sap_horizon/variables.json
curl -fsSL -o tokens/sap_horizon_dark.tokens.json \
  https://raw.githubusercontent.com/SAP/theming-base-content/master/content/Base/baseLib/sap_horizon_dark/variables.json

# 2. Pull any updated font files (only if SAP has shipped new font binaries).
#    The four SemiboldDuplex / Black files are downloaded from:
#      https://raw.githubusercontent.com/SAP/theming-base-content/master/content/Base/baseLib/baseTheme/fonts/<name>
#    Replace files in public/fonts/ as needed.

# 3. Regenerate the per-theme CSS files, fonts.css, and the Storybook Design Tokens page.
npm run build-tokens

# 4. Update this file's "Last fetched" section with the new SHA and date.

# 5. Review the diff in public/themes/*.theme.css, public/fonts.css, and
#    tokens/tokens.story.mdx to see exactly which token values changed upstream.
#    Commit JSON sources + generated artefacts together.
```

The upstream commit SHA at the time of fetch can be retrieved with:

```sh
curl -s https://api.github.com/repos/SAP/theming-base-content/commits/master \
  | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['sha'][:7], d['commit']['author']['date'])"
```
