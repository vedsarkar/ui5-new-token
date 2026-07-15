import { isRequestError } from "@reltio/auth/utils";
import config from "@/config";
import { checkToken } from "@/lib/auth";

// APP_ENV is resolved at start time inside `@/config`. Build artifacts are
// identical across environments and carry no APP_ENV, so this route MUST run at
// request time, never be prerendered at build (where APP_ENV would be absent
// and the config would fall back to the default env). `force-dynamic` keeps the
// selection at runtime.
export const dynamic = "force-dynamic";

// The public config delivered to the browser. This is the per-app boundary:
// list ONLY the settings the client actually needs. config/*.json holds only
// non-secret runtime settings (secrets stay in the environment), so nothing
// sensitive can leak here — but still forward a curated subset, not the whole
// object, so an app doesn't ship settings only some apps need (e.g. the RDM app
// would add `rdm` here; others leave it out entirely).
//
// `environments` is UI-facing (the browser lets the user pick one and passes
// `environment.name` as a query param). `oauthPath` / `loginPath` are kept
// server-side.
const publicConfig = {
	environments: config.environments,
};

export type PublicConfig = typeof publicConfig;

// Even the public config is gated behind a valid session — `checkToken`
// introspects the request's access token and throws `RequestError` when it is
// missing or rejected. A missing/invalid token surfaces as `401`, which the
// browser's `authFetch` turns into a refresh → retry → login flow. No specific
// role/permission is required here; a valid token is enough.
export async function GET(request: Request) {
	try {
		await checkToken(request);
	} catch (error) {
		const status = isRequestError(error) ? error.statusCode : 500;
		return new Response(null, { status });
	}

	return Response.json(publicConfig);
}
