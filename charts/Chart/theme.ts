const TOKEN_NAMES = [
	"primary",
	"success",
	"warning",
	"orange",
	"pink",
	"purple",
	"aqua-font",
	"lime",
	"error",
] as const;

function getToken(styles: CSSStyleDeclaration, name: string): string {
	return styles.getPropertyValue(`--reltio-color-${name}`).trim();
}

/**
 * Builds an ECharts theme object by reading --reltio-color-* CSS custom
 * properties from the given DOM element. CSS custom properties inherit
 * through the DOM tree, so the resolved values reflect the nearest
 * ancestor's data-theme attribute (light or dark).
 */
export function buildTheme(element: HTMLElement) {
	const styles = getComputedStyle(element);

	const colorPalette = TOKEN_NAMES.map((name) => getToken(styles, name));

	return {
		color: colorPalette,
		backgroundColor: "transparent",

		title: {
			textStyle: {
				color: getToken(styles, "text"),
			},
		},

		legend: {
			textStyle: {
				color: getToken(styles, "text-secondary"),
			},
		},

		tooltip: {
			backgroundColor: getToken(styles, "bg-tooltip"),
			borderColor: getToken(styles, "border-2"),
			textStyle: {
				color: getToken(styles, "text-forced-white"),
			},
		},

		categoryAxis: {
			axisLine: {
				lineStyle: {
					color: getToken(styles, "border-2"),
				},
			},
			axisTick: {
				lineStyle: {
					color: getToken(styles, "border-2"),
				},
			},
			axisLabel: {
				color: getToken(styles, "text-secondary"),
			},
			splitLine: {
				lineStyle: {
					color: getToken(styles, "border-1"),
				},
			},
		},

		valueAxis: {
			axisLine: {
				lineStyle: {
					color: getToken(styles, "border-2"),
				},
			},
			axisTick: {
				lineStyle: {
					color: getToken(styles, "border-2"),
				},
			},
			axisLabel: {
				color: getToken(styles, "text-secondary"),
			},
			splitLine: {
				lineStyle: {
					color: getToken(styles, "border-1"),
				},
			},
		},
	};
}
