## Why

Applications across the Reltio platform need a unified way to navigate between products (Hub, Console, RDM, AgentFlow, etc.). Currently there is no standard app switching component — each product implements navigation independently, leading to inconsistent UX. An AppSelector component, backed by the centralized app catalog at `reltio.design/apps/catalog.json`, will provide a single, always-up-to-date navigation experience across all products.

## What Changes

- **New `AppSelector` component** — a self-contained Popover-based app grid triggered by an applications icon button. Fetches app metadata (name, icon, category) from the remote catalog on first open, with module-level caching and automatic retry on error. Consumer provides an array of enabled apps with their names and URIs (e.g. from Reltio Config Service).
- **Enhanced `Divider` component** — **BREAKING**: changed from `<hr>` to `<div role="separator">`. Now accepts optional `children` (label text) and `align` prop (`"start"` | `"center"` | `"end"`) for labeled dividers. Used by AppSelector for category headers.
- **Updated `catalog.json`** — renamed two categories: `"AI"` → `"Agentflow"`, `"Applications"` → `"Data Cloud"`.

## Capabilities

### New Capabilities
- `app-selector-component`: Popover-based application grid with remote catalog fetching, type-safe app names, category grouping, and automatic retry on network errors.

### Modified Capabilities
- `divider-component`: Changed element from `<hr>` to `<div role="separator">`. Added `children` prop for labeled dividers and `align` prop for label positioning.

## Impact

- **Components**: New `components/AppSelector/`, modified `components/Divider/`
- **Data**: `public/apps/catalog.json` — two category renames
- **Dependencies**: None (uses native `fetch`, existing Popover, Skeleton, ErrorMessage, Divider)
- **Breaking**: `Divider` changes from `<hr>` to `<div>` — HTML element change. Since nobody currently uses Divider externally, impact is zero.
- **Network**: AppSelector introduces a runtime fetch to `https://reltio.design/apps/catalog.json` on first popover open. Automatic retry with ErrorMessage on failure.
- **Types**: AppSelector props derive `AppName` union type from the imported `catalog.json`, providing compile-time validation of app names.
