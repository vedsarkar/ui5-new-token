import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Merge1 = ({
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
			<path d="M2.50002 5.20766L3.55385 4.15384L8.65003 9.25001L15.5866 9.25002L12.752 6.41536L13.8212 5.34616L18.475 9.99999L13.8057 14.6692L12.7365 13.6L15.5866 10.75L8.04235 10.75L2.50002 5.20766ZM2.48465 14.7923L5.8616 11.4L6.9308 12.4692L3.53848 15.8461L2.48465 14.7923Z" />
		</svg>
	);
};
