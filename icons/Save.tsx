import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Save = ({
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
			<path d="M10.6094 1C10.7852 1 10.9076 1.10496 11.0117 1.20215L14.7617 4.70215C14.9136 4.84398 15 5.04221 15 5.25V13.25C15 14.2165 14.2165 15 13.25 15H2.75C1.7835 15 1 14.2165 1 13.25V2.75C1 1.7835 1.7835 1 2.75 1C2.75 1 10.4336 1 10.6094 1ZM2.75 2.5C2.61193 2.5 2.5 2.61193 2.5 2.75V13.25C2.5 13.3881 2.61193 13.5 2.75 13.5H4.5V9.75C4.5 9.33579 4.83579 9 5.25 9H10.75C11.1642 9 11.5 9.33579 11.5 9.75V13.5H13.25C13.3881 13.5 13.5 13.3881 13.5 13.25V5.5752L10.2051 2.5H6V4.5H9.25C9.66421 4.5 10 4.83579 10 5.25C10 5.66421 9.66421 6 9.25 6H5.25C4.83579 6 4.5 5.66421 4.5 5.25V2.5H2.75ZM6 13.5H10V10.5H6V13.5Z" />
		</svg>
	);
};
