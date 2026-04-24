import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Microphone = ({
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
			<path d="M12.75 7C13.1642 7 13.5 7.33579 13.5 7.75C13.5 10.5769 11.3932 12.6239 8.75 12.9521V15.25C8.74998 15.6642 8.4142 16 8 16C7.58591 15.9999 7.25 15.6641 7.25 15.25V12.9521C4.60685 12.6239 2.5 10.5769 2.5 7.75C2.5 7.33579 2.83579 7 3.25 7C3.66421 7 4 7.33579 4 7.75C4 9.90683 5.73654 11.5 8 11.5C10.2635 11.5 12 9.90683 12 7.75C12 7.33579 12.3358 7 12.75 7ZM8 0C9.38071 0 10.5 1.11929 10.5 2.5V7.5C10.5 8.88071 9.38071 10 8 10C6.61929 10 5.5 8.88071 5.5 7.5V2.5C5.5 1.11929 6.61929 0 8 0ZM8 1.5C7.44772 1.5 7 1.94772 7 2.5V7.5C7 8.05228 7.44772 8.5 8 8.5C8.55228 8.5 9 8.05228 9 7.5V2.5C9 1.94772 8.55228 1.5 8 1.5Z" />
		</svg>
	);
};
