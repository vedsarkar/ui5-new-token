import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Star = ({
	size = "medium",
	color = "inherited",
	className,
	...props
}: IconProps) => {
	return (
		<svg
			className={classNames(
				styles.root,
				styles[size],
				styles[color],
				className,
			)}
			viewBox="0 0 20 20"
			fill="currentColor"
			{...props}
		>
			<path d="M6.84994 14.825L9.99994 12.925L13.1499 14.85L12.3249 11.25L15.0999 8.84999L11.4499 8.52499L9.99994 5.12499L8.54994 8.49999L4.89994 8.82499L7.67494 11.25L6.84994 14.825ZM4.57494 17.9615L6.00769 11.7922L1.22119 7.64424L7.53644 7.09624L9.99994 1.27899L12.4634 7.09624L18.7787 7.64424L13.9922 11.7922L15.4249 17.9615L9.99994 14.6885L4.57494 17.9615Z" />
		</svg>
	);
};
