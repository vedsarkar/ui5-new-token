import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Logout = ({
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
			<path d="M3.30775 18.5C2.80258 18.5 2.375 18.325 2.025 17.975C1.675 17.625 1.5 17.1974 1.5 16.6923V3.30775C1.5 2.80258 1.675 2.375 2.025 2.025C2.375 1.675 2.80258 1.5 3.30775 1.5H10.0095V3H3.30775C3.23075 3 3.16025 3.03208 3.09625 3.09625C3.03208 3.16025 3 3.23075 3 3.30775V16.6923C3 16.7692 3.03208 16.8398 3.09625 16.9038C3.16025 16.9679 3.23075 17 3.30775 17H10.0095V18.5H3.30775ZM14.2308 14.2692L13.1923 13.1845L15.627 10.75H7.09625V9.25H15.627L13.1923 6.8155L14.2308 5.73075L18.5 10L14.2308 14.2692Z" />
		</svg>
	);
};
