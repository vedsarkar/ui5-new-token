import type { RcTreeNodeData, TreeItem, TreeKey } from "./TreeList.types";

export function getLevelLinesData<T>(
	treeData: ReadonlyArray<RcTreeNodeData<T>>,
): Record<TreeKey, [boolean[], boolean]> {
	const acc: Record<TreeKey, [boolean[], boolean]> = {};

	const traverse = (
		nodes: ReadonlyArray<RcTreeNodeData<T>>,
		prefix: boolean[] = [],
	): void => {
		for (let index = 0; index < nodes.length; index++) {
			const node = nodes[index];
			const isLast = index === nodes.length - 1;
			acc[node.key] = [prefix, isLast];
			if (node.children?.length) {
				traverse(node.children, [...prefix, !isLast]);
			}
		}
	};

	traverse(treeData);
	return acc;
}

export function transformTreeData(
	data: TreeItem[],
	depth = 1,
	parentId?: TreeKey,
): RcTreeNodeData<TreeItem>[] {
	return data.map((item) => ({
		key: item.id,
		title: null,
		isLeaf: !item.children?.length,
		data: { raw: item, depth, parentId },
		children: item.children
			? transformTreeData(item.children, depth + 1, item.id)
			: undefined,
	}));
}
