import type { ReactNode } from "react";
import type { HtmlProps } from "@/utils/types";

/**
 * One row of a `FileTree`.
 *
 * Nesting is expressed by `children`, and the presence of that key — not its
 * length — is what makes a node a folder: `children: []` is an expandable but
 * empty folder, while omitting the key entirely makes a leaf.
 */
export type FileTreeNode = {
	/** Identity used for selection and expansion. Must be unique across the whole tree. */
	id: string;
	/**
	 * Row label. Usually a string; any `ReactNode` works when the label is
	 * composite — an attribute's name beside its value, a highlighted search
	 * match. Long labels truncate with an ellipsis.
	 */
	name: ReactNode;
	/** Leading glyph, rendered in a 16×16 box. Any node works — a UI5 `<Icon>`, an `<img>`, an inline SVG. */
	icon?: ReactNode;
	/** Trailing content after the name — a count badge, a status tag, a timestamp. Sits inline, not right-aligned. */
	endContent?: ReactNode;
	/** Child rows, in display order. Present for a folder (even when empty), absent for a leaf. */
	children?: FileTreeNode[];
};

export type FileTreeProps = HtmlProps<
	"div",
	{
		/** Root rows, in display order. */
		items: FileTreeNode[];
		/** Id of the selected row. Supply this to control selection; the component then holds no shadow state. */
		selectedId?: string;
		/** Id of the row selected on first render, when selection is left uncontrolled. */
		defaultSelectedId?: string;
		/** Called with the node whose row was activated, by click or by `Enter`/`Space`. */
		onSelect?: (node: FileTreeNode) => void;
		/** Ids of the expanded folders. Supply this to control expansion. */
		expandedIds?: string[];
		/** Ids of the folders expanded on first render, when expansion is left uncontrolled. */
		defaultExpandedIds?: string[];
		/** Called with the next expanded-id set whenever a folder opens or closes. */
		onExpandedChange?: (expandedIds: string[]) => void;
	}
>;
