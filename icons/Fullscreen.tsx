import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Fullscreen = ({
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
			<path d="M1.5 18.5V13.7885H3V17H6.2115V18.5H1.5ZM13.798 18.5V17H17.0095V13.7885H18.5095V18.5H13.798ZM1.5 6.2115V1.5H6.2115V3H3V6.2115H1.5ZM17.0095 6.2115V3H13.798V1.5H18.5095V6.2115H17.0095Z" />
		</svg>
	);
};
