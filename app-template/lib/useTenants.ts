"use client";

import { useEffect, useState } from "react";
import type { PublicConfig } from "@/app/api/config/route";
import { authFetch } from "@/lib/authFetch";
import { useConfig } from "@/lib/useConfig";

// A configured Reltio environment, as delivered to the browser by `/api/config`.
type Environment = PublicConfig["environments"][number];

// One tenant as returned by `{apiPath}/enhancedTenants`. The endpoint responds
// with an array of these; it carries no environment field — the environment is
// implied by which endpoint answered, so we attach it ourselves downstream.
export type EnhancedTenant = {
	tenantId: string;
	tenantName: string;
	customerName: string;
};

// Per-environment slice of the result. Each starts as `isLoading` and settles
// independently into either `tenants` (the `enhancedTenants` payload) or an
// `error` message.
export type TenantsResult = {
	environment: Environment;
	isLoading: boolean;
	tenants?: EnhancedTenant[];
	error?: string;
};

const toMessage = (error: unknown): string =>
	error instanceof Error ? error.message : String(error);

/**
 * Fetches the tenants available to the signed-in user across **every**
 * configured environment via `{apiPath}/enhancedTenants`.
 *
 * All environments are queried **in parallel** (one BFF proxy call each), and
 * results stream in **as each response arrives** — a slow environment never
 * blocks a fast one. Each entry in `results` flips from `isLoading` to either
 * `tenants` or `error` on its own; `isLoading` (top level) stays `true` until
 * every environment has settled.
 *
 * The environment list itself comes from `useConfig()`, so the requests only
 * start once the public config has loaded.
 */
export function useTenants(): {
	results: TenantsResult[];
	isLoading: boolean;
} {
	const { data: config } = useConfig();
	const environments = config?.environments;
	const [results, setResults] = useState<TenantsResult[]>([]);

	useEffect(() => {
		if (!environments) return;

		let active = true;
		// Seed every environment as loading up front, so the UI can render the
		// full list of placeholders immediately while the requests are in flight.
		setResults(
			environments.map((environment) => ({ environment, isLoading: true })),
		);

		// Settle one environment's slice in place, keyed by its stable `name`,
		// without disturbing the others — this is what makes results progressive.
		const settle = (name: string, patch: Partial<TenantsResult>): void => {
			if (!active) return;
			setResults((prev) =>
				prev.map((result) =>
					result.environment.name === name ? { ...result, ...patch } : result,
				),
			);
		};

		// Fire all requests at once; each updates its own slice on completion.
		// `authFetch` sees an absolute URL, so it routes the call through the BFF
		// proxy (attaching the access token) — see `lib/authFetch`.
		for (const environment of environments) {
			authFetch(`${environment.apiPath}/enhancedTenants`)
				.then((response) => {
					if (!response.ok) throw new Error(`HTTP ${response.status}`);
					return response.json() as Promise<EnhancedTenant[]>;
				})
				.then((tenants) => settle(environment.name, { isLoading: false, tenants }))
				.catch((error) =>
					settle(environment.name, {
						isLoading: false,
						error: toMessage(error),
					}),
				);
		}

		return () => {
			active = false;
		};
	}, [environments]);

	const isLoading =
		config == null ||
		((environments?.length ?? 0) > 0 && results.length === 0) ||
		results.some((result) => result.isLoading);

	return { results, isLoading };
}
