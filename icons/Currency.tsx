import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Currency = ({
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
			<path d="M14.25 3C15.2165 3 16 3.7835 16 4.75V11.25C16 12.2165 15.2165 13 14.25 13H1.75C0.783501 13 0 12.2165 0 11.25V4.75C0 3.7835 0.783502 3 1.75 3H14.25ZM3.22754 4.5C3.39285 5.4842 2.49624 6.39487 1.5 6.22754V9.77148C2.48425 9.60628 3.39469 10.5048 3.22754 11.5H12.7725C12.6072 10.5163 13.504 9.6043 14.5 9.77148V6.22754C13.5038 6.39487 12.6072 5.4842 12.7725 4.5H3.22754ZM8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z" />
		</svg>
	);
};
