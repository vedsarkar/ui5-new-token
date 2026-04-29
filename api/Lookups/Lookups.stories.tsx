import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import spec from "./lookups.spec.json";

const BASE = "https://{environment}.reltio.com";

const api = apiMetaConfig({
	url: `${BASE}/reltio/api/{tenantId}/lookups`,
	spec,
	defaultPath: "/reltio/api/{tenantId}/lookups",
});

const meta = preview.meta({
	...api,
	title: "API/Lookups",
	description:
		"Manage reference data (lookup tables) — code-value pairs for data standardization and UI rendering.",
});

// ── Primary CRUD ──────────────────────────────────────

export const GetLookups = meta.story({
	name: "GET /lookups",
	args: {
		description:
			"Retrieves all lookups for the tenant. Use `source` param to filter: ALL (default), RDM, or MDM.",
		request: {
			method: "GET",
		},
	},
});

export const CreateLookups = meta.story({
	name: "POST /lookups",
	args: {
		description:
			"Creates lookups for the tenant. **Replaces** existing lookups of the same type. Use PUT to merge instead.",
		request: {
			method: "POST",
			body: {
				type: "COUNTRY_CD",
				lookup: {
					lookCode: "US",
					lookupValue: { displayName: "United States" },
				},
			},
		},
	},
});

export const UpdateLookups = meta.story({
	name: "PUT /lookups",
	args: {
		description:
			"Updates lookups by merging with existing data. Creates if not yet defined.",
		request: {
			method: "PUT",
			body: {
				type: "COUNTRY_CD",
				lookup: {
					lookCode: "CA",
					lookupValue: { displayName: "Canada" },
				},
			},
		},
	},
});

export const PurgeLookups = meta.story({
	name: "DELETE /lookups",
	args: {
		description:
			"Purges **all** lookups in the tenant. **Irreversible** — removes all reference data.",
		request: {
			method: "DELETE",
		},
	},
});

// ── Resolve & Validate ────────────────────────────────

export const ResolveLookup = meta.story({
	name: "POST /lookups/resolve",
	args: {
		description:
			"Resolves a lookup code to its canonical display value. Essential for rendering coded attributes in UIs.",
		request: {
			url: `${BASE}/reltio/api/{tenantId}/lookups/resolve`,
			method: "POST",
			body: {
				type: "COUNTRY_CD",
				codeValue: "US",
			},
		},
	},
});

export const ValidateLookups = meta.story({
	name: "POST /lookups/validate",
	args: {
		description:
			"Validates lookup codes — returns OK or ERROR for each type+code pair. Use for data quality checks during ingestion.",
		request: {
			url: `${BASE}/reltio/api/{tenantId}/lookups/validate`,
			method: "POST",
			body: {
				codeValues: [
					{ type: "COUNTRY_CD", codeValue: "US" },
					{ type: "COUNTRY_CD", codeValue: "XX" },
				],
			},
		},
	},
});

// ── RDM Service ───────────────────────────────────────

export const ListLookupCodes = meta.story({
	name: "GET /lookups/{tenantId}",
	args: {
		description:
			"Lists all lookup codes with pagination and filtering (by type, code, value, dates, sources). Includes contributor sources, localization, and hierarchy info.",
		request: {
			url: `${BASE}/lookups/{tenantId}`,
			method: "GET",
		},
	},
});

export const GetLookupTotal = meta.story({
	name: "GET /lookups/{tenantId}/_total",
	args: {
		description:
			"Returns the total count of lookup values matching filter criteria.",
		request: {
			url: `${BASE}/lookups/{tenantId}/_total`,
			method: "GET",
		},
	},
});

export const GetLookupByTypeAndCode = meta.story({
	name: "GET /lookups/{tenantId}/{type}/{code}",
	args: {
		description:
			"Retrieves a specific lookup value by type and code. Returns canonical value, contributor sources, and custom attributes.",
		request: {
			url: `${BASE}/lookups/{tenantId}/{type}/{code}`,
			method: "GET",
		},
	},
});

export const DeleteLookupByTypeAndCode = meta.story({
	name: "DELETE /lookups/{tenantId}/{type}/{code}",
	args: {
		description: "Deletes a specific lookup value by its type and code.",
		request: {
			url: `${BASE}/lookups/{tenantId}/{type}/{code}`,
			method: "DELETE",
		},
	},
});
