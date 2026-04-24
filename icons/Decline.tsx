import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Decline = ({
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
			<path d="M11.7198 3.21973C12.0127 2.92684 12.4875 2.92684 12.7804 3.21973C13.0732 3.51263 13.0732 3.98741 12.7804 4.28028L9.06063 8.00002L12.7804 11.7198C13.0732 12.0127 13.0732 12.4874 12.7804 12.7803C12.4875 13.0732 12.0127 13.0731 11.7198 12.7803L8.00008 9.06057L4.28034 12.7803C3.98747 13.0732 3.51269 13.0731 3.21979 12.7803C2.9269 12.4874 2.9269 12.0126 3.21979 11.7198L6.93953 8.00002L3.21979 4.28028C2.9269 3.98739 2.9269 3.51263 3.21979 3.21973C3.51269 2.92684 3.98745 2.92684 4.28034 3.21973L8.00008 6.93947L11.7198 3.21973Z" />
		</svg>
	);
};
