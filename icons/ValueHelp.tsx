import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ValueHelp = ({
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
			<path d="M9.25 5C10.2165 5 11 5.7835 11 6.75V13.25C11 14.2165 10.2165 15 9.25 15H2.75C1.7835 15 1 14.2165 1 13.25V6.75C1 5.7835 1.7835 5 2.75 5H9.25ZM2.75 6.5C2.61193 6.5 2.5 6.61193 2.5 6.75V13.25C2.5 13.3881 2.61193 13.5 2.75 13.5H9.25C9.38807 13.5 9.5 13.3881 9.5 13.25V6.75C9.5 6.61193 9.38807 6.5 9.25 6.5H2.75ZM13.25 1C14.2165 1 15 1.7835 15 2.75V9.25C15 10.2165 14.2165 11 13.25 11H12.75C12.3358 11 12 10.6642 12 10.25C12 9.83579 12.3358 9.5 12.75 9.5H13.25C13.3881 9.5 13.5 9.38807 13.5 9.25V2.75C13.5 2.61193 13.3881 2.5 13.25 2.5H6.75C6.61193 2.5 6.5 2.61193 6.5 2.75V3.25C6.5 3.66421 6.16421 4 5.75 4C5.33579 4 5 3.66421 5 3.25V2.75C5 1.7835 5.7835 1 6.75 1H13.25Z" />
		</svg>
	);
};
