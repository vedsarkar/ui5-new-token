import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Sum = ({
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
			<path d="M13.2501 1C13.6643 1 14.0001 1.33579 14.0001 1.75C14.0001 2.16421 13.6643 2.5 13.2501 2.5H4.88879L10.7189 7.16406C10.8927 7.30316 10.9957 7.51273 11.0001 7.73535C11.0045 7.95786 10.9095 8.1706 10.7413 8.31641L4.75988 13.5H13.2501C13.6643 13.5 14.0001 13.8358 14.0001 14.25C14.0001 14.6642 13.6643 15 13.2501 15H2.75012C2.43701 15 2.15643 14.8051 2.04699 14.5117C1.93787 14.2186 2.02257 13.8886 2.25891 13.6836L9.07824 7.77344L2.28137 2.33594C2.03272 2.13702 1.93683 1.80244 2.04211 1.50195C2.14754 1.20139 2.4316 1 2.75012 1H13.2501Z" />
		</svg>
	);
};
