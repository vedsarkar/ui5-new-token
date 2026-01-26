# Tasks: Add TextArea Component

## 1. Component Structure Setup

- [x] 1.1 Create `components/TextArea/` directory
- [x] 1.2 Create `TextArea.types.ts` with TypeScript type definitions (extends React.TextareaHTMLAttributes)
- [x] 1.3 Create `index.ts` with public exports

## 2. Core Implementation

- [x] 2.1 Create `TextArea.tsx` with base component structure and forwardRef
- [x] 2.2 Implement native props passthrough (spread all non-custom props to textarea)
- [x] 2.3 Add floating label with animation (label prop)
- [x] 2.4 Add toolbar slot (toolbar prop)
- [x] 2.5 Implement error state with boolean (error prop)
- [x] 2.6 Implement supporting text display (supportingText prop)
- [x] 2.7 Handle disabled state via native passthrough

## 3. Styling (Material Design 3)

Reference: [M3 Text Fields](https://m3.material.io/components/text-fields/overview) - use outlined variant

- [x] 3.1 Create `TextArea.module.css` with CSS custom properties on `.root`
- [x] 3.2 Define all `--reltio-textarea-*` CSS variables with fallbacks (no hardcoded tokens)
- [x] 3.3 Implement M3 outlined text field border (1px default, 2px on focus)
- [x] 3.4 Implement floating label animation styles (M3 style)
- [x] 3.5 Implement focus state (primary color border and label)
- [x] 3.6 Implement error state styles (error color border, label, and supporting text)
- [x] 3.7 Implement disabled state styles (reduced opacity)
- [x] 3.8 Implement auto-resize (field-sizing: content) with min/max height CSS variables

## 4. Accessibility

- [x] 4.1 Add proper label-textarea association
- [x] 4.2 Add aria-invalid for error state
- [x] 4.3 Add aria-describedby for supporting text
- [x] 4.4 Ensure keyboard navigation works
- [x] 4.5 Test focus-visible styling

## 5. Storybook Documentation

- [x] 5.1 Create `TextArea.stories.tsx` with meta configuration
- [x] 5.2 Add Default story (basic usage)
- [x] 5.3 Add WithLabel story (floating label)
- [x] 5.4 Add WithPlaceholder story (native placeholder fallback)
- [x] 5.5 Add WithToolbar story
- [x] 5.6 Add WithError story (error state with supportingText)
- [x] 5.7 Add Disabled story
- [x] 5.8 Add WithSupportingText story
- [x] 5.9 Add AutoResize story
- [x] 5.10 Add WithCustomCssVariables story

## 6. Integration

- [x] 6.1 Export TextArea from `components/index.ts`
- [x] 6.2 Verify Storybook renders correctly (`npm run dev`)
- [x] 6.3 Run linting (`npm run lint`)
- [x] 6.4 Run formatting (`npm run format`)

## Dependencies

- Tasks 2.x depend on 1.x completion
- Tasks 3.x can be done in parallel with 2.x
- Tasks 4.x depend on 2.x and 3.x completion
- Tasks 5.x depend on 2.x, 3.x, and 4.x completion
- Tasks 6.x depend on all previous tasks
