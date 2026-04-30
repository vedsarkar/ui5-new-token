import type React from "react";
import { Close } from "@/icons/Close";
import { classNames } from "@/utils/classNames";
import styles from "./Token.module.css";
import type { TokenProps } from "./Token.types";

/**
 * SAP Fiori Token
 *
 * A pill-shaped element representing a selected value. Supports selected,
 * read-only, and disabled states. Used standalone or inside tokenizer/multi-combo patterns.
 *
 * @see https://experience.sap.com/fiori-design-web/token/
 */
export const Token = ({
	text,
	selected = false,
	readOnly = false,
	disabled = false,
	onSelect,
	onDelete,
	className,
	...rest
}: TokenProps) => {
	const handleClick = () => {
		onSelect?.();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === " ") {
			e.preventDefault();
			onSelect?.();
		}
		if ((e.key === "Delete" || e.key === "Backspace") && !readOnly) {
			e.preventDefault();
			onDelete?.();
		}
	};

	const handleDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onDelete?.();
	};

	return (
		<div
			role="option"
			aria-selected={selected}
			tabIndex={disabled ? undefined : 0}
			className={classNames(
				styles.root,
				selected && styles.selected,
				readOnly && styles.readOnly,
				disabled && styles.disabled,
				className,
			)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			{...rest}
		>
			<span className={classNames(styles.text)}>{text}</span>
			{!readOnly && (
				<button
					type="button"
					className={classNames(styles.closeButton)}
					onClick={handleDeleteClick}
					aria-label="Delete"
					tabIndex={-1}
				>
					<Close size="small" />
				</button>
			)}
		</div>
	);
};
