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

// Minimal default fetcher: a plain GET that parses the JSON body. Used when a
// url is provided without an explicit action.
const defaultFetcher = <R>(url: string): Promise<R> =>
	fetch(url).then((response) => {
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		return response.json() as Promise<R>;
	});

export function useFetch<R, E = unknown>(
	action: TUseFetchAction<R>,
): TUseFetch<R, E>;
export function useFetch<R, E = unknown>(
	url: string,
	action?: TUseFetchAction<R>,
): TUseFetch<R, E>;
export function useFetch<R, E>(
	urlOrAction: string | TUseFetchAction<R>,
	maybeAction?: TUseFetchAction<R>,
): TUseFetch<R, E> {
	const url = typeof urlOrAction === "string" ? urlOrAction : undefined;
	const action =
		typeof urlOrAction === "string"
			? (maybeAction ?? defaultFetcher<R>)
			: urlOrAction;

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

		// When a url is present it is passed to the action and used as the
		// deduplication key, so concurrent callers for the same url share one
		// request. Without a url the action runs independently (no dedup) —
		// correct for non-idempotent requests such as POST/PUT or bulk mutations.
		const request = url
			? dedupe(url, actionRef.current)
			: (actionRef.current as () => Promise<R>)();

		request
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
