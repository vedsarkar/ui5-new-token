import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Bookmark = ({
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
			<path d="M11.25 0.00219727C12.7688 0.0022251 14 1.23344 14 2.7522V15.2522C14 15.8704 13.2589 16.224 12.7783 15.8352L8.15723 12.094C8.06552 12.0199 7.93441 12.0208 7.84277 12.095L3.22168 15.8352C2.74108 16.224 2 15.8704 2 15.2522V2.7522C2 1.23342 3.23122 0.00219785 4.75 0.00219727H11.25Z" />
		</svg>
	);
};
