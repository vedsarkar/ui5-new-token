import type { HtmlProps } from "@/utils/types";

/**
 * SAP Fiori Button design variants.
 *
 * @see https://experience.sap.com/fiori-design-web/button/
 */
export type ButtonDesign =
	| "default"
	| "emphasized"
	| "ghost"
	| "transparent"
	| "positive"
	| "negative"
	| "attention";

/**
 * Base button props shared between button and anchor renderings
 */
type BaseButtonProps = {
	/**
	 * SAP Fiori design variant
	 * @default "default"
	 */
	design?: ButtonDesign;

	/**
	 * Whether the button is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether the button should take full width of container
	 * @default false
	 */
	fullWidth?: boolean;
};

/**
 * Button props when rendered as button element (no href)
 */
type ButtonElementProps = HtmlProps<
	"button",
	BaseButtonProps & {
		/**
		 * If href is provided, component renders as anchor element
		 * If href is not provided, component renders as button element
		 */
		href?: never;

		/**
		 * Button type (only applicable when rendered as button)
		 * @default "button"
		 */
		type?: "button" | "submit" | "reset";
	}
>;

/**
 * Anchor props when rendered as anchor element (with href)
 */
type AnchorElementProps = HtmlProps<
	"a",
	BaseButtonProps & {
		/**
		 * URL to navigate to (causes component to render as anchor)
		 */
		href: string;

		/**
		 * Button type is not applicable for anchor elements
		 */
		type?: never;

		/**
		 * Target attribute for anchor (e.g., "_blank")
		 */
		target?: string;

		/**
		 * Rel attribute for anchor (e.g., "noopener noreferrer")
		 */
		rel?: string;
	}
>;

/**
 * Union type for Button component props
 * Component can be either a button or an anchor based on href prop
 */
export type ButtonProps = ButtonElementProps | AnchorElementProps;
