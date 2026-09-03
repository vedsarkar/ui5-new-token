// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=184013-1121
// source=components/TreeItem
// component=TreeItem
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("✏️ Text");
const selected = instance.getEnum("Selected", { False: false, True: true });
// Figma's Level 1 says whether the row is a root; in code that is nesting, so
// a non-root row is emitted inside its parent rather than flagged.
const nested = instance.getEnum("Level 1", { True: false, False: true });

const selectedProp = selected
	? figma.code`
	selected`
	: "";
const icon = figma.code`
	icon={icon}`;

// The row label is `content`, not `text`: the Reltio wrapper collapses UI5's
// TreeItem / TreeItemCustom split into one entity and drops `text` from its
// props, so a `text=` snippet would not typecheck.
//
// Omitted: Interaction State (UI5 derives hover and active from the DOM, and
// TreeItem has no disabled prop), Last Child (position in the parent, not a
// prop), and Form Factor.
export default {
	example: nested
		? figma.code`
<TreeItem
	content="${label}"${icon}${selectedProp}
/>`
		: figma.code`
<TreeItem
	content="${label}"${icon}${selectedProp}
	expanded
>
	{children}
</TreeItem>`,
	imports: ['import { TreeItem } from "@reltio/design/components"'],
	id: "tree-item",
	metadata: { nestable: true },
};
