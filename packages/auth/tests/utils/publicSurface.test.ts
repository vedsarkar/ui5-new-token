/**
 * Public-surface guards for the `checkToken` introspection feature.
 *
 * The introspection wire function `checkAccessToken` is private (`core/`) and
 * MUST stay unreachable from every public subpath — consumers reach
 * introspection only through the adapter-exposed `checkToken` member. The
 * public `CheckTokenResponse` type MUST resolve from `@reltio/auth/types`.
 */

import { createExpressAuth } from "@reltio/auth/express";
import { createNextAuth } from "@reltio/auth/next";
import type { CheckTokenResponse } from "@reltio/auth/types";
import * as authTypes from "@reltio/auth/types";
import * as authUtils from "@reltio/auth/utils";
import { isRequestError, RequestError } from "@reltio/auth/utils";
import { describe, expect, expectTypeOf, it } from "vitest";
import { DEFAULT_CONFIG } from "../express/testApp";

describe("checkToken public surface", () => {
	it("does not export checkAccessToken from any public subpath", () => {
		expect("checkAccessToken" in authUtils).toBe(false);
		expect("checkAccessToken" in authTypes).toBe(false);
		expect("checkAccessToken" in createExpressAuth(DEFAULT_CONFIG)).toBe(false);
		expect("checkAccessToken" in createNextAuth(DEFAULT_CONFIG)).toBe(false);
	});

	it("exposes checkToken on both adapter return values", () => {
		expect(typeof createExpressAuth(DEFAULT_CONFIG).checkToken).toBe(
			"function",
		);
		expect(typeof createNextAuth(DEFAULT_CONFIG).checkToken).toBe("function");
	});

	it("exposes RequestError and isRequestError from @reltio/auth/utils", () => {
		expect(typeof RequestError).toBe("function");
		expect(typeof isRequestError).toBe("function");

		const error = new RequestError("nope", { statusCode: 403 });
		expect(isRequestError(error)).toBe(true);
		expect(error.statusCode).toBe(403);
		expect(isRequestError(new Error("other"))).toBe(false);
	});

	it("resolves CheckTokenResponse from @reltio/auth/types", () => {
		expectTypeOf<CheckTokenResponse["roles"]>().toEqualTypeOf<string[]>();
		expectTypeOf<CheckTokenResponse["clientId"]>().toEqualTypeOf<string>();
		expectTypeOf<
			CheckTokenResponse["user"]["username"]
		>().toEqualTypeOf<string>();
	});
});
