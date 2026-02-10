# Tasks: Add Loading Component

## 1. Component Structure

- [x] 1.1 Create `components/Loading/` folder structure
- [x] 1.2 Create `Loading.types.ts` with TypeScript type definitions (using `type`, not `interface`)
- [x] 1.3 Create `Loading.tsx` component implementation
- [x] 1.4 Create `Loading.module.css` with CSS Modules and CSS custom properties
- [x] 1.5 Create `index.ts` for public exports

## 2. Component Implementation

- [x] 2.1 Implement loading GIF indicator
- [x] 2.2 Support size prop (small, medium, large)
- [x] 2.3 Support optional label prop for accessibility
- [x] 2.4 Ensure GIF animation plays smoothly and performantly
- [x] 2.5 Handle edge cases gracefully

## 3. Styling

- [x] 3.1 Define CSS custom properties on `.root` class with `--reltio-loading-` prefix
- [x] 3.2 Style GIF container
- [x] 3.3 Style different sizes (small, medium, large)
- [x] 3.4 Ensure all styles use CSS variables with fallback values
- [x] 3.5 Use `classNames` utility for all className composition
- [x] 3.6 Ensure GIF is visually distinct and clearly indicates loading state

## 4. Accessibility

- [x] 4.1 Add aria-busy="true" attribute
- [x] 4.2 Add aria-label attribute (from label prop or default)
- [x] 4.3 Ensure loading state is announced to screen readers
- [x] 4.4 Ensure GIF does not interfere with screen reader announcements
- [x] 4.5 Ensure keyboard navigation works correctly if component is focusable

## 5. Storybook Documentation

- [x] 5.1 Create `Loading.stories.tsx` with comprehensive stories
- [x] 5.2 Story: Loading with small size
- [x] 5.3 Story: Loading with medium size
- [x] 5.4 Story: Loading with large size
- [x] 5.5 Story: Loading with custom label
- [x] 5.6 Story: Loading without label
- [x] 5.7 Ensure each story shows ONE variant (per project conventions)
- [x] 5.8 Add accessibility testing (a11y addon)

## 6. TypeScript and Validation

- [x] 6.1 Ensure all props are properly typed
- [x] 6.2 Export `LoadingProps` type alongside component
- [x] 6.3 Type size prop (small | medium | large)
- [x] 6.4 Type label prop (string, optional)
- [x] 6.5 Run `npm run format` and fix formatting issues
- [x] 6.6 Run `npm run lint` and fix linting errors
- [x] 6.7 Verify TypeScript strict mode compliance

## 7. Testing

- [x] 7.1 Verify component renders loading GIF correctly
- [x] 7.2 Verify GIF animation plays smoothly
- [x] 7.3 Verify different sizes display correctly
- [x] 7.4 Verify label displays when provided
- [x] 7.5 Verify default label when label prop not provided
- [x] 7.6 Test accessibility with keyboard navigation
- [x] 7.7 Test with screen reader (a11y addon)
- [x] 7.8 Verify loading state is announced to screen readers
