## ADDED Requirements

### Requirement: Hook options contract

The `useTextStream` hook SHALL accept an optional options object combining:
- `url?: string` — target URL, required when no custom `fetcher` is provided
- `fetcher?: StreamFetcher` — custom transport function (default: built-in fetcher)
- Any `RequestInit` properties except `body` and `signal` (e.g. `method`, `headers`, `credentials`)

The hook SHALL expose one generic parameter `TPayload` (defaults to `unknown`) representing the payload type passed to `send`.

#### Scenario: Minimal usage with URL
- **WHEN** a component calls `useTextStream({ url: "/api/stream", method: "POST" })`
- **THEN** the hook returns `{ text, status, event, error, send, abort }`

#### Scenario: Custom fetcher overrides default transport
- **WHEN** a component calls `useTextStream({ fetcher: myFetcher })`
- **THEN** the hook uses `myFetcher` instead of the default fetch transport

### Requirement: StreamFetcherInput and StreamFetcher types

`StreamFetcherInput` SHALL combine:
- `url: string | undefined`
- `body: string | undefined`
- `signal: AbortSignal`
- All `RequestInit` properties except `body` and `signal`

`StreamFetcher` SHALL be typed as `(input: StreamFetcherInput) => Promise<Response>`.

#### Scenario: Fetcher receives transport keys only
- **WHEN** options include `url`, `method`, `headers`, and `fetcher`
- **THEN** the fetcher receives `{ url, method, headers, body, signal }` — no hook-internal state

### Requirement: TextStreamEvent type

`TextStreamEvent` SHALL have the shape:
- `delta?: string` — incremental text token to append
- `content?: string` — full text replacement from the server
- `error?: unknown` — protocol-level error from the server
- `[key: string]: unknown` — pass-through for arbitrary event fields

The hook SHALL NOT interpret event semantics beyond `delta` and `content` for text assembly. All other fields are surfaced as-is via `state.event`.

#### Scenario: Unknown event fields pass through
- **WHEN** the server sends `{ type: "tool_call", name: "search", args: { q: "test" } }`
- **THEN** `state.event` contains the full object with all fields accessible

#### Scenario: Events without delta or content pass through without changing text
- **WHEN** the server sends `{ type: "status", status: "thinking" }`
- **THEN** `state.event` is updated but `state.text` remains unchanged

### Requirement: Return shape

The hook SHALL return `TextStreamState & { send, abort }`:
- `text`: `string` — accumulated text, initially `""`
- `status`: `TextStreamStatus` — initially `"idle"`
- `event`: `TextStreamEvent | null` — latest parsed event, initially `null`
- `error`: `Error | null` — transport/network error, initially `null`
- `send`: `(payload: TPayload) => void` — triggers a new stream
- `abort`: `() => void` — aborts the current stream

`TextStreamStatus` SHALL be `"idle" | "connecting" | "streaming" | "done" | "error" | "aborted"`.

#### Scenario: Initial state
- **WHEN** the hook is first rendered
- **THEN** `text` is `""`, `status` is `"idle"`, `event` is `null`, `error` is `null`

### Requirement: Text assembly from delta and content

For each parsed SSE event:
- If `event.delta` is not nullish, its value SHALL be appended to the accumulated text
- If `event.content` is not nullish, the accumulated text SHALL be replaced entirely with `event.content`

Within a single event, `delta` is applied first, then `content`. If both are present, `content` wins.

#### Scenario: Delta appends text incrementally
- **WHEN** events arrive with `delta: "Hello"` then `delta: " world"`
- **THEN** `text` becomes `"Hello world"`

#### Scenario: Content replaces accumulated text
- **WHEN** deltas accumulated to `"Hell world"` and an event has `content: "Hello world"`
- **THEN** `text` is replaced to `"Hello world"`

#### Scenario: Content mid-stream followed by more deltas
- **WHEN** deltas arrive, then an event with `content: "corrected by server"`, then more deltas
- **THEN** text resets to `"corrected by server"` and subsequent deltas append to it

### Requirement: send() behavior

`send(payload)` SHALL:
1. Abort any in-flight stream via the existing `AbortController`
2. Reset the internal aborted flag to `false`
3. Create a new `AbortController`
4. Set state to `{ text: "", status: "connecting", event: null, error: null }`
5. Serialize the payload: `JSON.stringify(payload)` when not nullish, `undefined` otherwise
6. Call the fetcher and begin consuming the response

Options (`url`, `fetcher`, request options) SHALL be read from a ref at call time to always see the latest values.

#### Scenario: send() resets state
- **WHEN** text has accumulated and `send(newPayload)` is called
- **THEN** state resets to `{ text: "", status: "connecting", event: null, error: null }`

#### Scenario: send() during active stream
- **WHEN** a stream is in progress and `send(newPayload)` is called
- **THEN** the existing stream is aborted and a new stream starts

#### Scenario: Nullish payload produces undefined body
- **WHEN** `send(null)` or `send(undefined)` is called
- **THEN** `body` in the fetcher input is `undefined`

### Requirement: Status transitions

The hook SHALL implement the following status transitions:
- `send()` called → `"connecting"`
- First parsed event arrives → `"streaming"` (each subsequent event also sets `"streaming"`)
- Stream iteration completes normally → `"done"`
- Transport, network, or parsing error → `"error"`
- User calls `abort()` → `"aborted"`

#### Scenario: Full lifecycle — connecting → streaming → done
- **WHEN** `send()` is called, events arrive, and the stream completes
- **THEN** status transitions: `"idle"` → `"connecting"` → `"streaming"` → `"done"`

#### Scenario: Connecting directly to error
- **WHEN** `send()` is called and a network error occurs before any event
- **THEN** status transitions: `"connecting"` → `"error"`

### Requirement: Stream completion

When the stream iteration completes normally:
- If at least one event was received, `status` SHALL be `"done"` with `error: null`
- If no events were received, `status` SHALL be `"done"` with `error: new Error("Stream ended without events")`
- `event` SHALL hold the last received event (or `null` if none)

The hook does NOT require a protocol-level "done" event from the server. Completion is determined solely by the underlying stream closing.

#### Scenario: Stream ends without protocol done event
- **WHEN** the server sends message events but closes the stream without a done event
- **THEN** `status` is `"done"`, `text` contains accumulated text, `error` is `null`

#### Scenario: Empty stream
- **WHEN** the server opens a stream but sends no parseable events before closing
- **THEN** `status` is `"done"` and `error.message` is `"Stream ended without events"`

### Requirement: abort() behavior

`abort()` SHALL:
1. Set the internal aborted flag to `true`
2. Abort the `AbortController`
3. Set `status` to `"aborted"`, preserving `text`, `event`, and `error`

After abort, any in-flight async operations SHALL check the aborted flag and return without updating state.

#### Scenario: Abort during streaming preserves text
- **WHEN** text has accumulated to `"partial"` and `abort()` is called
- **THEN** `status` is `"aborted"` and `text` remains `"partial"`

#### Scenario: Abort prevents further state updates
- **WHEN** `abort()` is called and the parser yields more events afterward
- **THEN** those events are ignored and state is not updated

### Requirement: Error handling

If the response body is `null`, the hook SHALL throw `new Error("Response body is null")`.

`AbortError` exceptions (from `AbortController`) SHALL be silently ignored — no state update.

If the aborted flag is set when an error is caught, the error SHALL be silently ignored.

All other errors SHALL set `status` to `"error"` and `error` to the caught `Error` instance. Non-`Error` throwables SHALL be wrapped as `new Error(String(thrown))`. The accumulated `text` SHALL be preserved.

#### Scenario: HTTP error response
- **WHEN** the default fetcher returns a response with status 500
- **THEN** `status` is `"error"` and `error.message` contains `"HTTP 500"`

#### Scenario: Network failure
- **WHEN** the fetcher rejects with a network error
- **THEN** `status` is `"error"` and `error` is the caught Error

#### Scenario: Null response body
- **WHEN** the fetcher returns a response with a null body
- **THEN** `status` is `"error"` and `error.message` is `"Response body is null"`

### Requirement: Default fetcher

When no custom `fetcher` is provided, the hook SHALL use a built-in default fetcher that:
- Rejects with `Error("useTextStream: url is required when no fetcher is provided")` if `url` is falsy
- Calls `fetch(url, { ...requestOptions, body, signal })`
- Checks `response.ok` — if not ok, throws `Error("HTTP {status}")`
- Returns the response on success

#### Scenario: Missing URL with default fetcher
- **WHEN** no `url` is provided and no custom `fetcher` is set
- **THEN** `status` is `"error"` and `error.message` is `"useTextStream: url is required when no fetcher is provided"`

### Requirement: Unmount cleanup

When the component unmounts while streaming, the hook SHALL abort the current stream via the `AbortController` using a `useEffect` cleanup function.

#### Scenario: Unmount during active stream
- **WHEN** the component unmounts while a stream is in progress
- **THEN** the stream is aborted via the `AbortController`

### Requirement: SSE parsing

The hook SHALL parse the response body as SSE. Only lines prefixed with `data: ` SHALL be parsed as JSON and yielded as events. Empty lines, SSE comments (`:` prefix), non-`data:` prefixed lines (`event:`, `id:`, `retry:`), and lines with malformed JSON SHALL be silently skipped.

Partial lines split across stream chunks SHALL be buffered and reassembled before parsing.

#### Scenario: Only data-prefixed lines produce events
- **WHEN** the stream contains `event:`, `id:`, `retry:`, and `data:` lines
- **THEN** only `data:` lines produce events; all others are silently ignored

#### Scenario: Malformed JSON is skipped
- **WHEN** a `data:` line contains `[DONE]` (not valid JSON)
- **THEN** it is silently skipped without error

#### Scenario: Lines split across chunks are reassembled
- **WHEN** a `data:` line is split across two stream reads
- **THEN** the parser buffers and reassembles the full line before parsing

