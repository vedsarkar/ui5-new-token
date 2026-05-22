/**
 * Resolves the `tenant` and `returnTo` values that `/login` and `/logout`
 * handlers need, from two possible sources in order of precedence:
 *
 * 1. The request's own query parameters: `?returnTo=` and `?tenant=`.
 * 2. The `Referer` header URL.
 *
 * Returns a `RedirectParams` on success, or `{ error: Response }` for three
 * terminal failure cases:
 *   (a) Neither `?returnTo=` nor `Referer` is present.
 *   (b) `Referer` is malformed and no `?returnTo=` was supplied.
 *   (c) Both `?returnTo=` and `Referer` are present but their origins differ.
 */

export type RedirectParams =
	| { ok: true; tenant: string | null; returnTo: string }
	| { ok: false; error: Response };

function resolveTenant(url: URL, refererUrl: URL | null): string | null {
	return url.searchParams.get("tenant")?.trim() || refererUrl?.searchParams.get("tenant")?.trim() || null;
}

function tryParseUrl(raw: string): URL | null {
	try {
		return new URL(raw);
	} catch {
		return null;
	}
}

export function upgradeToHttps(url: string, secure: boolean): URL {
	const parsed = new URL(url);
	if (secure) parsed.protocol = "https:";
	return parsed;
}

export function resolveRedirectParams(request: Request): RedirectParams {
	const url = new URL(request.url);
	const queryReturnTo = url.searchParams.get("returnTo");
	const refererHeader = request.headers.get("referer");
	const returnToUrl = queryReturnTo ? tryParseUrl(queryReturnTo) : null;
	const refererUrl = refererHeader ? tryParseUrl(refererHeader) : null;

	if (refererHeader && !refererUrl && !queryReturnTo) {
		return { ok: false, error: new Response("Malformed Referer header", { status: 400 }) };
	}

	const returnTo = queryReturnTo ?? refererUrl?.href ?? null;
	if (!returnTo) {
		return { ok: false, error: new Response("Missing returnTo query parameter or Referer header", { status: 400 }) };
	}

	if (returnToUrl && refererUrl && returnToUrl.origin !== refererUrl.origin) {
		return { ok: false, error: new Response("returnTo origin does not match Referer origin", { status: 400 }) };
	}

	return { ok: true, tenant: resolveTenant(url, refererUrl), returnTo };
}
