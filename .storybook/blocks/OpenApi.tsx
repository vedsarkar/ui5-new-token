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

function hasStructure(node: SchemaNode): boolean {
	return Boolean(node.properties || node.items || node.enum);
}

function collectFields(
	node: SchemaNode,
	pathPrefix: string,
	depth: number,
): { path: string; node: SchemaNode; required: boolean }[] {
	if (depth > MAX_DEPTH) return [];
	const fields: { path: string; node: SchemaNode; required: boolean }[] = [];

	if (node.properties) {
		const requiredSet = new Set(node.required ?? []);
		for (const [key, child] of Object.entries(node.properties)) {
			const childPath = pathPrefix ? `${pathPrefix}.${key}` : key;
			fields.push({
				path: childPath,
				node: child,
				required: requiredSet.has(key),
			});
			if (child.properties) {
				fields.push(...collectFields(child, childPath, depth + 1));
			} else if (child.items && hasStructure(child.items)) {
				fields.push(...collectFields(child.items, `${childPath}[]`, depth + 1));
			}
		}
	} else if (node.items && hasStructure(node.items)) {
		fields.push(...collectFields(node.items, `${pathPrefix}[]`, depth + 1));
	}

	return fields;
}

const SchemaBlock = ({
	name,
	schema,
	spec,
}: {
	name: string;
	schema: SchemaNode;
	spec: OpenApiSpec;
}) => {
	const resolved = resolveSchema(spec, schema);
	const fields = collectFields(resolved, "", 0);

	return (
		<div>
			<h2>{resolved.title ?? name}</h2>
			{resolved.description && <p>{resolved.description}</p>}
			{fields.length > 0 && (
				<table className={classNames(styles.fieldsTable)}>
					<thead>
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{fields.map((f) => (
							<tr key={f.path}>
								<td>
									<code>{f.path}</code>
								</td>
								<td style={{ whiteSpace: "nowrap" }}>
									<code>{formatType(f.node)}</code>
								</td>
								<td>
									{f.required && <code>required</code>} {f.node.description}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

const InfoSection = ({ spec }: { spec: OpenApiSpec }) => (
	<div className={classNames(styles.info)}>
		<h1 className={classNames(styles.title)}>{spec.info.title}</h1>
		{spec.info.description && (
			<p className={classNames(styles.infoDescription)}>
				{spec.info.description}
			</p>
		)}
	</div>
);

const ServersSection = ({ spec }: { spec: OpenApiSpec }) => {
	if (!spec.servers?.length) return null;
	return (
		<section className={classNames(styles.section)}>
			<h3 className={classNames(styles.sectionTitle)}>Servers</h3>
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
			<h3 className={classNames(styles.sectionTitle)}>Data Models</h3>
			{Object.entries(schemas).map(([name, schema]) => (
				<SchemaBlock key={name} name={name} schema={schema} spec={spec} />
			))}
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
