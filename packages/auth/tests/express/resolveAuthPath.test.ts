/**
 * Tests for the public `resolveAuthPath` reader exposed on the Express
 * adapter (`createExpressAuth(config).resolveAuthPath`).
 *
 * Apps that call the Reltio Auth server directly — bypassing the BFF's
 * `/checkToken` and `/refreshToken` endpoints — use this to resolve the
 * per-session cluster URL from the signed `reltio_aurl` cookie.
 *
 * The security contract is fail-closed: a valid, same-secret cookie routes
 * to its verified cluster origin; ANY other input (absent, malformed, wrong
 * MAC length, or signed with a different secret) resolves to the static
 * `oauthPath` fallback and never to an attacker-chosen origin.
 */

import { createExpressAuth } from "@reltio/auth/express";
import { describe, expect, it } from "vitest";
import {
	TOKEN_WITH_AURL,
	TOKEN_WITH_AURL_ORIGIN,
} from "../fixtures/aurlTokens";
import {
	createTestApp,
	DEFAULT_CONFIG,
	mintAurlCookie,
	useMswServer,
} from "./testApp";

const FALLBACK = `${new URL(DEFAULT_CONFIG.oauthPath).origin}/oauth`;

function requestWithCookie(cookie: string): Request {
	return new Request("https://app.test/api/data", {
		headers: { Cookie: `reltio_aurl=${cookie}` },
	});
}

describe("Express adapter — resolveAuthPath (public routing reader)", () => {
	useMswServer();

	it("resolves to the verified cluster origin for a valid reltio_aurl cookie", async () => {
		const app = createTestApp();
		const cookie = await mintAurlCookie(app, TOKEN_WITH_AURL);

		const { resolveAuthPath } = createExpressAuth(DEFAULT_CONFIG);
		expect(await resolveAuthPath(requestWithCookie(cookie))).toBe(
			`${TOKEN_WITH_AURL_ORIGIN}/oauth`,
		);
	});

	it("falls back to the static oauthPath when no reltio_aurl cookie is present", async () => {
		const { resolveAuthPath } = createExpressAuth(DEFAULT_CONFIG);
		const request = new Request("https://app.test/api/data");

		expect(await resolveAuthPath(request)).toBe(FALLBACK);
	});

	it.each([
		["no segment separator", "tampered-garbage"],
		["a segment outside the base64url alphabet", "aaa+.bbbb"],
		["a single-char segment atob cannot decode", "a.b"],
		[
			"a valid-base64url MAC of the wrong length",
			`${Buffer.from("https://evil.example.com").toString("base64url")}.${Buffer.from(new Uint8Array(8)).toString("base64url")}`,
		],
	])("fails closed for a cookie with %s", async (_label, cookie) => {
		const { resolveAuthPath } = createExpressAuth(DEFAULT_CONFIG);
		expect(await resolveAuthPath(requestWithCookie(cookie))).toBe(FALLBACK);
	});

	it("fails closed for a well-formed cookie minted with a different client secret", async () => {
		// A genuine, well-formed cookie — but signed with a different secret,
		// so the HMAC check fails and the cookie is ignored.
		const otherApp = createTestApp({
			config: { clientSecret: "a-different-client-secret" },
		});
		const foreignCookie = await mintAurlCookie(otherApp, TOKEN_WITH_AURL);

		const { resolveAuthPath } = createExpressAuth(DEFAULT_CONFIG);
		expect(await resolveAuthPath(requestWithCookie(foreignCookie))).toBe(
			FALLBACK,
		);
	});
});
