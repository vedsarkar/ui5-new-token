import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const FeederArrow = ({
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
			<path d="M5.20034 4.23997C5.48202 3.93641 5.95629 3.9184 6.25994 4.19993L9.76003 7.44803C9.91281 7.5898 10.0001 7.78846 10.0003 7.99687C10.0003 8.20522 9.91357 8.4048 9.76101 8.54669L6.26092 11.7997C5.95746 12.0813 5.4822 12.0639 5.20034 11.7606C4.91854 11.4573 4.93626 10.982 5.2394 10.7L8.14768 7.99687L5.24038 5.29956C4.93692 5.01796 4.91907 4.54362 5.20034 4.23997Z" />
		</svg>
	);
};
