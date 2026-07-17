import type { RequestHandler } from "msw";
import { checkTokenSuccess } from "./auth";
import {
	adminToolsConfigSuccess,
	commonSuccess,
	configCatchAllSuccess,
	consoleAppsSuccess,
} from "./config";
import { mockTenants, tenantsSuccess } from "./tenants";

export * from "./auth";
export * from "./config";
export * from "./tenants";

/**
 * Default mock map — every key is one API endpoint, every value is the
 * "success" handler for that endpoint.
 *
 * Stories override individual endpoints by passing a partial map to
 * `handlers()` — only the keys you provide are replaced.
 */
const defaultMocks = {
	checkToken: checkTokenSuccess,
	adminToolsConfig: adminToolsConfigSuccess,
	consoleApps: consoleAppsSuccess,
	common: commonSuccess,
	configCatchAll: configCatchAllSuccess,
	tenants: tenantsSuccess,
} satisfies Record<string, RequestHandler>;

export type MockMap = typeof defaultMocks;

/**
 * Compose MSW handlers from defaults + per-story overrides.
 *
 * @example
 * ```ts
 * // All defaults (success responses)
 * msw: { handlers: handlers() }
 *
 * // Override one endpoint
 * msw: { handlers: handlers({ checkToken: checkTokenUnauthorized }) }
 *
 * // Override several
 * msw: { handlers: handlers({
 *   checkToken: checkTokenUnauthorized,
 *   tenants: tenantsEmpty,
 * }) }
 *
 * // Add extra handlers alongside defaults
 * msw: { handlers: handlers({}, [
 *   http.get("/api/my-endpoint", () => HttpResponse.json({ ... })),
 * ]) }
 * ```
 */
export function handlers(
	overrides?: Partial<MockMap>,
	extra?: RequestHandler[],
): RequestHandler[] {
	const merged = { ...defaultMocks, ...overrides };
	const ordered = [
		merged.checkToken,
		merged.adminToolsConfig,
		merged.consoleApps,
		merged.common,
		merged.configCatchAll,
		merged.tenants,
	];
	if (extra?.length) ordered.push(...extra);
	return ordered;
}

/**
 * Default tenant context for the `withAppShell` decorator.
 * Derived from the first mock tenant so stories don't hardcode IDs.
 */
export const defaultContext = {
	tenant: mockTenants[0].tenantId,
	env: "dev",
	customer: mockTenants[0].customerName,
};
