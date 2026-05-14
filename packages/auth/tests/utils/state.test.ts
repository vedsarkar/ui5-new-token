/**
 * Unit tests for CSRF state utilities used by `GET /login` and `GET /callback`.
 */

import { describe, expect, it } from "vitest";
import { generateState, validateState } from "../../src/utils/state";

describe("state — generateState", () => {
	const UUID_RE =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

	it("returns a Web Crypto v4 UUID", () => {
		const state = generateState();
		expect(state).toMatch(UUID_RE);
	});

	it("produces a different value on every call", () => {
		const values = new Set<string>();
		for (let i = 0; i < 100; i++) {
			values.add(generateState());
		}
		expect(values.size).toBe(100);
	});
});

describe("state — validateState", () => {
	it("returns true when cookie and query are equal non-empty strings", () => {
		expect(validateState("abc", "abc")).toBe(true);
	});

	it("returns false when cookie and query differ", () => {
		expect(validateState("abc", "different")).toBe(false);
	});

	it("returns false when the cookie state is null or undefined", () => {
		expect(validateState(null, "abc")).toBe(false);
		expect(validateState(undefined, "abc")).toBe(false);
	});

	it("returns false when the query state is null or undefined", () => {
		expect(validateState("abc", null)).toBe(false);
		expect(validateState("abc", undefined)).toBe(false);
	});

	it("returns false when both sides are empty strings", () => {
		// An empty string would otherwise compare equal to itself; treat as
		// missing per the state contract.
		expect(validateState("", "")).toBe(false);
	});
});
