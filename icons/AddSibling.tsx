import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const AddSibling = ({
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
			<path d="M10 19.5C6.96243 19.5 4.5 17.0376 4.5 14C4.5 11.2168 6.56724 8.91658 9.25 8.55078L9.25 4.88574C8.2357 4.56719 7.5 3.61943 7.5 2.5C7.5 1.11929 8.61929 -6.01531e-07 10 -4.80825e-07C11.3807 -3.6012e-07 12.5 1.11929 12.5 2.5C12.5 3.61943 11.7643 4.56719 10.75 4.88574L10.75 8.55078C13.4328 8.91658 15.5 11.2168 15.5 14C15.5 17.0376 13.0376 19.5 10 19.5ZM10 3.5C10.5523 3.5 11 3.05228 11 2.5C11 1.94772 10.5523 1.5 10 1.5C9.44772 1.5 9 1.94772 9 2.5C9 3.05228 9.44772 3.5 10 3.5ZM10 18C12.2091 18 14 16.2091 14 14C14 11.7909 12.2091 10 10 10C7.79086 10 6 11.7909 6 14C6 16.2091 7.79086 18 10 18ZM9.25 14.75L7.25 14.75L7.25 13.25L9.25 13.25L9.25 11.25L10.75 11.25L10.75 13.25L12.75 13.25L12.75 14.75L10.75 14.75L10.75 16.75L9.25 16.75L9.25 14.75Z" />
		</svg>
	);
};
