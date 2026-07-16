import { createNextAuth } from "@reltio/auth/next";
import { getBasicToken } from "@reltio/auth/utils";
import config from "@/config";

// Allowlist for the BFF `/proxy` route. The proxy attaches the session's Reltio
// access token as a Bearer, so this list is a token-exfiltration guard (see
// `@reltio/auth` `compileTargetPatterns`): it must stay scoped to Reltio-owned
// hosts AND the Reltio REST API path — never a blanket any-path allow. The
// default `https://**.reltio.com/reltio/` matches every environment subdomain
// (`**` spans one or more labels, so regional `*.cloud.reltio.com` hosts are
// covered too) but only under the `/reltio/` API prefix. It lives in
// `config/*.json` so a customer on a dedicated domain can adjust it. The
// environment list itself now comes from the shared `adminToolsConfig` (see
// `lib/useTenants`), so the allowlist is configured directly rather than derived
// from it.
const allowedTargets = config.allowedProxyTargets;

/**
 * Reltio auth, configured and re-exported wholesale.
 *
 * Non-secret settings (`oauthPath`, `loginPath`) come from `@/config`, resolved
 * at startup by APP_CONFIG. Secrets (`clientId`, `clientSecret`) stay in the
 * environment and are validated at startup in `next.config.mjs`, so they are
 * present by the time this module loads.
 *
 * The `proxy` option mounts `/auth/proxy`, a transparent BFF that forwards
 * browser requests to the allow-listed Reltio APIs with the session's access
 * token attached as a Bearer. The browser calls it same-origin (cookies flow
 * automatically) via `lib/authFetch` (which routes absolute URLs through the
 * proxy) — the cross-origin Reltio call and the token both stay server-side.
 *
 * This file is pure initialization — mounting the endpoints lives in `proxy.ts`
 * and reading the session lives in `lib/session.ts`.
 */
export const { handlers, checkToken, resolveAuthPath } = createNextAuth({
	oauthPath: config.oauthPath,
	loginPath: config.loginPath,
	clientId: process.env.AUTH_CLIENT_ID as string,
	clientSecret: process.env.AUTH_CLIENT_SECRET as string,
	// Default to secure cookies; opt out only for local http development.
	secure: process.env.SECURE !== "false",
	proxy: { allowedTargets },
});

/** Options for {@link getServiceToken}. Every field defaults to the app's
 * primary API client on the configured auth server. */
export type ServiceTokenConfig = {
	/** Reltio OAuth server URL, e.g. `https://auth-stg.reltio.com/oauth`. */
	oauthPath?: string;
	/** API client id registered with that OAuth server. */
	clientId?: string;
	/** API client secret. */
	clientSecret?: string;
};

/**
 * Mints an access token from a Reltio Auth server using the OAuth
 * `client_credentials` grant: the client id/secret are sent as an
 * `Authorization: Basic` header and the body is `grant_type=client_credentials`.
 * The token represents the API client (Reltio `ROLE_API`), so downstream
 * services authorize the request against that client's own permissions — never
 * the signed-in user's.
 *
 * Defaults to the app's primary API client on the configured auth server; pass
 * a different `oauthPath` / credentials to mint for another API client or auth
 * environment. The token is returned as-is — the app fully relies on the Auth
 * server for the token lifecycle and mints a fresh one per call rather than
 * caching it against a self-computed expiry.
 */
export async function getServiceToken({
	oauthPath = config.oauthPath,
	clientId = process.env.API_CLIENT_ID as string,
	clientSecret = process.env.API_CLIENT_SECRET as string,
}: ServiceTokenConfig = {}): Promise<string> {
	const response = await fetch(`${oauthPath}/token`, {
		method: "POST",
		headers: {
			Authorization: `Basic ${getBasicToken(clientId, clientSecret)}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({ grant_type: "client_credentials" }),
	});
	if (!response.ok) {
		throw new Error(
			`Failed to mint Reltio API service token: HTTP ${response.status}`,
		);
	}
	const data = (await response.json()) as { access_token: string };
	return data.access_token;
}
