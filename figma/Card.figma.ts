// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=323770-4366
// source=components/Card
// component=Card
import figma from "figma";

const instance = figma.selectedInstance;

const hasHeader = instance.getBoolean("Main Header");
const interactiveHeader = instance.getEnum("▶️ Interactive Header", {
	True: true,
	False: false,
});
const content = instance.getInstanceSwap("Slot");

const contentCode =
	content && content.type === "INSTANCE"
		? content.executeTemplate().example
		: "";

// UI5's Card is a shell: everything the Figma booleans toggle lives in the
// `header` element or the children, not in props on the Card itself.
const header = hasHeader
	? figma.code`
	header={<CardHeader titleText={titleText}${interactiveHeader ? " interactive" : ""} />}`
	: "";

// Omitted, all being header or content composition rather than Card props:
// Extended Header, Numeric Header, Content Container, Footer, Media Block,
// the two Badges, Content/Footer Space, Header Container, and Form Factor.
export default {
	example: figma.code`
<Card${header}
>${contentCode}
</Card>`,
	imports: ['import { Card, CardHeader } from "@reltio/design/components"'],
	id: "card",
	metadata: { nestable: false },
};
