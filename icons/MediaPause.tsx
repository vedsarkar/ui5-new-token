import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const MediaPause = ({
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
			<path d="M5.82715 1.00391C6.20512 1.04253 6.5 1.36183 6.5 1.75V14.25C6.5 14.6642 6.16421 15 5.75 15H4.75C4.33579 15 4 14.6642 4 14.25V1.75C4 1.33579 4.33579 1 4.75 1L5.82715 1.00391ZM11.3271 1.00391C11.7051 1.04253 12 1.36183 12 1.75V14.25C12 14.6642 11.6642 15 11.25 15H10.25C9.83579 15 9.5 14.6642 9.5 14.25V1.75C9.5 1.33579 9.83579 1 10.25 1L11.3271 1.00391Z" />
		</svg>
	);
};
