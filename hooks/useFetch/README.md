Fetches data on mount and returns loading, success, and error states.

An optional first argument is a deduplication `key`: while a request for a given
key is in flight, additional consumers of the same key reuse that single request
instead of each firing their own. The key is **opt-in** — pass it only for
idempotent reads. Omit it for non-idempotent requests (POST/PUT, bulk mutations),
where every call must run independently.

## Usage

Url only — a minimal GET request is issued and the JSON body parsed, deduplicated
by the url:

```tsx
const { data, error, isLoading } = useFetch<TData, TError>("/api/entities");
```

Url with a custom action (still deduplicated by the url). The url is passed to
the action, so there is no need to repeat it:

```tsx
const { data, error, isLoading } = useFetch<TData, TError>(
    "/api/entities",
    async (url) => {
        const response = await fetch(url);

        return response.json();
    },
);
```

Mutation without a key — each call runs independently:

```tsx
const { data, error, isLoading } = useFetch<TData, TError>(async () => {
    const response = await fetch("/api/entities/bulk", { method: "POST" });

    return response.json();
});
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | `string` | Request URL, also used as the deduplication key. When passed without an `action`, a minimal GET request is issued and the JSON body is parsed. |
| `action` | `(url: string) => Promise<R>` _(optional)_ | Async function called once on mount, receiving `url` when one is provided. Defaults to a GET on `url`. Provide a bare `action` (no url) for non-idempotent requests that must not be deduplicated. |

## Return value

| Field | Type | Description |
|-------|------|-------------|
| `data` | `R \| undefined` | Resolved data. |
| `error` | `E \| undefined` | Error thrown by `action`. |
| `isLoading` | `boolean` | `true` while the request is in flight. |

## Deduplication

When a `key` is provided, requests are coalesced by that key. While a request is
in flight, any additional consumers of the same key reuse it. Once it settles the
entry is released, so a later mount triggers a fresh request — there is no
response caching yet. Make sure the key uniquely identifies the request, and only
use it for idempotent reads.
