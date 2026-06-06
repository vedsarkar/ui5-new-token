/**
 * Unit tests for `resolveRedirectParams` — the public source-resolution
 * helper exported from `@reltio/auth/utils` and used by the `/login` and
 * `/logout` handlers.
 */

import { resolveRedirectParams } from "@reltio/auth/utils";
import { describe, expect, it } from "vitest";

const BASE_URL = "https://bff.internal/api/auth/login";
const APP_ORIGIN = "https://app.example.com";
const OTHER_ORIGIN = "https://evil.example.com";

function makeRequest(
	search: Record<string, string> = {},
	referer?: string,
): Request {
	const url = new URL(BASE_URL);
	for (const [k, v] of Object.entries(search)) {
		url.searchParams.set(k, v);
	}
	const headers = new Headers();
	if (referer !== undefined) {
		headers.set("Referer", referer);
	}
	return new Request(url.href, { headers });
}

describe("resolveRedirectParams", () => {
	it("query-only resolution: returns returnTo and tenant from query params", () => {
		const req = makeRequest({
			returnTo: `${APP_ORIGIN}/hub/acme/dashboard`,
			tenant: "acme",
		});
		const ctx = resolveRedirectParams(req);
		expect(ctx.ok).toBe(true);
		if (!ctx.ok) return;
		expect(ctx.returnTo).toBe(`${APP_ORIGIN}/hub/acme/dashboard`);
		expect(ctx.tenant).toBe("acme");
	});

	it("referer-only fallback: returns returnTo and tenant from Referer header", () => {
		const req = makeRequest({}, `${APP_ORIGIN}/dashboard?tenant=acme`);
		const ctx = resolveRedirectParams(req);
		expect(ctx.ok).toBe(true);
		if (!ctx.ok) return;
		expect(ctx.returnTo).toBe(`${APP_ORIGIN}/dashboard?tenant=acme`);
		expect(ctx.tenant).toBe("acme");
	});

	it("query overrides referer: explicit ?returnTo= and ?tenant= take precedence", () => {
		const req = makeRequest(
			{ returnTo: `${APP_ORIGIN}/hub/acme`, tenant: "acme" },
			`${APP_ORIGIN}/dashboard?tenant=other`,
		);
		const ctx = resolveRedirectParams(req);
		expect(ctx.ok).toBe(true);
		if (!ctx.ok) return;
		expect(ctx.returnTo).toBe(`${APP_ORIGIN}/hub/acme`);
		expect(ctx.tenant).toBe("acme");
	});

	it("mixed sources: explicit ?returnTo= with tenant from Referer", () => {
		const req = makeRequest(
			{ returnTo: `${APP_ORIGIN}/hub/other` },
			`${APP_ORIGIN}/dashboard?tenant=other`,
		);
		const ctx = resolveRedirectParams(req);
		expect(ctx.ok).toBe(true);
		if (!ctx.ok) return;
		expect(ctx.returnTo).toBe(`${APP_ORIGIN}/hub/other`);
		expect(ctx.tenant).toBe("other");
	});

	it("empty ?tenant= falls back to referer tenant", () => {
		const req = makeRequest(
			{ tenant: "" },
			`${APP_ORIGIN}/dashboard?tenant=acme`,
		);
		const ctx = resolveRedirectParams(req);
		expect(ctx.ok).toBe(true);
		if (!ctx.ok) return;
		expect(ctx.tenant).toBe("acme");
	});

	it("whitespace-only ?tenant= falls back to referer tenant", () => {
		const req = makeRequest(
			{ tenant: "   " },
			`${APP_ORIGIN}/dashboard?tenant=acme`,
		);
		const ctx = resolveRedirectParams(req);
		expect(ctx.ok).toBe(true);
		if (!ctx.ok) return;
		expect(ctx.tenant).toBe("acme");
	});

	it("missing return URL → 400 when neither ?returnTo= nor Referer is present", () => {
		const req = makeRequest({ tenant: "acme" });
		const ctx = resolveRedirectParams(req);
		expect(ctx.ok).toBe(false);
		if (ctx.ok) return;
		expect(ctx.error.status).toBe(400);
		return ctx.error.text().then((body) => {
			expect(body).toContain("Missing returnTo");
		});
	});

	it("malformed Referer without ?returnTo= → 400", async () => {
		const req = makeRequest({}, "not a valid url");
		const ctx = resolveRedirectParams(req);
		expect(ctx.ok).toBe(false);
		if (ctx.ok) return;
		expect(ctx.error.status).toBe(400);
		const body = await ctx.error.text();
		expect(body).toContain("Malformed Referer");
	});

	it("malformed Referer with ?returnTo= → soft-fail (302 is possible)", () => {
		const req = makeRequest(
			{ returnTo: `${APP_ORIGIN}/dashboard`, tenant: "acme" },
			"not a valid url",
		);
		const ctx = resolveRedirectParams(req);
		expect(ctx.ok).toBe(true);
		if (!ctx.ok) return;
		expect(ctx.returnTo).toBe(`${APP_ORIGIN}/dashboard`);
	});

	it("cross-source mismatch → 400 when explicit ?returnTo= origin differs from Referer origin", async () => {
		const req = makeRequest(
			{ returnTo: `${OTHER_ORIGIN}/evil` },
			`${APP_ORIGIN}/dashboard`,
		);
		const ctx = resolveRedirectParams(req);
		expect(ctx.ok).toBe(false);
		if (ctx.ok) return;
		expect(ctx.error.status).toBe(400);
		const body = await ctx.error.text();
		expect(body).toContain("returnTo origin does not match Referer origin");
	});

	it("same-origin ?returnTo= and Referer succeeds", () => {
		const req = makeRequest(
			{ returnTo: `${APP_ORIGIN}/hub/acme` },
			`${APP_ORIGIN}/dashboard`,
		);
		const ctx = resolveRedirectParams(req);
		expect(ctx.ok).toBe(true);
		if (!ctx.ok) return;
		expect(ctx.returnTo).toBe(`${APP_ORIGIN}/hub/acme`);
	});

	it("no tenant from either source → tenant is null", () => {
		const req = makeRequest({}, `${APP_ORIGIN}/dashboard`);
		const ctx = resolveRedirectParams(req);
		expect(ctx.ok).toBe(true);
		if (!ctx.ok) return;
		expect(ctx.tenant).toBeNull();
	});
});
