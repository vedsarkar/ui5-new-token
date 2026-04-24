import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ArrowLeft = ({
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
			<path d="M5.73184 3.20469C6.03291 2.92033 6.50697 2.93394 6.79141 3.23496C7.07555 3.53605 7.06208 4.01017 6.76114 4.29455L3.63516 7.24969H14.2465C14.6607 7.24969 14.9965 7.58548 14.9965 7.9997C14.9963 8.41374 14.6606 8.74972 14.2465 8.74972H3.63028L6.76114 11.7049C7.06202 11.9892 7.07563 12.4633 6.79141 12.7644C6.50711 13.0653 6.03294 13.0787 5.73184 12.7947L1.23184 8.54756C0.922506 8.25557 0.922935 7.74884 1.23184 7.45672L5.73184 3.20469Z" />
		</svg>
	);
};
