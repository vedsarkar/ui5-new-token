import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Bell2 = ({
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
			<path d="M7.99992 1C10.2093 1 11.6281 1.95567 12.4515 3.31543C13.2398 4.61717 13.4415 6.21709 13.4415 7.50488V8.14062C13.4415 9.2129 13.7823 10.1174 14.1324 10.7617C14.3209 11.1085 14.5407 11.4382 14.8009 11.7354C15.2431 12.204 14.8992 13 14.2546 13H10.4178C10.1367 14.15 9.16176 15 7.99992 15C6.83815 14.9999 5.86314 14.1499 5.5821 13H1.74524C1.09932 12.9998 0.756212 12.2016 1.20089 11.7334C1.45797 11.4627 1.67665 11.1127 1.8674 10.7617C2.21754 10.1174 2.55835 9.21295 2.55835 8.14062V7.50488C2.55835 6.21712 2.76013 4.61716 3.54835 3.31543C4.37175 1.95566 5.79064 1.00006 7.99992 1Z" />
		</svg>
	);
};
