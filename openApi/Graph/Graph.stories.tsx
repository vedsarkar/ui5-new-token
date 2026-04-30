import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./Graph.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Graph",
	description:
		"Get a single entity's one-hop connections — every entity it relates to via any relation type, in a single graph-traversal call.",
});

export const PostEntitiesIdConnections = meta.story({
	name: "POST /entities/{id}/_connections",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{id}/_connections`,
	),
	args: {
		description: `This request returns a paginated list of direct connections for a specific entity that match conditions. A connection for an entity is a pair of a relation and a connected entity. A condition can be setup by:Type and direction of relationsType of connected entitiesPage size and offsetFilters on entities and relations propertiesNote: there is the limit of relations per entity for this request. If an entity has more than 500K relations, then only the first 500K of relations will be read from the primary store and will be used to build the response. If it happens, then the additional property - "limitExceeded": true - will be added to the response.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{id}/_connections`,
			body: {
				relationTypes: ["configuration/relationTypes/HasAddress"],
				direction: "BOTH",
			},
		},
	},
});
