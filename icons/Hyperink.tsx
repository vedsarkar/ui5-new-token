import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Hyperink = ({
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
			<path d="M15 3C16.1046 3 17 3.89543 17 5V15C17 16.1046 16.1046 17 15 17H5C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3H15ZM5 4.5C4.72386 4.5 4.5 4.72386 4.5 5V15C4.5 15.2761 4.72386 15.5 5 15.5H15C15.2761 15.5 15.5 15.2761 15.5 15V5C15.5 4.72386 15.2761 4.5 15 4.5H5ZM14 9.79785L10.7998 12.6025V10.96C8.57591 10.96 7.11197 11.5975 6 13C6.44799 10.9975 7.68796 9.00272 10.7998 8.59766V7L14 9.79785Z" />
		</svg>
	);
};
