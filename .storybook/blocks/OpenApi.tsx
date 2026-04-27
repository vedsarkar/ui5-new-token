import { Markdown } from "@/components/Markdown";
import { classNames } from "@/utils/classNames";
import type { OpenApiSpec, SchemaNode } from "../utils/openapi";
import { resolveSchema } from "../utils/openapi";
import styles from "./OpenApi.module.css";

type OpenApiProps = {
	spec: OpenApiSpec;
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

function renderField(
	fieldPath: string,
	node: SchemaNode,
	required: boolean,
): string {
	const lines = [`### \`${fieldPath}\``];
	const meta: string[] = [];
	meta.push(
		`- **Type:** <span class="${styles.typeValue}">${formatType(node)}</span>`,
	);
	if (required) meta.push("- **Required**");
	if (node.default !== undefined)
		meta.push(`- **Default:** ${formatValue(node.default)}`);
	if (node.enum && node.enum.length > 0)
		meta.push(`- **Enum:** ${node.enum.map((v) => formatValue(v)).join(", ")}`);
	if (node.format) meta.push(`- **Format:** ${node.format}`);
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
			sections.push(renderField(childPath, child, required.has(key)));
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

function schemaToMarkdown(name: string, schema: SchemaNode): string {
	const sections: string[] = [];
	sections.push(`## ${schema.title ?? name}`);
	if (schema.description) sections.push(schema.description);
	walk(schema, "", sections, 0);
	return sections.join("\n\n");
}

const InfoSection = ({ spec }: { spec: OpenApiSpec }) => (
	<div className={classNames(styles.info)}>
		<h1 className={classNames(styles.title)}>{spec.info.title}</h1>
		{spec.info.description && (
			<div className={classNames(styles.infoDescription)}>
				<Markdown>{spec.info.description}</Markdown>
			</div>
		)}
	</div>
);

const ServersSection = ({ spec }: { spec: OpenApiSpec }) => {
	if (!spec.servers?.length) return null;
	return (
		<section className={classNames(styles.section)}>
			<h2 className={classNames(styles.sectionTitle)}>Servers</h2>
			{spec.servers.map((server) => (
				<div key={server.url} className={classNames(styles.server)}>
					<code className={classNames(styles.serverUrl)}>{server.url}</code>
					{server.variables && (
						<table className={classNames(styles.serverVarsTable)}>
							<thead>
								<tr>
									<th>Variable</th>
									<th>Default</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								{Object.entries(server.variables).map(([name, variable]) => (
									<tr key={name}>
										<td>
											<code>{`{${name}}`}</code>
										</td>
										<td>
											<code>{variable.default}</code>
										</td>
										<td>{variable.description}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			))}
		</section>
	);
};

const SchemasSection = ({ spec }: { spec: OpenApiSpec }) => {
	const schemas = spec.components?.schemas;
	if (!schemas || Object.keys(schemas).length === 0) return null;
	return (
		<section className={classNames(styles.section)}>
			<h2 className={classNames(styles.sectionTitle)}>Data Models</h2>
			{Object.entries(schemas).map(([name, schema]) => {
				const resolved = resolveSchema(spec, schema);
				const markdown = schemaToMarkdown(name, resolved);
				return <Markdown key={name}>{markdown}</Markdown>;
			})}
		</section>
	);
};

export const OpenApi = ({ spec }: OpenApiProps) => (
	<div className={classNames(styles.root)}>
		<InfoSection spec={spec} />
		<ServersSection spec={spec} />
		<SchemasSection spec={spec} />
	</div>
);
