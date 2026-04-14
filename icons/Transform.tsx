import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Transform = ({
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
			viewBox="0 0 20 21"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path d="M13.8462 20.923L10.1923 17.2693L11.2462 16.1845L13.0962 18.0155V15.048H7.2115C6.70633 15.048 6.27875 14.873 5.92875 14.523C5.57892 14.173 5.404 13.7454 5.404 13.2403V7.35575H0.5V5.85575H5.404V2.9075L3.55375 4.7385L2.5 3.65375L6.15375 0L9.80775 3.65375L8.75375 4.7385L6.90375 2.9075V13.2403C6.90375 13.3173 6.93583 13.3878 7 13.452C7.06417 13.516 7.13467 13.548 7.2115 13.548H19.5V15.048H14.596V18.0155L16.4462 16.1845L17.5 17.2693L13.8462 20.923ZM13.0962 11.548V7.6635C13.0962 7.5865 13.0642 7.516 13 7.452C12.9358 7.38783 12.8653 7.35575 12.7885 7.35575H8.90375V5.85575H12.7885C13.2937 5.85575 13.7212 6.03075 14.0712 6.38075C14.4211 6.73075 14.596 7.15834 14.596 7.6635V11.548H13.0962Z" />
		</svg>
	);
};
