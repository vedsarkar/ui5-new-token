const PALETTE_TOKENS = [
	"--sapBrandColor",
	"--sapPositiveElementColor",
	"--sapCriticalColor",
	"--sapCriticalElementColor",
	"--sapAccentColor3",
	"--sapAccentColor4",
	"--sapAccentColor7",
	"--sapAccentColor8",
	"--sapNegativeElementColor",
] as const;

function getToken(styles: CSSStyleDeclaration, name: string): string {
	return styles.getPropertyValue(name).trim();
}

/**
 * Builds an ECharts theme object by reading --sap* CSS custom
 * properties from the given DOM element. CSS custom properties inherit
 * through the DOM tree, so the resolved values reflect the nearest
 * ancestor's data-theme attribute (light or dark).
 */
export function buildTheme(element: HTMLElement) {
	const styles = getComputedStyle(element);

	const colorPalette = PALETTE_TOKENS.map((name) => getToken(styles, name));

	return {
		color: colorPalette,
		backgroundColor: "transparent",

		title: {
			textStyle: {
				color: getToken(styles, "--sapTextColor"),
			},
		},

		legend: {
			textStyle: {
				color: getToken(styles, "--sapContent_LabelColor"),
			},
		},

		tooltip: {
			backgroundColor: getToken(styles, "--sapGroup_ContentBackground"),
			borderColor: getToken(styles, "--sapField_BorderColor"),
			textStyle: {
				color: getToken(styles, "--sapTextColor"),
			},
		},

		categoryAxis: {
			axisLine: {
				lineStyle: {
					color: getToken(styles, "--sapField_BorderColor"),
				},
			},
			axisTick: {
				lineStyle: {
					color: getToken(styles, "--sapField_BorderColor"),
				},
			},
			axisLabel: {
				color: getToken(styles, "--sapContent_LabelColor"),
			},
			splitLine: {
				lineStyle: {
					color: getToken(styles, "--sapGroup_ContentBorderColor"),
				},
			},
		},

		visualMap: {
			textStyle: {
				color: getToken(styles, "--sapContent_LabelColor"),
			},
		},

		valueAxis: {
			axisLine: {
				lineStyle: {
					color: getToken(styles, "--sapField_BorderColor"),
				},
			},
			axisTick: {
				lineStyle: {
					color: getToken(styles, "--sapField_BorderColor"),
				},
			},
			axisLabel: {
				color: getToken(styles, "--sapContent_LabelColor"),
			},
			splitLine: {
				lineStyle: {
					color: getToken(styles, "--sapGroup_ContentBorderColor"),
				},
			},
		},
	};
}
