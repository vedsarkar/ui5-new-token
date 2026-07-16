import type { NextRequest } from "next/server";
import { handlers } from "@/lib/auth";

// The Reltio auth endpoints (login / logout / callback / refreshToken /
// checkToken) all live under `/auth/`. `nextUrl.pathname` is already stripped
// of the base path, so the check is base-path agnostic.
const AUTH_PREFIX = "/auth/";

/**
 * Next.js Proxy (middleware). Serves the Reltio auth endpoints straight from
 * here — in middleware `request.url` still includes the base path (route
 * handlers get it stripped), so @reltio/auth derives the OAuth callback
 * (`redirect_uri`) under the sub-path on its own, with no rewriting.
 *
 * Everything else falls through; protected pages guard themselves and pass an
 * explicit `returnTo` from the client (see app/SignInRedirect.tsx).
 */
export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname.startsWith(AUTH_PREFIX)) {
		const handler = handlers[request.method as keyof typeof handlers];
		return handler ? handler(request) : new Response(null, { status: 405 });
	}
}
