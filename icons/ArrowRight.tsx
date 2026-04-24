import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ArrowRight = ({
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
			<path d="M9.20508 3.23496C9.48952 2.93394 9.96358 2.92033 10.2646 3.20469L14.7646 7.45672C15.0736 7.74884 15.074 8.25557 14.7646 8.54756L10.2646 12.7947C9.96354 13.0787 9.48938 13.0653 9.20508 12.7644C8.92086 12.4633 8.93447 11.9892 9.23535 11.7049L12.3662 8.74972H1.75C1.33592 8.74972 1.00021 8.41374 1 7.9997C1 7.58548 1.33579 7.24969 1.75 7.24969H12.3613L9.23535 4.29455C8.93441 4.01017 8.92093 3.53605 9.20508 3.23496Z" />
		</svg>
	);
};
