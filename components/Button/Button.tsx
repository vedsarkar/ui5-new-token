import React, { useEffect, useRef } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

/**
 * SAP Fiori Button
 *
 * A flexible, accessible button component that supports SAP Fiori design variants
 * (default, emphasized, ghost, transparent, positive, negative, attention),
 * and can render as either a button or anchor element.
 *
 * Automatically switches to icon-only layout when children
 * is a single React component element.
 *
 * @see https://experience.sap.com/fiori-design-web/button/
 */
export const Button = ({
	design = "default",
	disabled = false,
	fullWidth = false,
	children,
	className,
	href,
	type = "button",
	...rest
}: ButtonProps) => {
	const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

	useEffect(() => {
		if (
			disabled &&
			buttonRef.current &&
			document.activeElement === buttonRef.current
		) {
			buttonRef.current.blur();
		}
	}, [disabled]);

	const isIconOnly =
		React.Children.count(children) === 1 &&
		React.isValidElement(children) &&
		typeof children.type !== "string" &&
		children.type !== React.Fragment;

	const composedClassName = classNames(
		styles.root,
		styles[design],
		disabled && styles.disabled,
		fullWidth && styles.fullWidth,
		isIconOnly && styles.iconOnly,
		className,
	);

	if (href) {
		return (
			<a
				ref={buttonRef as React.RefObject<HTMLAnchorElement>}
				href={disabled ? undefined : href}
				className={composedClassName}
				aria-disabled={disabled ? true : undefined}
				{...(rest as React.ComponentPropsWithoutRef<"a">)}
			>
				{children}
			</a>
		);
	}

	return (
		<button
			ref={buttonRef as React.RefObject<HTMLButtonElement>}
			type={type}
			disabled={disabled}
			className={composedClassName}
			{...(rest as React.ComponentPropsWithoutRef<"button">)}
		>
			{children}
		</button>
	);
};
