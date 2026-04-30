import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./ReferenceDataManagement.spec.json";

const base = "https://{environment}.reltio.com";
const configUrl = `${base}/configuration/{tenantId}`;
const generatorsUrl = `${base}/generators/{tenantId}`;
const namedGenUrl = `${generatorsUrl}/{name}`;

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Reference Data Management",
	description:
		"Manage RDM tenant configuration and canonical code generators for lookup types.",
});

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
