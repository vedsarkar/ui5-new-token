import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./SAML.spec.json";

const samlUrl =
	"https://{environment}.reltio.com/api/v1/security/samlconfig/{customerId}/{tenantId}";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/SAML Configuration",
	description:
		"Manage SAML SSO configuration for a customer and tenant — identity provider settings, role/group mappings, and metadata.",
});

export const GetSAMLConfig = meta.story({
	name: "GET /samlconfig/{customerId}/{tenantId}",
	...urlControls(samlUrl),
	args: {
		description: "Retrieves the SAML configuration for the tenant.",
		request: {
			method: "GET",
			url: samlUrl,
		},
	},
});

export const UpdateSAMLConfig = meta.story({
	name: "PUT /samlconfig/{customerId}/{tenantId}",
	...urlControls(samlUrl),
	args: {
		description: "Updates the SAML configuration for the tenant.",
		request: {
			method: "PUT",
			url: samlUrl,
			body: {
				metaData: "<IDP metadata XML>",
				defaultRoles: ["ROLE_API", "ROLE_USER"],
				emailSAMLAttribute: "email",
				rolesSAMLAttribute: "roles",
				rolesMappingRegex: "([-a-zA-Z0-9_]*),*?",
			},
		},
	},
});

export const AddSAMLConfig = meta.story({
	name: "POST /samlconfig/{customerId}/{tenantId}",
	...urlControls(samlUrl),
	args: {
		description: "Adds SAML configuration for the tenant.",
		request: {
			method: "POST",
			url: samlUrl,
			body: {
				metaData: "<IDP metadata XML>",
				defaultRoles: ["ROLE_API", "ROLE_USER"],
				emailSAMLAttribute: "email",
				rolesSAMLAttribute: "roles",
				rolesMappingRegex: "([-a-zA-Z0-9_]*),*?",
			},
		},
	},
});

export const DeleteSAMLConfig = meta.story({
	name: "DELETE /samlconfig/{customerId}/{tenantId}",
	...urlControls(samlUrl),
	args: {
		description: "Deletes the SAML configuration for the tenant.",
		request: {
			method: "DELETE",
			url: samlUrl,
		},
	},
});
