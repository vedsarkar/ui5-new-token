import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Negative = ({
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
			<path d="M12.25 1C13.7688 1 15 2.23122 15 3.75V12.25C15 13.7688 13.7688 15 12.25 15H3.75C2.23122 15 1 13.7688 1 12.25V3.75C1 2.23122 2.23122 1 3.75 1H12.25ZM3.75 2.5C3.05964 2.5 2.5 3.05964 2.5 3.75V12.25C2.5 12.9404 3.05964 13.5 3.75 13.5H12.25C12.9404 13.5 13.5 12.9404 13.5 12.25V3.75C13.5 3.05964 12.9404 2.5 12.25 2.5H3.75ZM10.248 7C10.6623 7 10.998 7.33579 10.998 7.75C10.998 8.16421 10.6623 8.5 10.248 8.5H5.75C5.33579 8.5 5 8.16421 5 7.75C5 7.33579 5.33579 7 5.75 7H10.248Z" />
		</svg>
	);
};
