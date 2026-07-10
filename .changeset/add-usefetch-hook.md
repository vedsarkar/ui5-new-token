---
"@reltio/design": minor
---

Add `useFetch` hook for fetching data on mount with loading, success, and error states.

- Available from `@reltio/design/hooks`
- Returns `{ data, error, isLoading }`, generic over the resolved data (`R`) and error (`E`) types
- `useFetch(url)` issues a minimal GET request and parses the JSON body
- `useFetch(url, action)` runs a custom request that receives the `url`; requests sharing the same url are deduplicated while in flight
- `useFetch(action)` runs a custom request without a key — no deduplication, which is correct for non-idempotent requests such as POST/PUT or bulk mutations
