import type { ReactNode } from "react";

/**
 * Available Reltio themes. Each value corresponds to a SAP Horizon theme that
 * the platform mirrors verbatim from upstream.
 */
export type ThemeName = "horizon-light" | "horizon-dark";

/**
 * The user's theme selection. `"auto"` defers to the operating system's
 * `prefers-color-scheme` media query and updates reactively when it changes.
 */
export type ThemeSelection = "auto" | ThemeName;

/**
 * Per-file basenames for the SAP 72 font asset set. Each entry corresponds to
 * a `.woff2` file that must exist at the resolved URL. Override individual
 * entries via `ThemeProviderProps.fontUrls` to self-host a subset.
 */
export type FontFileBasename =
	| "72-Light"
	| "72-Light-full"
	| "72-Regular"
	| "72-Regular-full"
	| "72-Italic"
	| "72-Italic-full"
	| "72-Semibold"
	| "72-Semibold-full"
	| "72-SemiboldDuplex"
	| "72-SemiboldDuplex-full"
	| "72-Bold"
	| "72-Bold-full"
	| "72-BoldItalic"
	| "72-BoldItalic-full"
	| "72-Black"
	| "72-Black-full"
	| "72Mono-Regular"
	| "72Mono-Regular-full"
	| "72Mono-Bold"
	| "72Mono-Bold-full";

/**
 * Props accepted by the `ThemeProvider` component.
 */
export type ThemeProviderProps = {
	/**
	 * Initial theme to activate. Defaults to `"auto"`, which resolves the
	 * active theme from the system `prefers-color-scheme` media query and
	 * tracks subsequent changes.
	 */
	defaultTheme?: ThemeSelection;

	/**
	 * Per-theme URL override. If a theme is missing from this map, the URL
	 * falls through to `themeBaseUrl` (if set) and then to the CDN default
	 * `https://reltio.design/themes/<theme>.theme.css`.
	 */
	themeUrls?: Partial<Record<ThemeName, string>>;

	/**
	 * Base URL used to construct theme stylesheet URLs as
	 * `${themeBaseUrl}/<theme>.theme.css` for any theme not present in
	 * `themeUrls`. Has no effect on themes already overridden in `themeUrls`.
	 */
	themeBaseUrl?: string;

	/**
	 * Per-file URL override for SAP 72 font files. If a basename is missing
	 * from this map, the URL falls through to `fontBaseUrl` (if set) and then
	 * to the CDN default `https://reltio.design/fonts/<basename>.woff2`.
	 */
	fontUrls?: Partial<Record<FontFileBasename, string>>;

	/**
	 * Base URL used to construct font URLs as `${fontBaseUrl}/<basename>.woff2`
	 * for any file not present in `fontUrls`. Has no effect on files already
	 * overridden in `fontUrls`.
	 */
	fontBaseUrl?: string;

	/** Application content. The provider renders `children` unchanged. */
	children?: ReactNode;
};

/**
 * Value returned by the `useTheme()` hook.
 */
export type ThemeContextValue = {
	/** The user's current selection: `"auto"` or one of the named themes. */
	theme: ThemeSelection;
	/** The currently active theme (auto resolves to a concrete name). */
	resolved: ThemeName;
	/** Update the user's selection. */
	setTheme: (next: ThemeSelection) => void;
};
