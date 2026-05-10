/**
 * Convert a list of resolved TypeScript props (the output of
 * `extractTypeApi.mjs#extractProps`) into a JSON Schema document.
 *
 * The mapping is intentionally **lossy and pragmatic**: we capture what JSON
 * Schema can express natively (primitive types, string-literal enums,
 * default values, deprecated/required markers, descriptions) and stash
 * everything else (function signatures, complex unions, references to named
 * types like `ReactNode` or `ButtonAccessibilityAttributes`) under
 * `x-*` extension keywords. Consumers that don't recognise the extensions
 * still see a valid Draft 2020-12 schema; consumers that do can recover the
 * full TypeScript intent.
 *
 * Why not delegate to `ts-json-schema-generator`?
 *   - It does not parse `import("react").ForwardRefExoticComponent<...>`,
 *     which UI5 React (and most generated `.d.ts` files) use ubiquitously.
 *   - Even when bypassed via the internal `ButtonPropTypes` interface, it
 *     fails on synthesised React types like `Promise<AwaitedReactNode>`.
 *   - Authoring custom parsers/formatters for every React quirk is a
 *     larger surface area than mapping our own already-resolved type
 *     strings here.
 */

const STRING_LITERAL_UNION_REGEX = /^'[^']*'(\s*\|\s*'[^']*')*$/;

const isStringLiteralUnion = (typeString) =>
	STRING_LITERAL_UNION_REGEX.test(typeString.trim());

const parseStringLiteralUnion = (typeString) =>
	typeString
		.trim()
		.split("|")
		.map((part) => part.trim().replace(/^'(.*)'$/, "$1"));

const isFunctionType = (typeString) =>
	/=>/.test(typeString) || /^\(.*\) *=>/.test(typeString);

const isArrayType = (typeString) =>
	/^Array<.+>$/.test(typeString.trim()) || /^.+\[\]$/.test(typeString.trim());

/** Best-effort conversion of a `@default` JSDoc tag value (always a string)
 * into a real JSON value. Strings like `"Default"` and numbers like `1000`
 * become typed JSON; anything else stays as a string for fidelity. */
const tryParseDefault = (raw) => {
	if (raw === undefined || raw === null) return undefined;
	const trimmed = String(raw).trim();
	if (trimmed === "") return undefined;
	if (trimmed === "undefined") return undefined;
	if (trimmed === "null") return null;
	if (trimmed === "true") return true;
	if (trimmed === "false") return false;
	if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
	const stringMatch = trimmed.match(/^["'](.*)["']$/);
	if (stringMatch) return stringMatch[1];
	if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
		try {
			return JSON.parse(trimmed);
		} catch {
			/* fall through */
		}
	}
	return trimmed;
};

/** Map a single resolved-prop entry to its JSON Schema representation. */
export const propToJsonSchemaProperty = (prop) => {
	const schema = {};

	if (prop.description) schema.description = prop.description;

	const defaultValue = tryParseDefault(prop.defaultValue);
	if (defaultValue !== undefined) schema.default = defaultValue;

	if (prop.deprecated) {
		schema.deprecated = true;
		if (typeof prop.deprecated === "string") {
			schema["x-deprecationReason"] = prop.deprecated;
		}
	}

	for (const [key, value] of Object.entries(prop.tags ?? {})) {
		schema[`x-${key}`] = value;
	}

	const tsType = prop.type.trim();
	schema["x-typescriptType"] = tsType;

	switch (tsType) {
		case "string":
			schema.type = "string";
			break;
		case "number":
			schema.type = "number";
			break;
		case "boolean":
			schema.type = "boolean";
			break;
		case "any":
		case "unknown":
			break;
		case "null":
			schema.type = "null";
			break;
		default:
			if (isStringLiteralUnion(tsType)) {
				schema.type = "string";
				schema.enum = parseStringLiteralUnion(tsType);
			} else if (isFunctionType(tsType)) {
				schema["x-functionSignature"] = tsType;
			} else if (isArrayType(tsType)) {
				schema.type = "array";
			}
			break;
	}

	return schema;
};

/** Build a top-level JSON Schema document for an entire component's props. */
export const buildComponentJsonSchema = ({
	componentName,
	exportedTypeName,
	props,
	schemaId,
}) => {
	const required = props.filter((p) => p.required).map((p) => p.name);
	const properties = Object.fromEntries(
		props.map((p) => [p.name, propToJsonSchemaProperty(p)]),
	);

	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		title: exportedTypeName,
		"x-component": componentName,
		type: "object",
		properties,
	};

	if (schemaId) schema.$id = schemaId;
	if (required.length > 0) schema.required = required;

	return schema;
};
