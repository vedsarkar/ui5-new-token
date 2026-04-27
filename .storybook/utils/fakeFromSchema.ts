import { faker } from "@faker-js/faker";
import {
	getResponseSchema,
	type OpenApiSpec,
	resolveSchema,
	type SchemaNode,
} from "./openapi";

const schemaCache = new Map<string, Record<string, unknown>>();

/**
 * Fetches a JSON Schema from the given URL and generates a deterministic
 * fake JSON value that conforms to it.
 *
 * Accepts relative (`/schemas/metadata.json`) or absolute URLs.
 * Fetched schemas are cached in memory — subsequent calls with the same
 * URL resolve instantly without a network request.
 *
 * Resolution order for each schema field:
 *   1. `examples[0]` if present
 *   2. `default` if present
 *   3. `enum[0]` if present
 *   4. faker-generated value based on `type`
 *
 * Empty `items: {}` arrays are emitted as `[]` (no shape information).
 * `omitReadOnly: true` strips `readOnly: true` fields — useful for request bodies.
 */
export async function fakeFromSchema(
	url: string,
	options: { seed?: number; omitReadOnly?: boolean } = {},
): Promise<unknown> {
	const { seed = 42, omitReadOnly = false } = options;

	let schema = schemaCache.get(url);
	if (!schema) {
		const res = await fetch(url);
		if (!res.ok)
			throw new Error(`Schema fetch failed: ${url} — HTTP ${res.status}`);
		schema = (await res.json()) as Record<string, unknown>;
		schemaCache.set(url, schema);
	}

	faker.seed(seed);
	return generate(schema, omitReadOnly);
}

export function generate(
	node: Record<string, unknown>,
	omitReadOnly: boolean,
): unknown {
	const examples = node.examples as unknown[] | undefined;
	if (examples && examples.length > 0) return examples[0];
	if (node.default !== undefined) return node.default;
	const enumValues = node.enum as unknown[] | undefined;
	if (enumValues && enumValues.length > 0) return enumValues[0];

	const type = resolveType(node);

	switch (type) {
		case "object": {
			const result: Record<string, unknown> = {};
			const properties = node.properties as
				| Record<string, Record<string, unknown>>
				| undefined;
			if (!properties) return result;
			for (const [key, child] of Object.entries(properties)) {
				if (omitReadOnly && child.readOnly) continue;
				result[key] = generate(child, omitReadOnly);
			}
			return result;
		}
		case "array": {
			const items = node.items as Record<string, unknown> | undefined;
			if (!items || !hasStructure(items)) return [];
			return [generate(items, omitReadOnly)];
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

function resolveType(node: Record<string, unknown>): string {
	if (Array.isArray(node.type)) return node.type[0];
	if (node.type) return node.type as string;
	if (node.properties) return "object";
	if (node.items) return "array";
	return "string";
}

function hasStructure(node: Record<string, unknown>): boolean {
	return Boolean(node.properties || node.items || node.enum || node.type);
}

function fakeString(node: Record<string, unknown>): string {
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

function fakeNumber(node: Record<string, unknown>, integer: boolean): number {
	const min = (node.minimum as number) ?? 0;
	const max = (node.maximum as number) ?? 1000;
	return integer
		? faker.number.int({ min, max })
		: faker.number.float({ min, max, fractionDigits: 2 });
}

/**
 * Generates deterministic fake JSON from an OpenAPI spec object.
 *
 * Extracts the response schema for the given `path` + `method` (defaults to
 * GET 200), resolves all `$ref` nodes, then feeds the resolved schema to
 * `generate()`. Falls back to the first schema in `components.schemas`
 * when `path` is omitted or not found in the spec.
 */
export function fakeFromOpenApi(
	spec: OpenApiSpec,
	options: {
		path?: string;
		method?: string;
		statusCode?: string;
		seed?: number;
		omitReadOnly?: boolean;
	} = {},
): unknown {
	const {
		path,
		method = "get",
		statusCode = "200",
		seed = 42,
		omitReadOnly = false,
	} = options;

	let schema: SchemaNode | null = null;

	if (path) {
		schema = getResponseSchema(spec, path, method, statusCode);
	}

	if (!schema && spec.components?.schemas) {
		const firstKey = Object.keys(spec.components.schemas)[0];
		if (firstKey) schema = spec.components.schemas[firstKey];
	}

	if (!schema) return {};

	const resolved = resolveSchema(spec, schema);

	faker.seed(seed);
	return generate(resolved as Record<string, unknown>, omitReadOnly);
}
