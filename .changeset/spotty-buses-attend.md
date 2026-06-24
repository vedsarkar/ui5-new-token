---
"@reltio/design": minor
---

Add `AppNavigation` component — a side-navigation menu for the Reltio application catalog.

- New `apps` prop accepts the grouped catalog returned by the Reltio Config Service (`{ name, items }[]`); only each app's `name` and `url` are used
- Each app's icon is resolved internally from the curated Reltio icon set (falling back to `reltio/generic`), so the menu stays visually consistent regardless of the icon URL the backend returns
- Optional `homeUrl` renders a "Home" entry with the SAP `home` icon as the first item
- Optional `env` / `tenant` substitute `${environment}` / `${tenant}` placeholders in app URLs
- Designed to drop into the `ShellBar` `sideNavigation` slot
