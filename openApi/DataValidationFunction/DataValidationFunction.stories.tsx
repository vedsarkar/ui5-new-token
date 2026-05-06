import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./DataValidationFunction.spec.json";

const base = "https://{environment}.reltio.com/reltio/api/{tenantId}";
const dvfUrl = `${base}/dataValidationFunctions`;
const functionUrl = `${dvfUrl}/{functionURI}`;
const objectTypeUrl = `${dvfUrl}/{objectType}/{object}`;

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Data Validation Function",
});

export default meta;

export const GetTenantFunctions = meta.story({
	name: "GET /dataValidationFunctions",
	...urlControls(dvfUrl),
	args: {
		description:
			"Retrieves all Data Validation Functions configured for the tenant.",
		request: {
			method: "GET",
			url: dvfUrl,
		},
	},
});

export const GetFunction = meta.story({
	name: "GET /dataValidationFunctions/{functionURI}",
	...urlControls(functionUrl),
	args: {
		description:
			"Retrieves the details of a specific Data Validation Function.",
		request: {
			method: "GET",
			url: functionUrl,
		},
	},
});

export const UpdateFunction = meta.story({
	name: "PUT /dataValidationFunctions/{functionURI}",
	...urlControls(functionUrl),
	args: {
		description: "Updates a Data Validation Function.",
		request: {
			method: "PUT",
			url: functionUrl,
			body: {
				name: "Mandatory FirstName",
				attribute: "configuration/entityTypes/Contact/attributes/FirstName",
				expression: "missing(attributes.FirstName.value)",
				action: "WARNING",
				validationEvent: "ALL",
				applyOn: "OV",
				message: "FirstName is a required attribute",
				status: "ACTIVE",
			},
		},
	},
});

export const DeleteFunction = meta.story({
	name: "DELETE /dataValidationFunctions/{functionURI}",
	...urlControls(functionUrl),
	args: {
		description: "Deletes a Data Validation Function.",
		request: {
			method: "DELETE",
			url: functionUrl,
		},
	},
});

export const GetObjectTypeFunctions = meta.story({
	name: "GET /dataValidationFunctions/{objectType}/{object}",
	...urlControls(objectTypeUrl),
	args: {
		description:
			"Retrieves the Data Validation Functions for an entity or relation type.",
		request: {
			method: "GET",
			url: objectTypeUrl,
		},
	},
});

export const CreateObjectTypeFunctions = meta.story({
	name: "POST /dataValidationFunctions/{objectType}/{object}",
	...urlControls(objectTypeUrl),
	args: {
		description:
			"Creates Data Validation Functions for an entity or relation type.",
		request: {
			method: "POST",
			url: objectTypeUrl,
			body: [
				{
					name: "Mandatory FirstName",
					attribute: "configuration/entityTypes/Contact/attributes/FirstName",
					expression: "missing(attributes.FirstName.value)",
					action: "WARNING",
					validationEvent: "ALL",
					applyOn: "OV",
					message: "FirstName is a required attribute",
					status: "ACTIVE",
				},
			],
		},
	},
});

export const DeleteObjectTypeFunctions = meta.story({
	name: "DELETE /dataValidationFunctions/{objectType}/{object}",
	...urlControls(objectTypeUrl),
	args: {
		description: "Deletes all Data Validation Functions for an entity type.",
		request: {
			method: "DELETE",
			url: objectTypeUrl,
		},
	},
});
