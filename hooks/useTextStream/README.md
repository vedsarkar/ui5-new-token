Streams text from an SSE endpoint by accumulating `delta` (append) and `content` (replace) fields from server-sent JSON events.

Returns the assembled `text`, connection `status`, the latest `event`, and `send` / `abort` controls.

### Usage

```tsx
const { text, status, event, error, send, abort } = useTextStream({
  url: "/api/stream",
  method: "POST",
  headers: { "Content-Type": "application/json" },
});

// Start streaming
send({ prompt: "Hello" });

// Cancel if needed
abort();
```

### Text assembly

Each SSE line is parsed as a JSON object. Two fields control the output text:

- **`delta`** — appended to the current text (incremental token)
- **`content`** — replaces the entire text (server-side correction)

All other fields on the event object are passed through via `event`.

### Custom fetcher

Override the default `fetch` call for auth, custom headers, or non-standard transports:

```tsx
const { send } = useTextStream({
  fetcher: ({ url, body, signal }) =>
    fetch(url, {
      body,
      signal,
      headers: { Authorization: `Bearer ${token}` },
    }),
});
```
