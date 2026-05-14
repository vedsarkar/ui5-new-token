/**
 * Runtime detection of the various request shapes accepted by `@reltio/auth`
 * helpers.
 *
 * Three shapes are supported:
 *   - Web `Request` (and `NextRequest` which subclasses it) — `headers` is a
 *     `Headers` instance with a `.get(name)` method.
 *   - Express `Request` — `headers` is a plain object of strings or string
 *     arrays.
 *   - Generic request-like objects with a `cookies` map already parsed by
 *     middleware. We tolerate this shape but don't rely on it; cookie
 *     reads always parse the raw `Cookie` header to avoid coupling to
 *     `cookie-parser`.
 */

/** Anything we accept as a request. */
export type AnyRequest = {
	headers?: Headers | Record<string, string | string[] | undefined> | unknown;
};

/**
 * Reads a header value by name from any supported request shape. Returns
 * `null` when the header is absent or in an unrecognised position.
 *
 * Header name comparison is case-insensitive in both branches; `Headers`
 * does this natively, and the plain-object branch normalises by trying
 * both the requested name and its lowercase form.
 */
export function readHeader(request: AnyRequest, name: string): string | null {
	const headers = (request as { headers?: unknown }).headers;
	if (headers == null) {
		return null;
	}
	const maybeWebHeaders = headers as Headers;
	if (typeof maybeWebHeaders.get === "function") {
		return maybeWebHeaders.get(name);
	}
	const plain = headers as Record<string, string | string[] | undefined>;
	const value = plain[name] ?? plain[name.toLowerCase()];
	if (typeof value === "string") {
		return value;
	}
	if (Array.isArray(value) && typeof value[0] === "string") {
		return value[0];
	}
	return null;
}
