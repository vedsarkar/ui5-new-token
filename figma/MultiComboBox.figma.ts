// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=212722-56058
// source=components/MultiComboBox
// component=MultiComboBox
import figma from "figma";

const instance = figma.selectedInstance;

const open = instance.getEnum("Drop-Down", { True: true, False: false });

const openProp = open
	? figma.code`
	open`
	: "";

// "Show all" Footer is omitted — UI5 has `showSelectAll`, but that is a
// select-all checkbox in the list, not the overflow footer the design shows.
// Form Factor is content density, set on an ancestor.
export default {
	example: figma.code`
<MultiComboBox
	onSelectionChange={onSelectionChange}${openProp}
>
	<MultiComboBoxItem text={text} />
</MultiComboBox>`,
	imports: [
		'import { MultiComboBox, MultiComboBoxItem } from "@reltio/design/components"',
	],
	id: "multi-combo-box",
	metadata: { nestable: false },
};
