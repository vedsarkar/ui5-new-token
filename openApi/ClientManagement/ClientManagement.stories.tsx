import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./ClientManagement.spec.json";

const baseUrl =
	"https://{environment}.reltio.com/oauth/customers/{customerId}/clients";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Client Management",
	description:
		"Manage OAuth application clients associated with a customer. Provides CRUD operations on clients, multitoken status inspection, and token revocation.",
});

export const GetClients = meta.story({
	name: "GET /clients",
	...urlControls(baseUrl),
	args: {
		description:
			"Displays a list of details of application clients associated with a specific customer.",
		request: {
			method: "GET",
			url: baseUrl,
		},
	},
});

export const CreateClients = meta.story({
	name: "POST /clients",
	...urlControls(baseUrl),
	args: {
		description:
			"Creates clients with the specific roles configured for the customer.",
		request: {
			method: "POST",
			url: baseUrl,
			body: [
				{
					clientId: "clientId",
					clientDescription: "description",
					clientEmail: "email@example.com",
					authorizedGrantTypes: ["client_credentials"],
					redirectUri: ["http://localhost"],
					clientSecret: "secret",
					clientAuthenticationMethods: [
						"client_secret_post",
						"client_secret_basic",
					],
					clientPermissions: {
						roles: {
							ROLE_API: ["testTenant"],
							ROLE_USER: ["testTenant"],
						},
					},
					consumer: "test",
				},
			],
		},
	},
});

const clientUrl =
	"https://{environment}.reltio.com/oauth/customers/{customerId}/clients/{clientId}";

export const GetClient = meta.story({
	name: "GET /clients/{clientId}",
	...urlControls(clientUrl),
	args: {
		description:
			"Displays the details of an application client for a specific customer, based on the Client ID and Customer ID.",
		request: {
			method: "GET",
			url: clientUrl,
		},
	},
});

export const UpdateClient = meta.story({
	name: "PUT /clients/{clientId}",
	...urlControls(clientUrl),
	args: {
		description:
			"Updates the client associated with the customer with the JSON object sent in the request body.",
		request: {
			method: "PUT",
			url: clientUrl,
			body: {
				clientId: "clientId",
				clientDescription: "updated description",
				clientEmail: "email@example.com",
				authorizedGrantTypes: ["client_credentials"],
				redirectUri: ["http://localhost"],
				clientAuthenticationMethods: [
					"client_secret_post",
					"client_secret_basic",
				],
				clientPermissions: {
					roles: {
						ROLE_API: ["testTenant"],
						ROLE_USER: ["testTenant"],
					},
				},
				consumer: "test",
			},
		},
	},
});

export const DeleteClient = meta.story({
	name: "DELETE /clients/{clientId}",
	...urlControls(clientUrl),
	args: {
		description: "Deletes the client associated with the specified customer.",
		request: {
			method: "DELETE",
			url: clientUrl,
		},
	},
});

export const GetMultitokens = meta.story({
	name: "GET /clients/{clientId}/multitokens",
	...urlControls(`${clientUrl}/multitokens`),
	args: {
		description:
			"Returns the status of multitokens usage for the specified client and customer.",
		request: {
			method: "GET",
			url: `${clientUrl}/multitokens`,
		},
	},
});

export const RevokeTokens = meta.story({
	name: "PUT /clients/{clientId}/revoketokens",
	...urlControls(`${clientUrl}/revoketokens`),
	args: {
		description:
			"Revokes all active client credentials tokens for the specified client and customer.",
		request: {
			method: "PUT",
			url: `${clientUrl}/revoketokens`,
		},
	},
});
