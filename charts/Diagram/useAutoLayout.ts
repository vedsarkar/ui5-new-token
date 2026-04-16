import dagre from "@dagrejs/dagre";
import {
	type Edge,
	type Node,
	useNodesInitialized,
	useReactFlow,
} from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import type { DiagramLayout } from "./Diagram.types";

const NODE_SPACING = 40;
const RANK_SPACING = 60;

const DAGRE_DIRECTION: Record<DiagramLayout, string> = {
	"top-to-bottom": "TB",
	"left-to-right": "LR",
};

function computeLayout(
	nodes: Node[],
	edges: Edge[],
	layout: DiagramLayout,
): Node[] {
	const g = new dagre.graphlib.Graph();
	g.setDefaultEdgeLabel(() => ({}));
	g.setGraph({
		rankdir: DAGRE_DIRECTION[layout],
		nodesep: NODE_SPACING,
		ranksep: RANK_SPACING,
	});

	for (const node of nodes) {
		g.setNode(node.id, {
			width: node.measured?.width ?? 150,
			height: node.measured?.height ?? 50,
		});
	}

	for (const edge of edges) {
		g.setEdge(edge.source, edge.target);
	}

	dagre.layout(g);

	return nodes.map((node) => {
		const pos = g.node(node.id);
		const w = node.measured?.width ?? 150;
		const h = node.measured?.height ?? 50;

		return {
			...node,
			position: {
				x: pos.x - w / 2,
				y: pos.y - h / 2,
			},
		};
	});
}

export function useAutoLayout(layout: DiagramLayout = "top-to-bottom"): {
	layoutReady: boolean;
} {
	const { getNodes, getEdges, setNodes, fitView } = useReactFlow();
	const nodesInitialized = useNodesInitialized();
	const [layoutReady, setLayoutReady] = useState(false);
	const layoutApplied = useRef(false);

	useEffect(() => {
		if (!nodesInitialized || layoutApplied.current) return;

		const nodes = getNodes();
		const edges = getEdges();
		if (nodes.length === 0) return;

		layoutApplied.current = true;

		const laid = computeLayout(nodes, edges, layout);
		setNodes(laid);

		requestAnimationFrame(() => {
			fitView({ padding: 0.15 });
			setLayoutReady(true);
		});
	}, [nodesInitialized, getNodes, getEdges, setNodes, fitView, layout]);

	return { layoutReady };
}
