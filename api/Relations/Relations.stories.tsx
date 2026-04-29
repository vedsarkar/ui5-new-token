import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import spec from "./relations.spec.json";

const BASE = "https://{environment}.reltio.com/reltio/api/{tenantId}";

const api = apiMetaConfig({
	url: `${BASE}/relations`,
	spec,
	defaultPath: "/relations",
});

const meta = preview.meta({
	...api,
	title: "API/Relations",
	description:
		"Manage typed relationships between entities — search, read, delete, and traverse entity graphs.",
});

export const GetRelations = meta.story({
	name: "GET /relations",
	args: {
		description:
			"Searches and retrieves relationships. Supports RQL filtering, pagination, sorting, and response shaping via `options`.",
		request: {
			method: "GET",
		},
	},
});

export const GetRelation = meta.story({
	name: "GET /relations/{relationId}",
	args: {
		description:
			"Retrieves a single relationship by URI — includes start/end entity references, relation attributes, crosswalks, and metadata.",
		request: {
			url: `${BASE}/relations/{relationId}`,
			method: "GET",
		},
	},
});

export const DeleteRelation = meta.story({
	name: "DELETE /relations/{relationId}",
	args: {
		description:
			"Permanently deletes a relationship. **Irreversible** — consider end-dating crosswalks instead in production.",
		request: {
			url: `${BASE}/relations/{relationId}`,
			method: "DELETE",
		},
	},
});

export const GetEntityConnections = meta.story({
	name: "POST /entities/{entityId}/_connections",
	args: {
		description:
			"Retrieves entities connected via relationships (one-hop). Specify relation types by direction (`inRelations`/`outRelations`) and which entity types to return. The primary endpoint for building entity detail pages with related records.",
		request: {
			url: `${BASE}/entities/{entityId}/_connections`,
			method: "POST",
			body: [
				{
					entityTypes: ["configuration/entityTypes/Organization"],
					outRelations: ["configuration/relationTypes/EmployedBy"],
					max: 10,
				},
			],
		},
	},
});

export const GetEntityHops = meta.story({
	name: "GET /entities/{entityId}/_hops",
	args: {
		description:
			"Traverses the entity graph N hops from a starting entity. Returns all reachable entities and relations within the specified depth. Use `deep` for depth, `graphTypeURIs`/`relationTypeURIs` to filter edges. Ideal for graph visualizations.",
		request: {
			url: `${BASE}/entities/{entityId}/_hops`,
			method: "GET",
		},
	},
});
