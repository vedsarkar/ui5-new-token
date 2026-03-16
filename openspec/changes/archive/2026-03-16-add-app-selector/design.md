## Context

The Reltio platform consists of 25+ applications across categories (Agentflow, Data Cloud, Tenant Management, Security, Configuration, Resources). A centralized app catalog already exists at `https://reltio.design/apps/catalog.json` with metadata (name, description, icon URL, category). The same file is bundled locally at `public/apps/catalog.json`. No app-switching UI component exists yet.

Existing infrastructure:
- `Popover` — anchored popover with native Popover API, auto-close on content click, CSS Anchor Positioning
- `Skeleton` — loading placeholder with shimmer animation
- `ErrorMessage` — standardized error display with icon and alert role
- `Divider` — simple `<hr>` separator (will be enhanced to support labels)
- Icon system at `icons/` — individual SVG components, but app icons are external SVG images served from `reltio.design`

## Goals / Non-Goals

**Goals:**
- Provide a drop-in app navigation component that any Reltio product can embed
- Automatically stay in sync with the centralized app catalog
- Type-safe API: compile-time validation of app names against the catalog
- Graceful degradation: automatic retry with error message when remote catalog is unavailable
- Enhance Divider to support labeled separators for category headers

**Non-Goals:**
- Search/filter within the app grid
- Drag-and-drop reordering or favorites
- Custom app icons or metadata overrides from the consumer
- Responsive/mobile layout (desktop only per project guidelines)
- Custom keyboard navigation beyond native browser behavior

## Decisions

### 1. AppSelector owns the full Popover lifecycle

AppSelector renders both the trigger button (applications icon) and the Popover. The consumer only provides `apps` — an array of enabled apps with their names and URIs (typically sourced from Reltio Config Service).

**Why**: Self-contained component with minimal API surface. The trigger icon is standardized across products — no reason for the consumer to customize it. The Popover's `onToggle` event drives lazy data fetching internally.

**Alternative considered**: Separate `AppSelectorContent` + consumer-provided Popover/trigger. Rejected because it fragments the UX and forces consumers to wire up fetch-on-open logic.

### 2. Remote fetch with module-level cache and local fallback

Data flow on popover open:

```
1. Check module-level cache (Promise)
   ├─ Hit → resolve immediately (no loading flash)
   └─ Miss → fetch("https://reltio.design/apps/catalog.json")
              ├─ Success → cache Promise, resolve
              └─ Failure → clear cache, show ErrorMessage,
                           auto-retry after 3s while popover is open
```

Module-level cache stores the Promise itself (not the resolved value), preventing duplicate concurrent requests. On error, the cache is cleared and the component automatically retries after a 3-second delay while the popover remains open.

**Why module-level cache over just HTTP cache**: HTTP cache still incurs async microtask overhead, causing a brief skeleton flash on re-open. Module-level cache makes subsequent opens synchronous in effect (Promise already resolved).

**Why not SWR/React Query**: The project philosophy is minimal dependencies. A single cached fetch is trivial to implement natively.

### 3. Type-safe app names derived from catalog.json import

```typescript
import catalog from "@/public/apps/catalog.json";
type AppName = (typeof catalog)["apps"][number]["name"];

type AppEntry = { name: AppName; uri: string };
type AppSelectorProps = HtmlProps<"div", { apps: AppEntry[]; ... }>;
```

TypeScript's `resolveJsonModule` (enabled in tsconfig) infers literal types from JSON, producing a union like `"AgentFlow" | "AF Quality" | "Hub" | ...`. The `apps` prop is an array of `{ name, uri }` objects — this format aligns with the response shape from Reltio Config Service, allowing consumers to pass the list of tenant-available apps directly without transformation. Extra fields from Config Service are silently accepted by TypeScript's structural typing.

**Why**: Single source of truth — adding an app to `catalog.json` automatically makes it available in TypeScript. No separate type definitions to maintain. Array format is more natural for data coming from an API response.

### 4. Category grouping by catalog order

Apps are grouped by their `category` field from the catalog. Category display order is determined by first appearance in the `apps` array. Only categories that have at least one enabled app (present in `props.apps`) are shown.

**Why first-appearance order**: Simple, deterministic, and controlled by the catalog maintainer through array ordering. No additional configuration needed.

### 5. App items render as `<a>` elements

Each app item is an `<a href={url} target="_blank" rel="noopener noreferrer">`. The URL comes from the consumer's `apps` prop value, not from the catalog's `basePath`.

**Why `<a>` over `<button>`**: Navigation to a URL is the semantic purpose. Using `<a>` provides native browser behavior: middle-click, right-click "Copy link", status bar preview. `target="_blank"` opens in a new tab as specified.

### 6. Divider becomes `<div role="separator">` unconditionally

The current `<hr>` element does not support children. Rather than polymorphic rendering (`<hr>` without children, `<div>` with), always use `<div role="separator">` for simplicity. Since nobody currently uses Divider, there is no migration burden.

**Why not keep `<hr>` for childless variant**: Two rendering paths add complexity for zero benefit. `<div role="separator">` is semantically equivalent and supports both modes.

### 7. Grid layout: CSS Grid with 3 fixed columns

```css
.grid { display: grid; grid-template-columns: repeat(3, 1fr); }
```

Fixed at 3 columns by default. Customizable via stable CSS class `.reltio_AppSelector_grid` override. Icon size fixed at 48×48px, also customizable via stable class `.reltio_AppSelector_appIcon`.

**Why fixed over responsive**: The app selector is a popover with constrained width — 3 columns fits the design. If products need different column counts, stable CSS classes provide the escape hatch without prop proliferation.

## Risks / Trade-offs

**[Runtime network dependency]** → Mitigated by automatic retry with ErrorMessage while the popover is open. The component retries every 3 seconds until the catalog is fetched or the popover is closed.

**[Vite warning on public/ import]** → Importing from `public/` triggers a Vite dev warning. This is cosmetic and does not affect builds. Can be suppressed in Vite config if needed.

**[Catalog schema changes]** → If `catalog.json` structure changes (fields renamed/removed), the component breaks silently at runtime. Mitigated by the JSON schema (`catalog.schema.json`) and the fact that both the catalog and the component live in the same repository.

**[Icon loading latency]** → App icons are external SVG URLs fetched by the browser on first render. With 10+ icons, this may cause a brief flash of empty icon spaces. Mitigated by browser caching and Vercel CDN. Not blocking for v1.
