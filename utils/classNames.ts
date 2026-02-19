/**
 * Combines CSS class names into a single string.
 * Filters out falsy values and ensures unique class names.
 * For hashed CSS Module classes (containing '__'), automatically adds
 * a stable prefixed class for external customization.
 *
 * @example
 * classNames('Tabs_tab__x1y2z') // returns 'reltio_Tabs_tab Tabs_tab__x1y2z'
 * classNames('Tabs_tab__x1y2z', false, 'Tabs_active__a3b4c') // returns 'reltio_Tabs_tab Tabs_tab__x1y2z reltio_Tabs_active Tabs_active__a3b4c'
 *
 * @param cssClasses - Array of CSS class names (strings) or falsy values
 * @returns space-separated string of unique CSS class names
 */
export const classNames = (
	...cssClasses: (string | undefined | null | false)[]
): string => {
	const uniqueClasses = new Set<string>();

	cssClasses.forEach((cssClass) => {
		if (!cssClass) return;

		uniqueClasses.add(cssClass);

		const baseClass = cssClass.split("__")[0];
		if (baseClass && baseClass !== cssClass) {
			uniqueClasses.add(`reltio_${baseClass}`);
		}
	});

	return Array.from(uniqueClasses).join(" ");
};
