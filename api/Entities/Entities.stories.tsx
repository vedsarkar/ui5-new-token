import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import spec from "./entities.spec.json";

const BASE = "https://{environment}.reltio.com/reltio/api/{tenantId}";

const api = apiMetaConfig({
	url: `${BASE}/entities`,
	spec,
	defaultPath: "/entities",
});

const meta = preview.meta({
	...api,
	title: "API/Entities",
	description:
		"Full lifecycle management for entity records (profiles) — create, read, update, delete, search, cleanse, and specialized operations like Search Before Create.",
});

// ── CRUD ──────────────────────────────────────────────

export const CreateEntities = meta.story({
	name: "POST /entities",
	args: {
		description:
			"Creates one or more new entity profiles. Each entity must specify a type, at least one crosswalk (source system linkage), and attributes. Matching rules are evaluated automatically after creation.",
		request: {
			method: "POST",
			body: [
				{
					type: "configuration/entityTypes/Person",
					attributes: {
						FirstName: [{ value: "John" }],
						LastName: [{ value: "Smith" }],
					},
					crosswalks: [
						{
							type: "configuration/entityTypes/Person",
							value: "CRM-12345",
							sourceTable: "CRM",
						},
					],
				},
			],
		},
	},
});

export const GetEntities = meta.story({
	name: "GET /entities",
	args: {
		description:
			"Retrieves a list of entities, optionally filtered by RQL expression (`filter`), full-text search (`q`), entity type (`type`), with `offset` and `max` pagination.",
		request: {
			method: "GET",
		},
	},
});

export const GetEntity = meta.story({
	name: "GET /entities/{entityId}",
	args: {
		description:
			"Retrieves a single entity profile by URI, including all attributes (golden record values), crosswalks, and metadata. Use the `options` parameter to control response detail.",
		request: {
			url: `${BASE}/entities/{entityId}`,
			method: "GET",
		},
	},
});

export const UpdateEntity = meta.story({
	name: "POST /entities/{entityId}/_update",
	args: {
		description:
			"Applies partial updates to an existing entity. Send only the attributes and crosswalks that need to change — survivorship is re-evaluated after the update.",
		request: {
			url: `${BASE}/entities/{entityId}/_update`,
			method: "POST",
			body: {
				type: "configuration/entityTypes/Person",
				attributes: {
					Email: [{ value: "john.smith@example.com" }],
				},
				crosswalks: [
					{
						type: "configuration/entityTypes/Person",
						value: "CRM-12345",
						sourceTable: "CRM",
					},
				],
			},
		},
	},
});

export const DeleteEntities = meta.story({
	name: "DELETE /entities",
	args: {
		description:
			"Deletes entities specified via query parameters. **Irreversible** — consider crosswalk end-dating instead for production use.",
		request: {
			method: "DELETE",
		},
	},
});

export const DeleteEntitiesPost = meta.story({
	name: "POST /entities/_delete",
	args: {
		description:
			"Deletes entities by URIs specified in the request body. Use this when the list of URIs exceeds URL length limits.",
		request: {
			url: `${BASE}/entities/_delete`,
			method: "POST",
			body: {
				uris: ["entities/abc123", "entities/def456"],
			},
		},
	},
});

// ── Ingestion ─────────────────────────────────────────

export const SearchBeforeCreate = meta.story({
	name: "POST /entities/_conditional",
	args: {
		description:
			"Search Before Create — the recommended ingestion approach. Checks match rules before creating: creates if no match, updates if one match, merges into best match if multiple matches found.",
		request: {
			url: `${BASE}/entities/_conditional`,
			method: "POST",
			body: [
				{
					type: "configuration/entityTypes/Person",
					attributes: {
						FirstName: [{ value: "John" }],
						LastName: [{ value: "Smith" }],
						Email: [{ value: "john.smith@example.com" }],
					},
					crosswalks: [
						{
							type: "configuration/entityTypes/Person",
							value: "ERP-67890",
							sourceTable: "ERP",
						},
					],
				},
			],
		},
	},
});

// ── Lookup ────────────────────────────────────────────

export const GetEntityByCrosswalk = meta.story({
	name: "GET /entities/_byCrosswalk/{crosswalkValue}",
	args: {
		description:
			"Looks up entities by source system record identifier. The primary way external systems find their records in Reltio.",
		request: {
			url: `${BASE}/entities/_byCrosswalk/{crosswalkValue}`,
			method: "GET",
		},
	},
});

export const GetEntityByReltioId = meta.story({
	name: "GET /entities/_byReltioId/{reltioId}",
	args: {
		description:
			"Retrieves an entity by its human-readable Reltio ID — a stable, auto-generated identifier unique within the tenant.",
		request: {
			url: `${BASE}/entities/_byReltioId/{reltioId}`,
			method: "GET",
		},
	},
});

export const GetEntitiesByUris = meta.story({
	name: "POST /entities/_byUris",
	args: {
		description:
			"Fetches multiple entities by URIs in a single request. More efficient than individual GET calls for known entity sets.",
		request: {
			url: `${BASE}/entities/_byUris`,
			method: "POST",
			body: {
				uris: ["entities/abc123", "entities/def456"],
			},
		},
	},
});

export const CloneEntity = meta.story({
	name: "POST /entities/{entityId}/_clone",
	args: {
		description:
			"Creates a deep copy of an entity profile with a new URI. Useful for testing or splitting incorrectly merged records.",
		request: {
			url: `${BASE}/entities/{entityId}/_clone`,
			method: "POST",
		},
	},
});

// ── Diagnostics ───────────────────────────────────────

export const GetRawEntity = meta.story({
	name: "GET /entities/{entityId}/_raw",
	args: {
		description:
			"Returns the raw internal representation before survivorship resolution. A diagnostic endpoint for understanding why a particular golden record value was chosen.",
		request: {
			url: `${BASE}/entities/{entityId}/_raw`,
			method: "GET",
		},
	},
});

export const GetEntityWithSurvivorship = meta.story({
	name: "POST /entities/{entityId}/_get_with_survivorship_rules",
	args: {
		description:
			"Retrieves an entity with detailed survivorship rule evaluation — shows which strategy was applied to each attribute and which source value won.",
		request: {
			url: `${BASE}/entities/{entityId}/_get_with_survivorship_rules`,
			method: "POST",
		},
	},
});

// ── Search & Count ────────────────────────────────────

export const GetEntityTotal = meta.story({
	name: "GET /entities/_total",
	args: {
		description:
			"Returns the total count of entities matching filter criteria. Faster than fetching results when you only need the count — use for search result counts and data growth metrics.",
		request: {
			url: `${BASE}/entities/_total`,
			method: "GET",
		},
	},
});

export const BatchSearchEntities = meta.story({
	name: "GET /entities/_segmentation",
	args: {
		description:
			"Batch search optimized for segmentation workflows. Returns lightweight entity summaries instead of full profiles.",
		request: {
			url: `${BASE}/entities/_segmentation`,
			method: "GET",
		},
	},
});

export const ScanEntities = meta.story({
	name: "POST /entities/v2/_scan",
	args: {
		description:
			"Key-based pagination for large result sets. Uses a scroll cursor instead of offset — provides consistent performance for deep pagination. Ideal for export pipelines and sync jobs.",
		request: {
			url: `${BASE}/entities/v2/_scan`,
			method: "POST",
			body: {
				max: 100,
			},
		},
	},
});

export const GetEntityTotalV2 = meta.story({
	name: "GET /entities/v2/_total",
	args: {
		description:
			"Returns the total count for a batch search query. Companion to `POST /entities/v2/_scan` — check the total before starting a scan iteration.",
		request: {
			url: `${BASE}/entities/v2/_total`,
			method: "GET",
		},
	},
});

export const PredicateQuery = meta.story({
	name: "POST /{objectType}/_predicateQuery",
	args: {
		description:
			"Advanced predicate-based query with nested logical operators (`and`, `or`, `not`) and rich comparison operators (`eq`, `like`, `between`, `in`). More expressive than RQL for complex filtering.",
		request: {
			url: `${BASE}/{objectType}/_predicateQuery`,
			method: "POST",
			body: {
				predicate: {
					operator: "and",
					children: [
						{
							operator: "eq",
							attributePath: "attributes.FirstName.value",
							value: "John",
						},
						{
							operator: "like",
							attributePath: "attributes.LastName.value",
							value: "Smi%",
						},
					],
				},
				options: {
					max: 20,
					offset: 0,
				},
			},
		},
	},
});

// ── Cleansing ─────────────────────────────────────────

export const CleanseOnTheFly = meta.story({
	name: "POST /entities/cleanse",
	args: {
		description:
			"Cleanses entity data on-the-fly without persisting. Previews cleansing results before committing data. Stateless — nothing is stored.",
		request: {
			url: `${BASE}/entities/cleanse`,
			method: "POST",
			body: {
				type: "configuration/entityTypes/Person",
				attributes: {
					FirstName: [{ value: "john" }],
					LastName: [{ value: "SMITH" }],
				},
			},
		},
	},
});

export const BatchCleanseOnTheFly = meta.story({
	name: "POST /entities/batchcleanse",
	args: {
		description:
			"Batch variant of on-the-fly cleansing. Validates multiple records through the tenant's cleansing rules before ingestion.",
		request: {
			url: `${BASE}/entities/batchcleanse`,
			method: "POST",
			body: [
				{
					type: "configuration/entityTypes/Person",
					attributes: {
						FirstName: [{ value: "john" }],
					},
				},
				{
					type: "configuration/entityTypes/Person",
					attributes: {
						FirstName: [{ value: "jane" }],
					},
				},
			],
		},
	},
});
