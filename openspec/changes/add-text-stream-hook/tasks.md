## 1. Types

- [x] 1.1 Define `TextStreamEvent`, `StreamFetcherInput`, `StreamFetcher`, `TextStreamStatus`, `TextStreamState`, `UseTextStreamOptions`, `UseTextStreamReturn` types in `useTextStream.types.ts`

## 2. SSE Parser

- [x] 2.1 Implement `sseJsonParser` async generator — parse `data:` lines as JSON, skip comments/empty/non-data lines, buffer partial lines across chunks, release reader lock in finally

## 3. Default Fetcher

- [x] 3.1 Implement `defaultFetcher` — validate URL, call fetch with request options, check `response.ok` and throw `HTTP {status}` on failure

## 4. Hook Implementation

- [x] 4.1 Implement `useTextStream` hook — `send()` with abort-on-resend, state reset, fetcher call, SSE consumption with delta/content text assembly, status transitions, error handling
- [x] 4.2 Implement `abort()` — set aborted flag, abort controller, update status to "aborted"
- [x] 4.3 Implement unmount cleanup via `useEffect` returning abort

## 5. Public API

- [x] 5.1 Create `index.ts` barrel exporting `useTextStream`, `TextStreamEvent`, `StreamFetcher`, `StreamFetcherInput`

## 6. Documentation & Stories

- [x] 6.1 Write README.md with usage examples
- [x] 6.2 Create Storybook stories: MessageStream, ErrorInEvent, HttpError, NetworkError, StreamCutOff, ContentMidStream, UnknownEventTypes, MalformedSsePrefix
