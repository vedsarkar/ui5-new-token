import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const TableRow = ({
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
			<path d="M12.25 1C13.7688 1 15 2.23122 15 3.75V12.25C15 13.7688 13.7688 15 12.25 15H3.75C2.23122 15 1 13.7688 1 12.25V3.75C1 2.23122 2.23122 1 3.75 1H12.25ZM2.5 10V12.25C2.5 12.9404 3.05964 13.5 3.75 13.5H5V10H2.5ZM6.5 10V13.5H9.5V10H6.5ZM11 10V13.5H12.25C12.9404 13.5 13.5 12.9404 13.5 12.25V10H11ZM3.75 2.5C3.05964 2.5 2.5 3.05964 2.5 3.75V6H5V2.5H3.75ZM6.5 6H9.5V2.5H6.5V6ZM11 6H13.5V3.75C13.5 3.05964 12.9404 2.5 12.25 2.5H11V6Z" />
		</svg>
	);
};
