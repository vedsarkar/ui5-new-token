import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ViewMap = ({
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
			<path d="M13 18.4615L7 16.3615L2.69625 18.0268C2.40142 18.1409 2.12833 18.1083 1.877 17.9288C1.62567 17.7493 1.5 17.5038 1.5 17.1923V4.07701C1.5 3.87951 1.55292 3.70226 1.65875 3.54526C1.76442 3.38826 1.91283 3.27451 2.104 3.20401L7 1.53851L13 3.63851L17.3038 1.97326C17.5986 1.8591 17.8717 1.88693 18.123 2.05676C18.3743 2.2266 18.5 2.4641 18.5 2.76926V15.9615C18.5 16.1653 18.4423 16.3442 18.327 16.498C18.2115 16.6518 18.0551 16.764 17.8577 16.8345L13 18.4615ZM12.25 16.627V4.92701L7.75 3.35376V15.0538L12.25 16.627ZM13.75 16.627L17 15.55V3.70001L13.75 4.92701V16.627ZM3 16.3L6.25 15.0538V3.35376L3 4.45001V16.3Z" />
		</svg>
	);
};
