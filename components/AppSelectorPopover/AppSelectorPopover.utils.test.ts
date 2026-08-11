import { describe, expect, test } from "vitest";
import type { AppEntry } from "./AppSelectorPopover.types";
import {
	buildTargetSrc,
	DEFAULT_CATEGORY,
	orderApps,
} from "./AppSelectorPopover.utils";

describe("orderApps", () => {
	test("returns an empty array for empty input", () => {
		expect(orderApps([])).toEqual([]);
	});

	test("filters out entries without name", () => {
		const result = orderApps([
			{ name: "Hub", uri: "https://example.com/hub" },
			{ uri: "https://example.com/anon" },
		]);
		expect(result.map((app) => app.name)).toEqual(["Hub"]);
	});

	test("filters out entries without uri", () => {
		const result = orderApps([
			{ name: "Hub", uri: "https://example.com/hub" },
			{ name: "Console" },
		]);
		expect(result.map((app) => app.name)).toEqual(["Hub"]);
	});

	test("filters out entries missing both name and uri", () => {
		const result = orderApps([
			{ name: "Hub", uri: "https://example.com/hub" },
			{},
		]);
		expect(result.map((app) => app.name)).toEqual(["Hub"]);
	});

	test("groups apps of the same category adjacently", () => {
		const input: AppEntry[] = [
			{ name: "A", uri: "u", category: "X" },
			{ name: "B", uri: "u", category: "Y" },
			{ name: "C", uri: "u", category: "X" },
		];
		expect(orderApps(input).map((app) => app.name)).toEqual(["A", "C", "B"]);
	});

	test("preserves first-seen order of categories", () => {
		const input: AppEntry[] = [
			{ name: "A", uri: "u", category: "First" },
			{ name: "B", uri: "u", category: "Second" },
			{ name: "C", uri: "u", category: "First" },
			{ name: "D", uri: "u", category: "Third" },
			{ name: "E", uri: "u", category: "Second" },
		];
		expect(orderApps(input).map((app) => app.category)).toEqual([
			"First",
			"First",
			"Second",
			"Second",
			"Third",
		]);
	});

	test("preserves relative order of apps within the same category", () => {
		const input: AppEntry[] = [
			{ name: "A", uri: "u", category: "X" },
			{ name: "B", uri: "u", category: "X" },
			{ name: "C", uri: "u", category: "X" },
		];
		expect(orderApps(input).map((app) => app.name)).toEqual(["A", "B", "C"]);
	});

	test("groups entries with a missing category under DEFAULT_CATEGORY", () => {
		const input: AppEntry[] = [
			{ name: "A", uri: "u", category: "Custom" },
			{ name: "B", uri: "u" },
			{ name: "C", uri: "u", category: "Custom" },
			{ name: "D", uri: "u" },
		];
		// "Custom" is seen first; the missing-category items land in
		// DEFAULT_CATEGORY, which appears after "Custom" in the output.
		expect(orderApps(input).map((app) => app.name)).toEqual([
			"A",
			"C",
			"B",
			"D",
		]);
	});

	test("treats an empty-string category as missing", () => {
		const input: AppEntry[] = [
			{ name: "A", uri: "u", category: "X" },
			{ name: "B", uri: "u", category: "" },
		];
		// Category "" is falsy → falls back to DEFAULT_CATEGORY.
		expect(orderApps(input).map((app) => app.category)).toEqual(["X", ""]);
	});

	test("does not mutate the input array", () => {
		const input: AppEntry[] = [
			{ name: "B", uri: "u", category: "Y" },
			{ name: "A", uri: "u", category: "X" },
		];
		const before = [...input];
		orderApps(input);
		expect(input).toEqual(before);
	});

	test("exports the DEFAULT_CATEGORY constant as 'Applications'", () => {
		expect(DEFAULT_CATEGORY).toBe("Applications");
	});
});

describe("buildTargetSrc", () => {
	test("returns undefined when uri is undefined", () => {
		expect(buildTargetSrc(undefined, "prod", "acme")).toBeUndefined();
	});

	test("returns the uri unchanged when it has no placeholders", () => {
		expect(buildTargetSrc("https://example.com", "prod", "acme")).toBe(
			"https://example.com",
		);
	});

	test("substitutes the environment placeholder", () => {
		expect(
			// biome-ignore lint/suspicious/noTemplateCurlyInString: URI template placeholder
			buildTargetSrc("https://x/?env=${environment}", "prod", "acme"),
		).toBe("https://x/?env=prod");
	});

	test("substitutes the tenant placeholder", () => {
		expect(
			// biome-ignore lint/suspicious/noTemplateCurlyInString: URI template placeholder
			buildTargetSrc("https://x/?tenant=${tenant}", "prod", "acme"),
		).toBe("https://x/?tenant=acme");
	});

	test("substitutes both placeholders in the same uri", () => {
		expect(
			buildTargetSrc(
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URI template placeholders
				"https://x/?env=${environment}&tenant=${tenant}",
				"prod",
				"acme",
			),
		).toBe("https://x/?env=prod&tenant=acme");
	});

	test("substitutes multiple occurrences of the same placeholder", () => {
		expect(
			// biome-ignore lint/suspicious/noTemplateCurlyInString: URI template placeholder
			buildTargetSrc("${environment}/${environment}", "prod", "acme"),
		).toBe("prod/prod");
	});

	test("uses the literal 'undefined' when env is missing", () => {
		expect(
			// biome-ignore lint/suspicious/noTemplateCurlyInString: URI template placeholder
			buildTargetSrc("https://x/?env=${environment}", undefined, "acme"),
		).toBe("https://x/?env=undefined");
	});

	test("uses the literal 'undefined' when tenant is missing", () => {
		expect(
			// biome-ignore lint/suspicious/noTemplateCurlyInString: URI template placeholder
			buildTargetSrc("https://x/?tenant=${tenant}", "prod", undefined),
		).toBe("https://x/?tenant=undefined");
	});

	test("uses the literal 'undefined' for both when env and tenant are missing", () => {
		expect(
			buildTargetSrc(
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URI template placeholders
				"https://x/?e=${environment}&t=${tenant}",
				undefined,
				undefined,
			),
		).toBe("https://x/?e=undefined&t=undefined");
	});
});
