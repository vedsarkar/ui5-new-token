import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./Lineage.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Lineage",
});

export default meta;

export const PostEntitiesDeleteHistory = meta.story({
	name: "POST /entities/_deleteHistory",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/entities/_deleteHistory`,
	),
	args: {
		description: `This API performs bulk delete of history and activity logs for either a single entity or multiple entities. To use this API, you must have the DELETE privilege for the MDM.Data.Entities.History resource (or ROLE_ADMIN_TENANT). You can specify the URIs of the entities in the request body of the API. A maximum of 100 URIs can be specified in a single request. For all the specified entities, complete history and activity log entries are removed by default. The system retains the entity URI and type details from the first and last entries only. However, if you want to retain all the details in the first and last entries, you must enable the retainAuditTrail option. Additionally, when you delete the history/activity details of an entity, Reltio automatically deletes the history/activity details of the related loser entities as well. Similarly, if a loser entity is sent for history/activity deletion, then the system looks up all the related loser entities and the winner entity and deletes the history/activity details of all the related entities. After you delete entities’ history/activity log, if you use the GET /entities/id1?time={currentTimeInMillis} API call to view the details of entities based on the value of the specified time, a blank display appears as the Time parameter uses the entity history to show the details. However, if a change was made to the entity after its history was deleted, the system shows those results. You can use the GET Entities API to view the entity details. Note: To keep the information in the entity's first and last entries as is, you must enable the retainAuditTrail option.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/entities/_deleteHistory`,
			body: {
				filter: "equals(type,'configuration/entityTypes/Test')",
			},
		},
	},
});

export const GetEntitiesIdChanges = meta.story({
	name: "GET /entities/{id}/_changes",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{id}/_changes`,
	),
	args: {
		description: `This API retrieves the timestamps (UTC) reflecting when an entity was modified, the user who made the change and type of change, for example ENTITY_CHANGED, ENTITY_CREATED. Note: There is a hard limit of 1000 most recent events retrieved from the database, unless showMajorEventsOnly is disabled.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{id}/_changes`,
		},
	},
});

export const GetEntitiesIdChangesWithTotal = meta.story({
	name: "GET /entities/{id}/_changesWithTotal",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{id}/_changesWithTotal`,
	),
	args: {
		description: `This API is an extension of the Entity History (GET {TenantURL} /entities/{entity object URI}/_changes) request. It works in the same way (retrieves the history of changes in an entity), but additionally returns the total number of entity changes.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{id}/_changesWithTotal`,
		},
	},
});
