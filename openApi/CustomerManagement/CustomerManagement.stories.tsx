import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./CustomerManagement.spec.json";

const baseUrl = "https://{environment}.reltio.com/oauth";
const customerUrl = `${baseUrl}/customers/{customerId}`;

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Customer Management",
});

export default meta;

export const GetCustomers = meta.story({
	name: "GET /customers",
	...urlControls(`${baseUrl}/customers`),
	args: {
		description:
			"Retrieves a list of all customers with their tenant assignments, external provider configuration, password policy, and MFA settings.",
		request: {
			method: "GET",
			url: `${baseUrl}/customers`,
		},
	},
});

export const GetCustomer = meta.story({
	name: "GET /{customerId}",
	...urlControls(customerUrl),
	args: {
		description:
			"Retrieves the customer details. Requires ROLE_CUSTOMER_ADMIN.",
		request: {
			method: "GET",
			url: customerUrl,
		},
	},
});

export const UpdateCustomer = meta.story({
	name: "PUT /{customerId}",
	...urlControls(customerUrl),
	args: {
		description: "Updates the customer details. Requires ROLE_CUSTOMER_ADMIN.",
		request: {
			method: "PUT",
			url: customerUrl,
			body: {
				id: "BestCustomer",
				tenants: ["devTenantId", "testTenantId"],
				description: "Updated customer description",
				caseSensitiveLoginEnabled: true,
			},
		},
	},
});

export const GetMFA = meta.story({
	name: "GET /{customerId}/mfa",
	...urlControls(`${customerUrl}/mfa`),
	args: {
		description:
			"Retrieves the MFA enablement details. Status: ENROLL, ENFORCE, or DISABLED.",
		request: {
			method: "GET",
			url: `${customerUrl}/mfa`,
		},
	},
});

export const UpdateMFA = meta.story({
	name: "PUT /{customerId}/mfa",
	...urlControls(`${customerUrl}/mfa`),
	args: {
		description:
			"Updates the MFA enablement details. Status: ENROLL, ENFORCE, or DISABLED.",
		request: {
			method: "PUT",
			url: `${customerUrl}/mfa`,
			body: {
				status: "ENROLL",
				availables: ["AUTHENTICATOR"],
			},
		},
	},
});

export const GetPasswordPolicy = meta.story({
	name: "GET /{customerId}/passwordPolicy",
	...urlControls(`${customerUrl}/passwordPolicy`),
	args: {
		description: "Retrieves the password policy of a customer.",
		request: {
			method: "GET",
			url: `${customerUrl}/passwordPolicy`,
		},
	},
});

export const UpdatePasswordPolicy = meta.story({
	name: "PUT /{customerId}/passwordPolicy",
	...urlControls(`${customerUrl}/passwordPolicy`),
	args: {
		description:
			"Updates the password policy of a customer. Configure expiration, inactivity, failed attempts, and session timeout.",
		request: {
			method: "PUT",
			url: `${customerUrl}/passwordPolicy`,
			body: {
				expirePeriodInDays: 180,
				inactivePeriodInDays: 30,
				numberOfFailedLoginAttempts: 5,
				userSessionTimeoutSeconds: 300,
			},
		},
	},
});

export const GetRoles = meta.story({
	name: "GET /{customerId}/roles",
	...urlControls(`${customerUrl}/roles`),
	args: {
		description:
			"Returns roles available for assignment for users of that customer.",
		request: {
			method: "GET",
			url: `${customerUrl}/roles`,
		},
	},
});

export const UpdateRoles = meta.story({
	name: "PUT /{customerId}/roles",
	...urlControls(`${customerUrl}/roles`),
	args: {
		description: "Updates the customer-specific roles.",
		request: {
			method: "PUT",
			url: `${customerUrl}/roles`,
			body: ["ROLE_EXPORT", "ROLE_DATALOADER"],
		},
	},
});

export const AddRoles = meta.story({
	name: "POST /{customerId}/roles",
	...urlControls(`${customerUrl}/roles`),
	args: {
		description: "Adds customer-specific roles.",
		request: {
			method: "POST",
			url: `${customerUrl}/roles`,
			body: ["ROLE_EXPORT"],
		},
	},
});

export const AddRolePermissions = meta.story({
	name: "POST /{customerId}/roles/permissions",
	...urlControls(`${customerUrl}/roles/permissions`),
	args: {
		description:
			"Adds permissions to a role under the customer. Requires ROLE_CUSTOMER_ADMIN.",
		request: {
			method: "POST",
			url: `${customerUrl}/roles/permissions`,
			body: [
				{
					roleName: "ROLE_CUSTOM",
					servicePermissions: [
						{
							id: "MDM",
							resourcePermissions: [
								{
									id: "data",
									allowedPrivileges: ["READ", "CREATE", "UPDATE"],
								},
							],
						},
					],
				},
			],
		},
	},
});

const rolePermUrl = `${customerUrl}/roles/permissions/{roleName}`;

export const GetRolePermissions = meta.story({
	name: "GET /{customerId}/roles/permissions/{roleName}",
	...urlControls(rolePermUrl),
	args: {
		description:
			"Retrieves all permissions configured for the specified role under the customer.",
		request: {
			method: "GET",
			url: rolePermUrl,
		},
	},
});

export const UpdateRolePermissions = meta.story({
	name: "PUT /{customerId}/roles/permissions/{roleName}",
	...urlControls(rolePermUrl),
	args: {
		description:
			"Updates the permissions configured for the specified role under the customer.",
		request: {
			method: "PUT",
			url: rolePermUrl,
			body: {
				roleName: "ROLE_CUSTOM",
				servicePermissions: [
					{
						id: "MDM",
						resourcePermissions: [
							{
								id: "data",
								allowedPrivileges: ["READ", "CREATE", "UPDATE", "DELETE"],
							},
						],
					},
				],
			},
		},
	},
});

export const DeleteRolePermissions = meta.story({
	name: "DELETE /{customerId}/roles/permissions/{roleName}",
	...urlControls(rolePermUrl),
	args: {
		description:
			"Deletes all permissions for the specified role. Only customer-specific roles can be deleted.",
		request: {
			method: "DELETE",
			url: rolePermUrl,
		},
	},
});

export const GetSystemRolePermissions = meta.story({
	name: "GET /roles/permissions/{roleName}",
	...urlControls(`${baseUrl}/roles/permissions/{roleName}`),
	args: {
		description:
			"Retrieves the permissions configured for the specified system role.",
		request: {
			method: "GET",
			url: `${baseUrl}/roles/permissions/{roleName}`,
		},
	},
});
