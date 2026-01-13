# Design: Icon Library Architecture

## Context

The Reltio Design System needs a centralized icon and graphics library that serves multiple consumption patterns:
1. Direct URL access for documentation and external use
2. React component imports for application development
3. Storybook documentation for discovery and usage examples

This design addresses the technical decisions required to implement a scalable, maintainable icon system that follows project conventions.

## Goals / Non-Goals

### Goals
- Simple icon addition workflow: upload SVG → run script → done
- Dual access: public URL and React component import
- Full customization via CSS custom properties (size, color)
- Discoverable through Storybook with search and copy functionality
- Type-safe icon components with full TypeScript support
- Automated generation to minimize manual maintenance

### Non-Goals
- Icon editor or design tools (icons are designed externally)
- Icon sprites or symbol maps (each icon is standalone)
- Dynamic icon loading (all icons bundled at build time)
- Icon animation framework (use CSS animations externally if needed)

## Decisions

### Decision 1: Folder Structure

```
public/
└── icons/                    # Source SVG files (manually uploaded)
    ├── chevron-down.svg
    ├── close.svg
    ├── search.svg
    └── illustrations/        # Larger graphics for states
        ├── empty-state.svg
        ├── error-state.svg
        └── welcome.svg

icons/                        # Generated React components
├── Icon.types.ts            # Shared type definitions
├── Icon.module.css          # Shared styles
├── ChevronDown.tsx          # Generated component
├── ChevronDown.stories.tsx  # Generated stories
├── Close.tsx
├── Close.stories.tsx
├── index.ts                 # Barrel exports
└── IconLibrary.story.mdx    # Documentation page
```

**Rationale:**
- `public/icons/` keeps source SVGs accessible via direct URL (Storybook staticDirs already configured)
- Separate `icons/` folder for React components follows component-first architecture
- Flat structure for standard icons, subfolder for illustrations to organize larger graphics

### Decision 2: SVG to React Conversion

Use a custom Node.js script (`scripts/generate-icons.mjs`) instead of external tools like SVGR.

**Rationale:**
- Full control over generated output to match project conventions
- No additional dependencies
- Can generate stories and types alongside components
- Easy to customize template as requirements evolve

**Component Template:**
```tsx
import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const IconName = ({
  size = "medium",
  color = "inherited",
  className,
  "aria-label": ariaLabel,
  ...rest
}: IconProps) => {
  return (
    <svg
      className={classNames(styles.root, styles[size], styles[color], className)}
      viewBox="0 0 24 24"
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
      {...rest}
    >
      {/* SVG content */}
    </svg>
  );
};
```

### Decision 3: Icon Props and Customization

```typescript
type IconSize = "small" | "medium" | "large" | "xlarge";
type IconColor = "inherited" | "primary" | "secondary" | "success" | "warning" | "error";

type IconProps = {
  size?: IconSize;
  color?: IconColor;
  className?: string;
  style?: React.CSSProperties & {
    "--reltio-icon-size"?: string;
    "--reltio-icon-color"?: string;
  };
  "aria-label"?: string;
};
```

**CSS Custom Properties:**
```css
.root {
  --reltio-icon-size-small: 16px;
  --reltio-icon-size-medium: 24px;
  --reltio-icon-size-large: 32px;
  --reltio-icon-size-xlarge: 48px;
  --reltio-icon-color-inherited: currentColor;
  --reltio-icon-color-primary: var(--reltio-color-primary, #0066cc);
  /* ... */
  
  width: var(--reltio-icon-size, var(--reltio-icon-size-medium));
  height: var(--reltio-icon-size, var(--reltio-icon-size-medium));
  fill: var(--reltio-icon-color, currentColor);
}
```

**Rationale:**
- Matches Button component pattern for consistency
- CSS custom properties enable external customization
- Size presets cover common use cases
- Color options align with design system semantics

### Decision 4: Naming Conventions

- **SVG files:** kebab-case (e.g., `chevron-down.svg`, `arrow-right.svg`)
- **React components:** PascalCase derived from filename (e.g., `ChevronDown`, `ArrowRight`)
- **Illustrations:** Prefixed with context (e.g., `empty-state.svg` → `EmptyState`)

**Transformation rules:**
1. Remove `.svg` extension
2. Split by hyphens
3. Capitalize each word
4. Join without separator

### Decision 5: Storybook Icon Library Page

Interactive documentation page with:
1. **Grid View:** All icons displayed in a responsive grid
2. **Search:** Filter icons by name (case-insensitive)
3. **Copy Actions:** 
   - "Copy URL" → `/icons/icon-name.svg`
   - "Copy Import" → `import { IconName } from "@reltio/design/icons"`
4. **Navigation:** Each icon links to its individual story

**Implementation approach:**
- Use MDX page with custom React component for interactivity
- Read icon manifest (generated JSON file) for icon list
- Use clipboard API for copy functionality

### Decision 6: Package Exports

```json
{
  "exports": {
    ".": "./index.js",
    "./icons": "./icons/index.js",
    "./icons/*": "./icons/*.js"
  }
}
```

**Rationale:**
- Enables `import { ChevronDown } from "@reltio/design/icons"`
- Enables `import { ChevronDown } from "@reltio/design/icons/ChevronDown"` for tree-shaking
- Follows npm package best practices

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Manual SVG upload requires discipline | Icons may have inconsistent quality | Document SVG requirements (viewBox, no inline styles) |
| Generated code may drift from conventions | Technical debt | Include validation in generator script |
| Large icon set increases bundle size | Performance | Tree-shakable exports, consider lazy loading for illustrations |
| Search performance with many icons | UX | Client-side filter is sufficient for <500 icons |

## Migration Plan

1. **Phase 1:** Implement core infrastructure (no breaking changes)
2. **Phase 2:** Add sample icons and verify functionality
3. **Phase 3:** Document and announce availability
4. **Optional:** Migrate existing inline icons (like ChevronIcon) in future changes

## Open Questions

1. ~~Should we support icon sprites for performance?~~ **Decided: No, standalone icons for simplicity**
2. Should illustrations have different component interface (e.g., illustration-specific props)?
3. What is the minimum set of icons to include in initial release?
