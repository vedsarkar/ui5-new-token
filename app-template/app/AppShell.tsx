"use client";

import type { CheckTokenResponse } from "@reltio/auth/types";
import {
	BusyIndicator,
	ShellBar,
	TenantSelector,
	UserMenu,
} from "@reltio/design/components";
import type { TenantEntry } from "@reltio/design/components";
import { type CSSProperties, type ReactNode, useMemo, useState } from "react";
import { useFetch } from "@/lib/useFetch";
import { useTenants } from "@/lib/useTenants";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const fullScreen: CSSProperties = {
	display: "flex",
	height: "100vh",
	alignItems: "center",
	justifyContent: "center",
};

// Send the browser to the logout flow; afterwards it lands on the app root
// (which then bounces to login). The `returnTo` is client-set — only the
// browser knows the real public URL.
const signOut = (): void => {
	const returnTo = encodeURIComponent(`${window.location.origin}${BASE_PATH}/`);
	window.location.href = `${BASE_PATH}/auth/logout?returnTo=${returnTo}`;
};

/**
 * Application chrome and the client-first session gate in one.
 *
 * It fetches the signed-in user with `useFetch` (the browser's first request,
 * `POST /auth/checkToken`) — no context/provider: any other component that needs
 * the user just calls `useFetch` for the same URL and shares the deduplicated
 * (and, later, cached) result. Until it resolves the user sees a blank screen
 * with a preloader; a `401` is handled inside `useFetch` (refresh, then login).
 */
export function AppShell({ children }: { children: ReactNode }) {
	const { data: session, error } = useFetch<CheckTokenResponse>(
		"/auth/checkToken",
		{ method: "POST" },
	);

	// Aggregate the tenants fetched across every environment (see `useTenants`)
	// into the flat `TenantEntry[]` the `TenantSelector` expects. The
	// `enhancedTenants` payload has no environment field, so we stamp each tenant
	// with its source environment's label — that becomes the picker's
	// "Environment" column. Tenant ids are globally unique in Reltio, but we
	// still de-dupe defensively so the selector never sees a duplicate row key.
	const { results, isLoading: tenantsLoading } = useTenants();
	const tenants = useMemo<TenantEntry[]>(() => {
		const byId = new Map<string, TenantEntry>();
		for (const result of results) {
			for (const tenant of result.tenants ?? []) {
				if (!byId.has(tenant.tenantId)) {
					byId.set(tenant.tenantId, {
						customerName: tenant.customerName,
						tenantName: tenant.tenantName,
						tenantId: tenant.tenantId,
						environment: result.environment.label,
					});
				}
			}
		}
		return [...byId.values()];
	}, [results]);
	const [selectedTenantId, setSelectedTenantId] = useState<string>();

	if (error) {
		return (
			<div style={{ ...fullScreen, color: "var(--sapNegativeColor)" }}>
				Could not reach the server. Please try again later.
			</div>
		);
	}

	if (!session) {
		return (
			<div style={fullScreen}>
				<BusyIndicator active delay={0} />
			</div>
		);
	}

	const { username, email } = session.user;

	return (
		<>
			<ShellBar
				primaryTitle="App Template"
				tenantSelector={
					<TenantSelector
						tenants={tenants}
						selectedTenantId={selectedTenantId}
						onSelect={(tenant) => setSelectedTenantId(tenant.tenantId)}
						loading={tenantsLoading}
					/>
				}
				userMenu={
					<UserMenu
						user={{ username, email }}
						appVersion="0.1.0"
						onSignOut={signOut}
					/>
				}
			/>
			<main
				style={{ maxWidth: "760px", margin: "0 auto", padding: "24px 16px" }}
			>
				{children}
			</main>
		</>
	);
}
