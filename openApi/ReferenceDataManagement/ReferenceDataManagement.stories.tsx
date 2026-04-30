import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./ReferenceDataManagement.spec.json";

const base = "https://{environment}.reltio.com";
const configUrl = `${base}/configuration/{tenantId}`;
const generatorsUrl = `${base}/generators/{tenantId}`;
const namedGenUrl = `${generatorsUrl}/{name}`;
const lookupsUrl = `${base}/lookups/{tenantId}`;
const lookupsByTypeUrl = `${lookupsUrl}/{type}`;
const lookupByCodeUrl = `${lookupsByTypeUrl}/{code}`;
const unmappedUrl = `${base}/unmapped/{tenantId}`;
const unmappedByTypeUrl = `${unmappedUrl}/{type}`;

const sampleLookup = {
	code: "USD",
	value: "US Dollar",
	description: "United States Dollar",
	source: "ISO-4217",
};

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Reference Data Management",
	description:
		"Manage RDM tenant configuration and canonical code generators for lookup types.",
});

// --- Configuration ---

export const GetConfiguration = meta.story({
	name: "GET /configuration/{tenantId}",
	...urlControls(configUrl),
	args: {
		description: "Retrieves the configuration details of the RDM tenant.",
		request: {
			method: "GET",
			url: configUrl,
		},
	},
});

export const UpdateConfiguration = meta.story({
	name: "PUT /configuration/{tenantId}",
	...urlControls(configUrl),
	args: {
		description:
			"Updates or sets the RDM tenant configuration. Overrides existing configuration.",
		request: {
			method: "PUT",
			url: configUrl,
			body: {},
		},
	},
});

// --- Generators ---

export const CreateGenerator = meta.story({
	name: "POST /generators/{tenantId}",
	...urlControls(generatorsUrl),
	args: {
		description:
			"Creates a generator that produces canonical codes for lookup type values. Supports UUID and Sequential types.",
		request: {
			method: "POST",
			url: generatorsUrl,
			body: {
				name: "my-sequential-generator",
				type: "SEQUENTIAL",
				startValue: 1000,
				description: "Sequential code generator for product lookup",
			},
		},
	},
});

export const GetGenerator = meta.story({
	name: "GET /generators/{tenantId}/{name}",
	...urlControls(namedGenUrl),
	args: {
		description:
			"Gets a generator for a tenant by its name. Returns name, type, start value, and current value.",
		request: {
			method: "GET",
			url: namedGenUrl,
		},
	},
});

export const DeleteGenerator = meta.story({
	name: "DELETE /generators/{tenantId}/{name}",
	...urlControls(namedGenUrl),
	args: {
		description:
			"Deletes a generator. Cannot delete if used by a lookup type — remove dependencies first.",
		request: {
			method: "DELETE",
			url: namedGenUrl,
		},
	},
});

export const GenerateNextValue = meta.story({
	name: "GET /generators/{tenantId}/{name}/generate",
	...urlControls(`${namedGenUrl}/generate`),
	args: {
		description:
			"Generates and returns the next value for the specified generator.",
		request: {
			method: "GET",
			url: `${namedGenUrl}/generate`,
		},
	},
});

// --- Lookups ---

export const SaveLookups = meta.story({
	name: "POST /lookups/{tenantId}",
	...urlControls(lookupsUrl),
	args: {
		description:
			"Saves lookups in the RDM tenant. Accepts an array of lookup objects spanning one or more lookup types.",
		request: {
			method: "POST",
			url: lookupsUrl,
			body: [sampleLookup],
		},
	},
});

export const SaveLookupsByType = meta.story({
	name: "POST /lookups/{tenantId}/{type}",
	...urlControls(lookupsByTypeUrl),
	args: {
		description:
			"Saves lookups for the specified lookup type. Accepts an array of lookup objects scoped to the given type.",
		request: {
			method: "POST",
			url: lookupsByTypeUrl,
			body: [sampleLookup],
		},
	},
});

export const SaveLookupByCode = meta.story({
	name: "PUT /lookups/{tenantId}/{type}/{code}",
	...urlControls(lookupByCodeUrl),
	args: {
		description:
			"Saves a single lookup for the specified lookup type and canonical code. Replaces the lookup if it already exists.",
		request: {
			method: "PUT",
			url: lookupByCodeUrl,
			body: sampleLookup,
		},
	},
});

// --- Unmapped Values ---

export const SaveUnmappedValues = meta.story({
	name: "POST /unmapped/{tenantId}",
	...urlControls(unmappedUrl),
	args: {
		description:
			"Saves lookup values that are not mapped to a canonical value. Accepts an array of unmapped string values to be reviewed and later mapped to canonical lookups.",
		request: {
			method: "POST",
			url: unmappedUrl,
			body: ["us dollar", "u.s. dollars"],
		},
	},
});

export const SaveUnmappedValuesByType = meta.story({
	name: "POST /unmapped/{tenantId}/{type}",
	...urlControls(unmappedByTypeUrl),
	args: {
		description:
			"Saves lookup values that are not mapped to a canonical value for the specified lookup type. Accepts an array of unmapped string values scoped to the given type.",
		request: {
			method: "POST",
			url: unmappedByTypeUrl,
			body: ["us dollar", "u.s. dollars"],
		},
	},
});
