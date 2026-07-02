---
"@reltio/design": minor
---

feat: add `notificationsUrl` prop to `ShellBar`

`ShellBar` now accepts an optional `notificationsUrl` string. When provided, a
bell icon is rendered in the right actions cluster; clicking it opens the given
URL in a new browser tab (`target="_blank"`, `noopener,noreferrer`). When
omitted, no bell icon is shown.
