## 1. Component Structure

- [x] 1.1 Create `components/Tabs/` directory
- [x] 1.2 Create `components/Tabs/Tabs.types.ts` with type definitions
- [x] 1.3 Create `components/Tabs/Tabs.tsx` with component implementation
- [x] 1.4 Create `components/Tabs/Tabs.module.css` with CSS Modules styles
- [x] 1.5 Create `components/Tabs/Tabs.stories.tsx` with Storybook stories
- [x] 1.6 Create `components/Tabs/Spec.story.mdx` linking to OpenSpec spec
- [x] 1.7 Create `components/Tabs/index.ts` with public exports

## 2. Core Implementation

- [x] 2.1 Define `TabItem` type with `value`, `label`, and optional `disabled` fields
- [x] 2.2 Define `TabsProps` type with `items`, `value`, `defaultValue`, `onChange`, `className`, `style`, and `aria-label`
- [x] 2.3 Implement controlled mode (value + onChange)
- [x] 2.4 Implement uncontrolled mode (defaultValue with internal state)
- [x] 2.5 Render tab list with `role="tablist"` and individual tabs with `role="tab"`
- [x] 2.6 Implement keyboard navigation (ArrowLeft, ArrowRight, Home, End)
- [x] 2.7 Manage `aria-selected`, `tabIndex`, and focus for roving tabindex pattern

## 3. Styling

- [x] 3.1 Define all CSS custom properties on `.root` with `--reltio-tabs-` prefix and fallback values
- [x] 3.2 Implement tab list layout with flexbox and bottom border via box-shadow
- [x] 3.3 Implement active indicator as `::after` pseudo-element with `scaleX` animation
- [x] 3.4 Style hover state with subtle background and text color transition
- [x] 3.5 Style focus-visible state with inset outline
- [x] 3.6 Style disabled state with reduced opacity and pointer-events none
- [x] 3.7 Use `classNames()` utility for all className composition

## 4. Documentation

- [x] 4.1 Create Default story showing basic tab usage
- [x] 4.2 Create Controlled story demonstrating value + onChange
- [x] 4.3 Create WithDisabledTab story showing disabled tab behavior
- [x] 4.4 Create ManyTabs story showing overflow behavior
- [x] 4.5 Create CustomStyled story demonstrating CSS variable overrides
- [x] 4.6 Create Spec.story.mdx linking to `openspec/specs/tabs-component/spec.md`

## 5. Verification

- [x] 5.1 Run `npm run format` to format code with Biome
- [x] 5.2 Run `npm run lint` and fix any issues (0 errors in Tabs files)
- [ ] 5.3 Verify all stories render correctly in Storybook
- [ ] 5.4 Verify keyboard navigation works (Tab, ArrowLeft, ArrowRight, Home, End)
- [ ] 5.5 Verify accessibility with Storybook a11y addon
