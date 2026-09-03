// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=23480-10811
// source=components/Label
// component=Label
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("✏️ Label");
const required = instance.getBoolean("Required");

const requiredProp = required
	? figma.code`
	required`
	: "";

// `for` is emitted because a Label only announces its field when associated
// with one, and Figma has no property for the relationship.
//
// Type is omitted: it has a single value, Regular, so there is nothing to vary.
export default {
	example: figma.code`
<Label
	for={htmlFor}${requiredProp}
>
	${label}
</Label>`,
	imports: ['import { Label } from "@reltio/design/components"'],
	id: "label",
	metadata: { nestable: true },
};
