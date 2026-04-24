import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ColumnChartDualAxis = ({
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
			<path d="M14.25 1C14.6642 1 15 1.33579 15 1.75V13.25C15 14.2165 14.2165 15 13.25 15H2.75C1.7835 15 1 14.2165 1 13.25V1.75C1 1.33579 1.33579 1 1.75 1C2.16421 1 2.5 1.33579 2.5 1.75V13.25C2.5 13.3881 2.61193 13.5 2.75 13.5H13.25C13.3881 13.5 13.5 13.3881 13.5 13.25V1.75C13.5 1.33579 13.8358 1 14.25 1ZM4.75 7C5.16421 7 5.5 7.33579 5.5 7.75V11.25C5.5 11.6642 5.16421 12 4.75 12C4.33579 12 4 11.6642 4 11.25V7.75C4 7.33579 4.33579 7 4.75 7ZM8 3C8.41421 3 8.75 3.33579 8.75 3.75V11.25C8.75 11.6642 8.41421 12 8 12C7.58579 12 7.25 11.6642 7.25 11.25V3.75C7.25 3.33579 7.58579 3 8 3ZM11.25 5C11.6642 5 12 5.33579 12 5.75V11.25C12 11.6642 11.6642 12 11.25 12C10.8358 12 10.5 11.6642 10.5 11.25V5.75C10.5 5.33579 10.8358 5 11.25 5Z" />
		</svg>
	);
};
