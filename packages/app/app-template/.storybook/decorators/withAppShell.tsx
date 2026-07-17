import type { Decorator } from "@storybook/react-vite";
import { useMemo } from "react";
import { AppShell } from "../../app/AppShell";
import { defaultContext } from "../mocks";
import { NavigationContext } from "../mocks/next-navigation";

/**
 * Storybook decorator that wraps a story in the full AppShell chrome
 * (header, sidebar, content area) — so page stories render exactly as
 * they would inside the running app.
 *
 * Configurable via `parameters.appShell`:
 *
 * ```ts
 * export const MyPage: Story = {
 *   parameters: {
 *     appShell: {
 *       pathname: "/entities",
 *       tenant: "custom-tenant-id",
 *     },
 *   },
 * };
 * ```
 */
export const withAppShell: Decorator = (Story, context) => {
	const {
		pathname = "/",
		tenant = defaultContext.tenant,
		env = defaultContext.env,
		customer = defaultContext.customer,
	} = (context.parameters.appShell as Record<string, string>) ?? {};

	const navigation = useMemo(() => {
		// Only include non-empty values — AppShell reads
		// `searchParams.get("tenant")` and treats any string (including "")
		// as a selected tenant. Omitting the key makes `.get()` return `null`,
		// triggering the "Select a tenant" state.
		const searchParams = new URLSearchParams();
		if (tenant) searchParams.set("tenant", tenant);
		if (env) searchParams.set("env", env);
		if (customer) searchParams.set("customer", customer);

		return { pathname, searchParams, params: {} };
	}, [pathname, tenant, env, customer]);

	return (
		<NavigationContext.Provider value={navigation}>
			<AppShell>
				<Story />
			</AppShell>
		</NavigationContext.Provider>
	);
};
