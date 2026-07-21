import type { ReactNode } from "react";
import type { HtmlProps } from "@/utils/types";

export type TenantEntry = {
	/** Customer (organisation) display name. First column and default sort key. */
	customerName: string;
	/** Tenant display name within the customer. */
	tenantName: string;
	/** Tenant identifier. Matched against `selectedTenantId`; may repeat across
	 * environments — pair with `environment` (and `selectedEnvironment`) for a unique row.
	 */
	tenantId: string;
	/** Environment the tenant lives in (e.g. `"EUS102-DEVELOP"`). */
	environment: string;
};

export type TenantSelectorProps = HtmlProps<
	"div",
	{
		/** Tenants offered in the picker dialog. Filtered and sorted client-side. */
		tenants: TenantEntry[];
		/** `tenantId` of the currently selected tenant. Together with
		 * `selectedEnvironment`, drives the trigger label and the highlighted row.
		 * When omitted (or when it matches no entry), the trigger renders the
		 * placeholder `"Select tenant"` with a dropdown caret. The component holds no
		 * shadow selection state — these props are the single source of truth.
		 */
		selectedTenantId?: string;
		/** `environment` of the currently selected tenant. Disambiguates rows that share
		 * the same `tenantId` across environments. When omitted, the first matching
		 * `tenantId` wins (legacy behaviour). Prefer always passing it when the
		 * tenant list can contain the same id in more than one environment.
		 */
		selectedEnvironment?: string;
		/** Fired when the user picks a row. Receives the chosen `TenantEntry`. The component
		 * closes the dialog after invoking it. The trigger label format is fixed to
		 * `"${customerName} - ${tenantName} - ${environment}"` once a tenant is selected.
		 */
		onSelect: (tenant: TenantEntry) => void;
		/** Custom trigger that opens the dialog. When a React element is supplied, the
		 * component injects an `onClick` handler (merged with any `onClick` already on
		 * the element) that opens the dialog — so the element should be interactive.
		 * Defaults to the built-in transparent `Button` showing the selected-tenant
		 * label, a leading `building` icon, and a dropdown caret.
		 */
		trigger?: ReactNode;
		/** When `true`, the default trigger button shows a loading spinner. Use it while
		 * the tenant list (or the active tenant) is being fetched, before the picker is
		 * opened. Ignored when a custom `trigger` is supplied — the consumer owns that
		 * element's loading state.
		 */
		loading?: boolean;
	}
>;
