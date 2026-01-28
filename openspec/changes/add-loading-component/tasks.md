# Tasks: Add Loading Component

## 1. Component Structure

- [ ] 1.1 Create `components/Loading/` folder structure
- [ ] 1.2 Create `Loading.types.ts` with TypeScript type definitions (using `type`, not `interface`)
- [ ] 1.3 Create `Loading.tsx` component implementation
- [ ] 1.4 Create `Loading.module.css` with CSS Modules and CSS custom properties
- [ ] 1.5 Create `index.ts` for public exports

## 2. Component Implementation

- [ ] 2.1 Implement loading GIF indicator
- [ ] 2.2 Support size prop (small, medium, large)
- [ ] 2.3 Support optional label prop for accessibility
- [ ] 2.4 Ensure GIF animation plays smoothly and performantly
- [ ] 2.5 Handle edge cases gracefully

## 3. Styling

- [ ] 3.1 Define CSS custom properties on `.root` class with `--reltio-loading-` prefix
- [ ] 3.2 Style GIF container
- [ ] 3.3 Style different sizes (small, medium, large)
- [ ] 3.4 Ensure all styles use CSS variables with fallback values
- [ ] 3.5 Use `classNames` utility for all className composition
- [ ] 3.6 Ensure GIF is visually distinct and clearly indicates loading state

## 4. Accessibility

- [ ] 4.1 Add aria-busy="true" attribute
- [ ] 4.2 Add aria-label attribute (from label prop or default)
- [ ] 4.3 Ensure loading state is announced to screen readers
- [ ] 4.4 Ensure GIF does not interfere with screen reader announcements
- [ ] 4.5 Ensure keyboard navigation works correctly if component is focusable

## 5. Storybook Documentation

- [ ] 5.1 Create `Loading.stories.tsx` with comprehensive stories
- [ ] 5.2 Story: Loading with small size
- [ ] 5.3 Story: Loading with medium size
- [ ] 5.4 Story: Loading with large size
- [ ] 5.5 Story: Loading with custom label
- [ ] 5.6 Story: Loading without label
- [ ] 5.7 Ensure each story shows ONE variant (per project conventions)
- [ ] 5.8 Add accessibility testing (a11y addon)

## 6. TypeScript and Validation

- [ ] 6.1 Ensure all props are properly typed
- [ ] 6.2 Export `LoadingProps` type alongside component
- [ ] 6.3 Type size prop (small | medium | large)
- [ ] 6.4 Type label prop (string, optional)
- [ ] 6.5 Run `npm run format` and fix formatting issues
- [ ] 6.6 Run `npm run lint` and fix linting errors
- [ ] 6.7 Verify TypeScript strict mode compliance

## 7. Testing

- [ ] 7.1 Verify component renders loading GIF correctly
- [ ] 7.2 Verify GIF animation plays smoothly
- [ ] 7.3 Verify different sizes display correctly
- [ ] 7.4 Verify label displays when provided
- [ ] 7.5 Verify default label when label prop not provided
- [ ] 7.6 Test accessibility with keyboard navigation
- [ ] 7.7 Test with screen reader (a11y addon)
- [ ] 7.8 Verify loading state is announced to screen readers
