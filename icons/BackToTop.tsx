import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const BackToTop = ({
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
			<path d="M8.54688 4.23926L11.7998 7.73926C12.0817 8.0427 12.0641 8.51787 11.7607 8.7998C11.4573 9.08169 10.9821 9.06415 10.7002 8.76074L8.75 6.66211V15.25C8.75 15.6642 8.41421 16 8 16C7.58579 16 7.25 15.6642 7.25 15.25V6.65723L5.2998 8.75977C5.01813 9.06332 4.54387 9.08134 4.24023 8.7998C3.93668 8.51813 3.91866 8.04387 4.2002 7.74023L7.44824 4.24023C7.74054 3.92523 8.25404 3.9244 8.54688 4.23926ZM14.25 0C14.6642 0 15 0.335786 15 0.75C15 1.16421 14.6642 1.5 14.25 1.5H1.75C1.33579 1.5 1 1.16421 1 0.75C1 0.335786 1.33579 0 1.75 0H14.25Z" />
		</svg>
	);
};
