import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import spec from "./metadata.spec.json";

const api = apiMetaConfig({
	url: "https://{environment}.reltio.com/reltio/api/{tenantId}/configuration",
	spec,
	defaultPath: "/configuration",
});

const meta = preview.meta({
	...api,
	title: "API/Business Configuration",
	description:
		"The Business Configuration API is used to manage the configuration of a Reltio MDM tenant.",
});

export const GetConfiguration = meta.story({
	name: "GET /configuration",
	description: "Retrieves the full L3 configuration for the tenant.",
	args: {
		request: {
			method: "GET",
		},
	},
});

export const PutConfiguration = meta.story({
	name: "PUT /configuration",
	description:
		"Replaces the entire tenant configuration with the provided body. The request must conform to the L3 schema; server-managed fields (`createdTime`, `updatedTime`, `createdBy`, `updatedBy`) are ignored on input.",
	args: {
		request: {
			method: "PUT",
			body: {},
		},
	},
});
