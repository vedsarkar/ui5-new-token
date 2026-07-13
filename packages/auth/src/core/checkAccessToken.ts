/**
 * Reads an access token from a request and introspects it against the cluster
 * that issued it, named by the token's `aurl` claim. Shared by every auth-router
 * introspection path: the programmatic `createAuth.checkToken` (which standalone
 * API services call to guard their own endpoints) and the `POST /checkToken`
 * route.
 *
 * The cluster is selected from a pre-built allowlist, so an attacker-controlled
 * `aurl` can only ever SELECT a trusted cluster, never introduce a new outbound
 * origin. Failure is signalled by throwing `RequestError`: a missing request
 * token → `statusCode` 401 (no outbound call), an upstream 4xx → the upstream
 * status, an upstream 5xx / network failure → 502.
 */

import type { CheckTokenResponse } from "../types";
import { RequestError } from "../utils/errors";
import { getAccessToken } from "../utils/getAccessToken";
import type { AnyRequest } from "../utils/readHeader";
import { type ResolvedAuthService, selectAuthService } from "./allowlist";
import { OAUTH_BASE_PATH } from "./resolveAuthPath";
import { safeFetch } from "./safeFetch";

/** Flat options for {@link checkAccessToken}. */
export type CheckAccessTokenOptions = {
	allowlist: ResolvedAuthService[];
	request: AnyRequest;
	serviceId?: string;
	tenantId?: string;
};

export async function checkAccessToken(
	options: CheckAccessTokenOptions,
): Promise<CheckTokenResponse> {
	const { allowlist, request, serviceId, tenantId } = options;
	const accessToken = getAccessToken(request);
	if (!accessToken) {
		throw new RequestError("No access token on request", { statusCode: 401 });
	}
	const service = selectAuthService(allowlist, accessToken);
	return introspectToken({
		authPath: `${service.origin}${OAUTH_BASE_PATH}`,
		authHeader: service.authHeader,
		accessToken,
		serviceId,
		tenantId,
	});
}

/** Options for {@link introspectToken}. `authPath` is the cluster base ending in `/oauth`. */
type IntrospectTokenOptions = {
	authPath: string;
	authHeader: string;
	accessToken: string;
	serviceId?: string;
	tenantId?: string;
};

/**
 * Low-level `/checkToken` introspection request. Posts a form-encoded `token`
 * to `${authPath}/checkToken`, optionally scoped by `serviceId` / `tenantId`,
 * and returns the parsed upstream payload. Throws `RequestError` (via
 * `safeFetch`) on non-2xx and network failures.
 */
async function introspectToken(
	options: IntrospectTokenOptions,
): Promise<CheckTokenResponse> {
	const { authPath, authHeader, accessToken, serviceId, tenantId } = options;
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
