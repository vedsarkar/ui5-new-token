import { createNextAuth } from "@reltio/auth/next";

function required(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(
			`Missing required environment variable: ${name}. Copy .env.local.example to .env.local and fill it in.`,
		);
	}
	return value;
}

/**
 * The Reltio auth router for this app, configured from environment variables.
 *
 * `handlers` is mounted by the catch-all route at `app/auth/[...auth]/route.ts`
 * and exposes /auth/login, /auth/logout, /auth/callback, /auth/refreshToken,
 * and /auth/checkToken. `checkToken` introspects the current request's token
 * server-side (used by `lib/session.ts`).
 */
export const { handlers, checkToken } = createNextAuth({
	oauthPath: required("OAUTH_PATH"),
	loginPath: required("LOGIN_PATH"),
	clientId: required("CLIENT_ID"),
	clientSecret: required("CLIENT_SECRET"),
	// Default to secure cookies; opt out only for local http development.
	secure: process.env.SECURE !== "false",
});
