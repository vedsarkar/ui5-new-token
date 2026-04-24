import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const PaperPlane = ({
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
			<path d="M13.9831 1.04845C14.576 0.823145 15.1769 1.42403 14.9515 2.01694L10.198 14.5262C9.96256 15.1455 9.06334 15.1616 8.80538 14.5516L6.61234 9.35832L1.4503 7.19558C0.838661 6.93901 0.853622 6.03776 1.47375 5.80197L13.9831 1.04845ZM8.06948 8.95274L9.45918 12.2433L12.3119 4.73477L8.06948 8.95274ZM3.76354 6.53787L7.00423 7.89532L11.2183 3.70471L3.76354 6.53787Z" />
		</svg>
	);
};
