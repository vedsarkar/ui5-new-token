import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const SlimArrowRight = ({
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
			<path d="M6.27342 3.17088C6.59309 2.90781 7.06578 2.95387 7.32909 3.27342L10.8291 7.52049C11.0572 7.79737 11.0571 8.19759 10.8291 8.47459L7.32909 12.7265C7.06587 13.0463 6.59324 13.0923 6.27342 12.8291C5.95363 12.5659 5.9077 12.0932 6.17088 11.7734L9.27831 7.99803L6.17088 4.22655C5.90781 3.90688 5.95387 3.43419 6.27342 3.17088Z" />
		</svg>
	);
};
