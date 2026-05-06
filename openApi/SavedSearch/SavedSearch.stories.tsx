import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./SavedSearch.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Saved Search",
});

export default meta;

export const GetPersonalAllSavedSearches = meta.story({
	name: "GET /personal/allSavedSearches",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/personal/allSavedSearches`,
	),
	args: {
		description: `Retrieve the details of all the shared saved searches with isPublic = true.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/personal/allSavedSearches`,
		},
	},
});

export const PostPersonalFindSavedSearches = meta.story({
	name: "POST /personal/findSavedSearches",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/personal/findSavedSearches`,
	),
	args: {
		description: `You can search for saved searches that you own, or, those that are shared with everyone. The results of the search for saved searches depend upon the filtering, ordering and paging parameters specified in the request.You can use the following fields as part of the Request body to search for some saved searches that match the specified criteria:offset - The number of requests to skip from the beginning of the result set (useful for pagination)max - The maximum number of records that can be listed in a page (page size)startsWith - A letter or string with which the name of a saved search starts.favoriteOnly - The filter that allows you to search for saved searches based on the setting of the isFavorite field.sortBy - The option by which the search results can be sorted. You can set it to NAME, CREATE_DATE, or, UPDATE_DATE.sortOrder - The order by which the search results can be sorted. You can set it as ASC for ascending order, or, DESC for descending order.includes - The array of strings which are used to search by full equality of name. The search results that match the criteria mentioned in 'includes' are appended to each page besides the regular page size (max).`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/personal/findSavedSearches`,
			body: {
				filter: "shared eq true",
				limit: 10,
			},
		},
	},
});

export const GetPersonalSavedSearches = meta.story({
	name: "GET /personal/savedSearches",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/personal/savedSearches`,
	),
	args: {
		description: `Retrieves the details of all the saved searches that belong to the user invoking the API.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/personal/savedSearches`,
		},
	},
});

export const PostPersonalSavedSearches = meta.story({
	name: "POST /personal/savedSearches",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/personal/savedSearches`,
	),
	args: {
		description: `Create saved search query creates a new saved search query. If you have administrative privileges, you can create saved searches for other users too within the same tenant.While creating a saved search, you must specify a valid search query string and a name for saving the search. In addition, you can specify a description, set the saved search as a favorite by using the isFavorite flag, or, make it available for others by setting the isPublic flag.You can use the following fields in the body of the request:name - The Name of the search that is being saved.description - A Desciption of the search that is being saved.query - A valid search query string.isFavorite - The flag for marking the saved search as a favorite. You can set it to true or false.isPublic - The flag that specifies whether other users of the same tenant can use this request (in Read-only mode) or not. You can set it to true or false. If true, the saved search would be available to others. The following information is provided as part of the Response: count - Number of profiles found by the Query.uiState - A valid JSON, which is used for keeping the state of visual controls for query editing.owner - The owner of the saved search.createDate - The date on which the search was saved.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/personal/savedSearches`,
			body: {
				name: "Active Individuals",
				description: "Individuals with status Active.",
				query:
					"equals(type,'configuration/entityTypes/Individual') and equals(attributes.Status,'Active')",
				objectType: "configuration/entityTypes/Individual",
				shared: false,
			},
		},
	},
});

export const PutPersonalSavedSearchesId = meta.story({
	name: "PUT /personal/savedSearches/{id}",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/personal/savedSearches/{id}`,
	),
	args: {
		description: `You can modify the details of a saved search only if you are the owner of that search. In addition, if you have administrative privileges, you can modify it for other users too within the same tenant.While modifying an existing saved search, you can modify any of the following details:name - The name of the saved search.description - The desciption of the saved search.query - The search query string used in the saved search.isFavorite - The flag for marking the saved search as a favorite. You can set it to true or false.isPublic - The flag that specifies whether other users of the same tenant can use this request (in Read-only mode) or not. You can set it to true or false. If true, the saved search would be available to others.The following information is provided as part of the Response:count - Number of profiles found by the Query.uiState - A valid JSON, which is used for keeping the state of visual controls for query editing.owner - The owner of the saved search.createDate - The date on which the search was saved.updateDate - The date on which the saved search is modified.`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/personal/savedSearches/{id}`,
			body: {
				name: "Active Individuals",
				description: "Individuals with status Active.",
				query:
					"equals(type,'configuration/entityTypes/Individual') and equals(attributes.Status,'Active')",
				objectType: "configuration/entityTypes/Individual",
				shared: false,
			},
		},
	},
});

export const DeletePersonalSavedSearchesId = meta.story({
	name: "DELETE /personal/savedSearches/{id}",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/personal/savedSearches/{id}`,
	),
	args: {
		description: `Delete Saved Search API deletes an existing saved search by specifying the saved search ID in the API call. You can only delete a saved search that belongs to you.`,
		request: {
			method: "DELETE",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/personal/savedSearches/{id}`,
		},
	},
});
