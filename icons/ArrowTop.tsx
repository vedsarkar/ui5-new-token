import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ArrowTop = ({
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
			<path d="M8.54268 1.23184L12.7947 5.73184C13.0788 6.03285 13.0652 6.50701 12.7644 6.79141C12.4634 7.07569 11.9893 7.06196 11.7049 6.76114L8.74971 3.63516V14.2465C8.74971 14.6606 8.41374 14.9963 7.9997 14.9965C7.58548 14.9965 7.24968 14.6607 7.24968 14.2465V3.63028L4.29455 6.76114C4.01026 7.06214 3.53614 7.07548 3.23496 6.79141C2.93388 6.50706 2.92039 6.033 3.20468 5.73184L7.45184 1.23184C7.74386 0.922705 8.25059 0.922736 8.54268 1.23184Z" />
		</svg>
	);
};
