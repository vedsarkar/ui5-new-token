/**
 * Unit tests for the internal `readHeader` helper — the polymorphic shape
 * detector that lets `getAccessToken` / `getRefreshToken` accept Express
 * `Request`, Next.js `NextRequest`, and Web `Request` uniformly.
 */

import { describe, expect, it } from "vitest";
import { readHeader } from "../../src/utils/readHeader";

describe("readHeader — Web Request shape (Headers instance)", () => {
	it("reads a header value via Headers.get", () => {
		const req = new Request("https://app.test/", {
			headers: { Authorization: "Bearer abc" },
		});
		expect(readHeader(req, "authorization")).toBe("Bearer abc");
	});

	it("Headers.get is case-insensitive (Web standard)", () => {
		const req = new Request("https://app.test/", {
			headers: { Authorization: "Bearer abc" },
		});
		expect(readHeader(req, "Authorization")).toBe("Bearer abc");
		expect(readHeader(req, "AUTHORIZATION")).toBe("Bearer abc");
	});

	it("returns null when the header is absent", () => {
		const req = new Request("https://app.test/");
		expect(readHeader(req, "authorization")).toBeNull();
	});
});

describe("readHeader — Express-style plain headers object", () => {
	it("reads a header by lowercase name (Express's normalised key)", () => {
		const req = { headers: { authorization: "Bearer xyz" } };
		expect(readHeader(req, "authorization")).toBe("Bearer xyz");
	});

	it("falls back to the lowercase name when the requested case doesn't match", () => {
		// Express normalises header names to lowercase, so a caller asking
		// for "Authorization" still gets the value stored under "authorization".
		const req = { headers: { authorization: "Bearer xyz" } };
		expect(readHeader(req, "Authorization")).toBe("Bearer xyz");
	});

	it("returns the first element when the header value is an array", () => {
		// Node's IncomingHttpHeaders allows string[] for some headers.
		const req = { headers: { "set-cookie": ["a=1", "b=2"] } };
		expect(readHeader(req, "set-cookie")).toBe("a=1");
	});

	it("returns null when the header is undefined", () => {
		const req = { headers: { authorization: undefined } };
		expect(readHeader(req, "authorization")).toBeNull();
	});

	it("returns null when the header is an empty array", () => {
		const req = { headers: { "x-thing": [] } };
		expect(readHeader(req, "x-thing")).toBeNull();
	});

	it("returns null when the value is a non-string, non-array type", () => {
		const req = { headers: { "x-thing": 42 as unknown as string } };
		expect(readHeader(req, "x-thing")).toBeNull();
	});
});

describe("readHeader — missing or malformed request", () => {
	it("returns null when the request has no headers property", () => {
		expect(readHeader({} as never, "authorization")).toBeNull();
	});

	it("returns null when headers is null", () => {
		expect(readHeader({ headers: null } as never, "authorization")).toBeNull();
	});

	it("returns null when headers is undefined", () => {
		expect(
			readHeader({ headers: undefined } as never, "authorization"),
		).toBeNull();
	});
});
