/**
 * Combines CSS class names into a single string, handling BEM-like naming conventions.
 * Filters out falsy values and ensures unique class names.
 * For classes with suffixes (containing '__'), automatically adds the base class.
 *
 * @example
 * classNames('a__b', false, 'c__d', 'c__e') // returns 'a a__b c c__d c__e'
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

		// Add the class itself
		uniqueClasses.add(cssClass);

		// If class contains a suffix (__), add the base class
		const baseClass = cssClass.split("__")[0];
		if (baseClass && baseClass !== cssClass) {
			uniqueClasses.add(baseClass);
		}
	});

	return Array.from(uniqueClasses).join(" ");
};
