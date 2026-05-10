/**
 * Combines CSS class names into a single string.
 * Filters out falsy values and ensures unique class names.
 *
 * @example
 * classNames('Tabs_tab__x1y2z') // returns 'Tabs_tab__x1y2z'
 * classNames('Tabs_tab__x1y2z', false, 'Tabs_active__a3b4c') // returns 'Tabs_tab__x1y2z Tabs_active__a3b4c'
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
	});

	return Array.from(uniqueClasses).join(" ");
};
