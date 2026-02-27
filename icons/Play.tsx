import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Play = ({
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
			<path d="M6.5 16.096V3.90399L16.0768 9.99999L6.5 16.096ZM8 13.35L13.2693 9.99999L8 6.64999V13.35Z" />
		</svg>
	);
};
