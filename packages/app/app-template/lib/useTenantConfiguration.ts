"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useConfig } from "@/lib/useConfig";
import { useFetch } from "@/lib/useFetch";
import type { Environment } from "@/lib/useTenants";

// The slice of `adminToolsConfig` we read — only the environment list, which
// carries the per-environment Reltio API base path we build the request from.
type AdminToolsConfig = {
	environments: Environment[];
};

// The tenant's business (data-model) configuration, as returned by
// `GET {apiPath}/api/{tenantId}/configuration` (see `openApi/DataModel`). Only
// the fields the app renders are typed; the payload carries the full L3 data
// model (sources, matching, survivorship, …) which pages don't need here.
export type TenantConfiguration = {
	/** Business entity type definitions (e.g. Person, Organization). */
	entityTypes?: unknown[];
	/** Relationship type definitions connecting entities. */
	relationTypes?: unknown[];
	[key: string]: unknown;
};

// In-memory cache of tenant configurations, keyed by request URL (which encodes
// env + tenant). Business configuration changes very rarely, so once loaded it
// is reused for the lifetime of the tab until a full page reload.
const cache = new Map<string, TenantConfiguration>();

/**
 * Fetches the business (data-model) configuration of the currently selected
 * tenant, memoized in an in-memory cache.
 *
 * The selection lives in the URL (`env`/`tenant` query params, set by
 * `AppShell`), and the per-environment Reltio API base path comes from the
 * shared `adminToolsConfig` (only its `environments` field is projected, and the
 * request is deduplicated with `useTenants`). Once both are known the hook reads
 * `{apiPath}/api/{tenantId}/configuration` and returns the full configuration;
 * pages pick the slice they render (`entityTypes`, `relationTypes`, …).
 *
 * A cache hit passes `null` to `useFetch`, so revisiting a page for an
 * already-loaded tenant makes no request. Switching tenants reads (and caches)
 * a different URL.
 */
export function useTenantConfiguration(): {
	data?: TenantConfiguration;
	error?: string;
	isLoading: boolean;
} {
	const searchParams = useSearchParams();
	const tenantId = searchParams.get("tenant") ?? undefined;
	const environmentName = searchParams.get("env") ?? undefined;

	const { data: config } = useConfig<AdminToolsConfig>({
		namespace: "adminToolsConfig",
		projection: { environments: 1 },
	});
	const environments = config?.data.environments;

	// Resolve the selected environment's API base path from its machine `name`
	// (the `env` query param), the same identifier `useTenants` stamps on tenants.
	const apiPath = useMemo(
		() =>
			environments?.find((environment) => environment.name === environmentName)
				?.apiPath,
		[environments, environmentName],
	);

	// `null` while a tenant is selected but its environment API path hasn't
	// resolved yet — still waiting, so no request and `isLoading` below.
	const url =
		tenantId && apiPath ? `${apiPath}/api/${tenantId}/configuration` : null;

	const cached = url !== null ? cache.get(url) : undefined;
	const { data, error } = useFetch<TenantConfiguration, Error>(
		cached !== undefined ? null : url,
	);
	if (url !== null && cached === undefined && data !== undefined) {
		cache.set(url, data);
	}

	if (cached !== undefined) {
		return { data: cached, error: undefined, isLoading: false };
	}

	return {
		data,
		error: error?.message,
		// Loading while waiting for the URL, or until the request settles (the
		// underlying hook's initial `isLoading` is `false`).
		isLoading: url !== null && data === undefined && error === undefined,
	};
}
