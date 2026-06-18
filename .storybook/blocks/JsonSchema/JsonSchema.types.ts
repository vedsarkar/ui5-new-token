/** Minimal Draft 2020-12 JSON Schema shape that this block reads. We only
 * model the subset of keywords that the props pipeline produces — `type`,
 * `enum`, `default`, `deprecated`, `description`, `properties`, `required`,
 * plus the project-specific `x-typescriptType`, `x-functionSignature` and
 * `x-deprecationReason` extensions emitted by `scripts/buildJsonSchema.mjs`. */
export type JsonSchemaPropertyNode = {
	type?: string | string[];
	enum?: unknown[];
	default?: unknown;
	deprecated?: boolean;
	description?: string;
	"x-typescriptType"?: string;
	"x-functionSignature"?: string;
	"x-deprecationReason"?: string;
} & Record<`x-${string}`, unknown>;

export type JsonSchemaDocument = {
	$schema?: string;
	$id?: string;
	title?: string;
	type?: "object";
	properties?: Record<string, JsonSchemaPropertyNode>;
	required?: string[];
	"x-component"?: string;
};

export type JsonSchemaProps = {
	/** Parsed JSON Schema document to render. The block accepts the schema
	 * object directly (typically imported via `import schema from "./X.schema.json"`),
	 * not a fetch URL — the caller decides where the schema comes from. */
	schema: JsonSchemaDocument;
};
