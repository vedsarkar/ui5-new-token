# Tasks: Add Skeleton Component

## 1. Component Structure

- [x] 1.1 Create `components/Skeleton/` folder structure
- [x] 1.2 Create `Skeleton.types.ts` with TypeScript type definitions (using `type`, not `interface`)
- [x] 1.3 Create `Skeleton.tsx` component implementation
- [x] 1.4 Create `Skeleton.module.css` with CSS Modules and CSS custom properties
- [x] 1.5 Create `index.ts` for public exports

## 2. Component Implementation

- [x] 2.1 Accept `rows` prop and render that many placeholder bars
- [x] 2.2 Accept `size` prop (number) and pass to styles (affects line height and line gap)
- [x] 2.3 Implement full-width layout (Skeleton container width 100%)
- [x] 2.4 Apply shimmer (moving gradient) animation to each placeholder bar
- [x] 2.5 Handle edge cases (e.g. rows &lt; 1, non-numeric)

## 3. Styling

- [x] 3.1 Define CSS custom properties on `.root` with `--reltio-skeleton-` prefix
- [x] 3.2 Use `size` (number) to set row-height and row-gap via CSS variables
- [x] 3.3 Style placeholder bars (rectangular shape, spacing between rows)
- [x] 3.4 Implement shimmer animation via CSS (gradient keyframes)
- [x] 3.5 Ensure all styles use CSS variables with fallback values
- [x] 3.6 Use `classNames` utility for all className composition
- [x] 3.7 Ensure Skeleton root has width 100%

## 4. Accessibility

- [x] 4.1 Add aria-busy="true" when used as loading placeholder
- [x] 4.2 Add aria-label (or default) so screen readers announce loading placeholder
- [x] 4.3 Ensure decorative animation does not interfere with screen readers
- [x] 4.4 Verify a11y addon passes in Storybook

## 5. Storybook Documentation

- [x] 5.1 Create `Skeleton.stories.tsx` with one variant per story
- [x] 5.2 Story: Skeleton with one row
- [x] 5.3 Story: Skeleton with multiple rows (e.g. 3, 5)
- [x] 5.4 Story: Skeleton with custom row count
- [x] 5.5 Story: Skeleton with size (number) affecting line height and gap
- [x] 5.6 Story: Skeleton with custom styling (CSS variables)
- [x] 5.7 Ensure each story shows ONE variant
- [x] 5.8 Add accessibility testing (a11y addon)

## 6. TypeScript and Validation

- [x] 6.1 Type `rows` prop (number, with sensible default)
- [x] 6.2 Type `size` prop (number, with sensible default)
- [x] 6.3 Export `SkeletonProps` type alongside component
- [x] 6.4 Verify TypeScript strict mode compliance

## 7. Testing

- [x] 7.1 Verify component renders correct number of rows
- [x] 7.2 Verify shimmer animation runs smoothly
- [x] 7.3 Verify Skeleton is full width in container
- [x] 7.4 Test with screen reader (a11y addon)
- [x] 7.5 Verify loading placeholder is announced to screen readers
