import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const MediaReverse = ({
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
			<path d="M11.8033 1.14193L3.30326 7.39519C2.90233 7.69015 2.90233 8.30985 3.30326 8.60481L11.8033 14.8581C12.2888 15.2152 12.9976 14.856 12.9976 14.2533V1.74674C12.9976 1.14401 12.2888 0.784838 11.8033 1.14193ZM11.4976 12.7691L5.0142 8L11.4976 3.22993V12.7691Z" />
		</svg>
	);
};
