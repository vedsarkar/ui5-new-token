import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Tune = ({
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
			{...props}
		>
			<path d="M9.25 18.75V13.25H10.75V15.25H18.75V16.75H10.75V18.75H9.25ZM1.25 16.75V15.25H6.75V16.75H1.25ZM5.25 12.75V10.75H1.25V9.25H5.25V7.25H6.75V12.75H5.25ZM9.25 10.75V9.25H18.75V10.75H9.25ZM13.25 6.75V1.25H14.75V3.25H18.75V4.75H14.75V6.75H13.25ZM1.25 4.75V3.25H10.75V4.75H1.25Z" />
		</svg>
	);
};
