import type { AppEntry } from "./AppSelectorPopover.types";

export const DEFAULT_CATEGORY = "Applications";

/** Filter out incomplete entries and sort so that apps sharing a category
 * stay adjacent in the flat `ProductSwitch` grid. Categories appear in the
 * order they are first seen in the input; apps within a category preserve
 * their relative input order. */
export const orderApps = (apps: AppEntry[]): AppEntry[] => {
	const validApps = apps.filter((app) => app.name && app.uri);

	const groups = Object.groupBy(
		validApps,
		({ category }) => category || DEFAULT_CATEGORY,
	);

	return Object.values(groups)
		.flat()
		.filter((app): app is AppEntry => app !== undefined);
};

/** Substitute `${environment}` and `${tenant}` placeholders in an app's URI
 * with the current `env` / `tenant`. Returns `undefined` when the input URI
 * is `undefined`. When either substitution value is `undefined`, its
 * placeholder is replaced with the literal string `"undefined"` — this
 * mirrors the Reltio Config Service contract where each app is expected to
 * be rendered against a resolved tenant. */
export const buildTargetSrc = (
	uri: string | undefined,
	env: string | undefined,
	tenant: string | undefined,
): string | undefined =>
	uri
		// biome-ignore lint/suspicious/noTemplateCurlyInString: intentional URI template placeholders
		?.replaceAll("${environment}", String(env))
		// biome-ignore lint/suspicious/noTemplateCurlyInString: intentional URI template placeholders
		.replaceAll("${tenant}", String(tenant));
