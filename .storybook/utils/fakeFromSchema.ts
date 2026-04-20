import { faker } from "@faker-js/faker";
import type {
	JsonSchemaNode,
	JsonSchemaPrimitiveType,
} from "./jsonSchema.types";

export type FakeFromSchemaOptions = {
	/** Random seed for deterministic output. Default: 42. */
	seed?: number;
	/** When true, omits readOnly fields (use for request bodies). Default: false. */
	omitReadOnly?: boolean;
};

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
 */
export const fakeFromSchema = (
	schema: JsonSchemaNode,
	options: FakeFromSchemaOptions = {},
): unknown => {
	const { seed = 42, omitReadOnly = false } = options;
	faker.seed(seed);
	return generate(schema, omitReadOnly);
};

const generate = (node: JsonSchemaNode, omitReadOnly: boolean): unknown => {
	if (node.examples && node.examples.length > 0) {
		return node.examples[0];
	}
	if (node.default !== undefined) {
		return node.default;
	}
	if (node.enum && node.enum.length > 0) {
		return node.enum[0];
	}

	const type = resolveType(node);

	switch (type) {
		case "object": {
			const result: Record<string, unknown> = {};
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
};

const resolveType = (node: JsonSchemaNode): JsonSchemaPrimitiveType => {
	if (Array.isArray(node.type)) return node.type[0];
	if (node.type) return node.type;
	if (node.properties) return "object";
	if (node.items) return "array";
	return "string";
};

const hasStructure = (node: JsonSchemaNode): boolean =>
	Boolean(node.properties || node.items || node.enum || node.type);

const fakeString = (node: JsonSchemaNode): string => {
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
};

const fakeNumber = (node: JsonSchemaNode, integer: boolean): number => {
	const min = node.minimum ?? 0;
	const max = node.maximum ?? 1000;
	return integer
		? faker.number.int({ min, max })
		: faker.number.float({ min, max, fractionDigits: 2 });
};
