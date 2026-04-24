import { Component, type ReactNode, useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import preview from "@/.storybook/preview";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import type { ThemeName, ThemeSelection } from "./ThemeProvider.types";

const meta = preview.meta({
	component: ThemeProvider,
	parameters: {
		layout: "padded",
	},
});

const ThemeProbe = ({ id }: { id: string }) => {
	const { theme, resolved, setTheme } = useTheme();
	return (
		<div
			data-testid={id}
			style={{
				background: "var(--sapBaseColor)",
				color: "var(--sapTextColor)",
				border: "1px solid var(--sapField_BorderColor)",
				borderRadius: "var(--sapElement_BorderCornerRadius)",
				padding: "16px",
				fontFamily: 'var(--sapFontFamily, "72", sans-serif)',
				display: "grid",
				gap: "8px",
			}}
		>
			<div>
				selection: <strong data-testid={`${id}-selection`}>{theme}</strong>
			</div>
			<div>
				resolved: <strong data-testid={`${id}-resolved`}>{resolved}</strong>
			</div>
			<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
				{(["auto", "horizon-light", "horizon-dark"] as ThemeSelection[]).map(
					(opt) => (
						<button
							key={opt}
							data-testid={`${id}-set-${opt}`}
							type="button"
							onClick={() => setTheme(opt)}
							style={{
								padding: "6px 12px",
								borderRadius: "var(--sapElement_BorderCornerRadius)",
								border: "1px solid var(--sapButton_BorderColor)",
								background:
									resolved && opt === theme
										? "var(--sapButton_Selected_Background)"
										: "var(--sapButton_Background)",
								color: "var(--sapButton_TextColor)",
								cursor: "pointer",
							}}
						>
							{opt}
						</button>
					),
				)}
			</div>
		</div>
	);
};

const findLink = () =>
	document.head.querySelector<HTMLLinkElement>("link[data-reltio-theme]");
const findFontStyle = () =>
	document.head.querySelector<HTMLStyleElement>("style[data-reltio-fonts]");

export const Default = meta.story({
	name: "Default (CDN, auto)",
	render: () => (
		<ThemeProvider>
			<ThemeProbe id="default-probe" />
		</ThemeProvider>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const probe = await canvas.findByTestId("default-probe");
		expect(probe).toBeInTheDocument();

		const link = findLink();
		expect(link).not.toBeNull();
		expect(link?.href).toMatch(
			/^https:\/\/reltio\.design\/themes\/horizon-(light|dark)\.theme\.css$/,
		);

		const style = findFontStyle();
		expect(style).not.toBeNull();
		expect(style?.textContent ?? "").toContain("@font-face");
		expect(style?.textContent?.match(/@font-face/g) ?? []).toHaveLength(20);

		const selection = await canvas.findByTestId("default-probe-selection");
		expect(selection.textContent).toBe("auto");

		const resolved = await canvas.findByTestId("default-probe-resolved");
		expect(["horizon-light", "horizon-dark"]).toContain(resolved.textContent);
	},
});

export const ExplicitLight = meta.story({
	name: "Explicit horizon-light",
	render: () => (
		<ThemeProvider defaultTheme="horizon-light">
			<ThemeProbe id="light-probe" />
		</ThemeProvider>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await canvas.findByTestId("light-probe");
		const resolved = await canvas.findByTestId("light-probe-resolved");
		expect(resolved.textContent).toBe("horizon-light");

		const link = findLink();
		expect(link?.href).toBe(
			"https://reltio.design/themes/horizon-light.theme.css",
		);
	},
});

export const ExplicitDark = meta.story({
	name: "Explicit horizon-dark",
	render: () => (
		<ThemeProvider defaultTheme="horizon-dark">
			<ThemeProbe id="dark-probe" />
		</ThemeProvider>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await canvas.findByTestId("dark-probe");
		const resolved = await canvas.findByTestId("dark-probe-resolved");
		expect(resolved.textContent).toBe("horizon-dark");

		const link = findLink();
		expect(link?.href).toBe(
			"https://reltio.design/themes/horizon-dark.theme.css",
		);
	},
});

export const CustomThemeBaseUrl = meta.story({
	name: "themeBaseUrl override",
	render: () => (
		<ThemeProvider defaultTheme="horizon-dark" themeBaseUrl="/static/themes">
			<ThemeProbe id="basetheme-probe" />
		</ThemeProvider>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await canvas.findByTestId("basetheme-probe");
		const link = findLink();
		expect(link?.getAttribute("href")).toBe(
			"/static/themes/horizon-dark.theme.css",
		);
	},
});

export const CustomThemeUrls = meta.story({
	name: "themeUrls per-theme override",
	render: () => (
		<ThemeProvider
			defaultTheme="horizon-dark"
			themeUrls={{
				"horizon-dark": "/my/customised-dark.css",
			}}
			themeBaseUrl="/static/themes"
		>
			<ThemeProbe id="themeurls-probe" />
		</ThemeProvider>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await canvas.findByTestId("themeurls-probe");
		const link = findLink();
		expect(link?.getAttribute("href")).toBe("/my/customised-dark.css");
	},
});

export const CustomFontBaseUrl = meta.story({
	name: "fontBaseUrl override",
	render: () => (
		<ThemeProvider fontBaseUrl="/static/fonts">
			<ThemeProbe id="basefont-probe" />
		</ThemeProvider>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await canvas.findByTestId("basefont-probe");
		const style = findFontStyle();
		const css = style?.textContent ?? "";
		expect(css).toContain('url("/static/fonts/72-Regular.woff2")');
		expect(css).toContain('url("/static/fonts/72Mono-Bold-full.woff2")');
		expect(css).not.toContain("https://reltio.design/fonts/72-Regular.woff2");
	},
});

export const CustomFontUrls = meta.story({
	name: "fontUrls per-file override",
	render: () => (
		<ThemeProvider
			fontUrls={{
				"72-Regular": "https://my.cdn/custom-regular.woff2",
			}}
		>
			<ThemeProbe id="fonturls-probe" />
		</ThemeProvider>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await canvas.findByTestId("fonturls-probe");
		const style = findFontStyle();
		const css = style?.textContent ?? "";
		expect(css).toContain('url("https://my.cdn/custom-regular.woff2")');
		expect(css).toContain(
			'url("https://reltio.design/fonts/72Mono-Regular.woff2")',
		);
	},
});

export const SwitchAtRuntime = meta.story({
	name: "useTheme().setTheme runtime switch",
	render: () => (
		<ThemeProvider defaultTheme="horizon-light">
			<ThemeProbe id="switch-probe" />
		</ThemeProvider>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const resolved = await canvas.findByTestId("switch-probe-resolved");
		expect(resolved.textContent).toBe("horizon-light");
		expect(findLink()?.href).toBe(
			"https://reltio.design/themes/horizon-light.theme.css",
		);

		const darkBtn = await canvas.findByTestId("switch-probe-set-horizon-dark");
		await userEvent.click(darkBtn);

		expect(resolved.textContent).toBe("horizon-dark");
		expect(findLink()?.href).toBe(
			"https://reltio.design/themes/horizon-dark.theme.css",
		);
	},
});

// Tiny error boundary used by HookOutsideProviderThrows to capture the explanatory
// error that useTheme() throws when called without a surrounding ThemeProvider.
class ErrorCapture extends Component<
	{ children: ReactNode },
	{ error: string | null }
> {
	state = { error: null as string | null };

	static getDerivedStateFromError(error: unknown): { error: string } {
		return { error: error instanceof Error ? error.message : String(error) };
	}

	render() {
		if (this.state.error) {
			return <pre data-testid="hook-error">{this.state.error}</pre>;
		}
		return this.props.children;
	}
}

const CallUseThemeAtTopLevel = () => {
	useTheme();
	return <pre data-testid="hook-error">no-error</pre>;
};

export const HookOutsideProviderThrows = meta.story({
	name: "useTheme outside provider throws",
	parameters: { skipThemeProvider: true },
	render: () => (
		<ErrorCapture>
			<CallUseThemeAtTopLevel />
		</ErrorCapture>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const node = await canvas.findByTestId("hook-error");
		expect(node.textContent).toMatch(/must be used within a <ThemeProvider>/);
	},
});

const ConsumerCounter = () => {
	const { resolved } = useTheme();
	const [count, setCount] = useState(0);
	return (
		<div style={{ display: "grid", gap: "8px" }}>
			<div>active theme: {resolved}</div>
			<button
				type="button"
				data-testid="counter-btn"
				onClick={() => setCount((c) => c + 1)}
			>
				clicked {count} times
			</button>
		</div>
	);
};

export const InlineConsumer = meta.story({
	name: "useTheme in a consumer component",
	render: () => (
		<ThemeProvider defaultTheme="auto">
			<ConsumerCounter />
		</ThemeProvider>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const btn = await canvas.findByTestId("counter-btn");
		await userEvent.click(btn);
		await userEvent.click(btn);
		expect(btn.textContent).toContain("2 times");
	},
});

const RemovedAfterUnmount = ({ mounted }: { mounted: boolean }) =>
	mounted ? (
		<ThemeProvider defaultTheme="horizon-light">
			<div data-testid="ephemeral">live</div>
		</ThemeProvider>
	) : (
		<div data-testid="ephemeral-gone">unmounted</div>
	);

export const CleanupOnUnmount = meta.story({
	name: "Cleans up <link> and <style> on unmount",
	parameters: { skipThemeProvider: true },
	render: () => {
		const [mounted, setMounted] = useState(true);
		return (
			<div style={{ display: "grid", gap: "8px" }}>
				<button
					type="button"
					data-testid="toggle-mount"
					onClick={() => setMounted((m) => !m)}
				>
					{mounted ? "unmount" : "mount"}
				</button>
				<RemovedAfterUnmount mounted={mounted} />
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await canvas.findByTestId("ephemeral");
		expect(findLink()).not.toBeNull();
		expect(findFontStyle()).not.toBeNull();

		const toggle = await canvas.findByTestId("toggle-mount");
		await userEvent.click(toggle);
		await canvas.findByTestId("ephemeral-gone");

		expect(findLink()).toBeNull();
		expect(findFontStyle()).toBeNull();
	},
});

const _typeUtilCheck = (resolved: ThemeName) => resolved;
