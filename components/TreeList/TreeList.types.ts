export type TreeKey = string | number;

export type TreeItem = {
	id: TreeKey;
	label: string;
	children?: TreeItem[];
};

export type FlattenRow = {
	id: TreeKey;
	node: TreeItem;
	depth: number;
	isLeaf: boolean;
	isExpanded: boolean;
	parentId?: TreeKey;
};

export type RcTreeNodeData<T> = {
	key: TreeKey;
	title: null;
	isLeaf?: boolean;
	data: { raw: T; depth: number; parentId?: TreeKey };
	children?: RcTreeNodeData<T>[];
};

export type TreeListProps = {
	data: TreeItem[];
	onItemClick: (item: TreeItem) => void;
};
