import { Close } from "@/icons/Close";
import { classNames } from "@/utils/classNames";
import styles from "./Chip.module.css";
import type { ChipProps } from "./Chip.types";

export const Chip = ({
	children,
	variant = "filled",
	color = "default",
	size = "medium",
	icon,
	onRemove,
	onClick,
	disabled = false,
	className,
	style,
}: ChipProps) => {
	const isInteractive = !!onClick;

	const composedClassName = classNames(
		styles.root,
		styles[variant],
		styles[color],
		size === "small" && styles.small,
		isInteractive && styles.interactive,
		disabled && styles.disabled,
		className,
	);

	const content = (
		<>
			{icon && <span className={classNames(styles.leadingIcon)}>{icon}</span>}
			{children}
			{onRemove && (
				<button
					type="button"
					className={classNames(styles.removeButton)}
					onClick={(e) => {
						e.stopPropagation();
						onRemove();
					}}
					disabled={disabled}
					aria-label="Remove"
				>
					<Close size="small" />
				</button>
			)}
		</>
	);

	if (isInteractive) {
		return (
			<button
				type="button"
				className={composedClassName}
				style={style}
				onClick={onClick}
				disabled={disabled}
			>
				{content}
			</button>
		);
	}

	return (
		<span className={composedClassName} style={style}>
			{content}
		</span>
	);
};
