"use client";

import type { TUseFetch } from "@reltio/design/hooks";
import { useFetch as useDesignFetch } from "@reltio/design/hooks";
import { authFetch } from "@/lib/authFetch";

/**
 * App wrapper over `@reltio/design`'s `useFetch`. Reads JSON once on mount,
 * deduplicated by `url`, and routes **every** request through the Reltio session
 * lifecycle (`401 → silent refresh → retry → login`, see `lib/authFetch`).
 *
 * `authFetch` handles URL routing: app-local paths like `/auth/checkToken` are
 * base-path prefixed and called directly; absolute Reltio API URLs are sent
 * through the BFF proxy. Pass a `RequestInit` for the method, body, headers, etc.
 *
 * Pass `url = null` to skip the request entirely (no fetch, no data) — e.g. when
 * a caller already has the value cached or a dependency isn't ready yet.
 */
export function useFetch<R, E = unknown>(
	url: string | null,
	init?: RequestInit,
): TUseFetch<R, E> {
	return useDesignFetch<R, E>(url ?? "", async (resolvedUrl) => {
		if (url === null) return undefined as R;
		const response = await authFetch(resolvedUrl, init);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		return response.json() as Promise<R>;
	});
}
