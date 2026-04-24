import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const SlimArrowUp = ({
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
			<path d="M12.8292 9.72672C13.0923 9.40705 13.0462 8.93436 12.7267 8.67105L8.4796 5.17105C8.20272 4.94291 7.8025 4.94306 7.5255 5.17105L3.27355 8.67105C2.95375 8.93427 2.90782 9.4069 3.17101 9.72672C3.43423 10.0465 3.90686 10.0924 4.22667 9.82926L8.00206 6.72183L11.7735 9.82926C12.0932 10.0923 12.5659 10.0463 12.8292 9.72672Z" />
		</svg>
	);
};
