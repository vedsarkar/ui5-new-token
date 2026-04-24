import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Heading1 = ({
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
			<path d="M7.25 2C7.66421 2 8 2.33579 8 2.75V13.25C8 13.6642 7.66421 14 7.25 14C6.83579 14 6.5 13.6642 6.5 13.25V9H1.5V13.25C1.5 13.6642 1.16421 14 0.75 14C0.335786 14 0 13.6642 0 13.25V2.75C0 2.33579 0.335786 2 0.75 2C1.16421 2 1.5 2.33579 1.5 2.75V7.5H6.5V2.75C6.5 2.33579 6.83579 2 7.25 2ZM14.8779 4.09863C15.3683 3.81855 16 4.18533 16 4.75V13.25C16 13.6642 15.6642 14 15.25 14C14.8358 14 14.5 13.6642 14.5 13.25V6.04199L12.1221 7.40137C11.7624 7.60679 11.3041 7.48167 11.0986 7.12207C10.8932 6.76245 11.0183 6.30412 11.3779 6.09863L14.8779 4.09863Z" />
		</svg>
	);
};
