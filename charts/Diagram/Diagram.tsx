import {
	type Edge,
	type Node,
	type NodeTypes,
	ReactFlow,
	ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMemo } from "react";
import { classNames } from "@/utils/classNames";
import { MarkdownNode } from "./components/MarkdownNode/MarkdownNode";
import styles from "./Diagram.module.css";
import type { DiagramProps } from "./Diagram.types";
import { useAutoLayout } from "./useAutoLayout";

const BUILT_IN_NODE_TYPES: NodeTypes = {
	markdown: MarkdownNode,
};

const DiagramFlow = ({
	nodes,
	edges,
	layout = "top-to-bottom",
	nodeTypes: customNodeTypes,
	className,
	...rest
}: DiagramProps) => {
	const hasData = Array.isArray(nodes) && nodes.length > 0;

	const nodeTypes = useMemo<NodeTypes>(
		() => ({ ...BUILT_IN_NODE_TYPES, ...customNodeTypes }),
		[customNodeTypes],
	);

	const initialNodes = useMemo<Node[]>(
		() =>
			(nodes ?? []).map((n) => ({
				id: n.id,
				type: n.type ?? "markdown",
				position: { x: 0, y: 0 },
				data: {
					label: n.label,
					icon: n.icon,
					content: n.content,
					layout,
					...n.data,
				},
			})),
		[nodes, layout],
	);

	const initialEdges = useMemo<Edge[]>(
		() =>
			(edges ?? []).map((e, i) => ({
				id: `e-${e.source}-${e.target}-${i}`,
				source: e.source,
				target: e.target,
				label: e.label,
			})),
		[edges],
	);

	const { layoutReady } = useAutoLayout(layout);

	return (
		<div className={classNames(styles.root, className)} {...rest}>
			{hasData ? (
				<div
					className={classNames(styles.flow)}
					style={{ opacity: layoutReady ? 1 : 0 }}
				>
					<ReactFlow
						defaultNodes={initialNodes}
						defaultEdges={initialEdges}
						nodeTypes={nodeTypes}
						nodesDraggable={false}
						nodesConnectable={false}
						elementsSelectable={false}
						edgesFocusable={false}
						nodesFocusable={false}
						panOnDrag
						zoomOnScroll
						zoomOnPinch
						preventScrolling={false}
						proOptions={{ hideAttribution: true }}
						fitView
						fitViewOptions={{ duration: 0 }}
					/>
				</div>
			) : (
				<div className={classNames(styles.overlay)}>No data</div>
			)}
		</div>
	);
};

/** Hierarchical / pipeline-shaped node-edge diagram with auto-layout (xyflow + dagre) and Markdown-rendered node bodies. */
export const Diagram = (props: DiagramProps) => {
	const { nodes, edges, layout } = props;

	const dataKey = useMemo(() => {
		if (!nodes) return "empty";
		const nodeIds = nodes.map((n) => n.id).join(",");
		const edgeIds = (edges ?? [])
			.map((e) => `${e.source}-${e.target}`)
			.join(",");
		return `${nodeIds}|${edgeIds}|${layout}`;
	}, [nodes, edges, layout]);

	return (
		<ReactFlowProvider key={dataKey}>
			<DiagramFlow {...props} />
		</ReactFlowProvider>
	);
};
