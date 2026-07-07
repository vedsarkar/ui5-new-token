/**
 * Tests for the public `resolveAuthPath` reader exposed on the Express
 * adapter (`createExpressAuth(config).resolveAuthPath`).
 *
 * Apps that call the Reltio Auth server directly — bypassing the BFF's
 * `/checkToken` and `/refreshToken` endpoints — use this to resolve the
 * request's cluster URL from the access token's `aurl` claim.
 *
 * The security contract: `aurl` can only ever SELECT a configured allowlist
 * cluster. An `aurl` that is absent, undecodable, or not in the allowlist
 * resolves to the primary `oauthPath` — never to an attacker-chosen origin.
 */

import { createExpressAuth } from "@reltio/auth/express";
import { describe, expect, it } from "vitest";
import {
	TOKEN_LYING_PREFIX,
	TOKEN_OVERSIZED_PREFIX,
	TOKEN_WITH_AURL,
	TOKEN_WITH_AURL_ORIGIN,
	TOKEN_WITH_NON_URL_AURL,
	TOKEN_WITHOUT_AURL,
} from "../fixtures/aurlTokens";
import { DEFAULT_CONFIG, MULTIAUTH_CONFIG } from "./testApp";

const FALLBACK = `${new URL(DEFAULT_CONFIG.oauthPath).origin}/oauth`;

/** Builds a request carrying the access token via cookie (or nothing). */
function requestWithToken(accessToken?: string): Request {
	return new Request("https://app.test/api/data", {
		headers: accessToken ? { Cookie: `access_token=${accessToken}` } : {},
	});
}

describe("Express adapter — resolveAuthPath (public routing reader)", () => {
	it("resolves to the cluster named by the token aurl when it is in the allowlist", async () => {
		const { resolveAuthPath } = createExpressAuth(MULTIAUTH_CONFIG);
		expect(await resolveAuthPath(requestWithToken(TOKEN_WITH_AURL))).toBe(
			`${TOKEN_WITH_AURL_ORIGIN}/oauth`,
		);
	});

	it("reads the token from a Bearer header too", async () => {
		const { resolveAuthPath } = createExpressAuth(MULTIAUTH_CONFIG);
		const request = new Request("https://app.test/api/data", {
			headers: { Authorization: `Bearer ${TOKEN_WITH_AURL}` },
		});
		expect(await resolveAuthPath(request)).toBe(
			`${TOKEN_WITH_AURL_ORIGIN}/oauth`,
		);
	});

	it("falls back to the primary oauthPath when no access token is present", async () => {
		const { resolveAuthPath } = createExpressAuth(MULTIAUTH_CONFIG);
		expect(await resolveAuthPath(requestWithToken())).toBe(FALLBACK);
	});

	it("falls back to the primary when the token aurl is not in the allowlist", async () => {
		// DEFAULT_CONFIG has no authEnvironments, so the token's aurl
		// (auth-idev-02) is not trusted and must not be contacted.
		const { resolveAuthPath } = createExpressAuth(DEFAULT_CONFIG);
		expect(await resolveAuthPath(requestWithToken(TOKEN_WITH_AURL))).toBe(
			FALLBACK,
		);
	});

	it("falls back to the primary when the token has no aurl claim", async () => {
		const { resolveAuthPath } = createExpressAuth(MULTIAUTH_CONFIG);
		expect(await resolveAuthPath(requestWithToken(TOKEN_WITHOUT_AURL))).toBe(
			FALLBACK,
		);
	});

	it.each([
		["an opaque (non-JWT) token", "opaque-uuid-token"],
		["a Reltio-shaped token with an undecodable payload", "s.!!!not!!!.sig"],
		[
			"a decompression-bomb token (honest oversized prefix)",
			TOKEN_OVERSIZED_PREFIX,
		],
		["a decompression-bomb token (lying prefix)", TOKEN_LYING_PREFIX],
		["a token whose aurl is a non-URL string", TOKEN_WITH_NON_URL_AURL],
	])("falls back to the primary for %s", async (_label, accessToken) => {
		const { resolveAuthPath } = createExpressAuth(MULTIAUTH_CONFIG);
		expect(await resolveAuthPath(requestWithToken(accessToken))).toBe(FALLBACK);
	});

	describe("allowlist construction fails fast on a malformed config url", () => {
		it("throws when an authEnvironments entry oauthPath is not a parseable URL", () => {
			expect(() =>
				createExpressAuth({
					...DEFAULT_CONFIG,
					authEnvironments: [
						{
							oauthPath: "not-a-url",
							clientId: "id",
							clientSecret: "secret",
						},
					],
				}),
			).toThrow(/authEnvironments oauthPath/);
		});

		it("throws when the primary oauthPath is not a parseable URL", () => {
			expect(() =>
				createExpressAuth({ ...DEFAULT_CONFIG, oauthPath: "not-a-url" }),
			).toThrow(/Invalid oauthPath:/);
		});
	});
});
