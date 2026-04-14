import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Back = ({
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
			<path d="M5.373 10.75L11.0693 16.4462L10 17.5L2.5 10L10 2.5L11.0693 3.55375L5.373 9.25H17.5V10.75H5.373Z" />
		</svg>
	);
};
