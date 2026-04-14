import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Expand = ({
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
			<path d="M1.5 18.5V13.7885H3V17H6.2115V18.5H1.5ZM17.0095 6.2115V3H13.798V1.5H18.5095V6.2115H17.0095Z" />
			<rect
				x="6.75"
				y="6.75"
				width="6.5"
				height="6.5"
				stroke="#0E0E25"
				stroke-width="1.5"
			/>
		</svg>
	);
};
