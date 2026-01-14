import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ExpandMore = ({
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
			<path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
		</svg>
	);
};
