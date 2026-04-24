import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import type {
	FontFileBasename,
	ThemeContextValue,
	ThemeName,
	ThemeProviderProps,
	ThemeSelection,
} from "./ThemeProvider.types";

const THEME_CDN_BASE = "https://reltio.design/themes";
const FONT_CDN_BASE = "https://reltio.design/fonts";

const LATIN_RANGE =
	"U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2212, U+2215, U+FEFF, U+FFFD";
const FULL_RANGE = "U+0100-FFFF";

// [font-family, font-weight, font-style, file basename]. Mirrors FONT_FACES in
// scripts/build-tokens.mjs. Two @font-face rules per row (Latin + -full).
const FONT_FACES: ReadonlyArray<
	readonly [string, number, "normal" | "italic", string]
> = [
	["72", 300, "normal", "72-Light"],
	["72", 400, "normal", "72-Regular"],
	["72", 400, "italic", "72-Italic"],
	["72", 600, "normal", "72-Semibold"],
	["72-SemiboldDuplex", 400, "normal", "72-SemiboldDuplex"],
	["72", 700, "normal", "72-Bold"],
	["72", 700, "italic", "72-BoldItalic"],
	["72", 900, "normal", "72-Black"],
	["72 Mono", 400, "normal", "72Mono-Regular"],
	["72 Mono", 700, "normal", "72Mono-Bold"],
];

const ThemeContext = createContext<ThemeContextValue | null>(null);

const PREFERS_DARK_QUERY = "(prefers-color-scheme: dark)";

function detectSystemTheme(): ThemeName {
	if (
		typeof window !== "undefined" &&
		window.matchMedia &&
		window.matchMedia(PREFERS_DARK_QUERY).matches
	) {
		return "horizon-dark";
	}
	return "horizon-light";
}

function resolveThemeUrl(
	theme: ThemeName,
	themeUrls: ThemeProviderProps["themeUrls"],
	themeBaseUrl: string | undefined,
): string {
	const explicit = themeUrls?.[theme];
	if (explicit) return explicit;
	if (themeBaseUrl) return `${themeBaseUrl}/${theme}.theme.css`;
	return `${THEME_CDN_BASE}/${theme}.theme.css`;
}

function resolveFontUrl(
	basename: FontFileBasename,
	fontUrls: ThemeProviderProps["fontUrls"],
	fontBaseUrl: string | undefined,
): string {
	const explicit = fontUrls?.[basename];
	if (explicit) return explicit;
	if (fontBaseUrl) return `${fontBaseUrl}/${basename}.woff2`;
	return `${FONT_CDN_BASE}/${basename}.woff2`;
}

function buildFontFaceCss(
	fontUrls: ThemeProviderProps["fontUrls"],
	fontBaseUrl: string | undefined,
): string {
	const subsets = [
		{ suffix: "", range: LATIN_RANGE },
		{ suffix: "-full", range: FULL_RANGE },
	] as const;
	const rules: string[] = [];
	for (const [family, weight, style, basename] of FONT_FACES) {
		for (const { suffix, range } of subsets) {
			const file = `${basename}${suffix}` as FontFileBasename;
			const url = resolveFontUrl(file, fontUrls, fontBaseUrl);
			rules.push(
				`@font-face{font-family:"${family}";font-style:${style};font-weight:${weight};font-display:swap;src:url("${url}") format("woff2");unicode-range:${range};}`,
			);
		}
	}
	return rules.join("\n");
}

export const ThemeProvider = ({
	defaultTheme = "auto",
	themeUrls,
	themeBaseUrl,
	fontUrls,
	fontBaseUrl,
	children,
}: ThemeProviderProps) => {
	const [theme, setTheme] = useState<ThemeSelection>(defaultTheme);
	const [systemTheme, setSystemTheme] = useState<ThemeName>(() =>
		detectSystemTheme(),
	);

	const resolved: ThemeName = theme === "auto" ? systemTheme : theme;

	useEffect(() => {
		if (typeof window === "undefined" || !window.matchMedia) return;
		const mql = window.matchMedia(PREFERS_DARK_QUERY);
		const handler = (e: MediaQueryListEvent) => {
			setSystemTheme(e.matches ? "horizon-dark" : "horizon-light");
		};
		setSystemTheme(mql.matches ? "horizon-dark" : "horizon-light");
		mql.addEventListener("change", handler);
		return () => mql.removeEventListener("change", handler);
	}, []);

	const themeLinkRef = useRef<HTMLLinkElement | null>(null);
	useEffect(() => {
		if (typeof document === "undefined") return;
		const url = resolveThemeUrl(resolved, themeUrls, themeBaseUrl);
		let link = themeLinkRef.current;
		if (!link) {
			link = document.createElement("link");
			link.rel = "stylesheet";
			link.dataset.reltioTheme = "";
			document.head.appendChild(link);
			themeLinkRef.current = link;
		}
		if (link.href !== url) link.href = url;
	}, [resolved, themeUrls, themeBaseUrl]);

	useEffect(() => {
		return () => {
			if (themeLinkRef.current) {
				themeLinkRef.current.remove();
				themeLinkRef.current = null;
			}
		};
	}, []);

	const fontStyleRef = useRef<HTMLStyleElement | null>(null);
	useEffect(() => {
		if (typeof document === "undefined") return;
		const css = buildFontFaceCss(fontUrls, fontBaseUrl);
		let style = fontStyleRef.current;
		if (!style) {
			style = document.createElement("style");
			style.dataset.reltioFonts = "";
			document.head.appendChild(style);
			fontStyleRef.current = style;
		}
		if (style.textContent !== css) style.textContent = css;
	}, [fontUrls, fontBaseUrl]);

	useEffect(() => {
		return () => {
			if (fontStyleRef.current) {
				fontStyleRef.current.remove();
				fontStyleRef.current = null;
			}
		};
	}, []);

	const setThemeStable = useCallback((next: ThemeSelection) => {
		setTheme(next);
	}, []);

	const value = useMemo<ThemeContextValue>(
		() => ({ theme, resolved, setTheme: setThemeStable }),
		[theme, resolved, setThemeStable],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextValue => {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error(
			"useTheme() must be used within a <ThemeProvider>. Wrap your application in <ThemeProvider> or omit useTheme().",
		);
	}
	return ctx;
};
