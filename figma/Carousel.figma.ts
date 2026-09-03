// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=24267-10388
// source=components/Carousel
// component=Carousel
import figma from "figma";

const instance = figma.selectedInstance;

// UI5 calls this `arrowsPlacement`: the navigation arrows either sit over the
// content or down in the indicator bar.
const arrowsPlacement = instance.getEnum("Buttons Position", {
	"On Bar": "Navigation",
	"On Image": "Content",
});
const hidePageIndicator = instance.getBoolean("Indicator Bar");
const multiple = instance.getBoolean("Multiple Items");

const placement =
	arrowsPlacement === "Content"
		? ""
		: figma.code`
	arrowsPlacement="${arrowsPlacement}"`;
const indicator = hidePageIndicator
	? ""
	: figma.code`
	hidePageIndicator`;
const itemsPerPage = multiple
	? figma.code`
	itemsPerPage={itemsPerPage}`
	: "";

// Omitted: Indicator Position (UI5 always places the bar below), Indicator
// Buttons and On Content (both are indicator styling with no prop).
export default {
	example: figma.code`
<Carousel${placement}${indicator}${itemsPerPage}
>
	{children}
</Carousel>`,
	imports: ['import { Carousel } from "@reltio/design/components"'],
	id: "carousel",
	metadata: { nestable: false },
};
