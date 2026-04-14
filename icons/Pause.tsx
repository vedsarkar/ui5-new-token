import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Pause = ({
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
			aria-hidden="true"
			{...props}
		>
			<path d="M11.25 16.5V3.5H16.5V16.5H11.25ZM3.5 16.5V3.5H8.75V16.5H3.5ZM12.75 15H15V5H12.75V15ZM5 15H7.25V5H5V15Z" />
		</svg>
	);
};
