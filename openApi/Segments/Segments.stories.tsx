import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./Segments.spec.json";

const base = "https://{environment}.reltio.com/reltio/api/{tenantId}";
const segmentsUrl = `${base}/segments`;
const segmentIdUrl = `${base}/segments/{id}`;
const entitySegmentsUrl = `${base}/entities/{id}/segments`;

const sampleSegment = {
	name: "Active Individuals",
	description: "Individuals with status Active.",
	objectType: "configuration/entityTypes/Individual",
	condition:
		"equals(type,'configuration/entityTypes/Individual') and equals(attributes.Status,'Active')",
	status: "ENABLED",
};

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Segments",
	description:
		"Manage segments in a Reltio tenant — create segments (collections of entities matching a filter expression), search/list, retrieve a segment by id, delete, enable/disable, and search for segments an entity belongs to. Combines, in one place, the POST creation endpoint exposed under the developer portal's Ingest module and the rest of the Segments tag from the Operate module.",
});

// --- Create ---

export const SaveSegments = meta.story({
	name: "POST /segments",
	...urlControls(segmentsUrl),
	args: {
		description:
			"Creates a collection of segments in a tenant. Accepts an array of segment definitions (each with a name, entity object type, and filter condition) and returns the created segments with their assigned URIs.",
		request: { method: "POST", url: segmentsUrl, body: [sampleSegment] },
	},
});

// --- Retrieve ---

export const SearchSegments = meta.story({
	name: "GET /segments",
	...urlControls(segmentsUrl),
	args: {
		description: "Searches for segments in a tenant.",
		request: { method: "GET", url: segmentsUrl },
	},
});

export const GetSegment = meta.story({
	name: "GET /segments/{id}",
	...urlControls(segmentIdUrl),
	args: {
		description: "Returns a segment by segment ID from a tenant.",
		request: { method: "GET", url: segmentIdUrl },
	},
});

export const GetEntitySegments = meta.story({
	name: "GET /entities/{id}/segments",
	...urlControls(entitySegmentsUrl),
	args: {
		description:
			"Search for segments an entity belongs to. Returns segments whose filter condition matches the given entity.",
		request: { method: "GET", url: entitySegmentsUrl },
	},
});

// --- Lifecycle ---

export const EnableSegment = meta.story({
	name: "PUT /segments/{id}/enable",
	...urlControls(segmentIdUrl),
	args: {
		description: "Enables the segment with the provided id.",
		request: { method: "PUT", url: `${segmentIdUrl}/enable` },
	},
});

export const DisableSegment = meta.story({
	name: "PUT /segments/{id}/disable",
	...urlControls(segmentIdUrl),
	args: {
		description: "Disables the segment with the provided id.",
		request: { method: "PUT", url: `${segmentIdUrl}/disable` },
	},
});

// --- Delete ---

export const DeleteSegment = meta.story({
	name: "DELETE /segments/{id}",
	...urlControls(segmentIdUrl),
	args: {
		description: "Deletes a segment by segment ID from a tenant.",
		request: { method: "DELETE", url: segmentIdUrl },
	},
});
