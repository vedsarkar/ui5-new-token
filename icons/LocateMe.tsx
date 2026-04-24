import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const LocateMe = ({
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
			<path d="M13.9794 1.05011C14.5761 0.819243 15.1819 1.42778 14.9489 2.02353L10.0554 14.5333C9.81238 15.1543 8.90462 15.1558 8.65885 14.5363L6.6055 9.36131L1.4599 7.29035C0.841636 7.0414 0.848561 6.13425 1.46968 5.89375L13.9794 1.05011Z" />
		</svg>
	);
};
