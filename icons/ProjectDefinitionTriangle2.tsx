import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ProjectDefinitionTriangle2 = ({
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
			<path d="M6.43821 1.96589C7.08332 0.675853 8.92451 0.676641 9.56904 1.96687L14.8131 12.47C15.3936 13.6333 14.5479 15.0011 13.2477 15.0012H2.7527C1.45208 15.0011 0.605884 13.6324 1.18729 12.469L6.43821 1.96589Z" />
		</svg>
	);
};
