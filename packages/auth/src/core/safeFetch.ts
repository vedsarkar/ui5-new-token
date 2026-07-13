/**
 * Shared `fetch` wrapper with the package's upstream-error policy.
 *
 * Returns the raw `Response` on 2xx and throws `RequestError` for
 * everything else, with a normalised `statusCode`: upstream 4xx propagate
 * the upstream status, upstream 5xx and network failures normalise to
 * `502`. This lets fronts distinguish "your session expired" (401) from
 * "the auth server is down" (502).
 *
 * Takes a single flat `options` object (`url` plus the standard
 * `RequestInit` fields) to match the package's options-object convention.
 * Internal to `core/` — used by `exchangeCode`, `refreshAccessToken`, and
 * `introspectToken`. Never returns a non-ok response.
 */

import { RequestError } from "../utils/errors";

/** Flat options for {@link safeFetch}: the URL plus native `fetch` init fields. */
export type SafeFetchOptions = RequestInit & {
	url: string;
};

export async function safeFetch(options: SafeFetchOptions): Promise<Response> {
	const { url, ...init } = options;
	let response: Response;
	try {
		response = await globalThis.fetch(url, init);
	} catch (cause) {
		throw new RequestError("OAuth server unreachable", {
			statusCode: 502,
			cause,
		});
	}
	if (response.ok) {
		return response;
	}
	const statusCode = response.status >= 500 ? 502 : response.status;
	throw new RequestError(response.statusText || `Upstream ${response.status}`, {
		response,
		statusCode,
	});
}
