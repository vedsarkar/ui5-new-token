/**
 * Storybook preset that post-processes the components manifest produced
 * by `@storybook/addon-mcp` so AI agents and the Manifest Debugger see
 * the canonical Reltio surface.
 *
 * Two transformations:
 *
 * 1. **Canonical import paths.** Storybook MCP derives the import
 *    snippet from the nearest `package.json` walking up from the
 *    component (or, when docgen extraction fails, the story file). Both
 *    our root `package.json` and `packages/design/package.json` are
 *    named `@reltio/design`, so the auto-generated snippet ends up as
 *    `import { Button } from "@reltio/design";` — *broken* against the
 *    published package, which exposes only subpath entries
 *    (`./components`, `./charts`, `./utils`). This preset rewrites the
 *    `import` field to the canonical `@reltio/design/components` (or
 *    `/charts` for chart components) for every entry whose `path` lives
 *    under `components/` or `charts/`. Other entries (guides, openApi
 *    docs, design-token tables) are left alone.
 *
 * 2. **Resolved prop types for endorsed UI5 components.** Storybook's
 *    built-in `react-docgen-typescript` cannot parse the
 *    `declare const Button: ForwardRefExoticComponent<...>` pattern UI5
 *    React generates — it returns `error: "No component import found"`
 *    on Manifest Debugger. We already solve the same problem for our
 *    own MDX docs pipeline through `scripts/extractTypeApi.mjs`
 *    (a TypeScript Compiler API extractor that walks generics,
 *    intersections, and cross-package imports). This preset reuses that
 *    extractor: for every component whose directory has a matching
 *    `<Name>.types.ts`, we extract the resolved props, convert them to
 *    the `react-docgen-typescript` shape Storybook MCP and the Manifest
 *    Debugger expect, write them into `reactDocgenTypescript`, and
 *    clear the error. As a side effect the MCP `get-documentation`
 *    payload starts including a native `## Props` block alongside the
 *    custom `__JSON_SCHEMA__` MDX comment.
 *
 * Hooks into Storybook's `experimental_manifests` preset extension
 * point — the same hook `@storybook/addon-mcp` reads when assembling
 * its MCP payloads, so the rewrite is visible to AI agents via MCP and
 * to humans via the `/manifests/components.html` debugger with no extra
 * wiring.
 */
import path from "node:path";
import { createTypeExtractor } from "../scripts/extractTypeApi.mjs";

/** Shape of a single prop returned by `extractTypeApi.mjs#extractProps`.
 * Mirrored here as a TypeScript type since the extractor is plain JS
 * with JSDoc-only types. Keep in sync with the extractor's contract. */
type ResolvedProp = {
	name: string;
	type: string;
	optional: boolean;
	required: boolean;
	defaultValue?: string;
	deprecated?: string | true;
	description: string;
	tags: Record<string, string>;
};

type ComponentManifestEntry = {
	id: string;
	name: string;
	path?: string;
	import?: string;
	error?: { name: string; message: string };
	reactDocgenTypescript?: ReactDocgenTypescript;
	[key: string]: unknown;
};

type ManifestPayload = {
	components?: {
		v?: number;
		components?: Record<string, ComponentManifestEntry>;
		meta?: Record<string, unknown>;
	};
	[key: string]: unknown;
};

/** Subset of the `react-docgen-typescript` JSON shape that Storybook
 * MCP and the Manifest Debugger consume. We only emit the fields the
 * downstream tools actually read — `parseComponentDocLike` in
 * `@storybook/mcp` reads `description`, `type.raw ?? type.name`,
 * `defaultValue.value`, and `required`. The Manifest Debugger UI
 * additionally surfaces the prop's name and JSDoc tags. */
type ReactDocgenProp = {
	name: string;
	description: string;
	required: boolean;
	type: { name: string; raw: string };
	defaultValue: { value: string } | null;
};

type ReactDocgenTypescript = {
	displayName: string;
	description: string;
	props: Record<string, ReactDocgenProp>;
	methods: never[];
	tags: Record<string, string>;
};

const ROOT = path.resolve(import.meta.dirname, "..");

const subpathFromPath = (storyPath: string): string | undefined => {
	if (storyPath.startsWith("./components/")) return "components";
	if (storyPath.startsWith("./charts/")) return "charts";
	return undefined;
};

const rewriteImportForSubpath = (
	original: string | undefined,
	componentName: string,
	subpath: string,
): string => {
	const target = `"@reltio/design/${subpath}"`;
	const namedImportMatch =
		original?.match(/^import\s+(\{[^}]+\})\s+from\s+["'][^"']+["'];?\s*$/) ??
		null;
	if (namedImportMatch) {
		return `import ${namedImportMatch[1]} from ${target};`;
	}
	return `import { ${componentName} } from ${target};`;
};

/** Map a `ResolvedProp` from our TypeScript Compiler API extractor to
 * the single-prop slot Storybook MCP and the Manifest Debugger expect.
 * Both `type.name` and `type.raw` are filled with the resolved type
 * string — `parseComponentDocLike` reads `raw` first, the Manifest
 * Debugger UI prefers `name`. Description, required, and default value
 * are forwarded as-is. */
const resolvedPropToReactDocgen = (prop: ResolvedProp): ReactDocgenProp => ({
	name: prop.name,
	description: prop.description ?? "",
	required: prop.required,
	type: { name: prop.type, raw: prop.type },
	defaultValue:
		prop.defaultValue !== undefined ? { value: prop.defaultValue } : null,
});

const propsToReactDocgenTypescript = (
	componentName: string,
	props: ResolvedProp[],
): ReactDocgenTypescript => ({
	displayName: componentName,
	description: "",
	methods: [],
	tags: {},
	props: Object.fromEntries(
		props.map((p) => [p.name, resolvedPropToReactDocgen(p)]),
	),
});

/** Find the `<ComponentName>.types.ts` file that matches a manifest
 * entry. The manifest stores the story file path
 * (`./components/Button/Button.stories.tsx`); we map it to the sibling
 * `<Name>.types.ts` and resolve it to an absolute path the extractor
 * can read. Returns `undefined` when no matching types file exists —
 * not every component opted into the Stage 2 docs pipeline yet. */
const typesPathForEntry = (
	entry: ComponentManifestEntry,
): string | undefined => {
	if (!entry.path) return undefined;
	const componentDir = path.dirname(path.resolve(ROOT, entry.path));
	const componentName = path.basename(entry.path).split(".")[0];
	if (!componentName) return undefined;
	return path.join(componentDir, `${componentName}.types.ts`);
};

/** Lazy singleton — the TypeScript Compiler API program is expensive
 * to initialise (~3 seconds against this monorepo) but cheap to query
 * after that. Storybook calls the manifest hook on every change, so we
 * keep one instance alive for the lifetime of the dev server. The
 * extractor is rebuilt on demand the first time the hook runs. */
let cachedExtractor: ReturnType<typeof createTypeExtractor> | undefined;
const getExtractor = () => {
	if (!cachedExtractor) cachedExtractor = createTypeExtractor(ROOT);
	return cachedExtractor;
};

export const experimental_manifests = async (
	existing: ManifestPayload | undefined,
): Promise<ManifestPayload | undefined> => {
	if (!existing?.components?.components) return existing;

	const fs = await import("node:fs");
	const rewritten: Record<string, ComponentManifestEntry> = {};

	for (const [id, entry] of Object.entries(existing.components.components)) {
		let next: ComponentManifestEntry = entry;

		if (entry.path) {
			const subpath = subpathFromPath(entry.path);
			if (subpath) {
				next = {
					...next,
					import: rewriteImportForSubpath(next.import, next.name, subpath),
				};
			}
		}

		const hasMissingDocgen =
			next.error?.name === "No component import found" ||
			next.error?.name === "No component found";
		const typesPath = typesPathForEntry(entry);
		if (hasMissingDocgen && typesPath && fs.existsSync(typesPath)) {
			try {
				const props = getExtractor().extractProps(
					typesPath,
					`${entry.name}Props`,
				);
				if (props.length > 0) {
					next = {
						...next,
						reactDocgenTypescript: propsToReactDocgenTypescript(
							entry.name,
							props,
						),
					};
					delete next.error;
				}
			} catch (err) {
				console.warn(
					`[reltio-manifest] could not enrich docgen for ${entry.name}: ${
						err instanceof Error ? err.message : String(err)
					}`,
				);
			}
		}

		rewritten[id] = next;
	}

	return {
		...existing,
		components: {
			...existing.components,
			components: rewritten,
		},
	};
};
