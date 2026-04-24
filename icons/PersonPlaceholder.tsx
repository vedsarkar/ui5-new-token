import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const PersonPlaceholder = ({
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
			<path d="M8 1C10.2091 1 12 2.79086 12 5C12 6.20826 11.4631 7.28999 10.6162 8.02344C12.6099 8.93127 14 10.9266 14 13.25V14.25C14 14.6642 13.6642 15 13.25 15H2.75C2.33579 15 2 14.6642 2 14.25V13.25C2 10.9269 3.38953 8.93145 5.38281 8.02344C4.53627 7.29 4 6.20799 4 5C4 2.79086 5.79086 1 8 1ZM7.99891 9C5.37244 9 3.5 10.911 3.5 13.25V13.5H12.5V13.25C12.5 10.911 10.686 9 7.99891 9ZM8 2.5C6.61929 2.5 5.5 3.61929 5.5 5C5.5 6.38071 6.61929 7.5 8 7.5C9.38071 7.5 10.5 6.38071 10.5 5C10.5 3.61929 9.38071 2.5 8 2.5Z" />
		</svg>
	);
};
