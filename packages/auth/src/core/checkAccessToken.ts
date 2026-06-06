/**
 * Introspects an access token at the Reltio Auth Server.
 *
 * Calls the per-session Auth Server cluster's `/checkToken` endpoint with a
 * form-encoded `token` body, optionally scoped by `serviceId` / `tenantId`.
 * The cluster URL comes from `resolveAuthPath` (the signed `reltio_aurl`
 * cookie, falling back to the static `oauthPath`). Used only by
 * `checkTokenHandler`.
 *
 * Takes a single flat `options` object (`AuthDeps` plus the request, the
 * `accessToken`, and the optional `serviceId` / `tenantId` scopes); it is a
 * superset of `ResolveAuthPathOptions`, so it forwards straight to
 * `resolveAuthPath`.
 */

import type { CheckTokenResponse } from "../types";
import type { AnyRequest } from "../utils/readHeader";
import type { AuthDeps } from "./handlers/types";
import { resolveAuthPath } from "./resolveAuthPath";
import { safeFetch } from "./safeFetch";

/** Flat options for {@link checkAccessToken}. */
export type CheckAccessTokenOptions = AuthDeps & {
	request: AnyRequest;
	accessToken: string;
	serviceId?: string;
	tenantId?: string;
};

export async function checkAccessToken(
	options: CheckAccessTokenOptions,
): Promise<CheckTokenResponse> {
	const { authHeader, accessToken, serviceId, tenantId } = options;
	const authPath = await resolveAuthPath(options);
	const url = new URL(`${authPath}/checkToken`);
	if (serviceId) {
		url.searchParams.set("serviceId", serviceId);
	}
	if (tenantId) {
		url.searchParams.set("tenantId", tenantId);
	}
	const form = new URLSearchParams();
	form.append("token", accessToken);
	const response = await safeFetch({
		url: url.href,
		method: "POST",
		headers: { Authorization: authHeader },
		body: form,
	});
	return (await response.json()) as CheckTokenResponse;
}
