import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./Interactions.spec.json";

const base = "https://{environment}.reltio.com/reltio/api/{tenantId}";
const interactionsUrl = `${base}/interactions`;
const interactionIdUrl = `${base}/interactions/{id}`;
const rawInteractionsUrl = `${base}/rawInteractions`;
const rawInteractionIdUrl = `${base}/rawInteractions/{id}`;
const entityInteractionsUrl = `${base}/entities/{id}/_interactions`;

const sampleInteraction = {
	type: "configuration/interactionTypes/PhoneCall",
	attributes: {
		Duration: [{ value: 120 }],
	},
	members: [
		{ objectURI: "entities/abc123", role: "caller" },
		{ objectURI: "entities/def456", role: "callee" },
	],
	crosswalks: [
		{
			type: "configuration/sources/Reltio",
			value: "interaction-1",
		},
	],
};

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Interactions",
	description:
		"Manage interactions in a Reltio tenant — create (collection of interactions, raw collection), retrieve (by id, raw by id, by entity), search and counts (by tenant, by group key, total), and delete (single by id, batch by URIs). Combines, in one place, the two POST creation endpoints exposed under the developer portal's Ingest module and the rest of the Interactions tag from the Operate module.",
});

// --- Create ---

export const SaveInteractions = meta.story({
	name: "POST /interactions",
	...urlControls(interactionsUrl),
	args: {
		description:
			"Creates a collection of interactions in a tenant. Accepts an array of interaction objects and returns the created interactions with their assigned URIs.",
		request: {
			method: "POST",
			url: interactionsUrl,
			body: [sampleInteraction],
		},
	},
});

export const SaveRawInteractions = meta.story({
	name: "POST /rawInteractions",
	...urlControls(rawInteractionsUrl),
	args: {
		description:
			"Creates a raw collection of interactions in a tenant. Accepts an array of raw interaction objects (without applying entity resolution) and returns the created raw interactions with their assigned URIs.",
		request: {
			method: "POST",
			url: rawInteractionsUrl,
			body: [sampleInteraction],
		},
	},
});

// --- Retrieve ---

export const GetInteraction = meta.story({
	name: "GET /interactions/{id}",
	...urlControls(interactionIdUrl),
	args: {
		description: "Returns an interaction by interaction ID from a tenant.",
		request: { method: "GET", url: interactionIdUrl },
	},
});

export const GetRawInteraction = meta.story({
	name: "GET /rawInteractions/{id}",
	...urlControls(rawInteractionIdUrl),
	args: {
		description: "Returns a raw interaction by interaction ID from a tenant.",
		request: { method: "GET", url: rawInteractionIdUrl },
	},
});

export const GetEntityInteractions = meta.story({
	name: "GET /entities/{id}/_interactions",
	...urlControls(entityInteractionsUrl),
	args: {
		description:
			"Get Interactions for an Entity API retrieves a list of interactions for an entity (interactions where this entity is a member). Supports sort, order, and filter query parameters; by default sorted by timestamp descending.",
		request: { method: "GET", url: entityInteractionsUrl },
	},
});

// --- Search & Counts ---

export const SearchInteractions = meta.story({
	name: "GET /interactions",
	...urlControls(interactionsUrl),
	args: {
		description: "Searches for interactions in a tenant.",
		request: { method: "GET", url: interactionsUrl },
	},
});

export const SearchInteractionsByGroupKey = meta.story({
	name: "GET /interactions/_byGroupKey",
	...urlControls(interactionsUrl),
	args: {
		description:
			"Searches for interactions in a tenant. The result can be grouped if groupKey is provided.",
		request: { method: "GET", url: `${interactionsUrl}/_byGroupKey` },
	},
});

export const TotalInteractions = meta.story({
	name: "GET /interactions/_total",
	...urlControls(interactionsUrl),
	args: {
		description:
			"Returns the total number of interactions matching the specified filter criteria.",
		request: { method: "GET", url: `${interactionsUrl}/_total` },
	},
});

// --- Delete ---

export const DeleteInteraction = meta.story({
	name: "DELETE /interactions/{id}",
	...urlControls(interactionIdUrl),
	args: {
		description: "Deletes an interaction by interaction ID from a tenant.",
		request: { method: "DELETE", url: interactionIdUrl },
	},
});

export const DeleteInteractionsByUris = meta.story({
	name: "POST /interactions/_deleteByUris",
	...urlControls(interactionsUrl),
	args: {
		description:
			"Deletes a batch of interactions by interaction URIs from a tenant. The maximum number of interaction URIs in one batch is 150.",
		request: {
			method: "POST",
			url: `${interactionsUrl}/_deleteByUris`,
			body: ["interactions/abc123", "interactions/def456"],
		},
	},
});
