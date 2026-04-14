import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const FormatItalics = ({
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
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path d="M3.39429 16.625V14.8173H7.21154L10.452 5.18275H6.63479V3.375H15.7885V5.18275H12.2788L9.03854 14.8173H12.548V16.625H3.39429Z" />
		</svg>
	);
};
