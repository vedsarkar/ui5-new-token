/**
 * `@reltio/design/icons` — the Reltio custom icon set.
 *
 * Importing this subpath registers every `reltio/*` icon into UI5's global icon
 * registry as a side effect, making them usable by name in any UI5 `icon` prop
 * or in `<Icon name="reltio/…" />` from `@reltio/design/components`:
 *
 *     import "@reltio/design/icons";
 *     import { Icon } from "@reltio/design/components";
 *
 *     <Icon name="reltio/data-quality" />;
 *
 * The icon set is defined once in the repo-root `icons/` folder (generated from
 * `public/icons/` by `scripts/build-icons.mjs`); this file forwards that barrel
 * through to the published package.
 */
export * from "@/icons";
