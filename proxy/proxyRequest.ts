/**
 * Shared proxy logic — pure function on standard Web APIs (Request/Response/fetch).
 * Used both by the Vercel Edge Function in `api/proxy.ts` and by the local Vite
 * middleware in `.storybook/reltioProxyDevPlugin.ts` so the runtime behaviour
 * stays identical across environments. Lives outside `/api/` so Vercel does not
 * try to deploy it as a function (only `/api/*.ts` files become functions).
 *
 * Contract: the caller sends a request to `/api/proxy` with the original target
 * URL in the `x-target-url` header. The host is validated against an allowlist
 * (`*.reltio.com`) to prevent open-relay abuse, hop-by-hop and identity headers
 * are stripped, and the upstream response is streamed back as-is.
 */

const ALLOW_HOST = /(^|\.)reltio\.com$/i;

const STRIP_REQ = new Set([
	"host",
	"origin",
	"referer",
	"cookie",
	"x-target-url",
	"connection",
	"keep-alive",
	"transfer-encoding",
	"upgrade",
	"te",
	"trailer",
	"proxy-authorization",
	"proxy-authenticate",
	"content-length",
]);

const STRIP_RES = new Set([
	"transfer-encoding",
	"content-encoding",
	"content-length",
	"set-cookie",
]);

const BODYLESS_METHODS = new Set(["GET", "HEAD"]);

export const proxyRequest = async (req: Request): Promise<Response> => {
	const target = req.headers.get("x-target-url");
	if (!target) {
		return new Response("Missing x-target-url header", { status: 400 });
	}

	let url: URL;
	try {
		url = new URL(target);
	} catch {
		return new Response("Invalid x-target-url", { status: 400 });
	}

	if (url.protocol !== "https:" && url.protocol !== "http:") {
		return new Response("Unsupported target protocol", { status: 400 });
	}

	if (!ALLOW_HOST.test(url.hostname)) {
		return new Response("Target host is not allowed", { status: 403 });
	}

	const headers = new Headers();
	req.headers.forEach((value, key) => {
		if (!STRIP_REQ.has(key.toLowerCase())) headers.set(key, value);
	});

	const init: RequestInit & { duplex?: "half" } = {
		method: req.method,
		headers,
		body: BODYLESS_METHODS.has(req.method) ? null : req.body,
		duplex: "half",
		redirect: "manual",
	};

	let upstream: Response;
	try {
		upstream = await fetch(url, init);
	} catch (err) {
		const message =
			err instanceof Error ? err.message : "Upstream fetch failed";
		return new Response(`Upstream fetch failed: ${message}`, { status: 502 });
	}

	const respHeaders = new Headers();
	upstream.headers.forEach((value, key) => {
		if (!STRIP_RES.has(key.toLowerCase())) respHeaders.set(key, value);
	});

	return new Response(upstream.body, {
		status: upstream.status,
		statusText: upstream.statusText,
		headers: respHeaders,
	});
};
