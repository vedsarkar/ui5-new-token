import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const TaskList = ({
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
			<path d="M8.5 17V15.4444H18.5V17H8.5ZM8.5 10.7778V9.22222H18.5V10.7778H8.5ZM8.5 4.55556V3H18.5V4.55556H8.5Z" />
			<path
				d="M1 16L3 17.5L6 14"
				stroke="#0E0E25"
				stroke-width="1.5"
				stroke-linejoin="round"
			/>
			<path
				d="M1 10L3 11.5L6 8"
				stroke="#0E0E25"
				stroke-width="1.5"
				stroke-linejoin="round"
			/>
			<path
				d="M1 4L3 5.5L6 2"
				stroke="#0E0E25"
				stroke-width="1.5"
				stroke-linejoin="round"
			/>
		</svg>
	);
};
