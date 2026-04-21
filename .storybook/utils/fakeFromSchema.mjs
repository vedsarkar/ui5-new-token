import { faker } from "@faker-js/faker";

/**
 * Generates a deterministic fake JSON value that conforms to the given
 * JSON Schema node. Resolution order for each field:
 *   1. `examples[0]` if present
 *   2. `default` if present
 *   3. `enum[0]` if present
 *   4. faker-generated value based on `type`
 *
 * Empty `items: {}` arrays are emitted as `[]` (no shape information).
 * `omitReadOnly: true` strips `readOnly: true` fields — useful for request bodies.
 *
 * Build-time only — consumed by `scripts/build-api-docs.mjs` to seed
 * `<Name>.sample.json` files. Not imported from any storybook preview/story,
 * so `@faker-js/faker` stays out of the storybook runtime bundle.
 */
export function fakeFromSchema(schema, options = {}) {
	const { seed = 42, omitReadOnly = false } = options;
	faker.seed(seed);
	return generate(schema, omitReadOnly);
}

function generate(node, omitReadOnly) {
	if (node.examples && node.examples.length > 0) return node.examples[0];
	if (node.default !== undefined) return node.default;
	if (node.enum && node.enum.length > 0) return node.enum[0];

	const type = resolveType(node);

	switch (type) {
		case "object": {
			const result = {};
			if (!node.properties) return result;
			for (const [key, child] of Object.entries(node.properties)) {
				if (omitReadOnly && child.readOnly) continue;
				result[key] = generate(child, omitReadOnly);
			}
			return result;
		}
		case "array": {
			if (!node.items || !hasStructure(node.items)) return [];
			return [generate(node.items, omitReadOnly)];
		}
		case "string":
			return fakeString(node);
		case "number":
		case "integer":
			return fakeNumber(node, type === "integer");
		case "boolean":
			return false;
		case "null":
			return null;
		default:
			return null;
	}
}

function resolveType(node) {
	if (Array.isArray(node.type)) return node.type[0];
	if (node.type) return node.type;
	if (node.properties) return "object";
	if (node.items) return "array";
	return "string";
}

function hasStructure(node) {
	return Boolean(node.properties || node.items || node.enum || node.type);
}

function fakeString(node) {
	switch (node.format) {
		case "email":
			return faker.internet.email();
		case "uri":
		case "url":
			return faker.internet.url();
		case "uuid":
			return faker.string.uuid();
		case "date":
			return faker.date.recent().toISOString().split("T")[0] ?? "";
		case "date-time":
			return faker.date.recent().toISOString();
		default:
			return faker.lorem.word();
	}
}

function fakeNumber(node, integer) {
	const min = node.minimum ?? 0;
	const max = node.maximum ?? 1000;
	return integer
		? faker.number.int({ min, max })
		: faker.number.float({ min, max, fractionDigits: 2 });
}
