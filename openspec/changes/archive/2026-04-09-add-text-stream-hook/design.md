## Context

AI-powered features in Reltio products consume streaming APIs (SSE) for real-time text generation. Without a shared hook, each feature re-implements fetch + SSE parsing + text accumulation + abort logic, leading to inconsistency and bugs.

## Goals / Non-Goals

**Goals:**
- Provide a single, tested React hook for consuming SSE text streams
- Support customizable transport via `fetcher` for auth and non-standard APIs
- Keep the hook protocol-agnostic — it assembles text from `delta`/`content` fields and passes all other event data through
- Handle connection lifecycle: idle → connecting → streaming → done/error/aborted

**Non-Goals:**
- No event-type routing or protocol-specific logic — consumers interpret event semantics via `event`
- No batching or flush intervals — events are processed as they arrive
- No stall detection or chunk timeouts — out of scope for the base hook

## Decisions

### Single flat hook
A single `useTextStream` hook with direct `useState`. The streaming use case is straightforward: fetch, parse SSE, accumulate text, track status. If future hooks need shared streaming primitives, extraction can happen then.

### Protocol-agnostic event model
`TextStreamEvent` uses an index signature (`[key: string]: unknown`) with optional `delta`, `content`, and `error` fields. The hook only interprets `delta` (append) and `content` (replace) for text assembly. All other fields pass through via `state.event`, letting consumers interpret protocol-level semantics (e.g. `type`, `conversation_id`) without the hook needing to know about them.

### Custom fetcher as transport abstraction
Instead of baking auth or header logic into the hook, consumers provide a `fetcher: (input: StreamFetcherInput) => Promise<Response>`. The default fetcher handles URL validation and HTTP error checking. This keeps the hook decoupled from any specific API contract.

### Stream completion without protocol-level done event
The hook treats stream completion as the `ReadableStream` closing, not as a protocol-level "done" event. If events were received, status is `"done"` with no error. If zero events were received, status is `"done"` with `error: "Stream ended without events"`. This avoids coupling the hook to any specific event protocol.

## Risks / Trade-offs

- **No batching** — in extremely high-throughput streams, per-event `setState` calls could cause render pressure. Mitigated by the fact that current SSE endpoints emit tokens at human-readable pace. Batching can be added later without API changes.
- **No stall detection** — a stream that stops sending but doesn't close will leave the hook in `"streaming"` state indefinitely. Consumers can implement their own timeout logic if needed.
- **Single event reference** — `state.event` holds only the latest event, not a history. Consumers needing event logs must accumulate them separately (as shown in stories).
