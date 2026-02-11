import { Close } from "@/icons/Close";
import { classNames } from "@/utils/classNames";
import styles from "./Chip.module.css";
import type { ChipProps } from "./Chip.types";

export const Chip = ({
	children,
	onRemove,
	disabled = false,
	className,
	style,
}: ChipProps) => {
	const composedClassName = classNames(
		styles.root,
		disabled && styles.disabled,
		className,
	);

	return (
		<span className={composedClassName} style={style}>
			{children}
			{onRemove && (
				<button
					type="button"
					className={classNames(styles.removeButton)}
					onClick={onRemove}
					disabled={disabled}
					aria-label="Remove"
				>
					<Close size="small" />
				</button>
			)}
		</span>
	);
};
