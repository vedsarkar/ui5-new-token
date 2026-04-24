import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const SpaceNavigation = ({
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
			<path d="M7.99609 0C8.41031 0 8.74609 0.335786 8.74609 0.75V4.07031C10.5986 4.41988 12 6.04589 12 8C12 9.95405 10.5985 11.5791 8.74609 11.9287V15.25C8.74609 15.6642 8.41031 16 7.99609 16C7.58188 16 7.24609 15.6642 7.24609 15.25V11.9277C5.39751 11.575 4 9.95133 4 8C4 6.0486 5.39742 4.42391 7.24609 4.07129V0.75C7.24609 0.335786 7.58188 0 7.99609 0ZM8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5Z" />
		</svg>
	);
};
