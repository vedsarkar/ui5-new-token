import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Add = ({
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
			<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
		</svg>
	);
};
