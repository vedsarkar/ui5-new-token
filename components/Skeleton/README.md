# Skeleton

```tsx
import { Skeleton } from "@reltio/design/components";
```

`Skeleton` is a loading placeholder that shows N rectangular bars with a horizontal shimmer animation. Used to reserve space and signal "content is on its way" while data is being fetched. Full-width by default.

### Sizing

- `rows` — number of placeholder bars (default `3`). Values are coerced to a positive integer (minimum 1, fractional values floored).
- `size` — height of each bar as a CSS length (`"16px"`, `"1rem"`, `"2em"`). Defaults to `16px`. Pass any unit your design calls for.

### Composition

`Skeleton` is intended to **replace** the eventual content while loading, not stack alongside it. Toggle conditionally on your loading flag:

```tsx
{isLoading ? <Skeleton rows={5} /> : <ActualList />}
```

For more complex layouts, render multiple `Skeleton` instances side by side with explicit container styling at the call site, rather than trying to express the layout via props.

### Accessibility

The root element has `role="status"` and `aria-busy="true"`, so screen readers announce that content is loading. Each bar is `aria-hidden="true"` (no semantic content). A default `aria-label="Loading content"` is set; override via `aria-label` on the props if a more specific label is appropriate (e.g. `"Loading messages"`).
