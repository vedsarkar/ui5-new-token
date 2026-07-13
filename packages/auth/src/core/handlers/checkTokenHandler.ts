/**
 * `POST /checkToken` handler.
 *
 * Validates the access token (sourced from `Authorization: Bearer` if
 * present, else from the `access_token` cookie) by calling the OAuth
 * server's `/checkToken` endpoint, then returns the upstream JSON response.
 *
 * Optional `serviceId` and `tenantId` query parameters are propagated to
 * the upstream call so the upstream can filter user permissions by service
 * and tenant.
 */

import { isRequestError } from "../../utils/errors";
import { checkAccessToken } from "../checkAccessToken";
import type { Handler } from "./types";

export const checkTokenHandler: Handler = async (options) => {
	const { allowlist, request } = options;
	const url = new URL(request.url);
	try {
		const data = await checkAccessToken({
			allowlist,
			request,
			serviceId: url.searchParams.get("serviceId") ?? undefined,
			tenantId: url.searchParams.get("tenantId") ?? undefined,
		});
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		if (isRequestError(error)) {
			// A missing request token and any upstream 4xx both mean the token
			// was rejected → 401; upstream 5xx / network failures → 502.
			const status = error.statusCode >= 500 ? 502 : 401;
			return new Response(null, { status });
		}
		throw error;
	}
};
