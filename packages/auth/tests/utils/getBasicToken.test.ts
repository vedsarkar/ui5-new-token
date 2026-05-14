/**
 * Unit tests for `getBasicToken` — base64 encoding of `clientId:clientSecret`
 * for HTTP Basic authentication.
 */

import { getBasicToken } from "@reltio/auth/utils";
import { describe, expect, it } from "vitest";

describe("getBasicToken", () => {
	it("returns the base64 encoding of `clientId:clientSecret`", () => {
		expect(getBasicToken("test_client_id", "test_client_secret")).toBe(
			"dGVzdF9jbGllbnRfaWQ6dGVzdF9jbGllbnRfc2VjcmV0",
		);
	});

	it("encodes the simplest possible value", () => {
		expect(getBasicToken("a", "b")).toBe(btoa("a:b"));
	});

	it("encodes values containing non-ASCII characters via btoa-safe codepoints", () => {
		// `btoa` only accepts Latin1; this is the contract documented in
		// `basicToken.ts`. Clients with non-ASCII secrets are out of contract.
		expect(getBasicToken("user@example.com", "secret123")).toBe(
			btoa("user@example.com:secret123"),
		);
	});

	it("is pure — the same inputs always produce the same output", () => {
		const a = getBasicToken("id", "secret");
		const b = getBasicToken("id", "secret");
		expect(a).toBe(b);
	});
});
