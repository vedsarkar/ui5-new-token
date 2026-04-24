import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Response = ({
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
			<path d="M6.79492 1.2352C6.51058 0.934122 6.03652 0.92064 5.73535 1.20492L1.23535 5.45199C1.08553 5.59352 1.00018 5.79082 1 5.99691C1.00006 6.20312 1.08547 6.40118 1.23535 6.54281L5.73535 10.7948C6.03636 11.0789 6.51052 11.0652 6.79492 10.7645C7.07921 10.4635 7.06547 9.98939 6.76465 9.70492L3.63867 6.74984H7.25C10.7018 6.74984 13.5 9.54807 13.5 12.9998V14.2498C13.5002 14.6639 13.8359 14.9998 14.25 14.9998C14.6641 14.9998 14.9998 14.6639 15 14.2498V12.9998C15 8.71964 11.5302 5.24984 7.25 5.24984H3.63379L6.76465 2.29477C7.06565 2.01049 7.079 1.53637 6.79492 1.2352Z" />
		</svg>
	);
};
