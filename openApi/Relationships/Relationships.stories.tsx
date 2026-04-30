import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./Relationships.spec.json";

const base = "https://{environment}.reltio.com/reltio/api/{tenantId}";
const relationsUrl = `${base}/relations`;
const relationIdUrl = `${base}/relations/{id}`;

const sampleRelation = {
	type: "configuration/relationTypes/HasAddress",
	startObject: { objectURI: "entities/abc123" },
	endObject: { objectURI: "entities/def456" },
	attributes: {
		StartDate: [{ value: "2026-01-01" }],
	},
	crosswalks: [
		{
			type: "configuration/sources/Reltio",
			value: "relation-1",
		},
	],
};

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Relationships",
	description:
		"Manage relations between entities in a Reltio tenant — create relations (Save Relationships), search/list (by start/end object, attributes, tags, type), retrieve a single relation by URI, and delete a relation. Combines, in one place, the POST creation endpoint exposed under the developer portal's Ingest module and the rest of the Relationships tag from the Operate module.",
});

// --- Create ---

export const SaveRelations = meta.story({
	name: "POST /relations",
	...urlControls(relationsUrl),
	args: {
		description:
			"Save Relationships API creates relations between entities. Accepts an array of relation objects (each linking a startObject to an endObject by a relation type) and returns the created relations with their assigned URIs.",
		request: { method: "POST", url: relationsUrl, body: [sampleRelation] },
	},
});

// --- Retrieve ---

export const SearchRelations = meta.story({
	name: "GET /relations",
	...urlControls(relationsUrl),
	args: {
		description:
			"Search or Get Relationships API. Searches for relations by the start and/or end objects, attribute values, tags, or type. Returns non-empty results when relation indexing is enabled in tenant configuration via the indexRelations property. The response can include a maximum of 200 relations.",
		request: { method: "GET", url: relationsUrl },
	},
});

export const GetRelation = meta.story({
	name: "GET /relations/{id}",
	...urlControls(relationIdUrl),
	args: {
		description:
			"Get Relationship API retrieves a relation based on the relation object URI specified in the request.",
		request: { method: "GET", url: relationIdUrl },
	},
});

// --- Delete ---

export const DeleteRelation = meta.story({
	name: "DELETE /relations/{id}",
	...urlControls(relationIdUrl),
	args: {
		description:
			"Deletes a relation between two entities by the URI specified in the request.",
		request: { method: "DELETE", url: relationIdUrl },
	},
});
