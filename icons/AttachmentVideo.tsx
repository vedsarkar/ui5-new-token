import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const AttachmentVideo = ({
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
			<path d="M11.25 0C12.2165 6.44266e-08 13 0.783502 13 1.75V6.25C13 6.66421 12.6642 7 12.25 7C11.8358 7 11.5 6.66421 11.5 6.25V1.75C11.5 1.61193 11.3881 1.5 11.25 1.5H6.70996C6.63716 1.5 6.56799 1.53176 6.52051 1.58691L6 2.19336V5.25C6 5.66421 5.66421 6 5.25 6H2.73828C2.64907 6.10391 2.5 6.37012 2.5 6.37012V14.25C2.5 14.3881 2.61193 14.5 2.75 14.5H7.25C7.66421 14.5 8 14.8358 8 15.25C8 15.6642 7.66421 16 7.25 16H2.75C1.7835 16 1 15.2165 1 14.25V6.37012C1 5.95256 1.14927 5.54856 1.4209 5.23145L5.38086 0.611328C5.71333 0.223448 6.19909 0 6.70996 0H11.25ZM11.1553 9.11914L14.6553 11.3691C14.8856 11.5172 15.0046 11.7523 15 12C14.9955 12.2379 14.8765 12.4887 14.6553 12.6309L11.1553 14.8809C10.6656 15.1954 10 14.8321 10 14.25V9.75C10 9.1679 10.6656 8.80457 11.1553 9.11914Z" />
		</svg>
	);
};
