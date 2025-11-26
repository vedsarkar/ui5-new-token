import type React from "react";

/**
 * Visual variant for the button
 */
export type ButtonVariant = "filled" | "outlined" | "text";

/**
 * Color variant for the button
 */
export type ButtonColor = "primary" | "inherited";

/**
 * Size variant for the button
 */
export type ButtonSize = "small" | "medium" | "large";

/**
 * Base button props (without element-specific attributes)
 */
type BaseButtonProps = {
	/**
	 * Visual variant
	 * @default "filled"
	 */
	variant?: ButtonVariant;

	/**
	 * Color variant
	 * @default "inherited"
	 */
	color?: ButtonColor;

	/**
	 * Size variant
	 * @default "medium"
	 */
	size?: ButtonSize;

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

	/**
	 * Button content (text, icons, etc.)
	 */
	children: React.ReactNode;

	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Additional CSS variables
	 */
	style?: React.CSSProperties & {
		"--reltio-button-color-background"?: string;
		"--reltio-button-color-text"?: string;
	};

	/**
	 * Click event handler
	 */
	onClick?: React.MouseEventHandler<HTMLElement>;

	/**
	 * Accessible label for screen readers
	 * Required if button has no visible text
	 */
	"aria-label"?: string;
};

/**
 * Button props when rendered as button element (no href)
 */
type ButtonElementProps = BaseButtonProps & {
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
};

/**
 * Anchor props when rendered as anchor element (with href)
 */
type AnchorElementProps = BaseButtonProps & {
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
};

/**
 * Union type for Button component props
 * Component can be either a button or an anchor based on href prop
 */
export type ButtonProps = (ButtonElementProps | AnchorElementProps) &
	Omit<React.ComponentPropsWithoutRef<"button">, keyof ButtonElementProps> &
	Omit<React.ComponentPropsWithoutRef<"a">, keyof AnchorElementProps>;
