import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const EmployeePane = ({
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
			<path d="M12.25 1C13.7688 1 15 2.23122 15 3.75V12.25C15 13.7688 13.7688 15 12.25 15H3.75C2.23122 15 1 13.7688 1 12.25V3.75C1 2.23122 2.23122 1 3.75 1H12.25ZM3.75 2.5C3.05964 2.5 2.5 3.05964 2.5 3.75V12.25C2.5 12.9404 3.05964 13.5 3.75 13.5H12.25C12.9404 13.5 13.5 12.9404 13.5 12.25V3.75C13.5 3.05964 12.9404 2.5 12.25 2.5H3.75ZM8 8.5C8.66304 8.5 9.29874 8.76358 9.76758 9.23242C10.2364 9.70126 10.5 10.337 10.5 11C10.5 11.2761 10.2761 11.5 10 11.5H6C5.73478 11.5 5.5 11.2652 5.5 11C5.5 10.337 5.76358 9.70126 6.23242 9.23242C6.70126 8.76358 7.33696 8.5 8 8.5ZM8 4.5C8.82843 4.5 9.5 5.17157 9.5 6C9.5 6.82843 8.82843 7.5 8 7.5C7.17157 7.5 6.5 6.82843 6.5 6C6.5 5.17157 7.17157 4.5 8 4.5Z" />
		</svg>
	);
};
