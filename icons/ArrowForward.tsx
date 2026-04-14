import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ArrowForward = ({
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
			viewBox="0 -960 960 960"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
		</svg>
	);
};
