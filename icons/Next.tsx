import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Next = ({
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
			<path d="M14.627 10.75L8.93075 16.4462L10 17.5L17.5 10L10 2.5L8.93075 3.55375L14.627 9.25H2.5V10.75H14.627Z" />
		</svg>
	);
};
