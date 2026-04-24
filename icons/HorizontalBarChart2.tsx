import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const HorizontalBarChart2 = ({
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
			<path d="M1.75 1C2.16421 1 2.5 1.33579 2.5 1.75V13.25C2.5 13.3881 2.61193 13.5 2.75 13.5H14.25C14.6642 13.5 15 13.8358 15 14.25C15 14.6642 14.6642 15 14.25 15H2.75C1.7835 15 1 14.2165 1 13.25V1.75C1 1.33579 1.33579 1 1.75 1ZM13.25 10C13.6642 10 14 10.3358 14 10.75C14 11.1642 13.6642 11.5 13.25 11.5H4.75C4.33579 11.5 4 11.1642 4 10.75C4 10.3358 4.33579 10 4.75 10H13.25ZM8.25 7C8.66421 7 9 7.33579 9 7.75C9 8.16421 8.66421 8.5 8.25 8.5H4.75C4.33579 8.5 4 8.16421 4 7.75C4 7.33579 4.33579 7 4.75 7H8.25ZM11.25 4C11.6642 4 12 4.33579 12 4.75C12 5.16421 11.6642 5.5 11.25 5.5H4.75C4.33579 5.5 4 5.16421 4 4.75C4 4.33579 4.33579 4 4.75 4H11.25ZM6.25 1C6.66421 1 7 1.33579 7 1.75C7 2.16421 6.66421 2.5 6.25 2.5H4.75C4.33579 2.5 4 2.16421 4 1.75C4 1.33579 4.33579 1 4.75 1H6.25Z" />
		</svg>
	);
};
