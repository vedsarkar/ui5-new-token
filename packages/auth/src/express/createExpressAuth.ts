/**
 * `createExpressAuth(config)` — Express router factory.
 *
 * The returned router mounts five endpoints (`/login`, `/logout`,
 * `/callback`, `/refreshToken`, `/checkToken`) and dispatches each request
 * through the framework-agnostic core. Each route converts the Express
 * request to a Web `Request`, runs the core router, and writes the
 * resulting Web `Response` back to Express.
 *
 * The core `createAuth` is invoked once at setup. The optional
 * `config.ssoRedirect` callback uses the same Web-API signature as the
 * Next.js adapter (`(ctx) => Response`).
 *
 * The returned router also carries a `resolveAuthPath` method (the same
 * one `createAuth` exposes) so Express apps that call the Auth server
 * directly — bypassing the router's `/checkToken` and `/refreshToken`
 * endpoints — can resolve the per-session cluster URL without re-deriving
 * the HMAC key.
 */

import express, {
	type NextFunction,
	type Request,
	type Response,
	type Router,
} from "express";
import { createAuth } from "../core/createAuth";
import type { AuthConfig } from "../types";
import type { AnyRequest } from "../utils/readHeader";
import { applyWebResponseToExpressRes, expressToWebRequest } from "./adapter";

/**
 * Express `Router` augmented with the dynamic Auth-server routing resolver.
 * Attaching the method to the router (rather than changing the return shape
 * to an object) keeps the existing `app.use(path, createExpressAuth(...))`
 * usage working unchanged.
 */
export type ExpressAuthRouter = Router & {
	resolveAuthPath: (req: AnyRequest) => Promise<string>;
};

export function createExpressAuth(config: AuthConfig): ExpressAuthRouter {
	const auth = createAuth(config);
	const router = express.Router() as ExpressAuthRouter;

	const handle = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const webResponse = await auth.handle(expressToWebRequest(req));
			await applyWebResponseToExpressRes(webResponse, res, next);
		} catch (error) {
			next(error);
		}
	};

	router.get("/login", handle);
	router.get("/logout", handle);
	router.get("/callback", handle);
	router.post("/refreshToken", handle);
	router.post("/checkToken", handle);

	router.resolveAuthPath = auth.resolveAuthPath;

	return router;
}
