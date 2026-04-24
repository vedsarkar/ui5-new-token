import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Fridge = ({
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
			<path d="M11.25 0C12.7688 0 14 1.23122 14 2.75V13.25C14 14.7688 12.7688 16 11.25 16H4.75C3.23122 16 2 14.7688 2 13.25V2.75C2 1.23122 3.23122 2.0133e-08 4.75 0H11.25ZM3.5 13.25C3.5 13.9404 4.05964 14.5 4.75 14.5H11.25C11.9404 14.5 12.5 13.9404 12.5 13.25V7H3.5V13.25ZM5.75 8C6.16421 8 6.5 8.33579 6.5 8.75V11.25C6.5 11.6642 6.16421 12 5.75 12C5.33579 12 5 11.6642 5 11.25V8.75C5 8.33579 5.33579 8 5.75 8ZM4.75 1.5C4.05964 1.5 3.5 2.05964 3.5 2.75V5.5H12.5V2.75C12.5 2.05964 11.9404 1.5 11.25 1.5H4.75ZM5.75 2.98828C6.16405 2.98828 6.49974 3.32332 6.5 3.7373V4.2373C6.5 4.65152 6.16421 4.98828 5.75 4.98828C5.33595 4.98828 5.00026 4.65227 5 4.23828V3.73828C5 3.32407 5.33579 2.98828 5.75 2.98828Z" />
		</svg>
	);
};
