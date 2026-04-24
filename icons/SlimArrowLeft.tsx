import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const SlimArrowLeft = ({
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
			<path d="M9.72672 12.8291C9.40705 13.0922 8.93436 13.0461 8.67105 12.7265L5.17105 8.47948C4.94291 8.2026 4.94306 7.80238 5.17105 7.52538L8.67105 3.27342C8.93427 2.95363 9.4069 2.9077 9.72672 3.17088C10.0465 3.4341 10.0924 3.90674 9.82926 4.22655L6.72183 8.00194L9.82926 11.7734C10.0923 12.0931 10.0463 12.5658 9.72672 12.8291Z" />
		</svg>
	);
};
