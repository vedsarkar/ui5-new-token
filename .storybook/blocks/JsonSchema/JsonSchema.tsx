import { HeaderMdx, Markdown } from "@storybook/addon-docs/blocks";
import type { ReactNode } from "react";
import styles from "./JsonSchema.module.css";
import type {
	JsonSchemaPropertyNode,
	JsonSchemaProps,
} from "./JsonSchema.types";

/** Render a single value as a compact, code-styled string. */
const renderValue = (value: unknown): string => {
	if (typeof value === "string") return JSON.stringify(value);
	if (value === null) return "null";
	try {
		return JSON.stringify(value);
	} catch {
		return String(value);
	}
};

/** Pick the most informative type string available on a property node:
 * the original TypeScript type when present (richest, includes generics
 * and named aliases), then function signatures, then the JSON Schema
 * `type` keyword. */
const renderType = (node: JsonSchemaPropertyNode): string => {
	if (node["x-typescriptType"]) return node["x-typescriptType"];
	if (node["x-functionSignature"]) return node["x-functionSignature"];
	if (Array.isArray(node.type)) return node.type.join(" | ");
	if (node.type) return node.type;
	return "unknown";
};

/** Build the ordered list of metadata rows shown for a property. Each
 * entry becomes one row in the per-property 2-column table. We always
 * emit Description and Type (when available); other rows are conditional
 * so cells stay information-dense. The order is fixed so identical
 * facts always appear at the same vertical position across properties. */
const buildRows = (
	node: JsonSchemaPropertyNode,
	required: boolean,
): Array<{ key: string; label: string; value: ReactNode }> => {
	const rows: Array<{ key: string; label: string; value: ReactNode }> = [];

	if (node.description) {
		rows.push({
			key: "description",
			label: "Description",
			value: <Markdown>{node.description}</Markdown>,
		});
	}

	rows.push({
		key: "type",
		label: "Type",
		value: <code className={styles.typeCell}>{renderType(node)}</code>,
	});

	if (node.enum && node.enum.length > 0) {
		rows.push({
			key: "enum",
			label: "Allowed values",
			value: (
				<ul>
					{node.enum.map((value, index) => (
						<li
							/* biome-ignore lint/suspicious/noArrayIndexKey: enum
							 * values may legitimately repeat literals across
							 * schemas; index is stable here because the array
							 * source is read-only */
							key={index}
						>
							<code>{renderValue(value)}</code>
						</li>
					))}
				</ul>
			),
		});
	}

	if (node.default !== undefined) {
		rows.push({
			key: "default",
			label: "Default",
			value: (
				<p>
					<code>{renderValue(node.default)}</code>
				</p>
			),
		});
	}

	if (required) {
		rows.push({
			key: "required",
			label: "Required",
			value: <p>Yes</p>,
		});
	}

	if (node.deprecated) {
		const reason = node["x-deprecationReason"];
		rows.push({
			key: "deprecated",
			label: "Deprecated",
			value: <p>{reason ?? "Yes"}</p>,
		});
	}

	const since = node["x-since"];
	if (typeof since === "string" && since.length > 0) {
		rows.push({
			key: "since",
			label: "Since",
			value: (
				<p>
					<code>{since}</code>
				</p>
			),
		});
	}

	return rows;
};

/** Renders a JSON Schema's `properties` map as a flat list of per-prop
 * sections, each containing a 2-column metadata table (label / value).
 * Mirrors the per-property layout used in the official UI5 Web Components
 * docs — easier to scan than a single wide table when individual props
 * have long type unions or multi-paragraph descriptions.
 *
 * Almost all visual styling comes from Storybook's docs theme. Each
 * property heading uses Storybook's own `<HeaderMdx as="h3">` so it
 * picks up the same Octicon-style hover anchor link Storybook attaches
 * to MDX headings — clickable for permalinks (`#prop-${name}`). All
 * other elements (`<table>`, `<th>`, `<td>`, `<p>`, `<ul>`, `<li>`, and
 * `<p>/<li> code`) are styled globally inside `.sbdocs-content`. The
 * local stylesheet only adds the minimum overrides — most importantly,
 * wrapping long TypeScript types in the type cell, since Storybook's
 * default `code` uses `white-space: nowrap`. */
export const JsonSchema = ({ schema }: JsonSchemaProps) => {
	const properties = schema.properties ?? {};
	const requiredSet = new Set(schema.required ?? []);
	const propEntries = Object.entries(properties).sort(([a], [b]) => {
		const aRequired = requiredSet.has(a);
		const bRequired = requiredSet.has(b);
		if (aRequired !== bRequired) return aRequired ? -1 : 1;
		return a.localeCompare(b);
	});

	if (propEntries.length === 0) {
		return (
			<p>
				<em>No public props.</em>
			</p>
		);
	}

	return (
		<div className={styles.propertyList}>
			{propEntries.map(([name, node]) => {
				const required = requiredSet.has(name);
				const rows = buildRows(node, required);
				return (
					<section key={name} className={styles.propertySection}>
						<HeaderMdx as="h3" id={`prop-${name}`}>
							{name}
						</HeaderMdx>
						<table>
							<tbody>
								{rows.map((row) => (
									<tr key={row.key}>
										<th scope="row" className={styles.labelCell}>
											{row.label}
										</th>
										<td>{row.value}</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
				);
			})}
		</div>
	);
};
