/** Conversion helpers between Express `req`/`res` and Web `Request`/`Response`. */

import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import type { ReadableStream as NodeReadableStream } from "node:stream/web";
import type {
	Request as ExpressRequest,
	Response as ExpressResponse,
	NextFunction,
} from "express";

/** `RequestInit` plus the `duplex` field undici requires to stream a request body. */
type StreamingRequestInit = RequestInit & { duplex?: "half" };

/**
 * Builds a Web `Request` from an Express `Request`, streaming the raw request
 * body through without buffering. The URL origin is a fixed placeholder
 * (`http://internal.invalid`) — handlers read only `.pathname`/`.searchParams`.
 *
 * The body is taken straight from the raw Node stream, so `createExpressAuth`
 * MUST be mounted BEFORE any body-parser middleware (`express.json()`, …): a
 * parser that has already consumed the stream leaves nothing to forward.
 */
export function expressToWebRequest(req: ExpressRequest): Request {
	const url = `http://internal.invalid${req.originalUrl}`;

	const headers = new Headers();
	for (const [key, value] of Object.entries(req.headers)) {
		if (Array.isArray(value)) {
			for (const v of value) {
				if (typeof v === "string") headers.append(key, v);
			}
		} else if (typeof value === "string") {
			headers.set(key, value);
		}
	}

	const init: StreamingRequestInit = { method: req.method, headers };
	if (req.method !== "GET" && req.method !== "HEAD") {
		init.body = Readable.toWeb(req) as unknown as ReadableStream<Uint8Array>;
		init.duplex = "half";
	}
	return new Request(url, init);
}

/**
 * Writes a Web `Response` back to an Express `Response`, streaming the body
 * through so large downloads and Server-Sent Events reach the client with
 * constant memory. Multiple `Set-Cookie` headers are preserved via `append`.
 */
export async function applyWebResponseToExpressRes(
	webResponse: Response,
	res: ExpressResponse,
	next: NextFunction,
): Promise<void> {
	try {
		res.status(webResponse.status);
		const setCookies = webResponse.headers.getSetCookie?.() ?? [];
		for (const [key, value] of webResponse.headers.entries()) {
			if (key.toLowerCase() === "set-cookie") continue;
			res.setHeader(key, value);
		}
		for (const cookieHeader of setCookies) {
			res.append("Set-Cookie", cookieHeader);
		}
		if (webResponse.body) {
			await pipeline(
				Readable.fromWeb(webResponse.body as unknown as NodeReadableStream),
				res,
			);
		} else {
			res.end();
		}
	} catch (error) {
		next(error);
	}
}
