import { createNextAuth } from "@reltio/auth/next";

/**
 * Reltio auth, configured from environment variables and re-exported wholesale.
 *
 * Required variables (OAUTH_PATH, LOGIN_PATH, CLIENT_ID, CLIENT_SECRET,
 * BASE_PATH) are validated at startup in `next.config.mjs`, so they are present
 * by the time this module loads.
 *
 * This file is pure initialization — mounting the endpoints lives in `proxy.ts`
 * and reading the session lives in `lib/session.ts`.
 */
export const { handlers, checkToken, resolveAuthPath } = createNextAuth({
	oauthPath: process.env.OAUTH_PATH as string,
	loginPath: process.env.LOGIN_PATH as string,
	clientId: process.env.CLIENT_ID as string,
	clientSecret: process.env.CLIENT_SECRET as string,
	// Default to secure cookies; opt out only for local http development.
	secure: process.env.SECURE !== "false",
});
