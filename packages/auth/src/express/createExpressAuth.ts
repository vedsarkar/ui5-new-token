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
 */

import express, {
	type NextFunction,
	type Request,
	type Response,
	type Router,
} from "express";
import { createAuth } from "../core/createAuth";
import type { AuthConfig } from "../types";
import { applyWebResponseToExpressRes, expressToWebRequest } from "./adapter";

export function createExpressAuth(config: AuthConfig): Router {
	const auth = createAuth(config);
	const router = express.Router();

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

	return router;
}
