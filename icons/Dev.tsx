import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Dev = ({
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
			<path d="M5.65375 15.3075L0 9.65375L5.65375 4L6.723 5.06925L2.123 9.66925L6.7075 14.2538L5.65375 15.3075ZM13.6538 15.3075L12.5845 14.2383L17.1845 9.63825L12.6 5.05375L13.6538 4L19.3075 9.65375L13.6538 15.3075Z" />
		</svg>
	);
};
