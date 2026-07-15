import { isRequestError } from "@reltio/auth/utils";
import config from "@/config";
import { checkToken, getServiceToken } from "@/lib/auth";

// Runs at request time: it reads the runtime-resolved config (APP_CONFIG), the
// caller's session, and mints a live service token — nothing to prerender.
export const dynamic = "force-dynamic";

// Same-origin BFF proxy to the internal Reltio configuration service, where
// shared configurations live. The browser calls `GET /api/config/service/<path>`
// and this route forwards to `${configServicePath}/<path>` (e.g.
// `/api/config/service/adminToolsConfig` → `.../service/adminToolsConfig`).
//
// Unlike `/auth/proxy` (which forwards the USER's session token to allow-listed
// Reltio APIs), this route authenticates as the app's API CLIENT: it attaches a
// `client_credentials` service token minted from API_CLIENT_ID/API_CLIENT_SECRET
// (see `getServiceToken` in `lib/auth`). The user's token is never sent upstream.
//
// Read-only (GET). Configurations can be large, so the upstream response is
// streamed straight back — its body is never buffered here, and `cache:
// "no-store"` stops Next from buffering it into the Data Cache — keeping memory
// flat regardless of payload size.

// Response headers to drop: `fetch` (undici) transparently decodes the upstream
// body, so its content-encoding/length no longer describe the streamed bytes;
// hop-by-hop and any upstream cookies must not reach the browser.
const STRIP_FROM_RESPONSE = new Set([
	"content-encoding",
	"content-length",
	"transfer-encoding",
	"connection",
	"set-cookie",
]);

// The configuration service demands an `environment` query parameter (with
// `tenant`/`default` alongside it). Apply these defaults when the caller omits
// them so a bare `GET .../service/<name>` resolves to the shared configuration.
const CONFIG_QUERY_DEFAULTS: Record<string, string> = {
	environment: "default",
	tenant: "default",
};

type RouteContext = { params: Promise<{ path: string[] }> };

// Error envelope. The reject reason is always logged server-side; the response
// body carries the detail only outside production so a blank page never hides a
// misconfiguration during development.
function proxyError(status: number, reason: string, cause?: unknown): Response {
	console.error(`[config-service proxy] ${reason}`, cause ?? "");
	const body =
		process.env.NODE_ENV === "production"
			? null
			: JSON.stringify({
					error: reason,
					detail: cause instanceof Error ? cause.message : undefined,
				});
	return new Response(body, {
		status,
		headers: body ? { "Content-Type": "application/json; charset=utf-8" } : {},
	});
}

export async function GET(
	request: Request,
	context: RouteContext,
): Promise<Response> {
	// Gate the proxy behind a valid Reltio session. Without it, the app's
	// API-client token — which can read shared configuration — would be reachable
	// by any anonymous caller. No specific role is required (a valid session is
	// enough); pass `{ serviceId, tenantId }` to `checkToken` to gate further.
	try {
		await checkToken(request);
	} catch (error) {
		const status = isRequestError(error) ? error.statusCode : 500;
		return proxyError(status, "session_check_failed", error);
	}

	let serviceToken: string;
	try {
		// Defaults to the app's primary API client (config.oauthPath +
		// API_CLIENT_ID/API_CLIENT_SECRET). Pass explicit args to reach another
		// API client or auth environment.
		serviceToken = await getServiceToken();
	} catch (error) {
		return proxyError(502, "service_token_failed", error);
	}

	const { path } = await context.params;
	// The upstream configuration service requires an `environment` (and pairs it
	// with `tenant`/`default`) query parameter. When the caller omits them, fall
	// back to the shared "default" configuration instead of surfacing a 400.
	const params = new URL(request.url).searchParams;
	for (const [key, value] of Object.entries(CONFIG_QUERY_DEFAULTS)) {
		if (!params.has(key)) params.set(key, value);
	}
	const search = params.toString();
	const target = `${config.configServicePath}/${path
		.map(encodeURIComponent)
		.join("/")}${search ? `?${search}` : ""}`;

	try {
		const upstream = await fetch(target, {
			headers: {
				Authorization: `Bearer ${serviceToken}`,
				Accept: "application/json",
			},
			signal: request.signal,
			// Stream the response instead of letting Next buffer it into the Data
			// Cache — essential for large configurations.
			cache: "no-store",
		});
		const outgoing = new Headers();
		for (const [name, value] of upstream.headers) {
			if (!STRIP_FROM_RESPONSE.has(name)) outgoing.append(name, value);
		}
		// `upstream.body` is a ReadableStream piped straight to the client, so the
		// payload is never fully held in memory here.
		return new Response(upstream.body, {
			status: upstream.status,
			statusText: upstream.statusText,
			headers: outgoing,
		});
	} catch (error) {
		// The client went away (navigated off, React StrictMode remount in dev,
		// tab closed): `request.signal` aborted our upstream fetch. Nothing is
		// wrong and no one is listening, so don't log it or dress it up as a 502.
		if (request.signal.aborted) {
			return new Response(null, { status: 499 });
		}
		return proxyError(502, "upstream_unreachable", error);
	}
}
