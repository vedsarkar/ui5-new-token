## Why

There is no shared React hook for consuming streaming APIs. AI-powered features require fetch + SSE parsing + text accumulation + abort handling with non-trivial edge cases (connection drops, abort on unmount, re-send during active stream). A reusable hook provides a tested, robust foundation for any feature that streams text from an SSE endpoint.

## What Changes

- Add `useTextStream` — a React hook that streams text from an SSE endpoint. Handles fetch, SSE-to-JSON parsing, text accumulation (`delta` append / `content` replace), connection status tracking, abort-on-resend, abort-on-unmount, and error handling. Returns `{ text, status, event, error, send, abort }`.
- The hook accepts a custom `fetcher` for auth or non-standard transports, and forwards any `RequestInit` options to the underlying fetch call.
- All server-sent event fields are passed through via `event`, making the hook protocol-agnostic — consumers interpret event semantics themselves.

## Capabilities

### New Capabilities
- `use-text-stream`: React hook for streaming text from SSE endpoints with delta/content accumulation, connection lifecycle, and abort controls

### Modified Capabilities

None.

## Impact

- New module at `hooks/useTextStream/`
- New public export: `useTextStream` hook
- No breaking changes to existing code
