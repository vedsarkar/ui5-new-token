## Approach

The Reltio `ShellBar` wrapper adds exactly one Reltio behavior on top of UI5 ShellBar: a sensible default Reltio brand mark in the left `branding` slot that adapts to the active theme. Everything else is pass-through.

> **Why the `branding` slot, not `logo`?** In UI5 2.21+ the legacy `logo` slot was repositioned to the right side of the bar (near the profile). The new `branding` slot (since `@ui5/webcomponents-fiori` v2.12, marked `@experimental`) is the canonical left brand mark. The Reltio default targets `branding`; the `logo` slot remains available as a regular UI5 pass-through prop.

## File layout

```
components/ShellBar/
├── ShellBar.tsx           # implementation with default-branding logic
├── ShellBar.types.ts      # ShellBarProps = Omit<Ui5ShellBarProps, "branding"> & { branding?, "data-test-id"? }
├── ShellBar.module.css    # picture/img sizing rules
├── ShellBar.stories.tsx   # default light, default dark, custom branding, minimal
├── assets/
│   ├── ReltioLogo.light.svg
│   └── ReltioLogo.dark.svg
├── README.md
└── index.ts
```

## Asset import

The two SVGs are copied from `admin-tools/public/`. They are imported via Vite's URL pipeline so the bundler emits them as static assets and we get a URL at runtime:

```ts
import lightLogoUrl from "./assets/ReltioLogo.light.svg";
import darkLogoUrl from "./assets/ReltioLogo.dark.svg";
```

(For Storybook + the consumer build, Vite resolves these to `?url` automatically.)

## Theme-aware default branding

The default branding is rendered as a `<ShellBarBranding>` element wrapping a `<picture>` with two layered `<img>` elements (light + dark). CSS hides the wrong one based on the closest `[data-theme]` ancestor — no JavaScript, no theme observer.

Two approaches were considered:

1. **CSS media query** — `<source media="(prefers-color-scheme: dark)" />`. Simple, but follows the user's OS preference, not the Reltio `data-theme` attribute. WRONG.
2. **`data-theme` attribute selector** — pure CSS rule (`[data-theme="horizon-dark"] .lightLogo { display: none }`) that switches visibility based on the ancestor attribute.

Approach (1) is wrong because Reltio's theme is controlled by the app, not the OS. Approach (2) is chosen:

```tsx
const defaultReltioBranding = (
  <ShellBarBranding accessibleName="Reltio">
    <picture slot="logo" className={styles.logo}>
      <img className={styles.lightLogo} src={lightLogoUrl} alt="Reltio" height={15} />
      <img className={styles.darkLogo} src={darkLogoUrl} alt="" aria-hidden="true" height={15} />
    </picture>
  </ShellBarBranding>
);
```

```css
.lightLogo { display: block; }
.darkLogo { display: none; }
:global([data-theme="horizon-dark"]) .lightLogo { display: none; }
:global([data-theme="horizon-dark"]) .darkLogo { display: block; }
```

This is zero-JS, survives nested theming subtrees, and re-resolves on every cascade change.

> **Important — pass the default as a JSX element literal, not a function component.** UI5 React clones the `branding` child to inject `slot="branding"` on the host element. Cloning is silently dropped if the child is a custom function component, which causes UI5 to fall back to `slot="default-1"` and the mark renders as a regular child (on the right side). The default must therefore be declared as a stable JSX element at module scope, e.g. `const defaultReltioBranding = <ShellBarBranding>...</ShellBarBranding>;`.

## API

```ts
import type { ShellBar as Ui5ShellBar } from "@ui5/webcomponents-react/ShellBar";
import type { ComponentPropsWithoutRef, ReactElement } from "react";

type Ui5ShellBarProps = ComponentPropsWithoutRef<typeof Ui5ShellBar>;

export type ShellBarProps = Omit<Ui5ShellBarProps, "branding"> & {
  /**
   * Override the default Reltio branding (left brand mark + optional title).
   * Must be a `<ShellBarBranding>` element. Primitive values (string, null)
   * are silently discarded by UI5's slot validation.
   */
  branding?: ReactElement;
  /** Forwarded to the rendered host element for Playwright test selection. */
  "data-test-id"?: string;
};
```

Implementation:

```tsx
export const ShellBar = ({
  branding,
  "data-test-id": testId,
  className,
  ...rest
}: ShellBarProps) => (
  <Ui5ShellBar
    data-test-id={testId}
    branding={asBrandingSlot(branding ?? defaultReltioBranding)}
    className={classNames(styles.root, className)}
    {...rest}
  />
);
```

## data-test-id forwarding

Pattern A — host attribute spread. UI5 ShellBar host element is in the light DOM and forwards arbitrary attributes (verified via the rendered DOM).

## Edge cases

- **Sub-app override.** When a sub-app passes `branding={<ShellBarBranding><img slot="logo" src="/my-app/logo.svg" /></ShellBarBranding>}`, the default is bypassed entirely. No automatic light/dark for the override (sub-app's responsibility).
- **No theme set.** If `data-theme` is missing on every ancestor, the light variant renders (CSS default `display: block` on `.lightLogo`).
- **Nested themes.** A `<div data-theme="horizon-dark">` containing a ShellBar correctly shows the dark variant even when the document root is `horizon-light`.
- **Experimental upstream slot.** The `branding` slot and `ShellBarBranding` are marked `@experimental` in `@ui5/webcomponents-fiori`. SAP may change them. The CoE pins UI5 versions and tests every release; the consumer-facing API stays stable in practice, but the underlying implementation may need to follow upstream changes.

## Out of scope

- Resizing the brand mark for compact toolbars (UI5 ShellBar controls vertical rhythm).
- A non-Reltio default for partner products (a separate `PartnerShellBar` could exist later).
- Branding theming via `--sap*` tokens (Reltio mark uses fixed brand colors).
