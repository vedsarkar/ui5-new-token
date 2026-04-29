import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import spec from "./users.spec.json";

const BASE = "https://{environment}.reltio.com/services/oauth";

const api = apiMetaConfig({
	url: `${BASE}/users`,
	spec,
	defaultPath: "/users",
});

const meta = preview.meta({
	...api,
	title: "API/User Management",
	description:
		"CRUD operations for platform users — roles, groups, MFA, and token management.",
});

export const GetAllUsers = meta.story({
	name: "GET /users",
	args: {
		description:
			"Retrieves all users the caller is entitled to see based on their assigned roles.",
		request: {
			method: "GET",
		},
	},
});

export const AddUsers = meta.story({
	name: "POST /users",
	args: {
		description:
			"Creates one or more new users with specified roles, groups, and settings.",
		request: {
			method: "POST",
			body: [
				{
					username: "new.user@example.com",
					email: "new.user@example.com",
					customer: "AcmeCorp",
					enabled: true,
					groups: ["SALES_GROUP"],
				},
			],
		},
	},
});

export const GetUser = meta.story({
	name: "GET /users/{username}",
	args: {
		description:
			"Retrieves details for a specific user. Use `resolveGroups=true` to include roles inherited from groups.",
		request: {
			url: `${BASE}/users/{username}`,
			method: "GET",
		},
	},
});

export const UpdateUser = meta.story({
	name: "PUT /users/{username}",
	args: {
		description:
			"Updates user details — roles, groups, enabled status, locale, timezone.",
		request: {
			url: `${BASE}/users/{username}`,
			method: "PUT",
			body: {
				username: "user@example.com",
				email: "user@example.com",
				customer: "AcmeCorp",
				enabled: true,
				groups: ["SALES_GROUP", "ADMIN_GROUP"],
			},
		},
	},
});

export const DeleteUser = meta.story({
	name: "DELETE /users/{username}",
	args: {
		description:
			"Permanently deletes a user account. All active tokens are revoked.",
		request: {
			url: `${BASE}/users/{username}`,
			method: "DELETE",
		},
	},
});

export const GetUserGroups = meta.story({
	name: "GET /users/{username}/groups",
	args: {
		description: "Retrieves the list of groups a user belongs to.",
		request: {
			url: `${BASE}/users/{username}/groups`,
			method: "GET",
		},
	},
});

export const UpdateUserGroups = meta.story({
	name: "PUT /users/{username}/groups",
	args: {
		description: "Replaces the user's group membership with the provided list.",
		request: {
			url: `${BASE}/users/{username}/groups`,
			method: "PUT",
			body: {
				groups: ["SALES_GROUP", "ADMIN_GROUP"],
			},
		},
	},
});

export const RevokeUserTokens = meta.story({
	name: "PUT /users/{username}/revoketokens",
	args: {
		description:
			"Revokes all active tokens, forcing re-authentication. Use after role changes or security incidents.",
		request: {
			url: `${BASE}/users/{username}/revoketokens`,
			method: "PUT",
		},
	},
});

export const GetUsersForTenant = meta.story({
	name: "GET /users/tenants/{tenantId}",
	args: {
		description:
			"Lists username/email pairs for all users with access to a specific tenant.",
		request: {
			url: `${BASE}/users/tenants/{tenantId}`,
			method: "GET",
		},
	},
});
