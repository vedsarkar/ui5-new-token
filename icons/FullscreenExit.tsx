import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const FullscreenExit = ({
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
			<path d="M4.7115 18.5V15.2885H1.5V13.7885H6.2115V18.5H4.7115ZM13.798 18.5V13.7885H18.5095V15.2885H15.298V18.5H13.798ZM1.5 6.2115V4.7115H4.7115V1.5H6.2115V6.2115H1.5ZM13.798 6.2115V1.5H15.298V4.7115H18.5095V6.2115H13.798Z" />
		</svg>
	);
};
