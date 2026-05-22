/**
 * Conversion helpers between Express `req`/`res` and the Web Fetch API
 * `Request`/`Response` types.
 *
 * The Express adapter converts every incoming Express request to a Web
 * `Request`, runs the core router, and writes the resulting Web `Response`
 * back to the Express `res`.
 */

import type {
	Request as ExpressRequest,
	Response as ExpressResponse,
	NextFunction,
} from "express";

/**
 * Builds a Web `Request` from an Express `Request`.
 *
 * URL is assembled with the IANA-reserved placeholder origin (`http://internal.invalid`)
 * so that `new URL(request.url)` always succeeds. Handlers must only read `.pathname`
 * and `.searchParams` from `request.url` — the origin is not meaningful.
 * Body is not forwarded — none of the five auth endpoints reads a request body.
 */
export function expressToWebRequest(req: ExpressRequest): Request {
	const url = `http://internal.invalid${req.originalUrl}`;

	const headers = new Headers();
	for (const [key, value] of Object.entries(req.headers)) {
		if (Array.isArray(value)) {
			for (const v of value) {
				if (typeof v === "string") {
					headers.append(key, v);
				}
			}
		} else if (typeof value === "string") {
			headers.set(key, value);
		}
	}

	return new Request(url, {
		method: req.method,
		headers,
	});
}

/**
 * Writes a Web `Response` back to an Express `Response`.
 *
 * `Set-Cookie` headers are written individually so multiple cookies are
 * preserved (Headers.set overwrites; Headers.append + getSetCookie reads
 * back the full list).
 *
 * The body is read as text (we don't have streaming auth endpoints).
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
			if (key.toLowerCase() === "set-cookie") {
				continue;
			}
			res.setHeader(key, value);
		}
		for (const cookieHeader of setCookies) {
			res.append("Set-Cookie", cookieHeader);
		}
		if (webResponse.body) {
			const text = await webResponse.text();
			res.send(text);
		} else {
			res.end();
		}
	} catch (error) {
		next(error);
	}
}
