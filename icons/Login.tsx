import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Login = ({
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
			{...props}
		>
			<path d="M9.9905 18.5V17H16.6923C16.7692 17 16.8398 16.9679 16.9038 16.9038C16.9679 16.8398 17 16.7692 17 16.6923V3.30775C17 3.23075 16.9679 3.16025 16.9038 3.09625C16.8398 3.03208 16.7692 3 16.6923 3H9.9905V1.5H16.6923C17.1974 1.5 17.625 1.675 17.975 2.025C18.325 2.375 18.5 2.80258 18.5 3.30775V16.6923C18.5 17.1974 18.325 17.625 17.975 17.975C17.625 18.325 17.1974 18.5 16.6923 18.5H9.9905ZM8.63475 14.2692L7.59625 13.1845L10.0308 10.75H1.5V9.25H10.0308L7.59625 6.8155L8.63475 5.73075L12.9038 10L8.63475 14.2692Z" />
		</svg>
	);
};
