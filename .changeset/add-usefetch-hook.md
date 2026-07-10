---
"@reltio/design": minor
---

Add `useFetch` hook for reading data on mount with loading, success, and error states.

- Available from `@reltio/design/hooks`
- Returns `{ data, error, isLoading }`, generic over the resolved data (`R`) and error (`E`) types
- Keyed by `url`: requests sharing the same url are deduplicated while in flight
- `useFetch(url)` issues a minimal GET and parses the JSON body; `useFetch(url, action)` runs a custom read action that receives the `url`
- Read-only by design — for mutations (POST/PUT triggered by user actions) use native `fetch` directly
