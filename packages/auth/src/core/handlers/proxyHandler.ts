/**
 * The `/proxy` endpoint — a transparent, streaming BFF proxy.
 *
 * `buildProxyHandler` closes over the boot-compiled allowlist `matcher` (see
 * `compileTargetPatterns` in `core/targetMatcher`) and returns a `Handler`.
 * Each request runs through a pure, synchronous guard chain; on success the
 * request is streamed upstream with the session's access token attached as a
 * Bearer, and the upstream response is streamed straight back.
 *
 * The whole per-request pipeline — validation, the error envelope, header
 * rewriting, and the streaming forward — lives in this one file so the
 * security-critical rules (credential stripping, allowlist gating, hop-by-hop
 * handling) are auditable together. The only piece factored out is the
 * boot-time allowlist compiler, which `createAuth` also calls directly.
 */

import { ACCESS_TOKEN_COOKIE, parseCookies } from "../../utils/cookies";
import { readHeader } from "../../utils/readHeader";
import type { Handler } from "./types";

export type ProxyHandlerDeps = {
	matcher: (url: URL) => boolean;
};

export function buildProxyHandler(deps: ProxyHandlerDeps): Handler {
	return async ({ request }) => {
		const result = validateProxyRequest(request, deps.matcher);
		if (!result.ok) return result.response;
		return forwardProxyRequest(request, result.target, result.token);
	};
}

// ---------------------------------------------------------------------------
// Request validation — pure, synchronous, no I/O.
// ---------------------------------------------------------------------------

type ValidationResult =
	| { ok: true; target: URL; token: string }
	| { ok: false; response: Response };

/** Smart constructor for the failure variant; keeps every guard one-line scannable. */
const reject = (code: ProxyErrorCode, message: string): ValidationResult => ({
	ok: false,
	response: proxyError(code, message),
});

/**
 * Six guards in order: target header present → parseable URL → no embedded
 * credentials → https scheme → allowlist match → access_token cookie present.
 *
 * Reads the token from the cookie directly (NOT `getAccessToken`, which prefers
 * Authorization): the proxy treats inbound Authorization as untrusted and
 * strips it, so trusting it here would open a token-confusion attack.
 */
function validateProxyRequest(
	request: Request,
	matcher: (url: URL) => boolean,
): ValidationResult {
	const raw = readHeader(request, "reltio-target-url");
	if (!raw?.trim()) {
		return reject("missing_target_url", "reltio-target-url header is required");
	}

	if (!URL.canParse(raw)) {
		return reject("invalid_target_url", `Invalid URL: ${raw}`);
	}
	const target = new URL(raw);

	// Embedded creds would reach upstream as Basic auth alongside our Bearer
	// (token-confusion). Quote `origin`, not `href` — don't echo creds back.
	if (target.username || target.password) {
		return reject(
			"invalid_target_url",
			`Target URL must not contain credentials: ${target.origin}${target.pathname}`,
		);
	}

	if (target.protocol !== "https:") {
		return reject(
			"unsupported_scheme",
			`Unsupported protocol: ${target.protocol}`,
		);
	}

	if (!matcher(target)) {
		return reject(
			"target_not_allowed",
			`Target URL not in allowlist: ${target.href}`,
		);
	}

	const cookies = parseCookies(readHeader(request, "cookie") ?? "");
	const token = cookies[ACCESS_TOKEN_COOKIE];
	if (!token) {
		return reject("missing_access_token", "access_token cookie is required");
	}

	return { ok: true, target, token };
}

// ---------------------------------------------------------------------------
// Error envelope — the proxy's own reject paths only. Upstream 4xx/5xx are
// forwarded verbatim (status-code transparency). Consumers key on `error`;
// `message` is dev-facing, not part of the contract.
// ---------------------------------------------------------------------------

type ProxyErrorCode =
	| "missing_target_url"
	| "invalid_target_url"
	| "unsupported_scheme"
	| "target_not_allowed"
	| "missing_access_token"
	| "upstream_error";

const STATUS_FOR_CODE: Record<ProxyErrorCode, number> = {
	missing_target_url: 400,
	invalid_target_url: 400,
	unsupported_scheme: 400,
	target_not_allowed: 403,
	missing_access_token: 401,
	upstream_error: 502,
};

function proxyError(code: ProxyErrorCode, message: string): Response {
	return new Response(JSON.stringify({ error: code, message }), {
		status: STATUS_FOR_CODE[code],
		headers: { "Content-Type": "application/json; charset=utf-8" },
	});
}

// ---------------------------------------------------------------------------
// Header rewriting — security-critical strip lists for both directions, kept
// side-by-side for auditing.
// ---------------------------------------------------------------------------

// RFC 7230 § 6.1 — never forwarded by any proxy.
const HOP_BY_HOP = new Set([
	"connection",
	"keep-alive",
	"transfer-encoding",
	"te",
	"trailer",
	"upgrade",
	"proxy-authenticate",
	"proxy-authorization",
]);

// Request strip set. `authorization`/`cookie` are dropped so the browser's
// credentials never leak upstream (the access token is re-attached as a Bearer
// below); `reltio-target-url`/`host` are proxy-routing metadata;
// `content-length` is dropped because the body is streamed with chunked
// framing; `accept-encoding` is replaced with `identity`.
const STRIP_FROM_REQUEST = new Set([
	"authorization",
	"cookie",
	"reltio-target-url",
	"host",
	"content-length",
	"accept-encoding",
]);

// Response strip set. `set-cookie` never reaches the browser via the proxy;
// `content-encoding`/`content-length` are dropped because `fetch` (undici)
// transparently decodes the upstream body, so the streamed bytes are always
// identity-encoded and their length is re-framed as chunked downstream.
const STRIP_FROM_RESPONSE = new Set([
	"set-cookie",
	"content-encoding",
	"content-length",
]);

function buildOutgoingHeaders(inbound: Headers, accessToken: string): Headers {
	const extensionHop = extensionHopByHop(inbound);
	const outgoing = new Headers();
	for (const [name, value] of inbound) {
		if (shouldStrip(name, STRIP_FROM_REQUEST, extensionHop)) continue;
		outgoing.append(name, value);
	}
	outgoing.set("Authorization", `Bearer ${accessToken}`);
	outgoing.set("Accept-Encoding", "identity");
	return outgoing;
}

function buildOutgoingResponseHeaders(upstream: Headers): Headers {
	const extensionHop = extensionHopByHop(upstream);
	const outgoing = new Headers();
	for (const [name, value] of upstream) {
		if (shouldStrip(name, STRIP_FROM_RESPONSE, extensionHop)) continue;
		outgoing.append(name, value);
	}
	return outgoing;
}

function shouldStrip(
	name: string,
	directionStrip: Set<string>,
	extensionHop: Set<string>,
): boolean {
	return (
		directionStrip.has(name) || HOP_BY_HOP.has(name) || extensionHop.has(name)
	);
}

/**
 * RFC 7230 § 6.1 — the `Connection` header lists extra hop-by-hop tokens to
 * strip. `Connection: keep-alive, x-trace-id` → `Set { "keep-alive", "x-trace-id" }`.
 */
function extensionHopByHop(headers: Headers): Set<string> {
	const connection = headers.get("connection");
	if (!connection) return new Set();
	return new Set(
		connection
			.split(",")
			.map((token) => token.trim().toLowerCase())
			.filter(Boolean),
	);
}

// ---------------------------------------------------------------------------
// Streaming forward. Request and response bodies are piped through without
// buffering, so large uploads/downloads and streaming responses (SSE, chunked)
// pass through with constant memory. The client's abort propagates upstream
// via `request.signal`.
// ---------------------------------------------------------------------------

/** Fetch spec: these statuses MUST NOT carry a body — `new Response(body, ...)` throws otherwise. */
const NULL_BODY_STATUSES = new Set([101, 103, 204, 205, 304]);

/** `RequestInit` plus the `duplex` field undici requires to stream a request body. */
type StreamingRequestInit = RequestInit & { duplex?: "half" };

async function forwardProxyRequest(
	request: Request,
	target: URL,
	token: string,
): Promise<Response> {
	const init: StreamingRequestInit = {
		method: request.method,
		headers: buildOutgoingHeaders(request.headers, token),
		redirect: "manual",
		signal: request.signal,
	};
	// GET/HEAD carry no body (request.body is null); everything else streams
	// its body straight upstream — `duplex: "half"` is required by undici.
	if (request.body !== null) {
		init.body = request.body;
		init.duplex = "half";
	}

	try {
		const upstream = await globalThis.fetch(target, init);
		const body = NULL_BODY_STATUSES.has(upstream.status) ? null : upstream.body;
		return new Response(body, {
			status: upstream.status,
			statusText: upstream.statusText,
			headers: buildOutgoingResponseHeaders(upstream.headers),
		});
	} catch {
		// Don't echo the raw error: undici fetch failures leak internal
		// IPs, ports, and TLS details.
		return proxyError("upstream_error", "Failed to reach the upstream service");
	}
}
