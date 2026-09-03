---
"@reltio/design": minor
---

Add a `searchField` slot to `ShellBar`

`ShellBar` deliberately omitted UI5's search slot, with its own docs noting that
"dedicated Reltio props will be added when needed". The Profile screen needs
one, so the slot now exists:

```tsx
<ShellBar
	primaryTitle="Product Identifier"
	searchField={<Input placeholder="Search" />}
/>
```

It follows the `tenantSelector` / `userMenu` / `appSelector` convention. Supplying
the slot also turns on UI5's `showSearchField`, so the field renders expanded
rather than collapsed behind the magnifier — the consumer does not manage that
flag. The remaining search-related UI5 props stay omitted.
