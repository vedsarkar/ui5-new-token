export type DualThemeSplit = "horizontal" | "vertical";

export type DualThemeParam =
	| false
	| {
			split?: DualThemeSplit;
	  };

export type Layout = "centered" | "padded" | "fullscreen";

export type ResolvedParams = {
	enabled: boolean;
	split: DualThemeSplit;
	layout: Layout;
};
