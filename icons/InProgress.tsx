import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const InProgress = ({
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
			<path d="M12.25 1C13.7688 1 15 2.23122 15 3.75V12.25C15 13.7688 13.7688 15 12.25 15H3.75C2.23122 15 1 13.7688 1 12.25V3.75C1 2.23122 2.23122 1 3.75 1H12.25ZM3.75 2.5C3.05964 2.5 2.5 3.05964 2.5 3.75V12.25C2.5 12.9404 3.05964 13.5 3.75 13.5H12.25C12.9404 13.5 13.5 12.9404 13.5 12.25V3.75C13.5 3.05964 12.9404 2.5 12.25 2.5H3.75ZM7.75 3.99512C8.16421 3.99512 8.5 4.3309 8.5 4.74512V8.18457L10.0303 9.71484C10.3232 10.0077 10.3232 10.4825 10.0303 10.7754C9.73738 11.0683 9.26262 11.0683 8.96973 10.7754L7.21973 9.02539C7.07908 8.88474 7 8.69403 7 8.49512V4.74512C7 4.3309 7.33579 3.99512 7.75 3.99512Z" />
		</svg>
	);
};
