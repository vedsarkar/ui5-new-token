import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Megamenu = ({
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
			<path d="M11.25 5C11.5315 5 11.7897 5.15762 11.9179 5.4082C12.0462 5.65897 12.0233 5.96113 11.8584 6.18945L8.60834 10.6895C8.46733 10.8846 8.2407 11 7.99994 11C7.75922 10.9999 7.53248 10.8846 7.39153 10.6895L4.1415 6.18945C3.97671 5.96118 3.9538 5.6589 4.08193 5.4082C4.21015 5.15764 4.46844 5.0001 4.74991 5H11.25Z" />
		</svg>
	);
};
