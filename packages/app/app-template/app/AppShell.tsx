"use client";

import type { CheckTokenResponse } from "@reltio/auth/types";
import {
	AppNavigation,
	AppSelector,
	BusyIndicator,
	Button,
	IllustratedMessage,
	ShellBar,
	SideNavigation,
	SideNavigationItem,
	TenantSelector,
	UserMenu,
} from "@reltio/design/components";
// Fiori ships every illustration as a separate lazy module — the `name` prop
// alone is not enough, so the referenced illustration must be side-effect
// imported in the file that mounts the IllustratedMessage.
import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js";
import type {
	AppEntry,
	AppNavigationGroup,
	TenantEntry,
} from "@reltio/design/components";
import businessObjectsExperienceIcon from "@reltio/design/icons/sap/business-objects-experience";
import homeIcon from "@reltio/design/icons/sap/home";
import orgChartIcon from "@reltio/design/icons/sap/org-chart";
import settingsIcon from "@reltio/design/icons/sap/settings";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { useConfig } from "@/lib/useConfig";
import { useFetch } from "@/lib/useFetch";
import { useHref } from "@/lib/useHref";
import { useLinks } from "@/lib/useLinks";
import { useTenants } from "@/lib/useTenants";
import styles from "./AppShell.module.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// In-app navigation. Each route renders a placeholder page (see
// `app/entities` and `app/relationships`) so the persistent `SideNavigation`
// can demonstrate client-side page transitions. `path` is compared against the
// (base-path-less) pathname to drive the selected state; `href` carries the
// base path.
const NAV_ITEMS: { text: string; icon: string; path: string }[] = [
	{ text: "Welcome", icon: homeIcon, path: "/" },
	{ text: "Entities", icon: businessObjectsExperienceIcon, path: "/entities" },
	{ text: "Relationships", icon: orgChartIcon, path: "/relationships" },
];

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
	// Turn every in-app `<a href>` (including the ones UI5 renders in Shadow DOM,
	// e.g. `SideNavigation`) into a client-side Next navigation instead of a
	// full-page reload. See `lib/useLinks`.
	useLinks();

	// Builds hrefs carrying the current `env`/`tenant`/`customer` context, so the
	// links stay correct even when opened in a new tab (which bypasses the click
	// interceptor above). See `lib/useHref`.
	const href = useHref();

	const { data: session, error } = useFetch<CheckTokenResponse>(
		"/auth/checkToken",
		{ method: "POST" },
	);

	// The hook returns the tenants already aggregated across every environment
	// into the flat `TenantEntry[]` the `TenantSelector` expects.
	const { data: tenants, isLoading: tenantsLoading } = useTenants();

	// Selecting a tenant reflects the choice in the URL as `env`, `tenant` and
	// `customer` query parameters, so the picked tenant survives a refresh and
	// can be linked/bookmarked.
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	// The URL is the single source of truth for the selection: reading it from
	// `searchParams` (instead of local state) means the browser Back/Forward
	// buttons switch the active tenant, since they restore the previous query.
	const selectedTenantId = searchParams.get("tenant") ?? undefined;
	const selectedEnv = searchParams.get("env") ?? undefined;
	const selectedCustomer = searchParams.get("customer") ?? undefined;

	const handleSelectTenant = (tenant: TenantEntry): void => {
		// `tenant.environment` is the human label shown in the picker; the URL
		// needs the environment's machine `name`, so resolve it from the option
		// list (which carries both) by tenant id.
		const environmentName =
			tenants.find((option) => option.tenantId === tenant.tenantId)
				?.environmentName ?? tenant.environment;
		const params = new URLSearchParams(searchParams);
		params.set("env", environmentName);
		params.set("tenant", tenant.tenantId);
		params.set("customer", tenant.customerName);
		router.push(`${pathname}?${params.toString()}`);
	};

	// The app catalog is a shared configuration in the config service (see the
	// `consoleApps` namespace). Passing the selected tenant/environment makes the
	// service return that tenant's catalog (with `default=true` falling back to
	// the shared config), so the menu composition follows the active tenant.
	//
	// The returned URLs carry `${environment}`/`${tenant}` placeholders; we hand
	// the catalog straight to `AppNavigation` and let it interpolate them from
	// the `env`/`tenant` props below.
	const { data: appsConfig } = useConfig<AppNavigationGroup[]>({
		namespace: "consoleApps",
		tenant: selectedTenantId,
		environment: selectedEnv,
	});

	// Cross-product switcher (Hub, Console, RDM, Inbox, …) lives in the shared
	// `common` configuration. Its `uri`s embed `${environment}`/`${tenant}` in the
	// path as well as the query, so we let `AppSelector` interpolate them from the
	// `env`/`tenant` props rather than rewriting query params ourselves.
	const { data: commonConfig } = useConfig<{ apps: AppEntry[] }>({
		namespace: "common",
		tenant: selectedTenantId,
		environment: selectedEnv,
	});
	const productApps = commonConfig?.data.apps ?? [];

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
		<div className={styles.root}>
			<div className={styles.header}>
				<ShellBar
					primaryTitle="App Template"
					sideNavigation={
						<AppNavigation
							homeUrl={href("/")}
							apps={appsConfig?.data ?? []}
							tenant={selectedTenantId ?? ""}
							env={selectedEnv ?? ""}
						/>
					}
					tenantSelector={
						<TenantSelector
							tenants={tenants}
							selectedTenantId={selectedTenantId}
							onSelect={handleSelectTenant}
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
					notificationsUrl={`/notifications?tenant=${selectedTenantId}&env=${selectedEnv}&customer=${selectedCustomer}`}
				>
					<AppSelector
						apps={productApps}
						env={selectedEnv ?? ""}
						tenant={selectedTenantId ?? ""}
					/>
				</ShellBar>
			</div>
			<div className={styles.leftSide}>
				<SideNavigation accessibleName="Main navigation" collapsable>
					{NAV_ITEMS.map((item) => (
						<SideNavigationItem
							key={item.path}
							text={item.text}
							icon={item.icon}
							href={href(item.path)}
							selected={pathname === item.path}
						/>
					))}
				</SideNavigation>
			</div>
			<main className={styles.content}>
				{selectedTenantId ? (
					children
				) : (
					<IllustratedMessage
						name="NoData"
						titleText="Select a tenant"
						subtitleText="Choose a tenant from the selector above to start working."
					>
						<TenantSelector
							tenants={tenants}
							selectedTenantId={selectedTenantId}
							onSelect={handleSelectTenant}
							loading={tenantsLoading}
							trigger={<Button design="Emphasized">Select tenant</Button>}
						/>
					</IllustratedMessage>
				)}
			</main>
		</div>
	);
}
