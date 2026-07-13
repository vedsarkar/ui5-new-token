import { useEffect, useRef, useState } from "react";

import type { TUseFetch, TUseFetchAction } from "./useFetch.types";

// Registry of in-flight requests keyed by url. Entries live only while the
// request is pending — once it settles the entry is removed. This coalesces
// concurrent callers for the same url into a single request (deduplication)
// without holding onto results, so there is no caching yet.
const inFlight = new Map<string, Promise<unknown>>();

const dedupe = <R>(url: string, action: TUseFetchAction<R>): Promise<R> => {
	const existing = inFlight.get(url) as Promise<R> | undefined;
	if (existing) return existing;

	const request = action(url).finally(() => {
		inFlight.delete(url);
	});
	inFlight.set(url, request);
	return request;
};

// Minimal default fetcher: a plain GET that parses the JSON body. Used when no
// explicit action is provided.
const defaultFetcher = <R>(url: string): Promise<R> =>
	fetch(url).then((response) => {
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		return response.json() as Promise<R>;
	});

/**
 * Reads data once on mount, keyed and deduplicated by `url`: concurrent
 * consumers of the same url share a single in-flight request.
 *
 * This hook is for reading data only. Mutations (POST/PUT that change server
 * state) are triggered by user actions, not on mount — use native `fetch`
 * directly for those. A read may still use the POST method, as long as its
 * purpose is fetching data; deduplication (and future caching) always applies.
 */
export function useFetch<R, E = unknown>(
	url: string,
	action: TUseFetchAction<R> = defaultFetcher,
): TUseFetch<R, E> {
	const [data, setData] = useState<R | undefined>(undefined);
	const [error, setError] = useState<E | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);

	// Keep the latest action in a ref so the mount effect never captures a
	// stale closure while still running exactly once per url.
	const actionRef = useRef(action);
	actionRef.current = action;

	useEffect(() => {
		let active = true;
		setIsLoading(true);
		setError(undefined);

		dedupe(url, actionRef.current)
			.then((res) => {
				if (active) setData(res as R);
			})
			.catch((err) => {
				if (active) setError(err as E);
			})
			.finally(() => {
				if (active) setIsLoading(false);
			});

		return () => {
			active = false;
		};
	}, [url]);

	return { data, error, isLoading };
}
