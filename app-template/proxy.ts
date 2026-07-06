import { ACCESS_TOKEN_COOKIE } from "@reltio/auth/utils";
import { type NextRequest, NextResponse } from "next/server";

// Paths that must stay reachable without a session: the auth endpoints
// (login / logout / callback / refreshToken / checkToken).
const PUBLIC_PREFIXES = ["/auth"];

/**
 * Cheap gate (Next.js Proxy, formerly Middleware): if there is no access-token
 * cookie, bounce unauthenticated visitors to the Reltio login flow with a
 * `returnTo` back to the requested page. Full token validation happens
 * server-side in `requireUser()`.
 */
export function proxy(request: NextRequest) {
	const { pathname, origin } = request.nextUrl;

	const isPublic = PUBLIC_PREFIXES.some(
		(prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
	);
	if (isPublic) {
		return NextResponse.next();
	}

	const hasToken = Boolean(request.cookies.get(ACCESS_TOKEN_COOKIE)?.value);
	if (hasToken) {
		return NextResponse.next();
	}

	const loginUrl = request.nextUrl.clone();
	loginUrl.pathname = "/auth/login";
	loginUrl.search = "";
	loginUrl.searchParams.set("returnTo", `${origin}${pathname}`);
	return NextResponse.redirect(loginUrl);
}

export const config = {
	// Run on everything except Next internals and static assets.
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
