# Component Development Guidelines

This directory contains **Reltio-specific** components — MDM business components and primitives built on top of [`@ui5/webcomponents-react`](https://sap.github.io/ui5-webcomponents-react/). It is not a duplicate of UI5: every component here either composes several UI5 parts with MDM business logic, or fills a primitive gap that UI5 does not cover.

> **Compose, don't reinvent.** If UI5 already ships a component that fits the design, use it directly. Wrap only when there is real Reltio-specific value to add.

## When to build a Reltio component vs. use UI5 directly

Walk through the decision tree before creating anything new under this folder:

```
Does @ui5/webcomponents-react already ship a component that fits the design?
├── Yes → Import it directly. Do NOT wrap.
│         e.g. import { Button } from "@ui5/webcomponents-react/Button";
│
└── No → Do you need to compose several UI5 components with Reltio business logic
         (entity profile, match group, source priority, MDM workflow ...)?
         ├── Yes → Build a Reltio business component here.
         │
         └── No → Is it a product-agnostic primitive that UI5 simply does not provide?
                  ├── Yes → Build a Reltio primitive here.
                  │
                  └── No → You probably don't need a new component.
```

### Restyling is NOT a reason to wrap

If your only goal is to change colors, spacing, or shape of a UI5 component, do it through:

1. **`--sap*` design tokens** scoped to a parent class — UI5 reads them through Shadow DOM automatically.
2. **CSS Parts (`::part()`)** for fine-grained tweaks no token covers.

Do not create a Reltio wrapper just for visual changes.

## Component Structure

Every Reltio component MUST follow this mandatory pattern:

```
components/ComponentName/
├── ComponentName.tsx          # React component implementation
├── ComponentName.types.ts     # TypeScript types (REQUIRED)
├── ComponentName.module.css   # Scoped styles
├── ComponentName.stories.tsx  # Documentation & tests
└── index.ts                   # Public API
```

### Documentation-only directories (exception)

A directory under `components/` may contain **only** a `*.stories.tsx` file (no `.tsx`, `.types.ts`, `.module.css`, or `index.ts`) when its sole purpose is to document the recommended way to consume a native UI5 component directly — without authoring any Reltio code. The stories file imports the component straight from `@ui5/webcomponents-react`, and the directory name simply provides a stable Storybook navigation path.

```
components/ProductSwitch/
└── ProductSwitch.stories.tsx  # Documents native UI5 ProductSwitch
```

Use this exception only for documentation. As soon as any custom logic, types, or styles are introduced, the directory must follow the full structure above.

## Component Standards

### Public API (CRITICAL)

Always import components via their `index.ts` (Public API). Direct imports of internal files (`.tsx`, `.types.ts`, `.module.css`) from outside the component folder are **strictly forbidden**.

**Good:**
```typescript
import { Chat } from "@/components/Chat";
import { Button } from "@ui5/webcomponents-react/Button";
```

**Bad:**
```typescript
import { Chat } from "@/components/Chat/Chat";
import type { ChatProps } from "@/components/Chat/Chat.types";
```

### CSS Styling

#### Reltio components

**External customization** is done through stable CSS classes (e.g. `.reltio_Chat_root`), NOT through component-level CSS custom properties. The `classNames()` utility automatically generates these stable, prefixed selectors on every rendered element. See the [Component Customization guide](/?path=/docs/guides-component-customization--docs) for details.

**Colors** — always reference SAP Horizon `--sap*` tokens declared on `:root` by `https://reltio.design/variables.css` (and overridden under each `[data-theme]`). Never hardcode hex color values in component CSS. The full token surface is browseable in Storybook → Design Tokens; canonical semantic guidance lives at <https://www.sap.com/design-system/>.

**Typography, spacing, sizing** — use plain values directly (e.g. `font-size: 14px`, `padding: 8px 16px`). There are no global tokens for these.

**CSS custom properties** — almost never needed in component CSS. Do NOT create component-level variables as a customization API. Prefer direct CSS property overrides.

**When a variable seems useful but isn't:** If the variable is set and consumed on the **same element**, a property override is always simpler — even when variants reassign it:

```css
/* ❌ BAD — variable adds indirection for no benefit */
.root { --chip-height: 32px; height: var(--chip-height); }
.small { --chip-height: 26px; }

/* ✅ GOOD — direct property override */
.root { height: 32px; }
.small { height: 26px; }
```

```css
/* ❌ BAD — background variable set and consumed on .root */
.root { --chip-bg: var(--sapButton_Lite_Background); background: var(--chip-bg); }
.filled.primary { --chip-bg: var(--sapButton_Emphasized_Background); }

/* ✅ GOOD — variants override the property directly */
.root { background: var(--sapButton_Lite_Background); }
.filled.primary { background: var(--sapButton_Emphasized_Background); }
```

**The only valid case** for a CSS variable is when a parent sets a value that **cascades to multiple child elements** via the DOM:

```css
/* ✅ GOOD — parent value cascades to two different children */
.root { --icon-size: 18px; }
.small { --icon-size: 16px; }
.leadingIcon { width: var(--icon-size); height: var(--icon-size); }
.removeButton { width: var(--icon-size); height: var(--icon-size); }
```

Even then, consider whether compound selectors (`.small .leadingIcon`) are simpler:

```css
/* Also fine — explicit and easy to understand */
.leadingIcon { width: 18px; height: 18px; }
.small .leadingIcon { width: 16px; height: 16px; }
.removeButton { width: 18px; height: 18px; }
.small .removeButton { width: 16px; height: 16px; }
```

**Rule of thumb:** Default to no variables. Only introduce one when it demonstrably reduces repetition across multiple child selectors and the direct approach is clearly worse.

**Encapsulation — internal CSS variables must never leak:**

When a component uses an internal CSS variable (e.g. for a dynamic prop that cascades to pseudo-elements), the component MUST always set that variable explicitly on its root element — including the default value. This creates a hard boundary that prevents any ancestor or global variable with the same name from leaking in.

The only CSS variables a component may consume from outside are the SAP Horizon `--sap*` tokens declared on `:root` by `https://reltio.design/variables.css`. All other customization goes through **React props** and **stable CSS classes**.

```tsx
/* ✅ GOOD — variable always set on root, no external leak possible */
const rootStyle = {
  ...style,
  "--size": size ?? "32px",
} as React.CSSProperties;

<div style={rootStyle}>...</div>
```

```tsx
/* ❌ BAD — variable set only when prop is provided; fallback in CSS can pick up ancestor values */
const rootStyle = size
  ? { ...style, "--size": size }
  : style;
```

If the dynamic value only affects regular DOM elements (no pseudo-elements), prefer inline styles directly — no CSS variable needed at all:

```tsx
/* ✅ GOOD — inline style, fully encapsulated, no variable */
<div style={size ? { height: size } : undefined} />
```

**Responsive / media queries** — do NOT add `@media` queries or mobile-specific styles to component CSS. Responsive design guidelines will be developed separately. For now, components target desktop viewports only.

#### UI5 web components

UI5 components live in Shadow DOM, so regular CSS selectors do not reach their internals. Two mechanisms are available:

1. **`--sap*` design tokens** — UI5 reads them directly from the document `:root` and the active `[data-theme]` subtree. Changing a token at any level re-themes every UI5 component beneath it. This is the **preferred** way to restyle UI5.
2. **CSS Parts (`::part()`)** — UI5 components expose a stable set of named parts (e.g. `ui5-button::part(button)`, `ui5-input::part(content)`). Use them for fine-grained tweaks that no token covers.

```css
/* Preferred — token override scoped to a subtree */
.toolbar {
  --sapButton_Background: var(--sapButton_Lite_Background);
  --sapButton_BorderColor: transparent;
}

/* Fallback — CSS Part for a tweak no token covers */
.toolbar ui5-button::part(button) {
  border-radius: 999px;
}
```

When a Reltio component embeds UI5 internally, prefer scoping these overrides to the component's own root class so they do not bleed out.

### TypeScript Types (`.types.ts`)

**`HtmlProps<Tag, CustomProps>` utility** — the standard way to type props for components that render a native HTML element. Import from `@/utils/types`. It combines custom props with native HTML element attributes, automatically omitting native props that overlap with custom ones. This ensures custom props appear in Storybook's Props table without manual `Omit`:

```typescript
import type { HtmlProps } from "@/utils/types";

export type ChipProps = HtmlProps<"button", {
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  onClick?: () => void;
}>;
```

**Rules:**
1. Components with a **native HTML wrapper** MUST use `HtmlProps<Tag, CustomProps>` (or bare `React.ComponentPropsWithoutRef<"tag">` for pure pass-through with no custom props)
2. All rest props (`...rest`) MUST be spread onto the wrapper element
3. Do NOT redeclare native props (`className`, `style`, etc.) in custom props — they are inherited automatically
4. Only declare a native prop in custom props when the component changes its type or semantics (e.g. `children: string` instead of `ReactNode`, or `open?: boolean` that needs Storybook visibility)
5. Use `React.ComponentPropsWithoutRef` (not `ComponentProps`) — refs are handled via `React.forwardRef` when needed

**Removing native props** the component doesn't support — wrap with `Omit`:

```typescript
export type SkeletonProps = Omit<HtmlProps<"div", {
  rows?: number;
  size?: string;
}>, "children">;
```

**Polymorphic components** (e.g. a button that renders as `<button>` or `<a>`) use a discriminated union with `HtmlProps` per branch:

```typescript
type LinkButtonBase = {
  variant?: "filled" | "outlined";
  size?: "small" | "medium";
};

type AsButton = HtmlProps<"button", LinkButtonBase & {
  href?: never;
  type?: "button" | "submit" | "reset";
}>;

type AsAnchor = HtmlProps<"a", LinkButtonBase & {
  href: string;
}>;

export type LinkButtonProps = AsButton | AsAnchor;
```

#### Wrapping a UI5 component

When a Reltio component's root is a UI5 component instead of a plain HTML tag, derive the prop type from the UI5 component itself. This keeps the wrapper aligned with UI5's evolving API:

```typescript
import type { ComponentPropsWithoutRef } from "react";
import type { Button } from "@ui5/webcomponents-react/Button";

type Ui5ButtonProps = ComponentPropsWithoutRef<typeof Button>;

export type SaveEntityButtonProps = Omit<Ui5ButtonProps, "design" | "onClick"> & {
  entityId: string;
  onSaved?: (entityId: string) => void;
};
```

Spread the rest onto the UI5 root and forward `className` so external customization still works:

```tsx
import { Button } from "@ui5/webcomponents-react/Button";
import { classNames } from "@/utils/classNames";
import styles from "./SaveEntityButton.module.css";
import type { SaveEntityButtonProps } from "./SaveEntityButton.types";

export const SaveEntityButton = ({
  entityId,
  onSaved,
  className,
  ...rest
}: SaveEntityButtonProps) => {
  return (
    <Button
      design="Emphasized"
      className={classNames(styles.root, className)}
      onClick={() => onSaved?.(entityId)}
      {...rest}
    />
  );
};
```

### Storybook Stories

Every component's stories file MUST import the CSS module and pass it via `parameters.cssClasses`. This enables the CSS Classes documentation table on the component's docs page.

**Free-form props** (arbitrary strings, numbers, CSS values) need only ONE story demonstrating usage — do NOT create multiple stories for different values of the same prop. Multiple stories are for **enum-like variants** where each value is a distinct visual state worth snapshot-testing.

```tsx
import cssClasses from "./MyComponent.module.css";

const meta = preview.meta({
  component: MyComponent,
  parameters: {
    cssClasses,
  },
});
```

## Creating a New Component

1. Confirm UI5 does not already cover the use case (`@ui5/webcomponents-react` docs, Reltio Design MCP `list-all-documentation`)
2. Start with `/opsx:new` to create a change and build artifacts step by step
3. Use `/opsx:continue` to create each artifact (proposal → specs → design → tasks)
4. Review each artifact before proceeding to the next
5. Run `/opsx:apply` to implement the component following all standards
6. Use the mandatory folder structure above
7. Create comprehensive [Storybook stories](/?path=/docs/guides-writing-storybook-stories--docs) with `cssClasses` parameter
8. Run `npm run format` and ensure `npm run lint` passes
9. Export only the public API through `index.ts`
10. Archive the change with `/opsx:archive` after deployment

> See full development workflow: [Spec-Driven Development Guide](/?path=/docs/guides-spec-driven-development--docs)
