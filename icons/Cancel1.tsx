import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Cancel1 = ({
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
			<path d="M6.22695 14.8365L5.16345 13.773L8.93645 10L5.16345 6.25201L6.22695 5.18851L9.99995 8.96151L13.748 5.18851L14.8115 6.25201L11.0385 10L14.8115 13.773L13.748 14.8365L9.99995 11.0635L6.22695 14.8365Z" />
		</svg>
	);
};
