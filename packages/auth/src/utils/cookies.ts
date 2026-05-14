/**
 * Cookie utilities for `@reltio/auth`.
 *
 * The same option vector is used at set time and clear time so browsers
 * reliably remove cookies on logout (some browsers identify cookies by
 * `name + path + domain + secure` and may keep stale entries if the clear
 * options don't match the set options).
 *
 * Cookie name constants are hardcoded in v1 to match the legacy library's
 * over-the-wire contract. Configurable cookie names are a follow-up feature.
 */

/** Name of the cookie that carries the user's access token. */
export const ACCESS_TOKEN_COOKIE = "access_token";
/** Name of the cookie that carries the user's refresh token. */
export const REFRESH_TOKEN_COOKIE = "refresh_token";
/** Name of the cookie that carries the CSRF state for an in-flight login. */
export const STATE_COOKIE = "state";

/** Options applied to every cookie set or cleared by the router. */
type CookieOptions = {
	httpOnly: boolean;
	secure: boolean;
	sameSite: "lax" | "strict" | "none";
	path: string;
	maxAge?: number;
};

/**
 * Returns the standard option vector used by every cookie this router
 * touches. `secure` follows the configuration; the rest are constants.
 */
export function defaultCookieOptions(secure: boolean): CookieOptions {
	return {
		httpOnly: true,
		secure,
		sameSite: "lax",
		path: "/",
	};
}

/**
 * Serialises a cookie name, value, and options into a single `Set-Cookie`
 * header string per RFC 6265. The output is suitable for use as a value
 * in `Response.headers.append("Set-Cookie", value)`.
 */
export function serializeCookie(
	name: string,
	value: string,
	options: CookieOptions,
): string {
	const parts: string[] = [`${name}=${encodeURIComponent(value)}`];
	parts.push(`Path=${options.path}`);
	if (options.maxAge !== undefined) {
		parts.push(`Max-Age=${Math.floor(options.maxAge)}`);
	}
	if (options.httpOnly) {
		parts.push("HttpOnly");
	}
	if (options.secure) {
		parts.push("Secure");
	}
	if (options.sameSite) {
		const v =
			options.sameSite === "lax"
				? "Lax"
				: options.sameSite === "strict"
					? "Strict"
					: "None";
		parts.push(`SameSite=${v}`);
	}
	return parts.join("; ");
}

/**
 * Returns the `Set-Cookie` header string that clears a cookie. Uses the same
 * option vector that was applied at set time, plus `Max-Age=0` and an empty
 * value. Critical for `secure` cookies: browsers will not clear a `Secure`
 * cookie unless the clear header also carries the `Secure` flag.
 */
export function clearCookie(name: string, options: CookieOptions): string {
	return serializeCookie(name, "", { ...options, maxAge: 0 });
}

/**
 * Parses a `Cookie` request header into a plain object. Values are
 * URL-decoded to match what `serializeCookie` produced on the way out.
 *
 * Returns an empty object if the header is missing, empty, or malformed
 * beyond recovery. Individual malformed pairs are skipped silently.
 */
export function parseCookies(
	header: string | null | undefined,
): Record<string, string> {
	if (!header) {
		return {};
	}
	const out: Record<string, string> = {};
	for (const segment of header.split(";")) {
		const trimmed = segment.trim();
		if (!trimmed) {
			continue;
		}
		const eq = trimmed.indexOf("=");
		if (eq === -1) {
			continue;
		}
		const name = trimmed.slice(0, eq).trim();
		const rawValue = trimmed.slice(eq + 1).trim();
		if (!name) {
			continue;
		}
		try {
			out[name] = decodeURIComponent(rawValue);
		} catch {
			out[name] = rawValue;
		}
	}
	return out;
}
