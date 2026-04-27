import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import spec from "./authentication.spec.json";

const api = apiMetaConfig({
	url: "https://{environment}.reltio.com/oauth/token",
	spec,
	defaultPath: "/oauth/token",
});

const meta = preview.meta({
	...api,
	title: "API/Authentication",
	description:
		"OAuth 2.0 token management for authenticating all Reltio platform API requests.",
});

export const ObtainAccessToken = meta.story({
	name: "POST /oauth/token",
	args: {
		description:
			"Obtains an OAuth 2.0 access token using password or client credentials grant. The returned token must be included as `Authorization: Bearer <token>` in all subsequent API calls.",
		request: {
			method: "POST",
			body: {
				grant_type: "password",
				username: "user@example.com",
				password: "********",
			},
		},
	},
});
