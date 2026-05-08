import { classNames } from "@/utils/classNames";
import styles from "./Skeleton.module.css";
import type { SkeletonProps } from "./Skeleton.types";

const DEFAULT_LABEL = "Loading content";
const DEFAULT_ROWS = 3;

/** Loading placeholder that shows N rectangular bars with a shimmer animation while content is being fetched. */
export const Skeleton = ({
	rows = DEFAULT_ROWS,
	size,
	className,
	style,
	...rest
}: SkeletonProps) => {
	const rowCount = Math.max(1, Math.floor(Number(rows)) || DEFAULT_ROWS);
	const rowStyle = size ? { height: size } : undefined;

	return (
		// biome-ignore lint/a11y/useSemanticElements: status role is correct for loading placeholder; output is for calculation results
		<div
			className={classNames(styles.skeletonRoot, className)}
			aria-busy="true"
			aria-label={DEFAULT_LABEL}
			role="status"
			style={style}
			{...rest}
		>
			{Array.from({ length: rowCount }, (_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: static placeholder list, order never changes
					key={i}
					className={classNames(styles.row)}
					style={rowStyle}
					aria-hidden="true"
				/>
			))}
		</div>
	);
};
