import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const FolderFull = ({
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
			<path d="M6.5 1C6.69891 1 6.88962 1.07907 7.03027 1.21973L8.31055 2.5H13.25C14.7688 2.5 16 3.73122 16 5.25V12.25C16 13.7688 14.7688 15 13.25 15H2.75C1.23122 15 0 13.7688 0 12.25V3.75C1.28853e-07 2.23122 1.23122 1 2.75 1H6.5Z" />
		</svg>
	);
};
