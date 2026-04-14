import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Edit = ({
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
			<path d="M3 17H4.2615L14.498 6.7635L13.2365 5.502L3 15.7385V17ZM1.5 18.5V15.1155L14.6905 1.93075C14.8417 1.79342 15.0086 1.68733 15.1913 1.6125C15.3741 1.5375 15.5658 1.5 15.7663 1.5C15.9668 1.5 16.1609 1.53558 16.3488 1.60675C16.5367 1.67792 16.7032 1.79108 16.848 1.94625L18.0693 3.18275C18.2244 3.32758 18.335 3.49425 18.401 3.68275C18.467 3.87125 18.5 4.05975 18.5 4.24825C18.5 4.44942 18.4657 4.64133 18.397 4.824C18.3283 5.00683 18.2191 5.17383 18.0693 5.325L4.8845 18.5H1.5ZM13.8562 6.14375L13.2365 5.502L14.498 6.7635L13.8562 6.14375Z" />
		</svg>
	);
};
