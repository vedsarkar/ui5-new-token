import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ResizeCorner = ({
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
			viewBox="0 0 16 16"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path d="M11.7197 3.21967C12.0126 2.92678 12.4873 2.92678 12.7802 3.21967C13.0731 3.51257 13.0731 3.98735 12.7802 4.28022L4.28022 12.7802C3.98734 13.0731 3.51257 13.0731 3.21967 12.7802C2.92678 12.4873 2.92678 12.0126 3.21967 11.7197L11.7197 3.21967ZM11.7197 8.21968C12.0126 7.92679 12.4873 7.92679 12.7802 8.21968C13.0731 8.51258 13.0731 8.98736 12.7802 9.28023L9.28023 12.7802C8.98736 13.0731 8.51258 13.0731 8.21968 12.7802C7.92679 12.4873 7.92679 12.0126 8.21968 11.7197L11.7197 8.21968Z" />
		</svg>
	);
};
