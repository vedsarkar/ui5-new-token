import { createNextAuth } from "@reltio/auth/next";
import config from "@/config";

// Allowlist for the BFF `/proxy` route, derived from the configured
// environments so it stays in lockstep with `config/*.json`. Each `apiPath`
// (e.g. `https://tst-01.reltio.com/reltio`) becomes an exact host + path-prefix
// pattern (`https://tst-01.reltio.com/reltio/`), so the proxy will only ever
// forward the session's access token to a Reltio API we actually configured —
// never an arbitrary origin. See `@reltio/auth` `compileTargetPatterns`.
const allowedTargets = (config.environments ?? []).map((environment) =>
	environment.apiPath.endsWith("/")
		? environment.apiPath
		: `${environment.apiPath}/`,
);

/**
 * Reltio auth, configured and re-exported wholesale.
 *
 * Non-secret settings (`oauthPath`, `loginPath`) come from `@/config`, resolved
 * at startup by APP_ENV. Secrets (`clientId`, `clientSecret`) stay in the
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
	clientId: process.env.CLIENT_ID as string,
	clientSecret: process.env.CLIENT_SECRET as string,
	// Default to secure cookies; opt out only for local http development.
	secure: process.env.SECURE !== "false",
	proxy: { allowedTargets },
});
