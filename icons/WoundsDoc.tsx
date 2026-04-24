import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const WoundsDoc = ({
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
			<path d="M8 1C10.2091 1 12 2.79086 12 5C12 6.20826 11.4631 7.28999 10.6162 8.02344C12.6099 8.93127 14 10.9266 14 13.25V14.25C14 14.6642 13.6642 15 13.25 15H2.75C2.33579 15 2 14.6642 2 14.25V13.25C2 10.9269 3.38953 8.93145 5.38281 8.02344C4.53627 7.29 4 6.20799 4 5C4 2.79086 5.79086 1 8 1ZM11.2998 13.5H12.5V13.25C12.5 12.1093 12.0433 11.0707 11.2998 10.3057V13.5ZM7.79785 9C5.41885 9.00012 3.5 10.911 3.5 13.25V13.5H6.6709L9.76953 9.29297C9.28411 9.10465 8.7558 9.00003 8.20215 9H7.79785ZM5.9541 3.56445C5.66845 3.97081 5.5 4.46556 5.5 5C5.5 6.38071 6.61929 7.5 8 7.5C9.27243 7.5 10.3206 6.54911 10.4775 5.31934L5.9541 3.56445ZM8 2.5C7.82566 2.5 7.65548 2.5178 7.49121 2.55176L10.0205 3.5332C9.56604 2.90826 8.83184 2.5 8 2.5Z" />
		</svg>
	);
};
