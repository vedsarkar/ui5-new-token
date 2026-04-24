import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Undo = ({
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
			<path d="M5.79312 1.48495C5.50877 1.18388 5.03471 1.1704 4.73355 1.45468L0.233547 5.70175C-0.0755866 5.99376 -0.0755541 6.50048 0.233547 6.79257L4.73355 11.0445C5.03456 11.3286 5.50871 11.315 5.79312 11.0142C6.0774 10.7132 6.06366 10.2391 5.76284 9.95468L2.63687 6.9996H11.2482C13.0431 6.9996 14.4982 8.45468 14.4982 10.2496C14.498 12.0443 13.043 13.4996 11.2482 13.4996H4.7482C4.33398 13.4996 3.9982 13.8354 3.9982 14.2496C3.99841 14.6636 4.33412 14.9996 4.7482 14.9996H11.2482C13.8714 14.9996 15.998 12.8728 15.9982 10.2496C15.9982 7.62625 13.8715 5.4996 11.2482 5.4996H2.63198L5.76284 2.54452C6.06385 2.26024 6.07719 1.78613 5.79312 1.48495Z" />
		</svg>
	);
};
