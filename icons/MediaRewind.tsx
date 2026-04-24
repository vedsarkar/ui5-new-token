import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const MediaRewind = ({
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
			<path d="M14.7762 2.16257L8.27616 7.41656C8.10021 7.55905 7.99784 7.77346 7.99784 8.00001C7.99788 8.22653 8.1002 8.44099 8.27616 8.58346L14.7762 13.8374C15.257 14.226 15.9977 13.8729 15.9978 13.254V2.74602C15.9978 2.12706 15.2569 1.77395 14.7762 2.16257ZM6.77616 2.16257L0.276158 7.41656C-0.089082 7.71235 -0.089164 8.28767 0.276158 8.58346L6.77616 13.8374C7.25703 14.226 7.99771 13.8729 7.99784 13.254V2.74602C7.99784 2.12706 7.25694 1.77395 6.77616 2.16257ZM14.4978 11.6825L9.99784 8.00001L14.4978 4.31655V11.6825ZM6.49784 11.6825L1.99784 8.00001L6.49784 4.31655V11.6825Z" />
		</svg>
	);
};
