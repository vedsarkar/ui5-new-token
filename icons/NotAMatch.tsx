import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const NotAMatch = ({
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
			<path d="M17.3 3.31H12V4.91H14.5686L5.38994 14.0887H2V15.6887H6.05268L15.7 6.04137V8.61H17.3V3.31Z" />
			<path d="M17.3 16.6887H12V15.0887H14.5686L11.742 12.262L12.8734 11.1307L15.7 13.9573V11.3887H17.3V16.6887Z" />
			<path d="M8.43431 8.95435L5.38994 5.90998H2V4.30998H6.05268L9.56569 7.82298L8.43431 8.95435Z" />
		</svg>
	);
};
