// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=126132-18900
// source=components/Toast
// component=Toast
import figma from "figma";

const instance = figma.selectedInstance;

const message = instance.getString("✏️ Text");

// Type is omitted: it has a single value, Regular. `open` and `duration` are
// emitted because a Toast is transient and neither is expressible in Figma.
export default {
	example: figma.code`
<Toast open={open} duration={3000}>
	${message}
</Toast>`,
	imports: ['import { Toast } from "@reltio/design/components"'],
	id: "toast",
	metadata: { nestable: false },
};
