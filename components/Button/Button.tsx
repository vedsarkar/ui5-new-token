import type React from "react";
import { useEffect, useRef } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

/**
 * Universal Button Component
 *
 * A flexible, accessible button component that supports multiple variants
 * (filled, outlined, text), color options (primary, secondary, inherited),
 * sizes, states, and can render as either a button or anchor element.
 */
export const Button = ({
	variant = "filled",
	color = "inherited",
	size = "medium",
	disabled = false,
	fullWidth = false,
	children,
	className,
	onClick,
	href,
	type = "button",
	"aria-label": ariaLabel,
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

	// Determine if button is interactive
	const isInteractive = !disabled;

	// Handle click events
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		if (!isInteractive) {
			event.preventDefault();
			return;
		}

		// Prevent navigation for disabled anchors
		if (href && disabled) {
			event.preventDefault();
			return;
		}

		onClick?.(event);
	};

	// Handle keyboard events (Enter and Space)
	const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		if (!isInteractive) {
			event.preventDefault();
			return;
		}

		// Enter and Space activate button
		if (event.key === "Enter" || event.key === " ") {
			if (event.key === " ") {
				event.preventDefault(); // Prevent page scroll
			}
			if (href) {
				// For anchors, trigger click
				buttonRef.current?.click();
			} else {
				// For buttons, trigger onClick
				onClick?.(event as unknown as React.MouseEvent<HTMLElement>);
			}
		}
	};

	// Compose className using classNames utility
	const composedClassName = classNames(
		styles.root,
		styles[variant],
		styles[color],
		styles[size],
		disabled && styles.disabled,
		fullWidth && styles.fullWidth,
		className,
	);

	// ARIA attributes
	const ariaAttributes = {
		"aria-label": ariaLabel,
		"aria-disabled": disabled ? true : undefined,
	};

	// Render as anchor if href is provided
	if (href) {
		return (
			<a
				ref={buttonRef as React.RefObject<HTMLAnchorElement>}
				href={disabled ? undefined : href}
				className={composedClassName}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				{...ariaAttributes}
				{...rest}
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
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			{...ariaAttributes}
			{...rest}
		>
			{children}
		</button>
	);
};
