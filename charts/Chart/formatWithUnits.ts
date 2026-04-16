export function formatWithUnits(
	value: number | string,
	units?: string,
): string {
	if (!units) return `${value}`;
	return `${value} ${units}`;
}
