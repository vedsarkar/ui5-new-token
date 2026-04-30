import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./Entities.spec.json";

const base = "https://{environment}.reltio.com/reltio/api/{tenantId}";
const entitiesUrl = `${base}/entities`;
const entityIdUrl = `${base}/entities/{id}`;
const segmentEntitiesUrl = `${base}/segments/{id}/entities`;
const byCrosswalkUrl = `${base}/entities/_byCrosswalk/{crosswalkValue}`;
const byReltioIdUrl = `${base}/entities/_byReltioId/{reltioId}`;

const sampleEntity = {
	type: "configuration/entityTypes/Individual",
	attributes: {
		FirstName: [{ value: "Jane" }],
		LastName: [{ value: "Doe" }],
	},
	crosswalks: [
		{
			type: "configuration/sources/Reltio",
			value: "individual-1",
		},
	],
};

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Entities",
	description:
		"Manage entities in a Reltio tenant — create, retrieve, search, update, clone, traverse, cleanse, reverse geocode, and delete entities, plus read entities by segment. Combines, in one place, the two POST creation endpoints exposed under the developer portal's Ingest module and the rest of the Entities tag from the Operate module.",
});

// --- Create ---

export const SaveEntities = meta.story({
	name: "POST /entities",
	...urlControls(entitiesUrl),
	args: {
		description:
			"Save Entities API creates entities. Accepts an array of entity objects and returns the created entities with their assigned URIs.",
		request: { method: "POST", url: entitiesUrl, body: [sampleEntity] },
	},
});

export const SearchBeforeCreateEntities = meta.story({
	name: "POST /entities/_conditional",
	...urlControls(entitiesUrl),
	args: {
		description:
			"Search Before Create Aggregated API. For each input object, the API first searches for an existing entity using the supplied match rules and crosswalks; if a match is found, the existing entity is updated, otherwise a new entity is created.",
		request: {
			method: "POST",
			url: `${entitiesUrl}/_conditional`,
			body: [sampleEntity],
		},
	},
});

// --- Retrieve ---

export const GetEntity = meta.story({
	name: "GET /entities/{id}",
	...urlControls(entityIdUrl),
	args: {
		description:
			"Get Single Entity API retrieves an entity object by URI from the tenant.",
		request: { method: "GET", url: entityIdUrl },
	},
});

export const GetEntityRaw = meta.story({
	name: "GET /entities/{id}/_raw",
	...urlControls(entityIdUrl),
	args: {
		description:
			"Get Single Entity API decompressed raw object by URI from the tenant.",
		request: { method: "GET", url: `${entityIdUrl}/_raw` },
	},
});

export const GetEntityWithSurvivorshipRules = meta.story({
	name: "POST /entities/{id}/_get_with_survivorship_rules",
	...urlControls(entityIdUrl),
	args: {
		description:
			"Get Single Entity API retrieves an entity object by URI from the tenant with survivorship rules applied at request time.",
		request: {
			method: "POST",
			url: `${entityIdUrl}/_get_with_survivorship_rules`,
			body: {},
		},
	},
});

export const GetEntityByCrosswalk = meta.story({
	name: "GET /entities/_byCrosswalk/{crosswalkValue}",
	...urlControls(byCrosswalkUrl),
	args: {
		description:
			"Retrieves entities containing the specified crosswalk (crosswalkValue, type, sourceTable).",
		request: { method: "GET", url: byCrosswalkUrl },
	},
});

export const GetEntityByReltioId = meta.story({
	name: "GET /entities/_byReltioId/{reltioId}",
	...urlControls(byReltioIdUrl),
	args: {
		description: "Retrieves entities containing the specified reltioId.",
		request: { method: "GET", url: byReltioIdUrl },
	},
});

export const GetEntitiesByUris = meta.story({
	name: "POST /entities/_byUris",
	...urlControls(entitiesUrl),
	args: {
		description:
			"Retrieves entities by URIs with the specified pagination of attributes.",
		request: {
			method: "POST",
			url: `${entitiesUrl}/_byUris`,
			body: { uris: ["entities/abc123"] },
		},
	},
});

// --- Search & Counts ---

export const SearchEntities = meta.story({
	name: "GET /entities",
	...urlControls(entitiesUrl),
	args: {
		description:
			"Search or Get Entities API retrieves entities. The response can include a maximum of 200 entities. If the request consists of the select parameter, ensure there is no space between the query parameters.",
		request: { method: "GET", url: entitiesUrl },
	},
});

export const SegmentationSearch = meta.story({
	name: "GET /entities/_segmentation",
	...urlControls(entitiesUrl),
	args: {
		description:
			"Batch search for entities using entity and interaction attributes. The response can include a maximum of 200 entities.",
		request: { method: "GET", url: `${entitiesUrl}/_segmentation` },
	},
});

export const TotalEntities = meta.story({
	name: "GET /entities/_total",
	...urlControls(entitiesUrl),
	args: {
		description:
			"Returns the total number of entities matching the specified filter criteria.",
		request: { method: "GET", url: `${entitiesUrl}/_total` },
	},
});

export const ScanEntitiesV2 = meta.story({
	name: "POST /entities/v2/_scan",
	...urlControls(entitiesUrl),
	args: {
		description: "Batch search for entities by key-based pagination.",
		request: { method: "POST", url: `${entitiesUrl}/v2/_scan`, body: {} },
	},
});

export const TotalEntitiesV2 = meta.story({
	name: "GET /entities/v2/_total",
	...urlControls(entitiesUrl),
	args: {
		description: "Total number of entities found by batch search.",
		request: { method: "GET", url: `${entitiesUrl}/v2/_total` },
	},
});

export const EntityEventsTotal = meta.story({
	name: "GET /entities/{id}/_events/_total",
	...urlControls(entityIdUrl),
	args: {
		description: "Returns the total number of events for the entity by tenant.",
		request: { method: "GET", url: `${entityIdUrl}/_events/_total` },
	},
});

// --- Update / Clone / Traverse ---

export const UpdateEntity = meta.story({
	name: "POST /entities/{id}/_update",
	...urlControls(entityIdUrl),
	args: {
		description:
			"Update Single Entity API makes multiple updates to an entity.",
		request: { method: "POST", url: `${entityIdUrl}/_update`, body: [] },
	},
});

export const CloneEntity = meta.story({
	name: "POST /entities/{id}/_clone",
	...urlControls(entityIdUrl),
	args: {
		description: "Clones an entity.",
		request: { method: "POST", url: `${entityIdUrl}/_clone`, body: {} },
	},
});

export const EntityHops = meta.story({
	name: "GET /entities/{id}/_hops",
	...urlControls(entityIdUrl),
	args: {
		description:
			"Returns entities and relations traversed with an N-hop operation.",
		request: { method: "GET", url: `${entityIdUrl}/_hops` },
	},
});

// --- Cleanse / Geocode ---

export const CleanseEntity = meta.story({
	name: "POST /entities/cleanse",
	...urlControls(entitiesUrl),
	args: {
		description: "Cleanses entity data on the fly.",
		request: { method: "POST", url: `${entitiesUrl}/cleanse`, body: {} },
	},
});

export const BatchCleanseEntities = meta.story({
	name: "POST /entities/batchcleanse",
	...urlControls(entitiesUrl),
	args: {
		description: "Cleanses entity data on-the-fly in batches.",
		request: { method: "POST", url: `${entitiesUrl}/batchcleanse`, body: [] },
	},
});

export const RecleanseEntity = meta.story({
	name: "GET /entities/recleanse",
	...urlControls(entitiesUrl),
	args: {
		description: "Re-cleanses an entity.",
		request: { method: "GET", url: `${entitiesUrl}/recleanse` },
	},
});

export const ReverseGeocode = meta.story({
	name: "GET /entities/reverseGeo",
	...urlControls(entitiesUrl),
	args: {
		description: "Reverse Geocodes API to fetch nearby addresses.",
		request: { method: "GET", url: `${entitiesUrl}/reverseGeo` },
	},
});

export const ReverseGeocodeBatch = meta.story({
	name: "POST /entities/reverseGeo",
	...urlControls(entitiesUrl),
	args: {
		description:
			"Reverse Geocodes API to fetch nearby addresses for multiple geo-coordinates.",
		request: { method: "POST", url: `${entitiesUrl}/reverseGeo`, body: [] },
	},
});

// --- Delete ---

export const DeleteEntities = meta.story({
	name: "DELETE /entities",
	...urlControls(entitiesUrl),
	args: {
		description:
			"Delete Entities API deletes all entities of the specified type from a tenant.",
		request: { method: "DELETE", url: entitiesUrl },
	},
});

export const DeleteEntitiesByFilter = meta.story({
	name: "POST /entities/_delete",
	...urlControls(entitiesUrl),
	args: {
		description:
			"Delete Entities API deletes entities by filter or list of URIs from a tenant.",
		request: { method: "POST", url: `${entitiesUrl}/_delete`, body: {} },
	},
});

// --- Entities by Segment ---

export const SegmentEntities = meta.story({
	name: "GET /segments/{id}/entities",
	...urlControls(segmentEntitiesUrl),
	args: {
		description: "Get all entities that belong to the given segment.",
		request: { method: "GET", url: segmentEntitiesUrl },
	},
});

export const SegmentEntitiesScan = meta.story({
	name: "POST /segments/{id}/entities/scan",
	...urlControls(segmentEntitiesUrl),
	args: {
		description:
			"Get the total number of entities that belong to the given segment.",
		request: { method: "POST", url: `${segmentEntitiesUrl}/scan`, body: {} },
	},
});

export const SegmentEntitiesTotal = meta.story({
	name: "GET /segments/{id}/entities/total",
	...urlControls(segmentEntitiesUrl),
	args: {
		description:
			"Get the total number of entities that belong to the given segment.",
		request: { method: "GET", url: `${segmentEntitiesUrl}/total` },
	},
});
