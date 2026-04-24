import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ItInstance = ({
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
			<path d="M11.25 0C12.7688 0 14 1.23122 14 2.75V13.25C14 14.7688 12.7688 16 11.25 16H4.75C3.23122 16 2 14.7688 2 13.25V2.75C2 1.23122 3.23122 2.0133e-08 4.75 0H11.25ZM4.75 1.5C4.05964 1.5 3.5 2.05964 3.5 2.75V13.25C3.5 13.9404 4.05964 14.5 4.75 14.5H11.25C11.9404 14.5 12.5 13.9404 12.5 13.25V2.75C12.5 2.05964 11.9404 1.5 11.25 1.5H4.75ZM10.2578 11.5C10.672 11.5 11.0078 11.8358 11.0078 12.25C11.0078 12.6642 10.672 13 10.2578 13H5.75781C5.3436 13 5.00781 12.6642 5.00781 12.25C5.00781 11.8358 5.3436 11.5 5.75781 11.5H10.2578ZM10.0078 3C10.5601 3 11.0078 3.44772 11.0078 4C11.0078 4.55228 10.5601 5 10.0078 5C9.45553 5 9.00781 4.55228 9.00781 4C9.00781 3.44772 9.45553 3 10.0078 3Z" />
		</svg>
	);
};
