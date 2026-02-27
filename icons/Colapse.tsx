import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Colapse = ({
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
			<rect
				x="6.75"
				y="6.75"
				width="6.5"
				height="6.5"
				stroke="#0E0E25"
				stroke-width="1.5"
			/>
			<path d="M16.4999 3.21149L16.4999 -1.4109e-05L14.9999 -1.42402e-05L14.9999 4.71149L19.7114 4.71149L19.7114 3.21149L16.4999 3.21149Z" />
			<path d="M3.2115 16.5L3.2115 19.7115H4.7115L4.7115 15H0L0 16.5H3.2115Z" />
		</svg>
	);
};
