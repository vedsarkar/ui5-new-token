/**
 * Public type definitions for `@reltio/auth/types`.
 *
 * Types here are framework-agnostic. The `SsoRedirect` callback signature
 * accepts a context object and returns a Web `Response` — the same shape
 * works in Express, Next.js, Edge runtimes, Cloudflare Workers, Bun, and
 * any other Web Fetch API host.
 *
 * Consumers reference these types when configuring the auth router or
 * writing an `ssoRedirect` callback. Runtime entry points live under
 * `@reltio/auth/express`, `@reltio/auth/next`, and `@reltio/auth/utils`.
 */

/**
 * Configuration for the BFF auth router.
 *
 * Used by both `createExpressAuth` and `createNextAuth`. Adapters do not
 * extend this type — the shape is unified across runtimes.
 */
export type AuthConfig = {
	/** URL of the Reltio OAuth server, e.g. `https://auth-stg.reltio.com/oauth`. */
	oauthPath: string;
	/** URL of the Reltio Login Page, e.g. `https://login-stg.reltio.com`. */
	loginPath: string;
	/** OAuth client id registered with the Reltio OAuth server. */
	clientId: string;
	/** OAuth client secret registered with the Reltio OAuth server. */
	clientSecret: string;
	/**
	 * Optional callback invoked at the end of a successful authorization-code
	 * exchange in `GET /callback`. Receives a context object with the tokens
	 * and the requested redirect URL; returns a Web `Response`.
	 *
	 * If omitted, the router performs a default 302 redirect to
	 * `redirectUrl` (or `/` when `redirectUrl` is absent).
	 */
	ssoRedirect?: SsoRedirect;
	/**
	 * When `true` (default), cookies are set with the `Secure` flag and the
	 * `redirect_uri` parameter sent to the Login Page uses `https://`. Set to
	 * `false` for local development over plain HTTP.
	 */
	secure?: boolean;
	/** When `true`, the `notenant=true` query parameter is appended to the Login Page URL. */
	notenant?: boolean;
};

/**
 * `ssoRedirect` callback signature.
 *
 * Receives a context object with everything the callback might want — the
 * original request, the tokens, the parsed `redirectUrl` query parameter,
 * and the CSRF state. Returns a Web `Response` (typically a 302 redirect).
 *
 * The callback MUST NOT mutate the `request` argument. To inspect query
 * parameters or headers from the original request, read them via the
 * standard Web API (`new URL(context.request.url).searchParams.get(...)`).
 */
export type SsoRedirect = (
	context: SsoRedirectContext,
) => Response | Promise<Response>;

/**
 * Context object passed to the `ssoRedirect` callback.
 */
export type SsoRedirectContext = {
	/** The incoming `GET /callback` request. */
	request: Request;
	/** The access token just exchanged from the authorization code. */
	accessToken: string;
	/** The refresh token returned alongside the access token. */
	refreshToken: string;
	/** The `redirectUrl` query parameter from the callback request. Defaults to `"/"`. */
	redirectUrl: string;
	/** The validated `state` value (matches the `state` cookie). */
	state: string;
};

/**
 * OAuth token-endpoint response shape.
 *
 * Reltio's OAuth server returns at least these fields. Additional fields
 * are preserved on the object but not typed.
 */
export type TokenResponse = {
	access_token: string;
	refresh_token: string;
	expires_in?: number;
	token_type?: string;
	scope?: string;
};

/**
 * Shape of the parsed JSON returned by `POST /checkToken`.
 *
 * The response is Reltio-specific: it includes user identity and permission
 * data filtered by `serviceId`/`tenantId` query parameters. The exact body
 * varies by Reltio environment, so the type is intentionally permissive.
 */
export type CheckTokenResponse = Record<string, unknown>;
