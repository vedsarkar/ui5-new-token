import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const CheckCopy = ({
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
			<path d="M7.54995 15.6538L2.21545 10.3193L3.28445 9.25001L7.54995 13.5155L16.7155 4.35001L17.7845 5.41926L7.54995 15.6538Z" />
		</svg>
	);
};
