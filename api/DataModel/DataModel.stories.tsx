import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import spec from "./datamodel.spec.json";

const BASE = "https://{environment}.reltio.com/reltio/api/{tenantId}";

const api = apiMetaConfig({
	url: `${BASE}/configuration`,
	spec,
	defaultPath: "/configuration/entityTypes",
});

const meta = preview.meta({
	...api,
	title: "API/Data Model",
	description:
		"Read access to the tenant's data model — entity types, relation types, sources, and individual type definitions.",
});

export const GetConfigurationNoInheritance = meta.story({
	name: "GET /configuration/_noInheritance",
	args: {
		description:
			"Retrieves the tenant-specific (L3) configuration without resolving inheritance from parent verticals. Use when editing — you only want the tenant's own overrides.",
		request: {
			url: `${BASE}/configuration/_noInheritance`,
			method: "GET",
		},
	},
});

export const GetEntityTypes = meta.story({
	name: "GET /configuration/entityTypes",
	args: {
		description:
			"Retrieves all entity types — attributes, match rules, survivorship groups, display patterns. Use `inheritance` param to include/exclude inherited types.",
		request: {
			url: `${BASE}/configuration/entityTypes`,
			method: "GET",
		},
	},
});

export const GetRelationTypes = meta.story({
	name: "GET /configuration/relationTypes",
	args: {
		description:
			"Retrieves all relation types — start/end entity types, direction, attributes, survivorship. Examples: EmployedBy, HasAddress, AffiliatedWith.",
		request: {
			url: `${BASE}/configuration/relationTypes`,
			method: "GET",
		},
	},
});

export const AddSource = meta.story({
	name: "POST /configuration/sources",
	args: {
		description:
			"Appends a new source system to the configuration. Useful for onboarding new data feeds without a full configuration PUT.",
		request: {
			url: `${BASE}/configuration/sources`,
			method: "POST",
			body: {
				uri: "configuration/sources/NEWSOURCE",
				label: "New Source System",
				abbreviation: "NS",
				icon: "images/source/newsource.png",
			},
		},
	},
});

export const GetObjectType = meta.story({
	name: "GET /configuration/{objectType}/{typeName}",
	args: {
		description:
			"Retrieves a specific type definition by name. Example: `GET /configuration/entityTypes/Person` returns the full Person entity type.",
		request: {
			url: `${BASE}/configuration/{objectType}/{typeName}`,
			method: "GET",
		},
	},
});
