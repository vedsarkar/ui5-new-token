import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./MergeAndUnmerge.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Merge & Unmerge",
});

export default meta;

export const PostEntitiesIdSameAs = meta.story({
	name: "POST /entities/{id}/_sameAs",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{id}/_sameAs`,
	),
	args: {
		description: `This API can be used to manually merge two entities. One of the entities (the oldest one by default) will be selected as "winner" and all attributes, crosswalks, roles, and tags from the second "loser" entity will be moved to the "winner". After the merge, the resulting entity can be accessed by both URIs through the API. An ENTITIES_MERGED_MANUALLY event (match queue) with URI of "loser" in uris field and ENTITY_CHANGED event (CRUD queue) will be generated for the "winner". An ENTITY_LOST_MERGE event (CRUD queue) will be generated for "loser".`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{id}/_sameAs`,
			body: {
				uri: "entities/def456",
			},
		},
	},
});

export const PostEntitiesIdUnmerge = meta.story({
	name: "POST /entities/{id}/_unmerge",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{id}/_unmerge`,
	),
	args: {
		description: `If an entity is composite (result of merge), every component (contributor) can be unmerged to be a standalone entity again. Let us call the composite entity "origin" and the unmerging one "spawn". An ENTITIES_SPLITTED event (CRUD queue) with URI of "spawn" in uris field and ENTITY_CHANGED event (CRUD queue) will be generated for the "origin". An ENTITY_CREATED event (CRUD queue) will be generated for "spawn".`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{id}/_unmerge`,
			body: {
				contributor: "configuration/sources/Reltio.external-id-1",
			},
		},
	},
});
