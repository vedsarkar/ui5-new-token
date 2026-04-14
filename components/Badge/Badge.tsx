import { classNames } from "@/utils/classNames";
import styles from "./Badge.module.css";
import type { BadgeProps } from "./Badge.types";

export const Badge = ({
	content,
	color = "error",
	max = 99,
	children,
	className,
	...rest
}: BadgeProps) => {
	const isDot = content === undefined || content === null;
	const hasChildren = children !== undefined && children !== null;

	const displayContent =
		!isDot && typeof content === "number" && content > max
			? `${max}+`
			: content;

	return (
		<span
			className={classNames(
				styles.root,
				!hasChildren && styles.standalone,
				className,
			)}
			{...rest}
		>
			{children}
			<span
				className={classNames(
					styles.indicator,
					styles[color],
					isDot && styles.dot,
				)}
			>
				{isDot ? null : displayContent}
			</span>
		</span>
	);
};
