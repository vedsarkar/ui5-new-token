Reads data on mount and returns loading, success, and error states.

This hook is for **reading data only**. It is keyed by `url`, and requests
sharing the same `url` are deduplicated while in flight (and will be cached in a
future release). A read may use the POST method if the API requires it, as long
as its purpose is fetching data.

> **Mutations** (POST/PUT/DELETE that change server state) are triggered by user
> actions — `onSubmit`, `onClick`, etc. — not on mount, and carry user-supplied
> data. Use native `fetch` directly for those; do not use this hook.

## Usage

Url only — a minimal GET request is issued and the JSON body parsed:

```tsx
const { data, error, isLoading } = useFetch<TData, TError>("/api/entities");
```

Url with a custom action. The url is passed to the action, so there is no need to
repeat it:

```tsx
const { data, error, isLoading } = useFetch<TData, TError>(
    "/api/entities",
    async (url) => {
        const response = await fetch(url);

        return response.json();
    },
);

if (isLoading) {
    return <Spinner />;
}

if (error) {
    return <Error />;
}

return <List items={data} />;
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | `string` | Request URL, also used as the deduplication key. |
| `action` | `(url: string) => Promise<R>` _(optional)_ | Async function called once on mount, receiving `url`. Defaults to a GET on `url` that parses the JSON body. |

## Return value

| Field | Type | Description |
|-------|------|-------------|
| `data` | `R \| undefined` | Resolved data. |
| `error` | `E \| undefined` | Error thrown by `action`. |
| `isLoading` | `boolean` | `true` while the request is in flight. |

## Deduplication

Requests are keyed by `url`. While a request for a given `url` is in flight, any
additional consumers of the same `url` reuse it instead of firing their own. Once
it settles the entry is released, so a later mount triggers a fresh request —
there is no response caching yet. Make sure `url` uniquely identifies the request.
