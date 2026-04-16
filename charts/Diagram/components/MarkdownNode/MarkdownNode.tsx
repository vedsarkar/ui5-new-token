import { Handle, type NodeProps, Position } from "@xyflow/react";
import { Markdown } from "@/components/Markdown";
import { classNames } from "@/utils/classNames";
import type { DiagramLayout } from "../../Diagram.types";
import styles from "./MarkdownNode.module.css";

type MarkdownNodeData = {
	label?: string;
	icon?: string;
	content?: string;
	layout?: DiagramLayout;
	[key: string]: unknown;
};

export const MarkdownNode = ({ data }: NodeProps) => {
	const {
		label,
		icon,
		content,
		layout = "top-to-bottom",
	} = data as MarkdownNodeData;

	const isHorizontal = layout === "left-to-right";
	const targetPosition = isHorizontal ? Position.Left : Position.Top;
	const sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
	const hasContent = content !== undefined && content !== "";

	return (
		<div className={classNames(styles.node)}>
			<Handle
				type="target"
				position={targetPosition}
				className={classNames(styles.handle)}
			/>

			{label && (
				<div className={classNames(styles.header)}>
					{icon && <span className={classNames(styles.icon)}>{icon}</span>}
					<span className={classNames(styles.label)}>{label}</span>
				</div>
			)}

			{label && hasContent && <div className={classNames(styles.divider)} />}

			{hasContent && (
				<div className={classNames(styles.body)}>
					<Markdown>{content}</Markdown>
				</div>
			)}

			<Handle
				type="source"
				position={sourcePosition}
				className={classNames(styles.handle)}
			/>
		</div>
	);
};
