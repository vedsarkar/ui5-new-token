import {
	type KeyboardEvent,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { classNames } from "@/utils/classNames";

import styles from "./FileTree.module.css";
import type { FileTreeNode, FileTreeProps } from "./FileTree.types";

type VisibleRow = {
	node: FileTreeNode;
	/** Ids of this row's ancestors, `ancestorIds[i]` being the one at depth i. */
	ancestorIds: string[];
	expandable: boolean;
	expanded: boolean;
};

const isExpandable = (node: FileTreeNode) => Array.isArray(node.children);

/** Rows in the order they appear on screen, skipping anything inside a collapsed folder. */
const flatten = (
	items: FileTreeNode[],
	expanded: Set<string>,
	ancestorIds: string[] = [],
	out: VisibleRow[] = [],
): VisibleRow[] => {
	for (const node of items) {
		const open = expanded.has(node.id);
		out.push({
			node,
			ancestorIds,
			expandable: isExpandable(node),
			expanded: open,
		});
		if (open && node.children?.length) {
			flatten(node.children, expanded, [...ancestorIds, node.id], out);
		}
	}
	return out;
};

/** Ids of a node's ancestors, used to decide which connector runs lead to it. */
const ancestorsOf = (
	items: FileTreeNode[],
	targetId: string | undefined,
	chain: string[] = [],
): string[] | undefined => {
	if (targetId === undefined) {
		return undefined;
	}
	for (const node of items) {
		if (node.id === targetId) {
			return chain;
		}
		if (node.children) {
			const hit = ancestorsOf(node.children, targetId, [...chain, node.id]);
			if (hit) {
				return hit;
			}
		}
	}
	return undefined;
};

/** Renders a hierarchy as a file tree, tracing the selected row's ancestry through its connectors. */
export const FileTree = ({
	items,
	selectedId,
	defaultSelectedId,
	onSelect,
	expandedIds,
	defaultExpandedIds,
	onExpandedChange,
	className,
	...rest
}: FileTreeProps) => {
	const [selectedUncontrolled, setSelectedUncontrolled] =
		useState(defaultSelectedId);
	const [expandedUncontrolled, setExpandedUncontrolled] = useState<string[]>(
		defaultExpandedIds ?? [],
	);
	const [focusedId, setFocusedId] = useState<string>();
	const rowRefs = useRef(new Map<string, HTMLLIElement>());

	const selected = selectedId ?? selectedUncontrolled;
	const expanded = useMemo(
		() => new Set(expandedIds ?? expandedUncontrolled),
		[expandedIds, expandedUncontrolled],
	);

	const rows = useMemo(() => flatten(items, expanded), [items, expanded]);
	const indexById = useMemo(
		() => new Map(rows.map((row, index) => [row.node.id, index])),
		[rows],
	);
	const selectedIndex =
		selected === undefined ? -1 : (indexById.get(selected) ?? -1);
	const selectedAncestors = useMemo(
		() => new Set(ancestorsOf(items, selected) ?? []),
		[items, selected],
	);

	// One tab stop, derived rather than stored: the focused row while it is
	// still visible, else the selected row, else the first. Deriving it means
	// collapsing a folder cannot strand the tab stop on a hidden row.
	const tabStopId =
		(focusedId !== undefined && indexById.has(focusedId)
			? focusedId
			: undefined) ??
		(selected !== undefined && indexById.has(selected)
			? selected
			: undefined) ??
		rows[0]?.node.id;

	const setExpanded = useCallback(
		(next: string[]) => {
			if (expandedIds === undefined) {
				setExpandedUncontrolled(next);
			}
			onExpandedChange?.(next);
		},
		[expandedIds, onExpandedChange],
	);

	const toggle = useCallback(
		(id: string, open: boolean) => {
			const current = expandedIds ?? expandedUncontrolled;
			setExpanded(
				open
					? [...current.filter((entry) => entry !== id), id]
					: current.filter((entry) => entry !== id),
			);
		},
		[expandedIds, expandedUncontrolled, setExpanded],
	);

	const focusRow = useCallback((id: string | undefined) => {
		if (id === undefined) {
			return;
		}
		setFocusedId(id);
		rowRefs.current.get(id)?.focus();
	}, []);

	const activate = useCallback(
		(row: VisibleRow) => {
			if (selectedId === undefined) {
				setSelectedUncontrolled(row.node.id);
			}
			focusRow(row.node.id);
			onSelect?.(row.node);
			if (row.expandable) {
				toggle(row.node.id, !row.expanded);
			}
		},
		[focusRow, onSelect, selectedId, toggle],
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLLIElement>, row: VisibleRow) => {
			const index = indexById.get(row.node.id) ?? 0;
			// Rows nest, so without this every ancestor row would also run the
			// handler as the event bubbles — one ArrowLeft would collapse the
			// whole chain instead of just this row's folder.
			event.stopPropagation();
			switch (event.key) {
				case "ArrowDown":
					event.preventDefault();
					focusRow(rows[index + 1]?.node.id);
					break;
				case "ArrowUp":
					event.preventDefault();
					focusRow(rows[index - 1]?.node.id);
					break;
				case "ArrowRight":
					event.preventDefault();
					if (row.expandable && !row.expanded) {
						toggle(row.node.id, true);
					} else if (row.expanded) {
						focusRow(rows[index + 1]?.node.id);
					}
					break;
				case "ArrowLeft":
					event.preventDefault();
					if (row.expandable && row.expanded) {
						toggle(row.node.id, false);
					} else {
						focusRow(row.ancestorIds.at(-1));
					}
					break;
				case "Home":
					event.preventDefault();
					focusRow(rows[0]?.node.id);
					break;
				case "End":
					event.preventDefault();
					focusRow(rows.at(-1)?.node.id);
					break;
				case "Enter":
				case " ":
					event.preventDefault();
					activate(row);
					break;
				default:
					break;
			}
		},
		[activate, focusRow, indexById, rows, toggle],
	);

	/**
	 * `guides[i]` says whether the ancestor at depth `i + 1` has a later sibling,
	 * so its run keeps going past this row. Roots contribute no column, which is
	 * why the array starts empty one level down rather than at the root itself.
	 */
	const renderLevel = (
		levelItems: FileTreeNode[],
		ancestorIds: string[],
		guides: boolean[],
	) => {
		const depth = ancestorIds.length;
		return (
			<ul
				className={classNames(styles.group)}
				role={depth === 0 ? undefined : "group"}
			>
				{levelItems.map((node, position) => {
					const hasLaterSibling = position < levelItems.length - 1;
					const open = expanded.has(node.id);
					const expandable = isExpandable(node);
					const isSelected = node.id === selected;
					const row: VisibleRow = {
						node,
						ancestorIds,
						expandable,
						expanded: open,
					};
					// The selected row sits below this one, so any run heading
					// down toward it is on the highlighted path.
					const selectionBelow = selectedIndex > (indexById.get(node.id) ?? -1);

					// One cell per level of depth: the ancestor runs, then this
					// row's own fork or turn.
					const cells = [...guides, hasLaterSibling].map(
						(runContinues, cell) => {
							// Cells run 0..depth-1, so the last one is this row's own.
							const own = cell === depth - 1;
							// A cell's vertical is the child run of the node one level
							// above it, so a run leading to the selection is exactly
							// one whose owner is an ancestor of the selected row.
							const owner = ancestorIds[cell];
							// A turn on the selected row is the last segment of the
							// path, so it highlights whole. A fork cannot: its
							// vertical carries on to later siblings that are not on
							// the path, which is the design's Semi-Selected.
							const lineOnPath =
								(own && !runContinues && isSelected) ||
								(selectionBelow &&
									owner !== undefined &&
									selectedAncestors.has(owner));
							return (
								<span
									aria-hidden="true"
									className={classNames(styles.connector)}
									key={`${node.id}-connector-${cell}`}
								>
									{own || runContinues ? (
										<span
											className={classNames(
												styles.line,
												own && !runContinues
													? styles.lineHalf
													: styles.lineFull,
												lineOnPath && styles.onPath,
											)}
										/>
									) : null}
									{own ? (
										<span
											className={classNames(
												styles.elbow,
												isSelected && styles.onPath,
											)}
										/>
									) : null}
								</span>
							);
						},
					);

					return (
						<li
							aria-expanded={expandable ? open : undefined}
							aria-level={depth + 1}
							aria-selected={isSelected}
							className={classNames(styles.item)}
							key={node.id}
							// Stopping propagation keeps a click on a nested row from
							// also activating every ancestor it bubbles through.
							onClick={(event) => {
								event.stopPropagation();
								activate(row);
							}}
							onKeyDown={(event) => handleKeyDown(event, row)}
							ref={(element) => {
								if (element) {
									rowRefs.current.set(node.id, element);
								} else {
									rowRefs.current.delete(node.id);
								}
							}}
							role="treeitem"
							tabIndex={node.id === tabStopId ? 0 : -1}
						>
							{/* The visual row. Purely presentational — the li above
							    owns focus, ARIA state and the handlers. */}
							<div
								className={classNames(
									styles.row,
									isSelected && styles.selected,
								)}
							>
								{depth === 0 ? null : cells}
								{node.icon ? (
									<span aria-hidden="true" className={classNames(styles.icon)}>
										{node.icon}
									</span>
								) : null}
								<span className={classNames(styles.name)}>{node.name}</span>
								{node.endContent ? (
									<span className={classNames(styles.endContent)}>
										{node.endContent}
									</span>
								) : null}
							</div>
							{open && node.children?.length
								? renderLevel(
										node.children,
										[...ancestorIds, node.id],
										depth === 0 ? [] : [...guides, hasLaterSibling],
									)
								: null}
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<div className={classNames(styles.root, className)} role="tree" {...rest}>
			{renderLevel(items, [], [])}
		</div>
	);
};
