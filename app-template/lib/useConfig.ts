"use client";

import type { TUseFetch } from "@reltio/design/hooks";
import type { PublicConfig } from "@/app/api/config/route";
import { useFetch } from "@/lib/useFetch";

// Shape returned by the config service for a single configuration
// (`GET /service/:namespace`): metadata plus the stored config under `data`.
export type RemoteConfig<T = unknown> = {
	createdAt: number;
	createdBy?: string;
	data: T;
};

// Options for reading a shared configuration from the config service via the
// `/api/config/service/<namespace>` proxy. Without `namespace`, `useConfig`
// returns the app's own public config (`/api/config`) as before.
export type UseConfigOptions = {
	// Config-service namespace, e.g. `adminToolsConfig`. Omit for the local config.
	namespace?: string;
	// Config-service query params. Defaults mirror the service's own defaults.
	tenant?: string;
	environment?: string;
	// Fall back to default tokens when the exact env/tenant config is missing.
	default?: boolean;
	// JSON projection to filter the returned `data` fields (field names without
	// the `data.` prefix), e.g. `{ features: { analytics: 1 } }`. Handy for
	// pulling just a slice out of a large configuration.
	projection?: Record<string, unknown>;
};

function buildServiceConfigUrl({
	namespace,
	tenant = "default",
	environment = "default",
	default: fallback = true,
	projection,
}: UseConfigOptions & { namespace: string }): string {
	const params = new URLSearchParams({
		tenant,
		environment,
		default: String(fallback),
	});
	if (projection) params.set("projection", JSON.stringify(projection));
	return `/api/config/service/${encodeURIComponent(namespace)}?${params.toString()}`;
}

/**
 * Client hook for configuration. Thin wrapper over `lib/useFetch`, so it
 * inherits base-path prefixing and the Reltio session lifecycle
 * (401 → refresh → retry → login).
 *
 * - `useConfig()` — the app's own public config (`/api/config`). The server
 *   route decides which parts of the config are public; the browser only ever
 *   sees `PublicConfig`.
 * - `useConfig({ namespace, ... })` — a shared configuration read from the
 *   internal config service through the `/api/config/service/<namespace>` proxy,
 *   authenticated as the app's API client. Returns `RemoteConfig<T>`; pass the
 *   expected `data` shape as `T`.
 */
export function useConfig(): TUseFetch<PublicConfig, unknown>;
export function useConfig<T = unknown>(
	options: UseConfigOptions & { namespace: string },
): TUseFetch<RemoteConfig<T>, unknown>;
export function useConfig<T = unknown>(
	options?: UseConfigOptions,
): TUseFetch<PublicConfig | RemoteConfig<T>, unknown> {
	const url = options?.namespace
		? buildServiceConfigUrl(options as UseConfigOptions & { namespace: string })
		: "/api/config";
	return useFetch<PublicConfig | RemoteConfig<T>>(url);
}
