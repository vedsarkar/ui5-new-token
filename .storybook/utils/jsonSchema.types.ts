/**
 * Minimal JSON Schema (draft 2020-12) node shape used by the Storybook
 * API documentation utilities. Covers only the keywords actually consumed
 * by `schemaToMarkdown` and `fakeFromSchema` — extend as needed.
 */
export type JsonSchemaPrimitiveType =
	| "object"
	| "array"
	| "string"
	| "number"
	| "integer"
	| "boolean"
	| "null";

export type JsonSchemaNode = {
	$schema?: string;
	$id?: string;
	type?: JsonSchemaPrimitiveType | JsonSchemaPrimitiveType[];
	title?: string;
	description?: string;
	required?: string[];
	properties?: Record<string, JsonSchemaNode>;
	items?: JsonSchemaNode;
	enum?: unknown[];
	default?: unknown;
	examples?: unknown[];
	readOnly?: boolean;
	format?: string;
	minimum?: number;
	maximum?: number;
	minLength?: number;
	maxLength?: number;
	pattern?: string;
};
