import React, { useEffect, useRef } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

/**
 * Universal Button Component
 *
 * A flexible, accessible button component that supports multiple variants
 * (filled, outlined, text), color options (primary, secondary, inherited),
 * sizes, states, and can render as either a button or anchor element.
 *
 * Automatically switches to circular icon-only layout when children
 * is a single React component element.
 */
export const Button = ({
	variant = "filled",
	color = "inherited",
	size = "medium",
	disabled = false,
	fullWidth = false,
	children,
	className,
	href,
	type = "button",
	...rest
}: ButtonProps) => {
	const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

	// Remove focus when button becomes disabled
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
		styles[variant],
		styles[color],
		styles[size],
		disabled && styles.disabled,
		fullWidth && styles.fullWidth,
		isIconOnly && styles.iconOnly,
		className,
	);

	// Render as anchor if href is provided
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

	// Render as button
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
