import type { TreeItem } from "@ui5/webcomponents-react/TreeItem";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Reltio-endorsed tree node — the single node entity for `Tree`.
 *
 * A thin wrapper over SAP Fiori that collapses UI5's `TreeItem` /
 * `TreeItemCustom` split into one entity. The row label is `content`
 * (`ReactNode`): a plain string renders as a standard tree-item label (and
 * supports `additionalText`), while rich content (a `Skeleton`, custom layout,
 * controls) renders through the underlying custom-content slot. Nest child
 * `TreeItem`s via `children` for the hierarchy. See README for the rationale.
 */
export type TreeItemProps = Omit<
	ComponentPropsWithoutRef<typeof TreeItem>,
	// `content` is dropped because React's `HTMLAttributes` declares a global
	// `content?: string` that would otherwise intersect with our `ReactNode`.
	"text" | "content"
> & {
	/**
	 * The node's row label. A plain string renders as a standard label; any
	 * other `ReactNode` (rich layout, controls) renders through a custom-content
	 * slot. Nested tree nodes go in `children`, not here.
	 */
	content?: ReactNode;

	/**
	 * When `true`, the node renders three non-interactive skeleton placeholder
	 * rows as its children — the standard lazy-loading affordance while the real
	 * children are being fetched. Reveal them by keeping the node `expanded`
	 * (typically set in your `Tree`'s `onItemToggle` handler); any `children` you
	 * pass are ignored until `loading` returns to `false`.
	 * @default false
	 */
	loading?: boolean;
};
