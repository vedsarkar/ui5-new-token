/**
 * Unit tests for `validateRedirectUrl` — the `redirectUrl` query parameter
 * is accepted only when its full origin matches the request URL's origin.
 */

import { describe, expect, it } from "vitest";
import { validateRedirectUrl } from "../../src/utils/validateRedirectUrl";

const REQUEST_URL = "https://app.test/api/auth/callback";

describe("validateRedirectUrl", () => {
	it("accepts a redirectUrl with identical origin", () => {
		expect(validateRedirectUrl(REQUEST_URL, "https://app.test/dashboard")).toBe(
			true,
		);
	});

	it("accepts redirectUrl with same origin and different path/query/fragment", () => {
		expect(
			validateRedirectUrl(
				REQUEST_URL,
				"https://app.test/deep/path?a=1&b=2#section",
			),
		).toBe(true);
	});

	it("rejects redirectUrl on a different hostname", () => {
		expect(
			validateRedirectUrl(REQUEST_URL, "https://evil.example.com/steal"),
		).toBe(false);
	});

	it("rejects redirectUrl with the same hostname but a different scheme", () => {
		// Same host, different scheme. The legacy library accepted this; we
		// reject because origins (scheme + host + port) must match.
		expect(validateRedirectUrl(REQUEST_URL, "http://app.test/dashboard")).toBe(
			false,
		);
	});

	it("rejects redirectUrl with the same scheme and host but a different port", () => {
		expect(
			validateRedirectUrl(
				"https://app.test:8443/api/auth/callback",
				"https://app.test:9443/dashboard",
			),
		).toBe(false);
	});

	it("returns false when redirectUrl is null", () => {
		expect(validateRedirectUrl(REQUEST_URL, null)).toBe(false);
	});

	it("returns false when redirectUrl is undefined", () => {
		expect(validateRedirectUrl(REQUEST_URL, undefined)).toBe(false);
	});

	it("returns false when redirectUrl is an empty string", () => {
		expect(validateRedirectUrl(REQUEST_URL, "")).toBe(false);
	});

	it("returns false when redirectUrl is malformed (not a parseable URL)", () => {
		expect(validateRedirectUrl(REQUEST_URL, "not-a-url")).toBe(false);
	});

	it("returns false when redirectUrl is a relative path (no origin)", () => {
		// Relative paths can't be parsed by `new URL(...)` without a base.
		expect(validateRedirectUrl(REQUEST_URL, "/dashboard")).toBe(false);
	});

	it("returns false when requestUrl itself is malformed", () => {
		expect(validateRedirectUrl("not-a-url", "https://app.test/x")).toBe(false);
	});
});
