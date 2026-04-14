import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const CloseCopy = ({
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
			aria-hidden="true"
			{...props}
		>
			<path d="M4.39994 16.6538L3.34619 15.6L8.94619 10L3.34619 4.4L4.39994 3.34625L9.99994 8.94625L15.5999 3.34625L16.6537 4.4L11.0537 10L16.6537 15.6L15.5999 16.6538L9.99994 11.0538L4.39994 16.6538Z" />
		</svg>
	);
};
