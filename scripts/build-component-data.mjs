import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/**
 * Generate the component catalog consumed by the "Components" page
 * (`Components.story.mdx` → `.storybook/blocks/Components`).
 *
 * The dataset is the UNION (full outer join) of two catalogs:
 *   - `@ui5/webcomponents-react` (the pinned UI5 React surface)
 *   - `@reltio/design` (endorsed UI5 re-exports + Reltio business components,
 *     primitives, and ECharts-based charts)
 *
 * Each entry records its presence on BOTH sides so the table can show the
 * intersection (endorsed) and the differences (UI5-only backlog/excluded, and
 * Reltio-only components / chart replacements).
 *
 * The whole UI5 React surface is listed (stable, experimental, and deprecated).
 * Two independent axes are recorded per entry:
 *   - `relationship` (Reltio status): endorsed / backlog / excluded /
 *     reltio-only / reltio-replacement. Deprecated UI5 components we don't plan
 *     to build are `excluded`; experimental ones are `backlog` candidates.
 *   - `ui5.status` (UI5 lifecycle): stable / experimental / deprecated. This is
 *     filtered separately (via the "UI5 React" column) so e.g. every
 *     UI5-deprecated component — charts included — is reachable in one place.
 *
 * Fully derived — never hand-edit the output JSON:
 *   - UI5 lifecycle (stable / experimental / deprecated): parsed from the
 *     `@deprecated` / `@experimental` JSDoc tags in the installed
 *     `@ui5/webcomponents-react` `.d.ts` files (the pinned version).
 *   - Endorsed set + mode: parsed from `components/index.ts` (barrel
 *     re-exports) plus the Reltio wrapper/renamed mappings below.
 *   - Charts: discovered from `charts/index.ts` (Reltio replaces the
 *     SAP-deprecated `@ui5/webcomponents-react-charts` package).
 *   - Reltio-only components: `components/<Dir>` with a `<Dir>.tsx`
 *     implementation whose name has no UI5 counterpart.
 *   - UI5 category + docs URL: the UI5 React Storybook `index.json` (live
 *     fetch; falls back to the previous output JSON when offline).
 *   - Reltio Storybook URL: derived from the documented `components/<Dir>`.
 *
 * Run: `npm run build-component-data`
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const PKG_DIST = path.join(ROOT, "node_modules/@ui5/webcomponents-react/dist");
const OUT = path.join(ROOT, ".storybook/blocks/Components/components.json");
const UI5_INDEX_URL = "https://ui5.github.io/webcomponents-react/v2/index.json";
const UI5_DOCS_BASE =
	"https://ui5.github.io/webcomponents-react/v2/?path=/docs/";
const UI5_CHARTS_DEPRECATED_URL =
	"https://www.npmjs.com/package/@ui5/webcomponents-react-charts";

/** Components intentionally not endorsed (documented decisions, not gaps). */
const EXCLUDED = {
	ListItemCustom:
		"Reltio collapses the Standard/Custom split into one `ListItem` (= `ListItemStandard`).",
	ThemeProvider:
		"Theming is driven by static CSS (`variables.css` + `data-theme`), no provider needed.",
};

/** UI5 names superseded by a renamed Reltio surface. */
const RENAMED = {
	ProductSwitch: "AppSelector",
	ProductSwitchItem: "AppSelector",
	ListItemStandard: "ListItem",
};

/** UI5 names covered by a thin Reltio wrapper (simplified/extended API). */
const WRAPPERS = new Set([
	"Form",
	"ShellBar",
	"SideNavigation",
	"SideNavigationGroup",
	"SideNavigationItem",
	"SideNavigationSubItem",
	"TreeItem",
	"UserMenu",
	"TextArea",
]);

/**
 * Reltio-native components with no UI5 counterpart. The set is auto-discovered
 * from `components/`, but the category (and optional note) is curated here so
 * the table can group them meaningfully. Names missing from this map fall back
 * to the "Reltio" category and emit a build warning.
 */
const RELTIO_NATIVE = {
	Chat: {
		category: "Reltio Business Components",
		note: "AI conversation surface — no UI5 equivalent.",
	},
	Details: { category: "Reltio Business Components" },
	TenantSelector: { category: "Reltio Business Components" },
	Markdown: { category: "Reltio Primitives" },
	Skeleton: { category: "Reltio Primitives" },
	ErrorBoundary: { category: "Reltio Primitives" },
};

const CHARTS_NOTE =
	"UI5 React charts (`@ui5/webcomponents-react-charts`) are SAP-deprecated; Reltio ships ECharts-based charts.";

const DEPRECATED_NOTE =
	"Deprecated in UI5 React — not planned for the Reltio library.";

/** Map a UI5 sub-item / family member to the UI5 parent that documents it.
 * Used only as a fallback for category + UI5 docs URL when the member has no
 * dedicated docs entry of its own. */
const UI5_PARENT = {
	CalendarDate: "Calendar",
	CalendarDateRange: "Calendar",
	CalendarLegend: "Calendar",
	CalendarLegendItem: "Calendar",
	SpecialCalendarDate: "Calendar",
	ComboBoxItem: "ComboBox",
	ComboBoxItemGroup: "ComboBox",
	MultiComboBoxItem: "MultiComboBox",
	MultiComboBoxItemGroup: "MultiComboBox",
	ListItemGroup: "List",
	ListItemStandard: "List",
	ListItemCustom: "List",
	Option: "Select",
	OptionCustom: "Select",
	SegmentedButtonItem: "SegmentedButton",
	ShellBarItem: "ShellBar",
	ShellBarBranding: "ShellBar",
	ShellBarSearch: "ShellBar",
	ShellBarSpacer: "ShellBar",
	SuggestionItem: "Input",
	SuggestionItemCustom: "Input",
	SuggestionItemGroup: "Input",
	Tab: "TabContainer",
	TabSeparator: "TabContainer",
	TableCell: "Table",
	TableGrowing: "Table",
	TableHeaderCell: "Table",
	TableHeaderCellActionAI: "Table",
	TableHeaderRow: "Table",
	TableRow: "Table",
	TableRowAction: "Table",
	TableRowActionNavigation: "Table",
	TableSelection: "Table",
	TableSelectionMulti: "Table",
	TableSelectionSingle: "Table",
	Token: "MultiInput",
	WizardStep: "Wizard",
	FormGroup: "Form",
	FormItem: "Form",
	ProductSwitchItem: "ProductSwitch",
	TreeItemCustom: "TreeItem",
	UserMenuAccount: "UserMenu",
	UserMenuItem: "UserMenu",
	UserMenuItemGroup: "UserMenu",
	BreadcrumbsItem: "Breadcrumbs",
	AvatarBadge: "Avatar",
	ButtonBadge: "Button",
	MenuItem: "Menu",
	MenuItemGroup: "Menu",
	MenuSeparator: "Menu",
	MessageItem: "MessageView",
	MessageViewButton: "MessageView",
	NotificationListItem: "NotificationList",
	NotificationListGroupItem: "NotificationList",
	ColorPaletteItem: "ColorPalette",
	ColorPalettePopover: "ColorPalette",
	MediaGalleryItem: "MediaGallery",
	TimelineItem: "Timeline",
	TimelineGroupItem: "Timeline",
	ToolbarButton: "Toolbar",
	ToolbarItem: "Toolbar",
	ToolbarSelect: "Toolbar",
	ToolbarSelectOption: "Toolbar",
	ToolbarSeparator: "Toolbar",
	ToolbarSpacer: "Toolbar",
	UploadCollectionItem: "UploadCollection",
	ObjectPageAnchorBar: "ObjectPage",
	ObjectPageHeader: "ObjectPage",
	ObjectPageSection: "ObjectPage",
	ObjectPageSubSection: "ObjectPage",
	ObjectPageTitle: "ObjectPage",
	DynamicPageHeader: "DynamicPage",
	DynamicPageTitle: "DynamicPage",
	Splitter: "SplitterLayout",
	SplitterElement: "SplitterLayout",
	FilterGroupItem: "FilterBar",
	FilterItem: "FilterBar",
	FilterItemOption: "FilterBar",
	SortItem: "ViewSettingsDialog",
	GroupItem: "ViewSettingsDialog",
	VariantItem: "VariantManagement",
	UserSettingsView: "UserSettingsDialog",
	UserSettingsItem: "UserSettingsDialog",
	UserSettingsAccountView: "UserSettingsDialog",
	UserSettingsAppearanceView: "UserSettingsDialog",
	UserSettingsAppearanceViewGroup: "UserSettingsDialog",
	UserSettingsAppearanceViewItem: "UserSettingsDialog",
	AnalyticalCardHeader: "Card",
	CardHeader: "Card",
};

/** Map an endorsed UI5 name to the Reltio `components/<Dir>` that documents it. */
const RELTIO_DIR = {
	...RENAMED,
	ProductSwitchItem: "AppSelector",
	ListItemStandard: "ListItem",
	ListItemGroup: "List",
	FormGroup: "Form",
	FormItem: "Form",
	CalendarDate: "Calendar",
	CalendarDateRange: "Calendar",
	CalendarLegend: "Calendar",
	CalendarLegendItem: "Calendar",
	SpecialCalendarDate: "Calendar",
	ComboBoxItem: "ComboBox",
	ComboBoxItemGroup: "ComboBox",
	MultiComboBoxItem: "MultiComboBox",
	MultiComboBoxItemGroup: "MultiComboBox",
	Option: "Select",
	OptionCustom: "Select",
	SegmentedButtonItem: "SegmentedButton",
	ShellBarItem: "ShellBar",
	ShellBarBranding: "ShellBar",
	ShellBarSearch: "ShellBar",
	SuggestionItem: "Input",
	SuggestionItemCustom: "Input",
	SuggestionItemGroup: "Input",
	Tab: "TabContainer",
	TableCell: "Table",
	TableGrowing: "Table",
	TableHeaderCell: "Table",
	TableHeaderRow: "Table",
	TableRow: "Table",
	TableRowAction: "Table",
	TableSelectionMulti: "Table",
	TableSelectionSingle: "Table",
	Token: "MultiInput",
	WizardStep: "Wizard",
	TreeItemCustom: "TreeItem",
	UserMenuAccount: "UserMenu",
	UserMenuItem: "UserMenu",
	UserMenuItemGroup: "UserMenu",
	AvatarBadge: "Avatar",
	AvatarGroup: "Avatar",
	ButtonBadge: "Button",
	ShellBarSpacer: "ShellBar",
	TabSeparator: "TabContainer",
	BreadcrumbsItem: "Breadcrumbs",
	MenuItem: "Menu",
	MenuItemGroup: "Menu",
	MenuSeparator: "Menu",
	ToolbarButton: "Toolbar",
	ToolbarItem: "Toolbar",
	ToolbarSelect: "Toolbar",
	ToolbarSelectOption: "Toolbar",
	ToolbarSeparator: "Toolbar",
	ToolbarSpacer: "Toolbar",
	TimelineItem: "Timeline",
	TimelineGroupItem: "Timeline",
	MediaGalleryItem: "MediaGallery",
	ColorPaletteItem: "ColorPalette",
	ColorPalettePopover: "ColorPalette",
	NotificationListItem: "NotificationList",
	NotificationListGroupItem: "NotificationList",
	UploadCollectionItem: "UploadCollection",
	MessageItem: "MessageView",
	MessageViewButton: "MessageView",
	Splitter: "SplitterLayout",
	SplitterElement: "SplitterLayout",
};

const readPkgComponentTags = () => {
	const stable = [];
	const tags = {};
	for (const base of ["webComponents", "components"]) {
		const baseDir = path.join(PKG_DIST, base);
		if (!fs.existsSync(baseDir)) continue;
		for (const name of fs.readdirSync(baseDir)) {
			const f = path.join(baseDir, name, "index.d.ts");
			if (!fs.existsSync(f)) continue;
			const src = fs.readFileSync(f, "utf8");
			const m = src.match(new RegExp(`declare const ${name}\\b`));
			if (!m) continue;
			const before = src.slice(0, m.index);
			const s = before.lastIndexOf("/**");
			const e = before.lastIndexOf("*/");
			const block = s !== -1 && e > s ? before.slice(s, e) : "";
			const deprecated = /@deprecated/i.test(block);
			const experimental = /@experimental/i.test(block);
			if (!deprecated && !experimental) stable.push(name);
			tags[name] = { deprecated, experimental };
		}
	}
	return { stable: [...new Set(stable)].sort(), tags };
};

const readCoveredFromBarrel = () => {
	const covered = new Set();
	const barrel = fs.readFileSync(
		path.join(ROOT, "components/index.ts"),
		"utf8",
	);
	const re =
		/export \{\s*([A-Za-z0-9]+)(?:\s+as\s+[A-Za-z0-9]+)?\s*\} from "@ui5\/webcomponents-react\/([A-Za-z0-9]+)"/g;
	for (const m of barrel.matchAll(re)) covered.add(m[2]);
	// Wrapper primaries + Form sub-barrel + renamed family, not in the barrel's
	// direct re-export block.
	for (const n of [
		"Form",
		"FormGroup",
		"FormItem",
		"ShellBar",
		"SideNavigation",
		"SideNavigationItem",
		"SideNavigationGroup",
		"SideNavigationSubItem",
		"TreeItem",
		"TreeItemCustom",
		"UserMenu",
		"UserMenuAccount",
		"UserMenuItem",
		"TextArea",
		"ProductSwitch",
		"ProductSwitchItem",
	]) {
		covered.add(n);
	}
	return covered;
};

/** Reltio `components/<Dir>` dirs that ship a `<Dir>.tsx` implementation. */
const reltioImplDirs = () => {
	const dirs = new Set();
	const compDir = path.join(ROOT, "components");
	for (const entry of fs.readdirSync(compDir, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		if (fs.existsSync(path.join(compDir, entry.name, `${entry.name}.tsx`))) {
			dirs.add(entry.name);
		}
	}
	return dirs;
};

const documentedReltioDirs = () => {
	const dirs = new Set();
	const compDir = path.join(ROOT, "components");
	for (const entry of fs.readdirSync(compDir, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		if (
			fs.existsSync(path.join(compDir, entry.name, `${entry.name}.stories.tsx`))
		) {
			dirs.add(entry.name);
		}
	}
	return dirs;
};

/** Public chart names, parsed from `charts/index.ts` (`export * from "./X"`). */
const readCharts = () => {
	const charts = [];
	const src = fs.readFileSync(path.join(ROOT, "charts/index.ts"), "utf8");
	for (const m of src.matchAll(/export \* from "\.\/([A-Za-z0-9]+)"/g)) {
		charts.push(m[1]);
	}
	return charts.sort();
};

const loadUi5DocsMap = async () => {
	// name(lowercase) -> { url, category }
	const map = {};
	let entries;
	try {
		const res = await fetch(UI5_INDEX_URL, {
			signal: AbortSignal.timeout(20000),
		});
		entries = (await res.json()).entries;
	} catch {
		console.warn(
			"  ! Could not fetch UI5 Storybook index; reusing previous output's UI5 links.",
		);
		if (fs.existsSync(OUT)) {
			for (const c of JSON.parse(fs.readFileSync(OUT, "utf8")).components) {
				const url = c.ui5?.url ?? c.ui5Url;
				if (url && c.category) {
					map[c.name.toLowerCase()] = { url, category: c.category };
				}
			}
		}
		return { map, fromUrl: false };
	}
	const SKIP_CATEGORIES = new Set([
		"AI",
		"Legacy Components",
		"Knowledge Base",
	]);
	for (const e of Object.values(entries)) {
		if (e.type !== "docs") continue;
		const parts = e.title.split("/").map((p) => p.trim());
		if (parts.length !== 2) continue; // only "Category / Component" docs pages
		const [category, name] = parts;
		if (SKIP_CATEGORIES.has(category)) continue;
		const key = name.toLowerCase();
		if (!map[key]) {
			map[key] = { url: `${UI5_DOCS_BASE}${e.id}`, category };
		}
	}
	return { map, fromUrl: true };
};

const main = async () => {
	const { tags } = readPkgComponentTags();
	const covered = readCoveredFromBarrel();
	const docDirs = documentedReltioDirs();
	const implDirs = reltioImplDirs();
	const charts = readCharts();
	const { map: ui5Docs, fromUrl } = await loadUi5DocsMap();

	const ui5For = (name) => {
		const direct = ui5Docs[name.toLowerCase()];
		if (direct) return direct;
		const parent = UI5_PARENT[name];
		if (parent && ui5Docs[parent.toLowerCase()])
			return ui5Docs[parent.toLowerCase()];
		return null;
	};

	const reltioUrlFor = (dir) => {
		if (docDirs.has(dir))
			return `/?path=/docs/components-${dir.toLowerCase()}--docs`;
		return null;
	};

	// 1. UI5 React catalog → intersection (endorsed) + UI5-only rows. Every UI5
	// component is listed; its lifecycle (stable / experimental / deprecated)
	// drives both the UI5 side status and the relationship for unendorsed ones.
	const ui5Rows = Object.keys(tags)
		.sort()
		.map((name) => {
			const { deprecated, experimental } = tags[name];
			const lifecycle = deprecated
				? "deprecated"
				: experimental
					? "experimental"
					: "stable";
			const ui5 = ui5For(name);
			const category = ui5?.category ?? "Other";
			const ui5Side = {
				status: lifecycle,
				url: ui5?.url ?? "https://ui5.github.io/webcomponents-react/v2/",
			};
			const excluded = name in EXCLUDED;
			const isCovered = !excluded && covered.has(name);
			if (excluded) {
				return {
					name,
					category,
					relationship: "excluded",
					ui5: ui5Side,
					reltio: null,
					note: EXCLUDED[name],
				};
			}
			if (isCovered) {
				let mode = "1:1";
				if (name in RENAMED) mode = "renamed";
				else if (WRAPPERS.has(name)) mode = "wrapper";
				// Prefer the component's own documented page; fall back to the
				// curated parent dir (renamed surfaces, internal sub-items).
				const reltioDir = docDirs.has(name) ? name : (RELTIO_DIR[name] ?? name);
				return {
					name,
					category,
					relationship: "endorsed",
					ui5: ui5Side,
					reltio: { mode, url: reltioUrlFor(reltioDir) },
				};
			}
			// Unendorsed UI5 component. The Reltio status reflects our stance, not
			// the UI5 lifecycle (which lives on the `ui5.status` axis): deprecated
			// components we don't plan to build are Excluded; stable/experimental
			// ones are Backlog candidates.
			if (lifecycle === "deprecated") {
				return {
					name,
					category,
					relationship: "excluded",
					ui5: ui5Side,
					reltio: null,
					note: DEPRECATED_NOTE,
				};
			}
			return {
				name,
				category,
				relationship: "backlog",
				ui5: ui5Side,
				reltio: null,
			};
		});

	// 2. Charts → Reltio replacements for the SAP-deprecated UI5 charts package.
	const chartRows = charts.map((name) => ({
		name,
		category: "Charts",
		relationship: "reltio-replacement",
		ui5: { status: "deprecated", url: UI5_CHARTS_DEPRECATED_URL },
		reltio: {
			mode: "custom",
			url: `/?path=/docs/charts-${name.toLowerCase()}--docs`,
		},
		note: CHARTS_NOTE,
	}));

	// 3. Reltio-only components → impl dirs with no UI5 counterpart.
	const renamedTargets = new Set(Object.values(RENAMED));
	const reltioOnlyNames = [...implDirs]
		.filter((d) => !(d in tags) && !WRAPPERS.has(d) && !renamedTargets.has(d))
		.sort();
	const reltioRows = reltioOnlyNames.map((name) => {
		const meta = RELTIO_NATIVE[name];
		if (!meta) {
			console.warn(
				`  ! Reltio-only component "${name}" is missing from RELTIO_NATIVE — using "Reltio" category.`,
			);
		}
		return {
			name,
			category: meta?.category ?? "Reltio",
			relationship: "reltio-only",
			ui5: null,
			reltio: { mode: "custom", url: reltioUrlFor(name) },
			...(meta?.note ? { note: meta.note } : {}),
		};
	});

	const components = [...ui5Rows, ...chartRows, ...reltioRows].sort((a, b) =>
		a.name.localeCompare(b.name),
	);

	const countBy = (fn) => components.filter(fn).length;
	const totals = {
		total: components.length,
		endorsed: countBy((c) => c.relationship === "endorsed"),
		backlog: countBy((c) => c.relationship === "backlog"),
		excluded: countBy((c) => c.relationship === "excluded"),
		reltio: countBy(
			(c) =>
				c.relationship === "reltio-only" ||
				c.relationship === "reltio-replacement",
		),
	};

	const pkgVersion = JSON.parse(
		fs.readFileSync(
			path.join(ROOT, "node_modules/@ui5/webcomponents-react/package.json"),
			"utf8",
		),
	).version;

	const out = {
		$comment:
			"AUTO-GENERATED by scripts/build-component-data.mjs — do not edit by hand.",
		source: `@ui5/webcomponents-react@${pkgVersion} ∪ @reltio/design`,
		ui5DocsResolvedFrom: fromUrl ? UI5_INDEX_URL : "previous output (offline)",
		generatedAt: new Date().toISOString().slice(0, 10),
		totals,
		components,
	};

	fs.writeFileSync(OUT, `${JSON.stringify(out, null, "\t")}\n`, "utf8");
	try {
		execSync(
			`npx --no-install biome format --write "${path.relative(ROOT, OUT)}"`,
			{
				cwd: ROOT,
				stdio: "pipe",
			},
		);
	} catch {}
	console.log(
		`✓ ${path.relative(ROOT, OUT)} — ${totals.total} total / ${totals.endorsed} endorsed / ${totals.backlog} backlog / ${totals.excluded} excluded / ${totals.reltio} reltio`,
	);
	console.log(
		`  (UI5 lifecycle: ${countBy((c) => c.ui5?.status === "experimental")} experimental, ${countBy((c) => c.ui5?.status === "deprecated")} deprecated)`,
	);
};

main();
