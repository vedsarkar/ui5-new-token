import { useEffect, useState } from "react";
import { Markdown } from "@/components/Markdown";
import { Skeleton } from "@/components/Skeleton";

type JsonSchemaProps = {
	url: string;
};

type SchemaNode = {
	type?: string | string[];
	description?: string;
	properties?: Record<string, SchemaNode>;
	items?: SchemaNode;
	required?: string[];
	default?: unknown;
	enum?: unknown[];
	format?: string;
	pattern?: string;
	minimum?: number;
	maximum?: number;
	minLength?: number;
	maxLength?: number;
	readOnly?: boolean;
	title?: string;
	$id?: string;
	$schema?: string;
};

const MAX_DEPTH = 12;

function formatType(node: SchemaNode): string {
	const baseType = Array.isArray(node.type)
		? node.type.join(" | ")
		: (node.type ?? inferType(node));
	if (baseType === "array") {
		const itemType = node.items ? formatType(node.items) : "unknown";
		return `array<${itemType}>`;
	}
	return baseType;
}

function inferType(node: SchemaNode): string {
	if (node.properties) return "object";
	if (node.items) return "array";
	if (node.enum && node.enum.length > 0) return typeof node.enum[0];
	if (node.format || node.pattern) return "string";
	return "unknown";
}

function formatValue(value: unknown): string {
	if (typeof value === "string") return value;
	if (value === null) return "null";
	try {
		return JSON.stringify(value);
	} catch {
		return String(value);
	}
}

function hasStructure(node: SchemaNode): boolean {
	return Boolean(node.properties || node.items || node.enum);
}

function renderSection(
	fieldPath: string,
	node: SchemaNode,
	required: boolean,
): string {
	const lines = [`### \`${fieldPath}\``];
	const meta: string[] = [];
	meta.push(`- **Type:** \`${formatType(node)}\``);
	if (required) meta.push("- **Required**");
	if (node.default !== undefined)
		meta.push(`- **Default:** \`${formatValue(node.default)}\``);
	if (node.enum && node.enum.length > 0)
		meta.push(
			`- **Enum:** ${node.enum.map((v) => `\`${formatValue(v)}\``).join(", ")}`,
		);
	if (node.format) meta.push(`- **Format:** \`${node.format}\``);
	if (node.pattern) meta.push(`- **Pattern:** \`${node.pattern}\``);
	const range: string[] = [];
	if (node.minimum !== undefined) range.push(`min ${node.minimum}`);
	if (node.maximum !== undefined) range.push(`max ${node.maximum}`);
	if (node.minLength !== undefined) range.push(`minLength ${node.minLength}`);
	if (node.maxLength !== undefined) range.push(`maxLength ${node.maxLength}`);
	if (range.length > 0) meta.push(`- **Range:** ${range.join(", ")}`);
	if (node.readOnly) meta.push("- **Read-only**");

	if (meta.length > 0) {
		lines.push("");
		lines.push(...meta);
	}
	if (node.description) {
		lines.push("");
		lines.push(node.description);
	}
	return lines.join("\n");
}

function walk(
	node: SchemaNode,
	pathPrefix: string,
	sections: string[],
	depth: number,
): void {
	if (depth > MAX_DEPTH) return;
	if (node.properties) {
		const required = new Set(node.required ?? []);
		for (const [key, child] of Object.entries(node.properties)) {
			const childPath = pathPrefix ? `${pathPrefix}.${key}` : key;
			sections.push(renderSection(childPath, child, required.has(key)));
			if (child.properties) {
				walk(child, childPath, sections, depth + 1);
			} else if (child.items && hasStructure(child.items)) {
				walk(child.items, `${childPath}[]`, sections, depth + 1);
			}
		}
	} else if (node.items && hasStructure(node.items)) {
		walk(node.items, `${pathPrefix}[]`, sections, depth + 1);
	}
}

function schemaToMarkdown(schema: SchemaNode, schemaUrl: string): string {
	const sections: string[] = [];
	if (schema.title) sections.push(`# ${schema.title}`);
	if (schema.description) sections.push(schema.description);
	if (schemaUrl) sections.push(`## JSON Schema`);
	walk(schema, "", sections, 0);
	return sections.join("\n\n");
}

export const JsonSchema = ({ url }: JsonSchemaProps) => {
	const [markdown, setMarkdown] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		setMarkdown(null);
		setError(null);
		fetch(url)
			.then((res) => {
				if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
				return res.json();
			})
			.then((schema) => {
				if (!cancelled) {
					const schemaUrl = schema.$id || url;
					setMarkdown(schemaToMarkdown(schema, schemaUrl));
				}
			})
			.catch((e) => {
				if (!cancelled) setError(e instanceof Error ? e.message : String(e));
			});
		return () => {
			cancelled = true;
		};
	}, [url]);

	if (error) return <p>Failed to load schema: {error}</p>;
	if (markdown === null) return <Skeleton rows={12} />;
	return <Markdown>{markdown}</Markdown>;
};
