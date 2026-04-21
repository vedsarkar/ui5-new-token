import type { IncomingMessage, ServerResponse } from "node:http";
import { Readable } from "node:stream";
import type { Plugin } from "vite";
import { proxyRequest } from "../api/proxy.shared.ts";

const PROXY_PATH = "/api/proxy";
const BODYLESS_METHODS = new Set(["GET", "HEAD"]);

const toWebRequest = (req: IncomingMessage): Request => {
	const url = `http://localhost${req.url ?? "/"}`;

	const headers = new Headers();
	for (const [key, value] of Object.entries(req.headers)) {
		if (Array.isArray(value)) {
			for (const item of value) headers.append(key, item);
		} else if (typeof value === "string") {
			headers.set(key, value);
		}
	}

	const method = req.method ?? "GET";
	const body = BODYLESS_METHODS.has(method)
		? null
		: (Readable.toWeb(req) as ReadableStream<Uint8Array>);

	return new Request(url, {
		method,
		headers,
		body,
		duplex: "half",
	} as RequestInit);
};

const writeWebResponse = async (
	webRes: Response,
	res: ServerResponse,
): Promise<void> => {
	res.statusCode = webRes.status;
	webRes.headers.forEach((value, key) => {
		res.setHeader(key, value);
	});

	if (!webRes.body) {
		res.end();
		return;
	}

	const reader = webRes.body.getReader();
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			res.write(value);
		}
	} finally {
		res.end();
	}
};

/**
 * Vite plugin that mounts the same `proxyRequest` handler used by the Vercel
 * Edge function on the local Storybook dev server. This means contributors can
 * run `npm run dev` without `vercel dev` or any Vercel credentials — the only
 * runtime requirement is Node 18+ (for `Readable.toWeb` and global `fetch`).
 */
export const reltioProxyDevPlugin = (): Plugin => ({
	name: "reltio-proxy-dev",
	configureServer(server) {
		server.middlewares.use(PROXY_PATH, async (req, res) => {
			try {
				const webReq = toWebRequest(req);
				const webRes = await proxyRequest(webReq);
				await writeWebResponse(webRes, res);
			} catch (err) {
				const message = err instanceof Error ? err.message : "Proxy error";
				res.statusCode = 500;
				res.setHeader("content-type", "text/plain; charset=utf-8");
				res.end(`Dev proxy error: ${message}`);
			}
		});
	},
});
