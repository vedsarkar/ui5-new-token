import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Dropdown = ({
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
			<path d="M9.69237 11.2481C9.96942 10.9404 10.4441 10.9156 10.7519 11.1925C11.0597 11.4695 11.0846 11.9442 10.8076 12.252L8.55759 14.7521C8.26417 15.078 7.73577 15.0781 7.44234 14.7521L5.19231 12.252C4.91543 11.9442 4.94025 11.4695 5.24797 11.1925C5.5558 10.9155 6.03046 10.9404 6.30756 11.2481L7.99996 13.129L9.69237 11.2481Z" />
		</svg>
	);
};
