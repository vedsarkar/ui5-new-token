import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Letter = ({
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
			<path d="M13.25 2C14.7688 2 16 3.23122 16 4.75V11.25C16 12.7688 14.7688 14 13.25 14H2.75C1.23122 14 2.0133e-08 12.7688 0 11.25V4.75C0 3.23122 1.23122 2 2.75 2H13.25ZM2.75 3.5C2.05964 3.5 1.5 4.05964 1.5 4.75V11.25C1.5 11.9404 2.05964 12.5 2.75 12.5H13.25C13.9404 12.5 14.5 11.9404 14.5 11.25V4.75C14.5 4.05964 13.9404 3.5 13.25 3.5H2.75ZM6.25 8C6.66421 8 7 8.33579 7 8.75C7 9.16421 6.66421 9.5 6.25 9.5H3.75C3.33579 9.5 3 9.16421 3 8.75C3 8.33579 3.33579 8 3.75 8H6.25ZM12.25 5C12.6642 5 13 5.33579 13 5.75V7.25C13 7.66421 12.6642 8 12.25 8H10.75C10.3358 8 10 7.66421 10 7.25V5.75C10 5.33579 10.3358 5 10.75 5H12.25ZM7.25391 5.5C7.66812 5.5 8.00391 5.83579 8.00391 6.25C8.00391 6.66421 7.66812 7 7.25391 7H3.75C3.33579 7 3 6.66421 3 6.25C3 5.83579 3.33579 5.5 3.75 5.5H7.25391Z" />
		</svg>
	);
};
