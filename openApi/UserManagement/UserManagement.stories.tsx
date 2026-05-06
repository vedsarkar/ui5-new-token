import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./UserManagement.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/User Management",
});

export default meta;

// --- Users CRUD ---

export const GetUsers = meta.story({
	name: "GET /users",
	...urlControls(`https://{environment}.reltio.com/oauth/users`),
	args: {
		description: `Gets list of all the existing users which the logged in user is entitled to read, based on the assigned user Role(s).`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/oauth/users`,
		},
	},
});

export const PostUsers = meta.story({
	name: "POST /users",
	...urlControls(`https://{environment}.reltio.com/oauth/users`),
	args: {
		description: `Adds list of users`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/oauth/users`,
			body: [
				{
					username: "alice@example.com",
					email: "alice@example.com",
					firstName: "Alice",
					lastName: "Smith",
					groups: ["analysts"],
					tenants: ["myTenant"],
				},
			],
		},
	},
});

export const GetUsersUsername = meta.story({
	name: "GET /users/{username}",
	...urlControls(`https://{environment}.reltio.com/oauth/users/{username}`),
	args: {
		description: `Retrieves the user details identified by username or email`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/oauth/users/{username}`,
		},
	},
});

export const PutUsersUsername = meta.story({
	name: "PUT /users/{username}",
	...urlControls(`https://{environment}.reltio.com/oauth/users/{username}`),
	args: {
		description: `This API enables you to update the user details with the data sent in the request body. User details include user roles, groups`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/oauth/users/{username}`,
			body: {
				username: "alice@example.com",
				email: "alice@example.com",
				firstName: "Alice",
				lastName: "Smith",
				groups: ["analysts"],
				tenants: ["myTenant"],
			},
		},
	},
});

export const DeleteUsersUsername = meta.story({
	name: "DELETE /users/{username}",
	...urlControls(`https://{environment}.reltio.com/oauth/users/{username}`),
	args: {
		description: `This API will delete the user specified in path parameter`,
		request: {
			method: "DELETE",
			url: `https://{environment}.reltio.com/oauth/users/{username}`,
		},
	},
});

// --- Group Membership ---

export const GetUsersUsernameGroups = meta.story({
	name: "GET /users/{username}/groups",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/{username}/groups`,
	),
	args: {
		description: `This API gives the List of groups for the username/emails passed`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/oauth/users/{username}/groups`,
		},
	},
});

export const PutUsersUsernameGroups = meta.story({
	name: "PUT /users/{username}/groups",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/{username}/groups`,
	),
	args: {
		description: `This API will update the groups for the username/email specified`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/oauth/users/{username}/groups`,
			body: ["analysts", "stewards"],
		},
	},
});

export const GetUsersGroupsGroupId = meta.story({
	name: "GET /users/groups/{groupId}",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/groups/{groupId}`,
	),
	args: {
		description: `This Api will return the list of users that belong to a group passed in the path parameter`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/oauth/users/groups/{groupId}`,
		},
	},
});

export const GetUsersTenants = meta.story({
	name: "GET /users/tenants/{tenantId}",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/tenants/{tenantId}`,
	),
	args: {
		description: `You may have certain access limitations while processing this API based on your role.The following users have the corresponding access permissions:ROLE_ADMIN_TENANT_tenant - Access depends on the tenantROLE_ADMIN_CUSTOMER_{customer_Id} - Restricted accessROLE_USER - Restricted access`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/oauth/users/tenants/{tenantId}`,
		},
	},
});

// --- MFA Enrollment ---

export const PutUsersUsernameMfaResetQRCodeEnroll = meta.story({
	name: "PUT /users/{username}/mfa/resetQRCodeEnroll",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/{username}/mfa/resetQRCodeEnroll`,
	),
	args: {
		description: `resets the mfa enrollments of the user`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/oauth/users/{username}/mfa/resetQRCodeEnroll`,
			body: {
				stateToken: "stateTokenValue",
			},
		},
	},
});

export const GetUsersUsernameMfaDetails = meta.story({
	name: "GET /users/{username}/mfaDetails",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/{username}/mfaDetails`,
	),
	args: {
		description: `Retrieves the users mfa details identified by username`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/oauth/users/{username}/mfaDetails`,
		},
	},
});

export const PutUsersMfaAssociateQRCode = meta.story({
	name: "PUT /users/mfa/associateQRCode",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/mfa/associateQRCode`,
	),
	args: {
		description: `Generates the QR Code for the user to associate the MFA`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/oauth/users/mfa/associateQRCode`,
			body: {},
		},
	},
});

export const PutUsersMfaAssociateQRCodeStateToken = meta.story({
	name: "PUT /users/mfa/associateQRCodeStateToken",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/mfa/associateQRCodeStateToken`,
	),
	args: {
		description: `Associates the Authenticator MFA for the user with the state_token`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/oauth/users/mfa/associateQRCodeStateToken`,
			body: {},
		},
	},
});

export const PutUsersMfaEnrollEmail = meta.story({
	name: "PUT /users/mfa/enrollEmail",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/mfa/enrollEmail`,
	),
	args: {
		description: `Associates the Email MFA for the user`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/oauth/users/mfa/enrollEmail`,
			body: {
				email: "alice@example.com",
			},
		},
	},
});

export const PutUsersMfaEnrollEmailWithStateToken = meta.story({
	name: "PUT /users/mfa/enrollEmailWithStateToken",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/mfa/enrollEmailWithStateToken`,
	),
	args: {
		description: `Associates the Authenticator MFA for the user with the state_token`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/oauth/users/mfa/enrollEmailWithStateToken`,
			body: {
				email: "alice@example.com",
			},
		},
	},
});

export const PutUsersMfaResetMyQRCodeEnroll = meta.story({
	name: "PUT /users/mfa/resetMyQRCodeEnroll",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/mfa/resetMyQRCodeEnroll`,
	),
	args: {
		description: `resets the self mfa enrollments of the user`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/oauth/users/mfa/resetMyQRCodeEnroll`,
			body: {
				stateToken: "stateTokenValue",
			},
		},
	},
});

export const PutUsersMfaVerifyEnrollWithStateToken = meta.story({
	name: "PUT /users/mfa/verifyEnrollWithStateToken",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/mfa/verifyEnrollWithStateToken`,
	),
	args: {
		description: `Verify the mfa enrollment with state token`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/oauth/users/mfa/verifyEnrollWithStateToken`,
			body: {
				otp: "123456",
				stateToken: "stateTokenValue",
			},
		},
	},
});

export const PutUsersMfaVerifyQRCodeEnroll = meta.story({
	name: "PUT /users/mfa/verifyQRCodeEnroll",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/mfa/verifyQRCodeEnroll`,
	),
	args: {
		description: `Verify the mfa enrollment`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/oauth/users/mfa/verifyQRCodeEnroll`,
			body: {
				otp: "123456",
				qrCodeId: "abc123",
			},
		},
	},
});

export const GetUsersMfaDetails = meta.story({
	name: "GET /users/mfaDetails",
	...urlControls(`https://{environment}.reltio.com/oauth/users/mfaDetails`),
	args: {
		description: `Retrieves the users mfa details`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/oauth/users/mfaDetails`,
		},
	},
});

// --- Token Revocation ---

export const PutUsersUsernameRevoketokens = meta.story({
	name: "PUT /users/{username}/revoketokens",
	...urlControls(
		`https://{environment}.reltio.com/oauth/users/{username}/revoketokens`,
	),
	args: {
		description: `Revokes all tokens of the user`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/oauth/users/{username}/revoketokens`,
		},
	},
});
