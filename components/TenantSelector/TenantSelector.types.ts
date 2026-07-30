import type { ReactNode } from "react";
import type { HtmlProps } from "@/utils/types";

export type TenantEntry = {
	/** Customer (organisation) display name. First column and default sort key. */
	customerName: string;
	/** Tenant display name within the customer. */
	tenantName: string;
	/** Tenant identifier. Matched against `selectedTenantId`; may repeat across
	 * environments — pair with `environmentId` (and `selectedEnvironmentId`) for a unique row.
	 */
	tenantId: string;
	/** Human-readable environment name shown in the Environment column and the
	 * trigger label (e.g. `"Develop (EUS102)"`). When omitted, falls back to
	 * {@link TenantEntry.environment}.
	 */
	environmentName?: string;
	/** Machine environment identifier (e.g. `"EUS102-DEVELOP"`). Matched against
	 * `selectedEnvironmentId` to disambiguate rows that share a `tenantId`.
	 * When omitted, falls back to {@link TenantEntry.environment}.
	 */
	environmentId?: string;
	/**
	 * @deprecated Prefer `environmentName` (display) and `environmentId` (identity).
	 * Kept for backward compatibility — when the new fields are omitted, this
	 * value is used for both display and row identity.
	 */
	environment?: string;
};

export type TenantSelectorProps = HtmlProps<
	"div",
	{
		/** Tenants offered in the picker dialog. Filtered and sorted client-side. */
		tenants: TenantEntry[];
		/** `tenantId` of the currently selected tenant. Together with
		 * `selectedEnvironmentId` (or deprecated `selectedEnvironment`), drives the
		 * trigger label and the highlighted row. When omitted (or when it matches no
		 * entry), the trigger renders the placeholder `"Select tenant"` with a
		 * dropdown caret. The component holds no shadow selection state — these props
		 * are the single source of truth.
		 */
		selectedTenantId?: string;
		/** `environmentId` of the currently selected tenant. Disambiguates rows that
		 * share the same `tenantId` across environments. When omitted, falls back to
		 * `selectedEnvironment`, then the first matching `tenantId` wins (legacy
		 * behaviour). Prefer always passing it when the tenant list can contain the
		 * same id in more than one environment.
		 */
		selectedEnvironmentId?: string;
		/**
		 * @deprecated Prefer `selectedEnvironmentId`. Used when `selectedEnvironmentId`
		 * is omitted.
		 */
		selectedEnvironment?: string;
		/** Fired when the user picks a row. Receives the chosen `TenantEntry`. The component
		 * closes the dialog after invoking it. The trigger label format is fixed to
		 * `"${customerName} - ${tenantName} - ${environmentName}"` once a tenant is selected
		 * (`environmentName` falls back to `environment` when unset).
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
