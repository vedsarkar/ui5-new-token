import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Remove = ({
	size = "medium",
	color = "inherited",
	className,
	style,
	"aria-label": ariaLabel,
}: IconProps) => {
	return (
		<svg
			className={classNames(
				styles.root,
				styles[size],
				styles[color],
				className,
			)}
			style={style}
			viewBox="0 -960 960 960"
			aria-hidden={!ariaLabel}
			aria-label={ariaLabel}
			role={ariaLabel ? "img" : undefined}
		>
			<path d="M200-440v-80h560v80H200Z" />
		</svg>
	);
};
