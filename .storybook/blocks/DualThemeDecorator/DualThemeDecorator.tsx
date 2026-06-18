import type { Decorator } from "@storybook/react-vite";
import type {
	DualThemeParam,
	Layout,
	ResolvedParams,
} from "./DualThemeDecorator.types";

function resolveParams(parameters: Record<string, unknown>): ResolvedParams {
	const dualTheme = parameters.dualTheme as DualThemeParam | undefined;
	const layout = (parameters.layout as Layout | undefined) ?? "padded";
	if (dualTheme === false) {
		return { enabled: false, split: "horizontal", layout };
	}
	const split = dualTheme?.split ?? "horizontal";
	return { enabled: true, split, layout };
}

function halfStyleFor(layout: Layout): React.CSSProperties {
	const base: React.CSSProperties = {
		position: "relative",
		color: "var(--sapTextColor)",
		minWidth: 0,
		minHeight: 0,
		overflow: "auto",
	};
	switch (layout) {
		case "centered":
			return {
				...base,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: 16,
			};
		case "padded":
			return { ...base, padding: 16 };
		default:
			return base;
	}
}

// In the docs view (each story rendered inline in a Canvas block) we shrink
// the dual-theme frame to a sensible preview size so the page does not become
// a stack of viewport-tall blocks. Story view keeps the full viewport.
const DOCS_HORIZONTAL_HEIGHT = 320;
const DOCS_VERTICAL_HEIGHT = 480;

/**
 * Renders the wrapped story twice — once inside a `data-theme="horizon-light"`
 * container and once inside a `data-theme="horizon-dark"` container — so a
 * single Chromatic snapshot and a single addon-vitest a11y test cover both
 * themes. Per-story behaviour is controlled via `parameters.dualTheme`:
 *
 * - `parameters.dualTheme = false` — opt the story out entirely (single render).
 * - `parameters.dualTheme = { split: "vertical" }` — stack themes vertically
 *   instead of side-by-side, preserving full width for fullscreen stories
 *   (charts, Chat, etc.).
 *
 * Each half mirrors the story's existing `parameters.layout` intent
 * (`centered` / `padded` / `fullscreen`) so the canvas wrapper's own layout
 * handling is reproduced inside each themed container.
 *
 * The frame fills the whole viewport in story view (`viewMode === "story"`)
 * and shrinks to a fixed preview height in docs view (`viewMode === "docs"`)
 * so the docs page stays compact when the `<Stories>` block lists every
 * variant of a component.
 */
export const DualThemeDecorator: Decorator = (Story, context) => {
	const { enabled, split, layout } = resolveParams(
		context.parameters as Record<string, unknown>,
	);

	if (!enabled) {
		return <Story />;
	}

	const halfStyle = halfStyleFor(layout);
	const isDocs = context.viewMode === "docs";
	// In story view, the frame fills the whole canvas (100vw × 100vh). In docs
	// view, it stays inside the Canvas block at full block width with a
	// reasonable fixed preview height (taller for vertical splits so each half
	// gets a usable area).
	const sizingStyle: React.CSSProperties = isDocs
		? {
				width: "100%",
				height:
					split === "horizontal"
						? DOCS_HORIZONTAL_HEIGHT
						: DOCS_VERTICAL_HEIGHT,
			}
		: {
				width: "100vw",
				height: "100vh",
			};

	const containerStyle: React.CSSProperties = {
		display: "grid",
		boxSizing: "border-box",
		margin: 0,
		...sizingStyle,
		...(split === "horizontal"
			? { gridTemplateColumns: "1fr 1fr" }
			: { gridTemplateRows: "1fr 1fr" }),
	};

	return (
		<div data-dual-theme="true" style={containerStyle}>
			<div data-theme="horizon-light" style={halfStyle}>
				<Story />
			</div>
			<div data-theme="horizon-dark" style={halfStyle}>
				<Story />
			</div>
		</div>
	);
};
