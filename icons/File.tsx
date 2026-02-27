import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const File = ({
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
			<path d="M6.25 15.75H13.75V14.25H6.25V15.75ZM6.25 11.75H13.75V10.25H6.25V11.75ZM4.30775 19.5C3.80258 19.5 3.375 19.325 3.025 18.975C2.675 18.625 2.5 18.1974 2.5 17.6923V2.30775C2.5 1.80258 2.675 1.375 3.025 1.025C3.375 0.675 3.80258 0.5 4.30775 0.5H12.25L17.5 5.75V17.6923C17.5 18.1974 17.325 18.625 16.975 18.975C16.625 19.325 16.1974 19.5 15.6923 19.5H4.30775ZM11.5 6.5V2H4.30775C4.23075 2 4.16025 2.03208 4.09625 2.09625C4.03208 2.16025 4 2.23075 4 2.30775V17.6923C4 17.7693 4.03208 17.8398 4.09625 17.9038C4.16025 17.9679 4.23075 18 4.30775 18H15.6923C15.7692 18 15.8398 17.9679 15.9038 17.9038C15.9679 17.8398 16 17.7693 16 17.6923V6.5H11.5Z" />
		</svg>
	);
};
