import type { CheckTokenResponse } from "@reltio/auth/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { checkToken } from "@/lib/auth";

/**
 * Introspects the current request's Reltio token server-side.
 *
 * `checkToken` accepts any request-like object with a `headers` bag exposing
 * `.get()`; the App Router's `headers()` returns exactly that, carrying the
 * `access_token` / `reltio_aurl` cookies the auth core needs. Returns `null`
 * when the visitor is not authenticated (no/expired token).
 *
 * Wrapped in React `cache()` so the layout and the page (and any component)
 * share a single introspection call per request.
 */
export const getUser = cache(
	async (): Promise<CheckTokenResponse | null> => {
		try {
			return await checkToken({ headers: await headers() });
		} catch {
			return null;
		}
	},
);

/**
 * Server-side guard for protected pages. Redirects to the login flow when the
 * visitor has no valid session, otherwise returns the introspected token.
 */
export async function requireUser(): Promise<CheckTokenResponse> {
	const user = await getUser();
	if (!user) {
		redirect("/auth/login");
	}
	return user;
}
