# Button Component Design

## Context

The Button component is a foundational UI element used throughout the Reltio Design System. It must be flexible enough to support various use cases while maintaining consistency, accessibility, and adherence to the design system constitution.

**Key Constraints:**
- Must follow Reltio Design System constitution principles (non-negotiable)
- Must support both button and link semantics
- Must be fully accessible (WCAG 2.1 Level AA)
- Must support external customization without breaking encapsulation
- Must work in modern evergreen browsers only (no IE11)

**Stakeholders:**
- Design system developers (primary maintainers)
- Product developers (consumers of the component)
- End users (accessibility and usability)
- Design team (visual consistency)

## Goals / Non-Goals

**Goals:**
- Create a universal button component that covers 95% of button use cases
- Ensure full keyboard and screen reader accessibility
- Enable external customization via CSS custom properties
- Maintain type safety with strict TypeScript
- Provide comprehensive Storybook documentation
- Support polymorphic rendering (button vs anchor)

**Non-Goals:**
- Support for icon-only buttons without accessibility considerations (must have aria-label)
- Support for deprecated HTML attributes (align, bgcolor, etc.)
- Support for IE11 or other legacy browsers
- Built-in loading/spinner states (can be composed externally)
- Built-in tooltip functionality (should be composed with separate Tooltip component)

## Decisions

### Decision: Polymorphic Button vs Anchor Rendering

**Choice:** Use conditional rendering based on `href` prop to render either `<button>` or `<a>` element.

**Rationale:**
- Semantic HTML: Links should use `<a>`, actions should use `<button>`
- Better accessibility: Screen readers can differentiate between navigation and actions
- SEO benefits: Search engines understand link vs button semantics
- Native browser behavior: Links support right-click "Open in new tab", buttons submit forms

**Alternatives Considered:**
1. **Always use `<button>` with click handler for navigation:**
   - ❌ Breaks semantic HTML
   - ❌ Poor accessibility for screen readers
   - ❌ No SEO benefits
   - ❌ No native link behaviors (right-click, cmd+click)

2. **Use polymorphic `as` prop for element type:**
   - ❌ More complex API
   - ❌ Developer must remember to use correct element type
   - ❌ Easy to misuse (render as `<div>` for example)
   - ✅ More flexible for edge cases

3. **Create separate `Button` and `LinkButton` components:**
   - ❌ Code duplication
   - ❌ Inconsistent styling between components
   - ❌ Confusion about when to use which component
   - ✅ Clearer API

**Decision:** Option 1 (conditional rendering based on `href`) provides the best balance of semantic HTML, accessibility, and developer experience with minimal API complexity.

### Decision: CSS Modules + CSS Custom Properties

**Choice:** Use CSS Modules for scoped styles, with all design tokens exposed as CSS custom properties on the `.root` class.

**Rationale:**
- Constitution requirement (Principles IV & IX)
- CSS Modules prevent style conflicts
- CSS custom properties enable external customization
- Consumers can customize without !important or deep selectors
- Style props pattern: `<Button style={{ "--reltio-button-color": "red" }}>`

**Implementation:**
```css
.root {
  --reltio-button-color-primary: var(--reltio-color-primary, #0000cc);
  --reltio-button-height-medium: var(--reltio-spacing-2xl, 40px);
  /* ... all other tokens ... */

  /* Use only variables in styles */
  height: var(--reltio-button-height-medium);
  color: var(--reltio-button-color-primary);
}
```

### Decision: classNames Utility for Class Composition

**Choice:** Use custom `classNames` utility that automatically adds base classes for BEM-like naming.

**Rationale:**
- Constitution requirement (Principle VIII)
- Provides stable class names without CSS Modules hash suffixes
- External developers can target `.button__icon` without knowing hash
- Automatic deduplication and falsy value filtering

**Example:**
```tsx
// Input
classNames(styles.root, styles.filled, disabled && styles.disabled)

// Output (without utility)
"Button_root__a1b2c Button_filled__d3e4f"

// Output (with utility)
"Button Button_root__a1b2c Button_filled__d3e4f Button_disabled__g5h6i"
```

### Decision: TypeScript Types in Separate File

**Choice:** All TypeScript types defined in `Button.types.ts` using `type` keyword (not `interface`).

**Rationale:**
- Constitution requirement (Principles X & XI)
- Consistent pattern across all components
- Separates concerns (types vs implementation)
- Easier to find and maintain types
- `type` provides better flexibility for unions, intersections, and mapped types

**Type Structure:**
```typescript
// Button.types.ts
export type ButtonVariant = "filled" | "outlined" | "text";
export type ButtonColor = "primary" | "inherited";
export type ButtonSize = "small" | "medium" | "large";

type BaseButtonProps = { /* shared props */ };
type ButtonElementProps = BaseButtonProps & { href?: never; type?: "button" | "submit" | "reset" };
type AnchorElementProps = BaseButtonProps & { href: string; type?: never };

export type ButtonProps = (ButtonElementProps | AnchorElementProps) & /* HTML attributes */;
```

### Decision: Automatic Focus Removal on Disable

**Choice:** Use `useEffect` to automatically blur button when it becomes disabled.

**Rationale:**
- Better UX: Prevents confusion when focused element becomes disabled
- Accessibility: Screen readers won't remain on disabled element
- Native-like behavior: Mimics how native controls behave in forms

**Implementation:**
```tsx
useEffect(() => {
  if (disabled && buttonRef.current && document.activeElement === buttonRef.current) {
    buttonRef.current.blur();
  }
}, [disabled]);
```

**Alternative Considered:**
- Let button remain focused when disabled
- ❌ Confusing for keyboard users
- ❌ Screen reader users may not realize element is disabled

### Decision: Keyboard Event Handling for Anchors

**Choice:** Add custom keyboard handlers for anchor elements to support Space key activation.

**Rationale:**
- Native anchors only activate on Enter, not Space
- Buttons activate on both Enter and Space
- For consistency, button-styled anchors should behave like buttons
- Prevents page scroll when Space is pressed

**Implementation:**
```tsx
const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
  if (!isInteractive) return;

  if (event.key === "Enter" || event.key === " ") {
    if (event.key === " ") {
      event.preventDefault(); // Prevent scroll
    }
    // Trigger action
  }
};
```

### Decision: Single Variant Per Storybook Story

**Choice:** Each Storybook story shows only ONE variant of the button.

**Rationale:**
- Constitution requirement (Principle III)
- Better visual regression testing isolation
- Clearer documentation (one concept per story)
- Easier to identify which variant has visual regression
- Chromatic snapshots are more focused

**Anti-Pattern (Don't Do):**
```tsx
// ❌ Don't create "all variants" stories
export const AllVariants = () => (
  <>
    <Button variant="filled">Filled</Button>
    <Button variant="outlined">Outlined</Button>
    <Button variant="text">Text</Button>
  </>
);
```

**Correct Pattern:**
```tsx
// ✅ Separate story for each variant
export const Filled: Story = {
  args: { variant: "filled", children: "Filled Button" }
};

export const Outlined: Story = {
  args: { variant: "outlined", children: "Outlined Button" }
};
```

## Risks / Trade-offs

### Risk: CSS Custom Properties Browser Support

**Risk:** CSS custom properties not supported in IE11.

**Mitigation:**
- Project explicitly does not support IE11 (documented in constitution)
- All target browsers (Chrome, Firefox, Safari, Edge) support CSS custom properties
- Browser support requirement documented in spec

**Trade-off:** Cannot support IE11, but enables powerful customization pattern.

### Risk: Polymorphic Types Complexity

**Risk:** Union types for button vs anchor may confuse developers.

**Mitigation:**
- Comprehensive TypeScript types prevent incorrect usage
- Good JSDoc comments explain when to use href
- Storybook examples show both button and link usage
- TypeScript will catch invalid prop combinations at compile time

**Trade-off:** Slightly complex types, but much better type safety and DX.

### Risk: Custom Keyboard Handling for Anchors

**Risk:** Custom Space key handling might conflict with native browser behavior.

**Mitigation:**
- Only add custom handling when element is interactive (not disabled)
- Prevent default on Space to avoid page scroll
- Test across all target browsers
- Follow ARIA authoring practices guide

**Trade-off:** Small amount of custom behavior, but provides consistent UX.

### Risk: CSS Modules Hash Instability

**Risk:** CSS Modules generates different hashes in different builds, making external targeting difficult.

**Mitigation:**
- Use `classNames` utility to add stable base classes
- External developers can target `.Button__icon` (stable) instead of `.Button_icon__a1b2c` (unstable)
- Document this pattern in component documentation

**Trade-off:** Slightly larger className strings, but enables external customization.

## Migration Plan

**N/A** - This is the initial specification for the existing Button component. No migration is needed as component is already implemented and follows all constitution principles.

## Open Questions

None - all design decisions have been resolved and implemented.
