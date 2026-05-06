import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./DataModel.spec.json";

const base = "https://{environment}.reltio.com";
const configUrl = `${base}/reltio/api/{tenantId}/configuration`;

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Data Model",
});

export default meta;

export const GetConfiguration = meta.story({
	name: "GET /configuration",
	...urlControls(configUrl),
	args: {
		description:
			"Gets the configuration for a tenant with inheritance from verticals.",
		request: {
			method: "GET",
			url: configUrl,
		},
	},
});

export const SetConfiguration = meta.story({
	name: "PUT /configuration",
	...urlControls(configUrl),
	args: {
		description:
			"Sets the configuration for a tenant. Supports If-Unmodified-Since header for optimistic concurrency control.",
		request: {
			method: "PUT",
			url: configUrl,
			body: {},
		},
	},
});

export const GetConfigurationNoInheritance = meta.story({
	name: "GET /configuration/_noInheritance",
	...urlControls(`${configUrl}/_noInheritance`),
	args: {
		description:
			"Gets the configuration for a tenant without any inheritance from verticals.",
		request: {
			method: "GET",
			url: `${configUrl}/_noInheritance`,
		},
	},
});

const objectTypeUrl = `${configUrl}/{objectType}/{typeName}`;

export const GetObjectType = meta.story({
	name: "GET /configuration/{objectType}/{typeName}",
	...urlControls(objectTypeUrl),
	args: {
		description:
			"Gets the specific object type based on name configured for a tenant.",
		request: {
			method: "GET",
			url: objectTypeUrl,
		},
	},
});

export const GetEntityTypes = meta.story({
	name: "GET /configuration/entityTypes",
	...urlControls(`${configUrl}/entityTypes`),
	args: {
		description: "Gets the entity types configured for a tenant.",
		request: {
			method: "GET",
			url: `${configUrl}/entityTypes`,
		},
	},
});

export const GetRelationTypes = meta.story({
	name: "GET /configuration/relationTypes",
	...urlControls(`${configUrl}/relationTypes`),
	args: {
		description: "Gets the relation types configured for a tenant.",
		request: {
			method: "GET",
			url: `${configUrl}/relationTypes`,
		},
	},
});

export const AppendSource = meta.story({
	name: "POST /configuration/sources",
	...urlControls(`${configUrl}/sources`),
	args: {
		description: "Appends a source system to an existing configuration.",
		request: {
			method: "POST",
			url: `${configUrl}/sources`,
			body: {
				uri: "configuration/sources/NewSource",
				name: "New Source",
				description: "A new data source",
				priority: 10,
			},
		},
	},
});

const cleanseUrl = `${base}/reltio/tenants/{tenantId}/cleanse`;

export const SetCleanse = meta.story({
	name: "PUT /tenants/{tenantId}/cleanse",
	...urlControls(cleanseUrl),
	args: {
		description:
			"Sets the cleanse configuration for a tenant. Overrides existing configuration.",
		request: {
			method: "PUT",
			url: cleanseUrl,
			body: {},
		},
	},
});

const matchingUrl = `${base}/reltio/tools/matching/{tenantId}`;

export const GetMatchGroupFactorsSummary = meta.story({
	name: "GET /matchGroupFactorsSummary",
	...urlControls(`${matchingUrl}/matchGroupFactorsSummary`),
	args: {
		description:
			"Returns the matching factors summary based on the tenant configuration.",
		request: {
			method: "GET",
			url: `${matchingUrl}/matchGroupFactorsSummary`,
		},
	},
});

export const GetTokenizationSchemes = meta.story({
	name: "GET /tokenizationSchemes/{entityType}",
	...urlControls(`${matchingUrl}/tokenizationSchemes/{entityType}`),
	args: {
		description:
			"Get tokenization schemes explanation of match groups for the specified entity type.",
		request: {
			method: "GET",
			url: `${matchingUrl}/tokenizationSchemes/{entityType}`,
		},
	},
});

export const ValidateRegexpDictionaries = meta.story({
	name: "GET /validateRegexpDictionaries",
	...urlControls(`${matchingUrl}/validateRegexpDictionaries`),
	args: {
		description:
			"Gets all the RegexpReplaceCleansers dictionaries validation notes for the tenant.",
		request: {
			method: "GET",
			url: `${matchingUrl}/validateRegexpDictionaries`,
		},
	},
});
