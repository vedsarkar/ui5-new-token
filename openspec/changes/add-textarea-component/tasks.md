# Tasks: Add TextArea Component

## 1. Component Structure Setup

- [ ] 1.1 Create `components/TextArea/` directory
- [ ] 1.2 Create `TextArea.types.ts` with TypeScript type definitions
- [ ] 1.3 Create `index.ts` with public exports

## 2. Core Implementation

- [ ] 2.1 Create `TextArea.tsx` with base component structure and forwardRef
- [ ] 2.2 Implement controlled value/onChange pattern with name prop support
- [ ] 2.3 Add floating label with animation
- [ ] 2.4 Add leading and trailing icon slots
- [ ] 2.5 Add toolbar slot
- [ ] 2.6 Implement error state with supporting text
- [ ] 2.7 Implement disabled state
- [ ] 2.8 Add submitOnEnter keyboard behavior
- [ ] 2.9 Add placeholder support

## 3. Styling (Material Design 3)

Reference: [M3 Text Fields](https://m3.material.io/components/text-fields/overview) - use outlined variant

- [ ] 3.1 Create `TextArea.module.css` with CSS custom properties on `.root`
- [ ] 3.2 Define all `--reltio-textarea-*` CSS variables with fallbacks
- [ ] 3.3 Implement M3 outlined text field border (1px default, 2px on focus)
- [ ] 3.4 Implement floating label animation styles (M3 style)
- [ ] 3.5 Implement focus state (primary color border and label)
- [ ] 3.6 Implement error state styles (error color border and label)
- [ ] 3.7 Implement disabled state styles (reduced opacity)
- [ ] 3.8 Add responsive padding adjustments
- [ ] 3.9 Implement auto-resize (field-sizing: content)

## 4. Accessibility

- [ ] 4.1 Add proper label-textarea association
- [ ] 4.2 Add aria-invalid for error state
- [ ] 4.3 Add aria-describedby for supporting text
- [ ] 4.4 Ensure keyboard navigation works
- [ ] 4.5 Test focus-visible styling

## 5. Storybook Documentation

- [ ] 5.1 Create `TextArea.stories.tsx` with meta configuration
- [ ] 5.2 Add Default story (basic usage)
- [ ] 5.3 Add WithLabel story (floating label)
- [ ] 5.4 Add WithPlaceholder story
- [ ] 5.5 Add WithLeadingIcon story
- [ ] 5.6 Add WithTrailingIcon story
- [ ] 5.7 Add WithToolbar story
- [ ] 5.8 Add WithError story
- [ ] 5.9 Add Disabled story
- [ ] 5.10 Add WithSupportingText story
- [ ] 5.11 Add SubmitOnEnter story
- [ ] 5.12 Add AutoResize story
- [ ] 5.13 Add WithCustomCssVariables story

## 6. Integration

- [ ] 6.1 Export TextArea from `components/index.ts`
- [ ] 6.2 Verify Storybook renders correctly (`npm run dev`)
- [ ] 6.3 Run linting (`npm run lint`)
- [ ] 6.4 Run formatting (`npm run format`)

## Dependencies

- Tasks 2.x depend on 1.x completion
- Tasks 3.x can be done in parallel with 2.x
- Tasks 4.x depend on 2.x and 3.x completion
- Tasks 5.x depend on 2.x, 3.x, and 4.x completion
- Tasks 6.x depend on all previous tasks
