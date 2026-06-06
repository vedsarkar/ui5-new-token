/**
 * Unit tests for the public cookie utilities exported from
 * `@reltio/auth/utils`.
 *
 * Establishing cookie serialisation behaviour here lets the integration
 * tests rely on it without re-asserting every edge case in every endpoint
 * test.
 */

import {
	ACCESS_TOKEN_COOKIE,
	clearCookie,
	defaultCookieOptions,
	parseCookies,
	REFRESH_TOKEN_COOKIE,
	STATE_COOKIE,
	serializeCookie,
} from "@reltio/auth/utils";
import { describe, expect, it } from "vitest";

describe("cookies — constants", () => {
	it("uses the legacy auth-middleware cookie names verbatim", () => {
		expect(ACCESS_TOKEN_COOKIE).toBe("access_token");
		expect(REFRESH_TOKEN_COOKIE).toBe("refresh_token");
		expect(STATE_COOKIE).toBe("state");
	});
});

describe("cookies — defaultCookieOptions", () => {
	it("returns HttpOnly + SameSite=Lax + Path=/ regardless of secure flag", () => {
		expect(defaultCookieOptions(true)).toMatchObject({
			httpOnly: true,
			sameSite: "lax",
			path: "/",
		});
		expect(defaultCookieOptions(false)).toMatchObject({
			httpOnly: true,
			sameSite: "lax",
			path: "/",
		});
	});

	it("reflects the secure flag in the secure attribute", () => {
		expect(defaultCookieOptions(true).secure).toBe(true);
		expect(defaultCookieOptions(false).secure).toBe(false);
	});
});

describe("cookies — serializeCookie", () => {
	it("produces a Set-Cookie value with Path, HttpOnly, Secure, and SameSite=Lax", () => {
		const out = serializeCookie(
			"access_token",
			"abc",
			defaultCookieOptions(true),
		);
		expect(out).toBe(
			"access_token=abc; Path=/; HttpOnly; Secure; SameSite=Lax",
		);
	});

	it("URL-encodes the cookie value", () => {
		const out = serializeCookie(
			"state",
			"value with spaces & symbols",
			defaultCookieOptions(true),
		);
		expect(out).toContain("state=value%20with%20spaces%20%26%20symbols");
	});

	it("omits Secure when secure: false", () => {
		const out = serializeCookie("state", "abc", defaultCookieOptions(false));
		expect(out).not.toContain("Secure");
		expect(out).toContain("HttpOnly");
		expect(out).toContain("SameSite=Lax");
	});

	it("omits HttpOnly when httpOnly: false", () => {
		const out = serializeCookie("k", "v", {
			...defaultCookieOptions(true),
			httpOnly: false,
		});
		expect(out).not.toContain("HttpOnly");
		expect(out).toContain("Secure");
	});

	it("includes Max-Age when provided", () => {
		const out = serializeCookie("access_token", "abc", {
			...defaultCookieOptions(true),
			maxAge: 3600,
		});
		expect(out).toContain("Max-Age=3600");
	});

	it("floors fractional Max-Age values", () => {
		const out = serializeCookie("access_token", "abc", {
			...defaultCookieOptions(true),
			maxAge: 599.9,
		});
		expect(out).toContain("Max-Age=599");
	});

	it("renders SameSite=Strict and SameSite=None when configured", () => {
		expect(
			serializeCookie("k", "v", {
				...defaultCookieOptions(true),
				sameSite: "strict",
			}),
		).toContain("SameSite=Strict");
		expect(
			serializeCookie("k", "v", {
				...defaultCookieOptions(true),
				sameSite: "none",
			}),
		).toContain("SameSite=None");
	});
});

describe("cookies — clearCookie", () => {
	it("produces a Set-Cookie value with Max-Age=0 and an empty value", () => {
		const out = clearCookie("access_token", defaultCookieOptions(true));
		expect(out).toContain("access_token=");
		expect(out).toContain("Max-Age=0");
	});

	it("preserves the same option attributes used at set time", () => {
		const opts = defaultCookieOptions(true);
		const set = serializeCookie("access_token", "abc", opts);
		const clear = clearCookie("access_token", opts);
		// Both should carry Path, HttpOnly, Secure, SameSite=Lax.
		for (const attr of ["Path=/", "HttpOnly", "Secure", "SameSite=Lax"]) {
			expect(set).toContain(attr);
			expect(clear).toContain(attr);
		}
	});
});

describe("cookies — parseCookies", () => {
	it("returns an empty object for null / undefined / empty input", () => {
		expect(parseCookies(null)).toEqual({});
		expect(parseCookies(undefined)).toEqual({});
		expect(parseCookies("")).toEqual({});
	});

	it("parses a simple two-cookie header", () => {
		expect(parseCookies("access_token=abc; refresh_token=xyz")).toEqual({
			access_token: "abc",
			refresh_token: "xyz",
		});
	});

	it("URL-decodes values produced by serializeCookie (round trip)", () => {
		const value = "value with spaces & symbols";
		const set = serializeCookie("k", value, defaultCookieOptions(false));
		// Extract just the "name=encoded" part — strip attributes.
		const cookiePair = set.split(";")[0];
		expect(parseCookies(cookiePair)).toEqual({ k: value });
	});

	it("skips malformed segments without an `=` sign", () => {
		expect(parseCookies("valid=a; malformed_no_equals; other=b")).toEqual({
			valid: "a",
			other: "b",
		});
	});

	it("skips empty name (e.g. `=value`)", () => {
		expect(parseCookies("=value_with_no_name; valid=a")).toEqual({
			valid: "a",
		});
	});

	it("skips empty segments between semicolons", () => {
		expect(parseCookies("a=1;;b=2")).toEqual({ a: "1", b: "2" });
	});

	it("falls back to the raw value when URI decoding fails", () => {
		// "%E0%A4%A" is an incomplete UTF-8 sequence — decodeURIComponent throws.
		const malformed = "broken=%E0%A4%A";
		const parsed = parseCookies(malformed);
		expect(parsed.broken).toBe("%E0%A4%A");
	});
});
