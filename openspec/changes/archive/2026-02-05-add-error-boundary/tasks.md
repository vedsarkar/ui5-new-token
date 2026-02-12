# Tasks: Add ErrorBoundary Component

## 1. Component Structure

- [x] 1.1 Create `components/ErrorBoundary/` folder structure
- [x] 1.2 Create `ErrorBoundary.types.ts` with TypeScript type definitions (using `type`, not `interface`) for props: `children`, `fallback`, `onError?`
- [x] 1.3 Create `ErrorBoundary.tsx` as a class component extending `React.Component`
- [x] 1.4 Create `ErrorBoundary.module.css` with `.root` and CSS custom properties (`--reltio-error-boundary-` prefix)
- [x] 1.5 Create `index.ts` for public exports

## 2. Error Boundary Implementation

- [x] 2.1 Implement `getDerivedStateFromError` to set state with caught error
- [x] 2.2 Implement `componentDidCatch(error, info)` to call `onError?.(error, info)` when provided
- [x] 2.3 Render `children` when no error; render `fallback` when error state is set
- [x] 2.4 Use only React APIs (no external error-boundary libraries)
- [x] 2.5 Ensure TypeScript types use `React.ErrorInfo` for the `info` parameter

## 3. Styling and Conventions

- [x] 3.1 Define CSS custom properties on `.root` with `--reltio-error-boundary-` prefix and fallbacks
- [x] 3.2 Use `classNames()` utility for all className composition
- [x] 3.3 Apply `.root` to the wrapper element (around children or fallback)

## 4. Storybook Documentation

- [x] 4.1 Create `ErrorBoundary.stories.tsx`
- [x] 4.2 Story: Normal render (children render without error)
- [x] 4.3 Story: Fallback on error (child that throws during render, fallback is shown)
- [x] 4.4 Story: onError callback (demonstrate callback invoked with error and info)
- [x] 4.5 Ensure each story shows ONE variant; add "autodocs" tag

## 5. Validation

- [x] 5.1 Run `npm run format` and fix formatting
- [x] 5.2 Run `npm run lint` and fix lint errors
- [x] 5.3 Verify TypeScript strict mode compliance and no `any` types
- [x] 5.4 Confirm no new external dependencies in package.json for this component
