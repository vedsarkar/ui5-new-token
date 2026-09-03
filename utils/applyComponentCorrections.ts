import { addCustomCSS } from "@ui5/webcomponents-base/dist/Theming.js";

/**
 * Component corrections that a stylesheet cannot reach.
 *
 * Most divergences between UI5's Horizon CSS and the Hybrid Design System are
 * fixable from `global.css`, because the value either comes from a `--sap*`
 * token or sits on a component host that a document selector can match. Two are
 * not: the value lives on a **nested** component's `:host`, or in a rule inside
 * a nested shadow root. `ui5-daypicker` sits inside `ui5-calendar`'s shadow
 * root, so no document rule reaches it — verified by injecting the overrides at
 * document level and measuring no change.
 *
 * `addCustomCSS` is UI5's supported API for exactly this: it registers CSS
 * against a tag name and UI5 appends it to that component's shadow root after
 * its own styles. Later-appended rules of equal specificity win, which is why
 * re-declaring `:host` variables here beats the component's own parameters.
 * Prefer this over reaching into `shadowRoot.adoptedStyleSheets` by hand — this
 * is a published contract, that is not.
 *
 * Call once during app startup, before or after components render (UI5 applies
 * registered CSS on the next render either way).
 *
 * Keep this list minimal. A correction belongs in `global.css` unless it has
 * been shown to be unreachable from there, and every entry depends on
 * UI5-private names (`--_ui5_*`, internal class names) that are not covered by
 * semver — re-check them on a UI5 upgrade.
 */
export const applyComponentCorrections = async (): Promise<void> => {
	await Promise.all([
		// The design's calendar grid is flush: 8 columns of 36px with no gaps,
		// and a weekday row as tall as a day row. UI5 gives every cell a 2px
		// margin, which widens the grid to 8x38 and pushes it 16px past the
		// card's content box, and it caps the weekday row at 2rem.
		//
		// Both values are UI5's own variables, so re-declaring them is enough —
		// no internal class names needed. The row height matches
		// `--_ui5_day_picker_item_height` (2.875rem), keeping the weekday row and
		// the day rows the same height as the design has them.
		addCustomCSS(
			"ui5-daypicker",
			`:host {
	--_ui5_daypicker_item_margin: 0;
	--_ui5_daypicker_daynames_container_height: 2.875rem;
}`,
		),

		// The design's breadcrumb row is 16px tall. UI5 makes it 24 by adding 4px
		// of vertical padding to the link through `::part(root)`, a hit area the
		// design does not model. The rule lives inside the Breadcrumbs shadow
		// root, and the part is not re-exported, so `::part()` from the document
		// does nothing.
		//
		// Note this trades the click target down from 24px to 16px. Acceptable
		// where visual fidelity to the design is the goal; revisit before
		// production, since 16px is below the usual minimum target size.
		addCustomCSS(
			"ui5-breadcrumbs",
			`.ui5-breadcrumbs-dropdown-arrow-link-wrapper [ui5-link]::part(root),
.ui5-breadcrumbs-link-wrapper [ui5-link]::part(root) {
	padding-top: 0;
	padding-bottom: 0;
}

/* The separator span inherits the document's 16px, which leaves a 17px line
 * box that keeps the row 2px over the design even once the padding is gone.
 * Its "/" glyph already sets 14px explicitly on the ::after, so matching the
 * span to the glyph costs nothing visually and lets the row settle at 16. */
.ui5-breadcrumbs-separator {
	font-size: var(--sapFontSize);
}

/* The link row itself then still measures 18, because the li's own inherited
 * 16px font sets a taller line box than the 14px content sitting on it. UI5
 * already solves this on the current-item row with \`font-size: 0\` (its
 * comment there reads "Fix extra height in ul -> li element"); applying the
 * same idiom to the link rows is safe because everything inside sets its own
 * size — the link via Link.css, the separator via the rule above. */
.ui5-breadcrumbs-link-wrapper {
	font-size: 0;
}`,
		),

		// The design's carousel navigation bar is 56px tall; UI5 hardcodes
		// 2.75rem (44) on the wrapper with no variable behind it, so there is
		// nothing for a token or a document rule to reach. Everything else on the
		// bar already agrees — the sapPageFooter_Background fill, the 36px arrow
		// buttons and the 16px dot slots.
		addCustomCSS(
			"ui5-carousel",
			`.ui5-carousel-navigation-wrapper {
	height: 3.5rem;
}`,
		),

		// The design's dialog is a clean surface: a title, the content slot and the
		// footer actions, with no rules between them. UI5 draws two separators the
		// design does not have.
		//
		// The footer's `border-top: 1px solid sapPageFooter_BorderColor` also sits
		// outside its 44px content box and makes the row 45 — the same
		// off-by-the-border the Bar footer had. It resolves to #ffffff on a #fcfeff
		// dialog, so dropping it costs nothing visually and lands the row on 44.
		// (`box-sizing: border-box` does not help: the footer has no declared
		// height, so its 45 is content plus border rather than a fixed box.)
		//
		// The header's separator is a 1px `::before` filled #dedee6, which is
		// clearly visible. #dedee6 is a real separator colour the design uses
		// elsewhere — the vertical divider in the Date Time dropdown — so this is
		// about the dialog specifically, not the colour.
		//
		// Both live inside the dialog's shadow root with no variable behind them.
		addCustomCSS(
			"ui5-dialog",
			`.ui5-popup-footer-root {
	border-top: none;
}

.ui5-popup-root .ui5-popup-header-root::before {
	content: none;
}

/* The design's header and footer carry no fill of their own — they let the
 * dialog's #fcfeff show through. UI5 gives both a 50%-alpha #fcfeff, which
 * resolves to the same colour but composites as its own layer, leaving a
 * visible seam at the header's fractional bottom edge on high-DPI displays.
 * Dropping the fill matches the design and takes the seam with it. */
.ui5-popup-header-root,
.ui5-popup-footer-root {
	background: transparent;
}`,
		),

		// Popup radius, for the popovers a stylesheet cannot reach.
		//
		// variables.css already re-points `--_ui5_popup_border_radius` at the
		// design's token for `ui5-popover` and `ui5-responsive-popover`, because
		// UI5's Horizon theme hardcodes 0.5rem. That rule is a document selector,
		// so it only matches popovers in the document — a popover UI5 renders
		// inside another component's shadow root, such as the Date Time Picker's
		// dropdown, keeps the 8px and renders half the design's 16px corner.
		//
		// Re-declaring the variable on `:host` from inside the popover's own
		// shadow root covers both cases, nested or not. The document rule stays in
		// place so the common case still works without this JS.
		...["ui5-popover", "ui5-responsive-popover"].map((tag) =>
			addCustomCSS(
				tag,
				`:host {
	--_ui5_popup_border_radius: var(--sapPopover_BorderCornerRadius, 1rem);
}`,
			),
		),
	]);
};
