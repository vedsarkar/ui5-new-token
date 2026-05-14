/**
 * Unit tests for `getRefreshToken` — reads the refresh token from the
 * `refresh_token` cookie across all supported request shapes.
 *
 * Unlike `getAccessToken`, this helper has no header fallback: refresh
 * tokens are always stored in `HttpOnly` cookies and never accepted from
 * an `Authorization` header. That asymmetry is a deliberate design choice
 * (see spec "Framework-agnostic helpers").
 */

import { getRefreshToken } from "@reltio/auth/utils";
import { describe, expect, it } from "vitest";

describe("getRefreshToken — Web Request", () => {
	it("reads token from the refresh_token cookie", () => {
		const req = new Request("https://app.test/", {
			headers: { Cookie: "refresh_token=abc" },
		});
		expect(getRefreshToken(req)).toBe("abc");
	});

	it("returns null when the cookie is absent", () => {
		const req = new Request("https://app.test/");
		expect(getRefreshToken(req)).toBeNull();
	});

	it("returns null when the Cookie header lacks refresh_token", () => {
		const req = new Request("https://app.test/", {
			headers: { Cookie: "access_token=abc; other=xyz" },
		});
		expect(getRefreshToken(req)).toBeNull();
	});

	it("ignores a Bearer Authorization header (refresh tokens are cookie-only)", () => {
		const req = new Request("https://app.test/", {
			headers: { Authorization: "Bearer not_a_refresh_token" },
		});
		expect(getRefreshToken(req)).toBeNull();
	});

	it("does not mutate the request argument", () => {
		const req = new Request("https://app.test/", {
			headers: { Cookie: "refresh_token=abc" },
		});
		const beforeCookie = req.headers.get("cookie");
		getRefreshToken(req);
		expect(req.headers.get("cookie")).toBe(beforeCookie);
	});
});

describe("getRefreshToken — Express-style plain request", () => {
	it("reads token from the Cookie header", () => {
		const req = { headers: { cookie: "refresh_token=xyz" } };
		expect(getRefreshToken(req)).toBe("xyz");
	});

	it("returns null when the cookie is absent", () => {
		expect(getRefreshToken({ headers: {} })).toBeNull();
	});

	it("returns null when the request has no headers property", () => {
		expect(getRefreshToken({})).toBeNull();
	});
});
