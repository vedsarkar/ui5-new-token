import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const CheckboxFilled = ({
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
			<path d="M8.6 13.8538L15.323 7.13075L14.2693 6.077L8.6 11.7463L5.75 8.89625L4.69625 9.95L8.6 13.8538ZM3.30775 18.5C2.80258 18.5 2.375 18.325 2.025 17.975C1.675 17.625 1.5 17.1974 1.5 16.6923V3.30775C1.5 2.80258 1.675 2.375 2.025 2.025C2.375 1.675 2.80258 1.5 3.30775 1.5H16.6923C17.1974 1.5 17.625 1.675 17.975 2.025C18.325 2.375 18.5 2.80258 18.5 3.30775V16.6923C18.5 17.1974 18.325 17.625 17.975 17.975C17.625 18.325 17.1974 18.5 16.6923 18.5H3.30775Z" />
		</svg>
	);
};
