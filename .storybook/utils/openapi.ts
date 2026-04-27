export type OpenApiSpec = {
	openapi: string;
	info: {
		title: string;
		version: string;
		description?: string;
	};
	servers?: OpenApiServer[];
	paths?: Record<string, Record<string, OpenApiOperation>>;
	components?: {
		schemas?: Record<string, SchemaNode>;
		securitySchemes?: Record<string, unknown>;
	};
};

export type OpenApiServer = {
	url: string;
	description?: string;
	variables?: Record<
		string,
		{ default: string; description?: string; enum?: string[] }
	>;
};

export type OpenApiOperation = {
	operationId?: string;
	summary?: string;
	description?: string;
	tags?: string[];
	requestBody?: {
		required?: boolean;
		content: Record<string, { schema: SchemaNode }>;
	};
	responses: Record<
		string,
		{
			description: string;
			content?: Record<string, { schema: SchemaNode }>;
		}
	>;
};

export type SchemaNode = {
	$ref?: string;
	type?: string | string[];
	properties?: Record<string, SchemaNode>;
	items?: SchemaNode;
	required?: string[];
	description?: string;
	readOnly?: boolean;
	enum?: unknown[];
	default?: unknown;
	examples?: unknown[];
	format?: string;
	pattern?: string;
	minimum?: number;
	maximum?: number;
	minLength?: number;
	maxLength?: number;
	title?: string;
	allOf?: SchemaNode[];
	oneOf?: SchemaNode[];
	anyOf?: SchemaNode[];
};

const MAX_RESOLVE_DEPTH = 20;

/**
 * Resolves a local `$ref` string (e.g. `"#/components/schemas/Foo"`)
 * by walking the spec object tree.
 */
export function resolveRef(spec: OpenApiSpec, ref: string): SchemaNode {
	if (!ref.startsWith("#/")) return {};
	const parts = ref.slice(2).split("/");
	let current: unknown = spec;
	for (const part of parts) {
		if (current == null || typeof current !== "object") return {};
		current = (current as Record<string, unknown>)[part];
	}
	return (current as SchemaNode) ?? {};
}

/**
 * Recursively resolves all `$ref` nodes in a schema tree.
 * Handles `allOf` (merge), `oneOf`/`anyOf` (pick first).
 * Cycle detection via a visited set of `$ref` strings.
 */
export function resolveSchema(
	spec: OpenApiSpec,
	node: SchemaNode,
	visited: Set<string> = new Set(),
	depth = 0,
): SchemaNode {
	if (depth > MAX_RESOLVE_DEPTH) return node;

	if (node.$ref) {
		if (visited.has(node.$ref))
			return { description: `[Circular: ${node.$ref}]` };
		visited.add(node.$ref);
		const target = resolveRef(spec, node.$ref);
		return resolveSchema(spec, target, visited, depth + 1);
	}

	if (node.allOf) {
		const merged = mergeAllOf(
			node.allOf.map((s) =>
				resolveSchema(spec, s, new Set(visited), depth + 1),
			),
		);
		return resolveSchema(spec, merged, visited, depth + 1);
	}

	if (node.oneOf?.length) {
		return resolveSchema(spec, node.oneOf[0], new Set(visited), depth + 1);
	}
	if (node.anyOf?.length) {
		return resolveSchema(spec, node.anyOf[0], new Set(visited), depth + 1);
	}

	const resolved: SchemaNode = { ...node };

	if (resolved.properties) {
		const props: Record<string, SchemaNode> = {};
		for (const [key, child] of Object.entries(resolved.properties)) {
			props[key] = resolveSchema(spec, child, new Set(visited), depth + 1);
		}
		resolved.properties = props;
	}

	if (resolved.items) {
		resolved.items = resolveSchema(
			spec,
			resolved.items,
			new Set(visited),
			depth + 1,
		);
	}

	return resolved;
}

function mergeAllOf(schemas: SchemaNode[]): SchemaNode {
	const merged: SchemaNode = {};
	for (const schema of schemas) {
		Object.assign(merged, schema);
		if (schema.properties) {
			merged.properties = { ...merged.properties, ...schema.properties };
		}
		if (schema.required) {
			merged.required = [
				...new Set([...(merged.required ?? []), ...schema.required]),
			];
		}
	}
	return merged;
}

/**
 * Extracts the response schema for a given path and method from the spec.
 * Defaults to status "200" and media type "application/json".
 */
export function getResponseSchema(
	spec: OpenApiSpec,
	path: string,
	method = "get",
	statusCode = "200",
): SchemaNode | null {
	const pathItem = spec.paths?.[path];
	if (!pathItem) return null;
	const operation = pathItem[method.toLowerCase()];
	if (!operation) return null;
	const response = operation.responses[statusCode];
	if (!response?.content) return null;
	const media = response.content["application/json"];
	return media?.schema ?? null;
}
