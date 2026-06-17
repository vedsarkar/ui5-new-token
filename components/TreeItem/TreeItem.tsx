"use client";

import type { TreeItemDomRef } from "@ui5/webcomponents-react/TreeItem";
import { TreeItem as Ui5TreeItem } from "@ui5/webcomponents-react/TreeItem";
import type { TreeItemCustomDomRef } from "@ui5/webcomponents-react/TreeItemCustom";
import { TreeItemCustom as Ui5TreeItemCustom } from "@ui5/webcomponents-react/TreeItemCustom";
import type React from "react";
import { type ComponentPropsWithoutRef, forwardRef, type Ref } from "react";
import { Skeleton } from "@/components/Skeleton";
import type { TreeItemProps } from "./TreeItem.types";

const LOADING_ROW_COUNT = 3;

/** SAP Fiori tree node with a React `content` label and a `loading` state that renders skeleton placeholder rows while its children are fetched. */
export const TreeItem: React.ForwardRefExoticComponent<
	TreeItemProps & React.RefAttributes<TreeItemDomRef>
> = forwardRef<TreeItemDomRef, TreeItemProps>(
	({ content, loading, additionalText, children, ...rest }, ref) => {
		// A bare string label uses the typed UI5 `TreeItem` (keeps `additionalText`
		// and native truncation); rich content or the loading state needs the
		// `content` slot, which only `TreeItemCustom` provides.
		const needsCustomContent =
			loading || (content != null && typeof content !== "string");

		if (needsCustomContent) {
			// A named slot can't host a bare text node, so wrap strings in a span.
			const label =
				typeof content === "string" ? <span>{content}</span> : content;
			return (
				<Ui5TreeItemCustom
					ref={ref as unknown as Ref<TreeItemCustomDomRef>}
					{...(rest as unknown as ComponentPropsWithoutRef<
						typeof Ui5TreeItemCustom
					>)}
					content={
						label as ComponentPropsWithoutRef<
							typeof Ui5TreeItemCustom
						>["content"]
					}
				>
					{loading
						? Array.from({ length: LOADING_ROW_COUNT }, (_, index) => (
								<Ui5TreeItemCustom
									// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length static placeholder list
									key={index}
									type="Inactive"
									hideSelectionElement
									content={<Skeleton rows={1} />}
								/>
							))
						: children}
				</Ui5TreeItemCustom>
			);
		}

		return (
			<Ui5TreeItem
				ref={ref}
				{...rest}
				additionalText={additionalText}
				text={typeof content === "string" ? content : undefined}
			>
				{children}
			</Ui5TreeItem>
		);
	},
);

TreeItem.displayName = "TreeItem";
