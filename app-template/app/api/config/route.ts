import { isRequestError } from "@reltio/auth/utils";
import { checkToken } from "@/lib/auth";

// APP_CONFIG is resolved at start time inside `@/config`. Build artifacts are
// identical across environments and carry no APP_CONFIG, so this route MUST run at
// request time, never be prerendered at build (where APP_CONFIG would be absent
// and the config would fall back to the default env). `force-dynamic` keeps the
// selection at runtime.
export const dynamic = "force-dynamic";

// The public config delivered to the browser. This is the per-app boundary:
// expose ONLY the settings the client actually needs. config/*.json holds only
// non-secret runtime settings (secrets stay in the environment), so nothing
// sensitive can leak here — but still forward a curated subset, not the whole
// object, so an app doesn't ship settings only some apps need.
//
// Nothing is exposed by default: the environment list now comes from the shared
// `adminToolsConfig` in the config service (see `lib/useConfig` / `lib/useTenants`),
// and `oauthPath` / `loginPath` stay server-side. Add fields here as your app
// needs to surface non-secret config to the browser.
const publicConfig = {};

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
