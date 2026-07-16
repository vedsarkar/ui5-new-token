"use client";

import type { TenantEntry } from "@reltio/design/components";
import { useEffect, useMemo, useState } from "react";
import { authFetch } from "@/lib/authFetch";
import { useConfig } from "@/lib/useConfig";

// Config-service namespace holding the shared Console/admin configuration —
// the source of the environment list (see `adminToolsConfig`).
const CONFIG_NAMESPACE = "adminToolsConfig";

// A configured Reltio environment, as stored in `adminToolsConfig.environments`.
// Only the fields this hook and its consumers use are typed; the payload carries
// many more optional per-environment fields (rdmPath, mlApi, …) we don't need.
export type Environment = {
	label: string;
	name: string;
	apiPath: string;
};

// The slice of `adminToolsConfig` we read. We project only `environments` from
// the (large) config so the rest of the document is never fetched.
type AdminToolsConfig = {
	environments: Environment[];
};

// One tenant as returned by `{apiPath}/enhancedTenants`. The endpoint responds
// with an array of these; it carries no environment field — the environment is
// implied by which endpoint answered, so we attach it ourselves downstream.
export type EnhancedTenant = {
	tenantId: string;
	tenantName: string;
	customerName: string;
};

// Per-environment slice of the in-flight fetch. Each starts as `isLoading` and
// settles independently into either `tenants` (the `enhancedTenants` payload) or
// an `error` message. Internal to this hook — consumers get the aggregated
// `data` list, not these per-environment slices.
type TenantsResult = {
	environment: Environment;
	isLoading: boolean;
	tenants?: EnhancedTenant[];
	error?: string;
};

const toMessage = (error: unknown): string =>
	error instanceof Error ? error.message : String(error);

// A `TenantEntry` (what `TenantSelector` renders) enriched with the environment's
// machine `name`. The selector shows `environment` (the human `label`), while
// callers that build URLs or query params need the `name` — e.g. the console
// deep-links and the `env` query param expect the identifier, not the label.
export type TenantOption = TenantEntry & {
	/** Machine identifier of the environment (e.g. `"EUS102-DEVELOP"`). */
	environmentName: string;
};

/**
 * Fetches the tenants available to the signed-in user across **every**
 * configured environment via `{apiPath}/enhancedTenants` and returns them as a
 * single flat `TenantOption[]` ready to feed straight into `TenantSelector`.
 *
 * All environments are queried **in parallel** (one BFF proxy call each), and
 * results stream in **as each response arrives** — a slow environment never
 * blocks a fast one. As each response settles it is folded into the aggregated
 * `data` list; `isLoading` stays `true` until every environment has settled.
 *
 * The `enhancedTenants` payload has no environment field, so each tenant is
 * stamped with its source environment's `label` (the picker's "Environment"
 * column) and its machine `name` (`environmentName`, for URLs/query params).
 * Tenant ids are globally unique in Reltio, but we still de-dupe defensively so
 * the selector never sees a duplicate row key.
 *
 * The environment list itself comes from the shared `adminToolsConfig` in the
 * config service (only its `environments` field is projected), so the requests
 * only start once that config has loaded.
 */
export function useTenants(): {
	data: TenantOption[];
	isLoading: boolean;
} {
	const { data: config } = useConfig<AdminToolsConfig>({
		namespace: CONFIG_NAMESPACE,
		projection: { environments: 1 },
	});
	const environments = config?.data.environments;
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
					return response.json() as Promise<unknown>;
				})
				.then((tenants) => {
					// Some environments can answer `200` with a non-array payload (e.g.
					// an error/permission object). Fold that into this environment's
					// error slice instead of letting a non-iterable value crash the
					// aggregation for every environment.
					if (!Array.isArray(tenants)) {
						throw new Error("Unexpected enhancedTenants response");
					}
					settle(environment.name, {
						isLoading: false,
						tenants: tenants as EnhancedTenant[],
					});
				})
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

	const data = useMemo<TenantOption[]>(() => {
		const byId = new Map<string, TenantOption>();
		for (const result of results) {
			for (const tenant of result.tenants ?? []) {
				if (!byId.has(tenant.tenantId)) {
					byId.set(tenant.tenantId, {
						customerName: tenant.customerName,
						tenantName: tenant.tenantName,
						tenantId: tenant.tenantId,
						environment: result.environment.label,
						environmentName: result.environment.name,
					});
				}
			}
		}
		return [...byId.values()];
	}, [results]);

	return { data, isLoading };
}
