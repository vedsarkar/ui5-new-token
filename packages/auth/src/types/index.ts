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
 * Per-permission action map inside {@link CheckTokenResponseUserPermissions}.
 *
 * Keyed by Reltio permission string (e.g. `"MDM:data.*"`, `"Auth:customer.*"`),
 * each value maps an action (`READ`, `CREATE`, `UPDATE`, `DELETE`, `EXECUTE`)
 * to the list of tenant ids / scope tokens (e.g. `"SuperUser:*"`,
 * `"customerId:Reltio"`, or a tenant id) the action is granted for.
 */
export type CheckTokenResponsePermissionMap = Record<
	string,
	Record<string, string[]>
>;

/**
 * The `userPermissions` block of {@link CheckTokenResponseUser}.
 */
export type CheckTokenResponseUserPermissions = {
	/** Role name → tenant ids / scope tokens the role applies to. */
	roles: Record<string, string[]>;
	/** Permission string → action → tenant ids / scope tokens. */
	permissions: CheckTokenResponsePermissionMap;
	/** Permissions grouped by service. Shape varies by environment. */
	permissionsByService: Record<string, unknown>;
	[key: string]: unknown;
};

/**
 * Identity of the user a token represents, as returned by `POST /checkToken`.
 */
export type CheckTokenResponseUser = {
	/** Reltio customer the user belongs to. */
	customer: string;
	/** Username of the authenticated user. */
	username: string;
	/** Email of the authenticated user. */
	email: string;
	/** Bound entity, when the user maps to a Reltio entity (else `null`). */
	entity: unknown;
	/** Linked external identity-provider tokens. */
	externalTokens: unknown[];
	/** Tenant ids the user has access to. */
	tenants: string[];
	/** Reltio role names granted to the user. */
	roles: string[];
	/** Resolved per-tenant role and permission grants. */
	userPermissions: CheckTokenResponseUserPermissions;
	/** Whether the account is enabled. */
	enabled: boolean;
	/** Whether the account has not expired. */
	accountNonExpired: boolean;
	/** Whether the credentials have not expired. */
	credentialsNonExpired: boolean;
	/** Whether the account is not locked. */
	accountNonLocked: boolean;
	/** Whether the user authenticates through an external IdP. */
	externalUser: boolean;
	/** Preferred locale (e.g. `"en"`). */
	locale: string;
	/** Preferred timezone (e.g. `"UTC"`). */
	timezone: string;
	/** Group memberships. */
	groups: unknown[];
	/** Whether the user record is encrypted. */
	encrypted: boolean;
	[key: string]: unknown;
};

/**
 * Parsed payload returned by the Auth Server's `POST /checkToken`
 * introspection endpoint — the resolved type of `auth.checkToken(request)`.
 *
 * The response is Reltio-specific: it carries the client and user identity
 * plus the permission data (`roles`, `scopes`, `resourceIds`) filtered by the
 * `serviceId`/`tenantId` scopes. The known fields are typed for ergonomic
 * route gating; the index signatures keep the type permissive because the
 * exact body varies by Reltio environment.
 *
 * This is a compile-time convenience only — `checkToken` casts the upstream
 * JSON to this shape and performs NO runtime schema validation.
 */
export type CheckTokenResponse = {
	/** OAuth client id the token was issued to. */
	clientId: string;
	/** Token expiry as a Unix timestamp. */
	expiration: number;
	/** Resource ids the token grants access to. */
	resourceIds: string[];
	/** Roles granted to the token, filtered by the requested scopes. */
	roles: string[];
	/** OAuth scopes granted to the token. */
	scopes: string[];
	/** Identity of the user the token represents. */
	user: CheckTokenResponseUser;
	/** Reltio error code when introspection reports a problem (else `null`). */
	errorCode: string | null;
	/** Human-readable error message paired with `errorCode` (else `null`). */
	errorMessage: string | null;
	[key: string]: unknown;
};
