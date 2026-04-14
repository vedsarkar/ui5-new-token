import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const CheckboxOutlined = ({
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
			<path d="M3.30775 18.5C2.80258 18.5 2.375 18.325 2.025 17.975C1.675 17.625 1.5 17.1974 1.5 16.6923V3.30775C1.5 2.80258 1.675 2.375 2.025 2.025C2.375 1.675 2.80258 1.5 3.30775 1.5H16.6923C17.1974 1.5 17.625 1.675 17.975 2.025C18.325 2.375 18.5 2.80258 18.5 3.30775V16.6923C18.5 17.1974 18.325 17.625 17.975 17.975C17.625 18.325 17.1974 18.5 16.6923 18.5H3.30775ZM3.30775 17H16.6923C16.7692 17 16.8398 16.9679 16.9038 16.9038C16.9679 16.8398 17 16.7692 17 16.6923V3.30775C17 3.23075 16.9679 3.16025 16.9038 3.09625C16.8398 3.03208 16.7692 3 16.6923 3H3.30775C3.23075 3 3.16025 3.03208 3.09625 3.09625C3.03208 3.16025 3 3.23075 3 3.30775V16.6923C3 16.7692 3.03208 16.8398 3.09625 16.9038C3.16025 16.9679 3.23075 17 3.30775 17Z" />
		</svg>
	);
};
