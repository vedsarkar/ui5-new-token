import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Explore1 = ({
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
			<path d="M1.5 11V3.30775C1.5 2.80258 1.675 2.375 2.025 2.025C2.375 1.675 2.80258 1.5 3.30775 1.5H9V11H1.5ZM11 1.5H16.6923C17.1974 1.5 17.625 1.675 17.975 2.025C18.325 2.375 18.5 2.80367 18.5 3.311V7H11V1.5ZM11 18.5V9H18.5V16.6923C18.5 17.1974 18.325 17.625 17.975 17.975C17.625 18.325 17.1974 18.5 16.6923 18.5H11ZM1.5 13H9V18.5H3.30775C2.80258 18.5 2.375 18.325 2.025 17.975C1.675 17.625 1.5 17.1963 1.5 16.689V13ZM3 9.5H7.5V3H3.30775C3.21792 3 3.14417 3.02883 3.0865 3.0865C3.02883 3.14417 3 3.21792 3 3.30775V9.5ZM12.5 5.5H17V3.30775C17 3.21792 16.9712 3.14417 16.9135 3.0865C16.8558 3.02883 16.7821 3 16.6923 3H12.5V5.5ZM12.5 10.5V17H16.6923C16.7821 17 16.8558 16.9712 16.9135 16.9135C16.9712 16.8558 17 16.7821 17 16.6923V10.5H12.5ZM3 14.5V16.6923C3 16.7821 3.02883 16.8558 3.0865 16.9135C3.14417 16.9712 3.21792 17 3.30775 17H7.5V14.5H3Z" />
		</svg>
	);
};
