import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Resume = ({
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
			<path d="M4.61548 15.3078V4.69226H6.11548V15.3078H4.61548ZM8.30773 15.3078L17.1635 10L8.30773 4.69226V15.3078ZM9.80773 12.6385V7.36151L14.2115 10L9.80773 12.6385Z" />
		</svg>
	);
};
