import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Flag = ({
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
			<path d="M2.75 0C3.16421 0 3.5 0.335786 3.5 0.75V1.31445C4.86261 0.785466 6.40273 0.921374 7.69141 1.76758C7.8472 1.87144 8.01926 1.9566 8.18066 2.05176L8.18164 2.05273C9.75905 3.06056 11.3643 2.90267 12.9492 2.08887C13.1817 1.96949 13.4176 1.97905 13.6406 2.11523C13.8636 2.25142 14 2.49357 14 2.75488V10.2256C14 10.4909 13.8593 10.7362 13.6309 10.8711L13.6299 10.8721C11.6322 12.0642 9.37381 12.5226 7.35547 11.1484C7.20521 11.048 7.05415 10.9486 6.9043 10.8477C5.9125 10.1786 4.6176 10.2833 3.5 11.0156V15.25C3.5 15.6642 3.16421 16 2.75 16C2.33579 16 2 15.6642 2 15.25V0.75C2 0.335786 2.33579 0 2.75 0Z" />
		</svg>
	);
};
