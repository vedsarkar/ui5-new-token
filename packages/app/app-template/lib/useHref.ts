"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

// This app is served under an optional base path (e.g. `/console`). Relative
// hrefs must carry it; the Next router re-adds it on `router.push`, so it is
// stripped there (see `useLinks`). Absolute URLs are left as-is.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// The query params that identify the working context nearly every page needs.
// They are preserved automatically across in-app navigation (filled in by
// `useLinks`) and can be baked into an href up front with
// `useHref` — the latter matters for cases that bypass the click interceptor:
// opening in a new tab, "copy link", and cross-product links to other origins.
export const CONTEXT_PARAMS = ["env", "tenant", "customer"] as const;

// Extra query params to merge onto a link. A `null` value drops that key — use
// it to explicitly clear a context param that would otherwise be carried over.
export type HrefParams = Record<string, string | null>;

// Merge the working context and explicit overrides into a URL's query string.
// Context params fill only the keys the target doesn't already have (so a value
// already on the link wins); the explicit `params` argument always sets, and a
// `null` value removes the key. `params === null` skips the context entirely.
function applyParams(
	target: URLSearchParams,
	context: { get(name: string): string | null },
	params: HrefParams | null | undefined,
): void {
	if (params !== null) {
		for (const key of CONTEXT_PARAMS) {
			if (target.has(key)) continue;
			const value = context.get(key);
			if (value) target.set(key, value);
		}
	}
	if (params) {
		for (const [key, value] of Object.entries(params)) {
			if (value === null) target.delete(key);
			else target.set(key, value);
		}
	}
}

/**
 * Builds an href that carries the current context params (`env`, `tenant`,
 * `customer`).
 *
 * Works for both **internal paths** and **absolute URLs**:
 * - a relative path (`/entities`) gets the app's base path prepended and the
 *   context merged in — the common case for in-app links;
 * - an absolute URL (`https://hub.reltio.com/…`, e.g. a cross-product link from
 *   config) keeps its origin, with the context merged into its query.
 *
 * Precedence, lowest to highest: current context → query already in the target
 * → the `params` argument. Because context only fills *missing* keys, force a
 * value onto a URL that already carries a key (e.g. `${…}` placeholders on a
 * cross-product link) by passing it through `params`. Pass `null` as `params`
 * to drop the whole context; pass `{ key: null }` to drop a single param.
 *
 * @example
 * const href = useHref();
 * href("/entities");                   // /base/entities?env=A&tenant=B&customer=C
 * href("/entities", { view: "list" }); // …&view=list, context preserved
 * href("/logout", null);               // /base/logout — no context
 * href("https://hub.reltio.com/", {    // stamp the selected context onto a
 *   env: "A", tenant: "B", customer: "C", // cross-product deep link, overriding
 * });                                  // any placeholders it already carries
 */
export function useHref(): (path: string, params?: HrefParams | null) => string {
	const searchParams = useSearchParams();

	return useCallback(
		(path, params) => {
			// An absolute URL parses on its own; a relative path throws (no base) —
			// that is how we tell them apart, without reaching for `window`.
			let absolute: URL | null = null;
			try {
				absolute = new URL(path);
			} catch {
				absolute = null;
			}

			if (absolute) {
				applyParams(absolute.searchParams, searchParams, params);
				return absolute.toString();
			}

			// Relative path: keep it app-relative and prepend the base path.
			const hashIndex = path.indexOf("#");
			const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
			const withoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
			const queryIndex = withoutHash.indexOf("?");
			const pathname =
				queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
			const ownQuery =
				queryIndex >= 0 ? withoutHash.slice(queryIndex + 1) : "";

			const merged = new URLSearchParams(ownQuery);
			applyParams(merged, searchParams, params);

			const query = merged.toString();
			return `${BASE_PATH}${pathname}${query ? `?${query}` : ""}${hash}`;
		},
		[searchParams],
	);
}
