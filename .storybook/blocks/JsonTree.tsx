import {
	type FocusEvent,
	Fragment,
	type MouseEvent,
	type ReactNode,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { classNames } from "@/utils/classNames";
import type { SchemaNode } from "../utils/openapi";
import styles from "./JsonTree.module.css";

type JsonTreeProps = {
	value: unknown;
	schema?: SchemaNode;
};

type TooltipInfo = {
	type?: string;
	description?: string;
	enumValues?: unknown[];
};

type TooltipState = (TooltipInfo & { x: number; y: number }) | null;

type HoverHandlers = {
	onEnter: (
		event: MouseEvent<HTMLSpanElement> | FocusEvent<HTMLSpanElement>,
		info: TooltipInfo,
	) => void;
	onLeave: () => void;
};

const INDENT = 2;
const pad = (n: number) => " ".repeat(n);

const describeType = (node: SchemaNode | undefined): string | undefined => {
	if (!node) return undefined;
	let base: string | undefined;
	if (Array.isArray(node.type)) base = node.type.join(" | ");
	else base = node.type;
	if (!base && node.enum) base = "enum";
	if (!base) return undefined;
	if (node.format) return `${base}<${node.format}>`;
	if (base === "array" && node.items?.type) {
		const itemsType = Array.isArray(node.items.type)
			? node.items.type.join("|")
			: node.items.type;
		return `array<${itemsType}>`;
	}
	return base;
};

const tooltipFromSchema = (
	node: SchemaNode | undefined,
): TooltipInfo | null => {
	if (!node) return null;
	const type = describeType(node);
	const description = node.description?.trim() || undefined;
	const enumValues = node.enum;
	if (!type && !description && !enumValues) return null;
	return { type, description, enumValues };
};

const renderPrimitive = (value: unknown): ReactNode => {
	if (value === null)
		return <span className={classNames(styles.null)}>null</span>;
	if (value === undefined)
		return <span className={classNames(styles.null)}>undefined</span>;
	if (typeof value === "boolean")
		return <span className={classNames(styles.boolean)}>{String(value)}</span>;
	if (typeof value === "number" || typeof value === "bigint")
		return <span className={classNames(styles.number)}>{String(value)}</span>;
	if (typeof value === "string")
		return (
			<span className={classNames(styles.string)}>{JSON.stringify(value)}</span>
		);
	return <span>{String(value)}</span>;
};

const renderValue = (
	value: unknown,
	schema: SchemaNode | undefined,
	indent: number,
	hover: HoverHandlers,
	keyPath: string,
): ReactNode => {
	if (Array.isArray(value)) {
		if (value.length === 0)
			return <span className={classNames(styles.punctuation)}>[]</span>;
		const childSchema = schema?.items;
		return (
			<>
				<span className={classNames(styles.punctuation)}>[</span>
				{"\n"}
				{value.map((item, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: array index is the only stable identity for an arbitrary JSON array
					<Fragment key={`${keyPath}[${i}]`}>
						{pad(indent + INDENT)}
						{renderValue(
							item,
							childSchema,
							indent + INDENT,
							hover,
							`${keyPath}[${i}]`,
						)}
						{i < value.length - 1 ? "," : ""}
						{"\n"}
					</Fragment>
				))}
				{pad(indent)}
				<span className={classNames(styles.punctuation)}>]</span>
			</>
		);
	}

	if (value !== null && typeof value === "object") {
		const entries = Object.entries(value as Record<string, unknown>);
		if (entries.length === 0)
			return <span className={classNames(styles.punctuation)}>{"{}"}</span>;
		return (
			<>
				<span className={classNames(styles.punctuation)}>{"{"}</span>
				{"\n"}
				{entries.map(([key, v], i) => {
					const propSchema = schema?.properties?.[key];
					const tooltip = tooltipFromSchema(propSchema);
					return (
						<Fragment key={`${keyPath}.${key}`}>
							{pad(indent + INDENT)}
							{/* biome-ignore lint/a11y/noStaticElementInteractions: span is a hover-only tooltip trigger; it has no click semantics and remains in the static document flow */}
							<span
								className={classNames(
									styles.key,
									tooltip && styles.keyHoverable,
								)}
								onMouseEnter={
									tooltip ? (e) => hover.onEnter(e, tooltip) : undefined
								}
								onMouseLeave={tooltip ? hover.onLeave : undefined}
								onFocus={tooltip ? (e) => hover.onEnter(e, tooltip) : undefined}
								onBlur={tooltip ? hover.onLeave : undefined}
								tabIndex={tooltip ? 0 : undefined}
							>
								{JSON.stringify(key)}
							</span>
							<span className={classNames(styles.punctuation)}>: </span>
							{renderValue(
								v,
								propSchema,
								indent + INDENT,
								hover,
								`${keyPath}.${key}`,
							)}
							{i < entries.length - 1 ? "," : ""}
							{"\n"}
						</Fragment>
					);
				})}
				{pad(indent)}
				<span className={classNames(styles.punctuation)}>{"}"}</span>
			</>
		);
	}

	return renderPrimitive(value);
};

const formatEnumValue = (value: unknown): string => {
	if (typeof value === "string") return value;
	return JSON.stringify(value);
};

/** Renders a JSON value as a syntax-highlighted tree. When a JSON Schema is provided, each property key shows a hover popover with `type` and `description` from the schema. */
export const JsonTree = ({ value, schema }: JsonTreeProps) => {
	const [tooltip, setTooltip] = useState<TooltipState>(null);

	const hover: HoverHandlers = {
		onEnter: (event, info) => {
			const rect = event.currentTarget.getBoundingClientRect();
			setTooltip({
				...info,
				x: rect.left,
				y: rect.bottom + 6,
			});
		},
		onLeave: () => setTooltip(null),
	};

	return (
		<div className={classNames(styles.root)}>
			{renderValue(value, schema, 0, hover, "$")}
			{tooltip &&
				typeof document !== "undefined" &&
				createPortal(
					<div
						className={classNames(styles.popover)}
						style={{ left: tooltip.x, top: tooltip.y }}
						role="tooltip"
					>
						{tooltip.type && (
							<span className={classNames(styles.popoverType)}>
								{tooltip.type}
							</span>
						)}
						{tooltip.description && (
							<p className={classNames(styles.popoverDescription)}>
								{tooltip.description}
							</p>
						)}
						{tooltip.enumValues && tooltip.enumValues.length > 0 && (
							<div className={classNames(styles.popoverEnum)}>
								<span className={classNames(styles.popoverEnumLabel)}>
									Allowed values:
								</span>
								{tooltip.enumValues.map((enumValue) => (
									<span
										key={String(enumValue)}
										className={classNames(styles.popoverEnumValue)}
									>
										{formatEnumValue(enumValue)}
									</span>
								))}
							</div>
						)}
					</div>,
					document.body,
				)}
		</div>
	);
};
