/**
 * Unit tests for `getAccessToken` — the public helper that reads the
 * access token from a request, in priority order: `Authorization: Bearer`
 * header → `access_token` cookie.
 *
 * Tests cover all three supported request shapes per spec
 * "Framework-agnostic helpers".
 */

import { getAccessToken } from "@reltio/auth/utils";
import { describe, expect, it } from "vitest";

describe("getAccessToken — Web Request", () => {
	it("reads token from Authorization: Bearer header", () => {
		const req = new Request("https://app.test/", {
			headers: { Authorization: "Bearer abc" },
		});
		expect(getAccessToken(req)).toBe("abc");
	});

	it("reads token from access_token cookie when no Bearer header", () => {
		const req = new Request("https://app.test/", {
			headers: { Cookie: "access_token=xyz" },
		});
		expect(getAccessToken(req)).toBe("xyz");
	});

	it("prefers the Bearer header over the cookie when both are present", () => {
		const req = new Request("https://app.test/", {
			headers: {
				Authorization: "Bearer from-header",
				Cookie: "access_token=from-cookie",
			},
		});
		expect(getAccessToken(req)).toBe("from-header");
	});

	it("returns null when neither header nor cookie is present", () => {
		const req = new Request("https://app.test/");
		expect(getAccessToken(req)).toBeNull();
	});

	it("accepts Bearer in any case (Bearer / bearer / BEARER)", () => {
		for (const prefix of ["Bearer", "bearer", "BEARER"]) {
			const req = new Request("https://app.test/", {
				headers: { Authorization: `${prefix} value` },
			});
			expect(getAccessToken(req)).toBe("value");
		}
	});

	it("accepts arbitrary whitespace after Bearer", () => {
		const req = new Request("https://app.test/", {
			headers: { Authorization: "Bearer   value-with-extra-spaces" },
		});
		expect(getAccessToken(req)).toBe("value-with-extra-spaces");
	});

	it("ignores a non-Bearer Authorization header and falls back to the cookie", () => {
		const req = new Request("https://app.test/", {
			headers: {
				Authorization: "Basic abc",
				Cookie: "access_token=cookie_value",
			},
		});
		expect(getAccessToken(req)).toBe("cookie_value");
	});

	it("does not mutate the request argument", () => {
		const req = new Request("https://app.test/", {
			headers: { Authorization: "Bearer abc" },
		});
		const beforeHeaders = [...req.headers].length;
		getAccessToken(req);
		expect([...req.headers].length).toBe(beforeHeaders);
	});
});

describe("getAccessToken — Express-style plain request", () => {
	it("reads token from headers.authorization (Bearer)", () => {
		const req = { headers: { authorization: "Bearer abc" } };
		expect(getAccessToken(req)).toBe("abc");
	});

	it("reads token from the Cookie header when no Bearer", () => {
		const req = { headers: { cookie: "access_token=xyz" } };
		expect(getAccessToken(req)).toBe("xyz");
	});

	it("returns null when neither header nor cookie is present", () => {
		expect(getAccessToken({ headers: {} })).toBeNull();
	});

	it("returns null when the request has no headers property", () => {
		expect(getAccessToken({})).toBeNull();
	});
});

describe("getAccessToken — purity", () => {
	it("returns null for the empty cookie value `access_token=`", () => {
		const req = new Request("https://app.test/", {
			headers: { Cookie: "access_token=" },
		});
		// Empty string is falsy → null per spec contract.
		expect(getAccessToken(req)).toBeNull();
	});

	it("returns null for a Cookie header without access_token", () => {
		const req = new Request("https://app.test/", {
			headers: { Cookie: "other_cookie=value" },
		});
		expect(getAccessToken(req)).toBeNull();
	});
});
