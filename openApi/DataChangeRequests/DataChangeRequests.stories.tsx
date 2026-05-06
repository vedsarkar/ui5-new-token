import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./DataChangeRequests.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Data Change Requests",
});

export default meta;

// --- Search ---

export const GetChangeRequests = meta.story({
	name: "GET /changeRequests",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests`,
	),
	args: {
		description: `Allows to search Data Change Request by users (createdBy field) and/or URIs of the affected objects. The filter must contain at least one "equals" or "in" condition for createdBy or objectURI properties, otherwise, CHANGE_REQUEST_SEARCH_FILTER_INCORRECT error will be returned. Note: the search and filtering is supported only for createdBy and objectURI (URIs of affected objects in the Data Change Request).Note: only Data Change Requests which are allowed to be viewed by the user according to the permissions can be returned.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests`,
		},
	},
});

export const PostChangeRequestsByUris = meta.story({
	name: "POST /changeRequests/_byUris",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/_byUris`,
	),
	args: {
		description: `Allows getting several Data Change Requests by the provided URIs.JSON array representing Data Change Requests will be returned in the response in the same order as the incoming URIs. If for any URI there is no Data Change Request (or the user has no access to that Data Change Request) then an empty element in the array will be at the appropriate place.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/_byUris`,
			body: ["changeRequests/abc123", "changeRequests/def456"],
		},
	},
});

// --- CRUD ---

export const PostChangeRequests = meta.story({
	name: "POST /changeRequests",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests`,
	),
	args: {
		description: `Creates an empty Data Change Request. This endpoint is needed just to get a unique change request ID. This ID can be used (changeRequestId={ID}) in endpoints for objects modification (POST {TenantURL}/entities, for example) - the changes will be added to the Data Change Request with ID which was specified instead of applying directly to the objects.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests`,
			body: {},
		},
	},
});

export const GetChangeRequestsId = meta.story({
	name: "GET /changeRequests/{id}",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}`,
	),
	args: {
		description: `Returns a Data Change Request by ID`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}`,
		},
	},
});

export const DeleteChangeRequestsId = meta.story({
	name: "DELETE /changeRequests/{id}",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}`,
	),
	args: {
		description: `Deletes the Data Change Request with the given ID`,
		request: {
			method: "DELETE",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}`,
		},
	},
});

// --- Lifecycle ---

export const PostChangeRequestsIdApply = meta.story({
	name: "POST /changeRequests/{id}/_apply",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/_apply`,
	),
	args: {
		description: `By default, the Data Change Request can be applied only if all attributes which are going to be updated by this change request have not been changed in real objects since they have been added to this request. Otherwise, items inside the Data Change Request related to the attributes which have been changed/removed in the real object will be marked as 'conflict'. The user will have to manually resolve all conflicts by removing and optionally re-adding items into the Data Change Request. Also, it's possible to execute 'ignoreConflicts' apply (with ignoreConflicts=true parameter) - all changes will be applied 'as is' in this case.For example, there is a change request with only one item: update 'FirstName' attribute in entity AAA from 'Alex' to 'Alexey'. If the value of the 'FirstName' attribute of entity AAA is still 'Alex' it will be possible to apply this change request. But if 'Alex' has been changed to 'Aleks' or removed, we will have a conflict.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/_apply`,
			body: {
				comment: "Approved after review.",
			},
		},
	},
});

export const PostChangeRequestsIdReject = meta.story({
	name: "POST /changeRequests/{id}/_reject",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/_reject`,
	),
	args: {
		description: `Rejects the Data Change Request`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/_reject`,
			body: {
				comment: "Insufficient evidence.",
			},
		},
	},
});

// --- External Info ---

export const GetChangeRequestsIdExternalInfo = meta.story({
	name: "GET /changeRequests/{id}/_externalInfo",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/_externalInfo`,
	),
	args: {
		description: `Returns External Info (a set of custom fields as JSON) from the specified Data Change Request`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/_externalInfo`,
		},
	},
});

export const PostChangeRequestsIdExternalInfo = meta.story({
	name: "POST /changeRequests/{id}/_externalInfo",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/_externalInfo`,
	),
	args: {
		description: `Adds External Info (a set of custom fields as JSON) to the specified Data Change Request`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/_externalInfo`,
			body: {
				ticket: "JIRA-123",
				approver: "alice",
			},
		},
	},
});

export const DeleteChangeRequestsIdExternalInfo = meta.story({
	name: "DELETE /changeRequests/{id}/_externalInfo",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/_externalInfo`,
	),
	args: {
		description: `Deletes External Info from the specified Data Change Request`,
		request: {
			method: "DELETE",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/_externalInfo`,
		},
	},
});

// --- Change Items ---

export const GetChangeRequestsIdChangesChangeItemId = meta.story({
	name: "GET /changeRequests/{id}/changes/{changeItemId}",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/changes/{changeItemId}`,
	),
	args: {
		description: `Returns a single change item from the Data Change Request by item ID`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/changes/{changeItemId}`,
		},
	},
});

export const DeleteChangeRequestsIdChangesChangeItemId = meta.story({
	name: "DELETE /changeRequests/{id}/changes/{changeItemId}",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/changes/{changeItemId}`,
	),
	args: {
		description: `Deletes a particular item from the Data Change Request`,
		request: {
			method: "DELETE",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/changeRequests/{id}/changes/{changeItemId}`,
		},
	},
});
