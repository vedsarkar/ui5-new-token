# ErrorBoundary

`ErrorBoundary` is a thin React class component that catches render-time errors thrown by its descendants and renders a `fallback` instead of crashing the surrounding tree. It is intentionally minimal — no built-in fallback UI, no telemetry, no recovery logic. The caller decides what to render and what to log.

### When to use

Wrap a section of your tree that may fail independently — a chart, a third-party widget, a Markdown renderer rendering untrusted content, a streaming AI response. Place the boundary as **close to the failing surface as possible** so the rest of the app stays interactive.

### Limitations inherited from React

- Catches **render-time** errors only — not events, async work, or effect callbacks. Handle those yourself with `try/catch` or promise rejection handlers.
- A boundary cannot recover from an error thrown during **its own render** — wrap it in another boundary if you need that.
- Implemented as a class component on purpose: the `componentDidCatch` lifecycle has no hook equivalent.

### Wiring telemetry

The `onError` callback fires once per caught error with `(error, errorInfo)`. This is the place to send the error to your monitoring system; do not put telemetry inside the `fallback` render — it would fire on every re-render of the boundary.

### See also

- [React docs — Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) — official reference for the lifecycle and limitations
