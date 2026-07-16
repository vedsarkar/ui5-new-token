type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Deep-merges `source` onto `target` and returns a new object — neither input
 * is mutated.
 *
 * Merge semantics (matches the config `default.json` + env overlay model):
 * - plain objects are merged recursively, so shared settings in `default.json`
 *   are extended, not clobbered, by an env file;
 * - arrays, primitives and `null` from `source` REPLACE the target value
 *   wholesale — to change one list entry an env file must restate the array.
 *
 * Because arrays replace by value, every setting meant to be extended across
 * environments must be modeled as an object, not an array.
 */
export function deepMerge<T>(target: T, source: unknown): T {
	if (!isPlainObject(target) || !isPlainObject(source)) {
		return (source ?? target) as T;
	}

	const result: PlainObject = { ...target };
	for (const key of Object.keys(source)) {
		const targetValue = result[key];
		const sourceValue = source[key];
		result[key] =
			isPlainObject(targetValue) && isPlainObject(sourceValue)
				? deepMerge(targetValue, sourceValue)
				: sourceValue;
	}
	return result as T;
}
