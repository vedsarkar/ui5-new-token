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

import { getAccessToken } from "../../utils/getAccessToken";
import { isRequestError } from "../errors";
import type { Handler } from "./types";

export const checkTokenHandler: Handler = async ({ request, oauth }) => {
	const accessToken = getAccessToken(request);
	if (!accessToken) {
		return new Response(null, { status: 401 });
	}

	const url = new URL(request.url);
	try {
		const data = await oauth.checkToken(accessToken, {
			serviceId: url.searchParams.get("serviceId") ?? undefined,
			tenantId: url.searchParams.get("tenantId") ?? undefined,
		});
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		if (isRequestError(error)) {
			// Per spec "Upstream error propagation": 5xx and network failures
			// surface as 502; any 4xx from the introspection endpoint means
			// the access token was rejected → 401.
			const status = error.statusCode >= 500 ? 502 : 401;
			return new Response(null, { status });
		}
		throw error;
	}
};
