/**
 * Shared types for the five core handlers.
 *
 * Handlers are pure functions of a `HandlerContext` returning a Web
 * `Response`. Framework adapters call `createAuth(config).handle(request)`
 * which dispatches to the appropriate handler based on URL and method.
 */

import type { AuthConfig } from "../../types";
import type { createOAuthClient } from "../createOAuthClient";

/** Context every core handler receives. */
export type HandlerContext = {
	request: Request;
	config: AuthConfig;
	oauth: ReturnType<typeof createOAuthClient>;
};

/** Pure handler function. */
export type Handler = (ctx: HandlerContext) => Promise<Response>;
