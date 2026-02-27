import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Send = ({
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
			<path d="M1.5 17.25V2.75L18.7115 10L1.5 17.25ZM3 15L14.85 10L3 5V8.69225L8.423 10L3 11.3077V15Z" />
		</svg>
	);
};
