import { classNames } from "@/utils/classNames";
import styles from "./Skeleton.module.css";
import type { SkeletonProps } from "./Skeleton.types";

const DEFAULT_LABEL = "Loading content";
const DEFAULT_ROWS = 3;

/**
 * Displays a configurable number of rectangular placeholder bars with a shimmer
 * (moving gradient) animation. Used as a loading placeholder to reserve space
 * and indicate that content is loading. Full width by default.
 */
export const Skeleton = ({
	rows = DEFAULT_ROWS,
	className,
	...rest
}: SkeletonProps) => {
	const rowCount = Math.max(1, Math.floor(Number(rows)) || DEFAULT_ROWS);

	return (
		// biome-ignore lint/a11y/useSemanticElements: status role is correct for loading placeholder; output is for calculation results
		<div
			className={classNames(styles.skeletonRoot, className)}
			aria-busy="true"
			aria-label={DEFAULT_LABEL}
			role="status"
			{...rest}
		>
			{Array.from({ length: rowCount }, (_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: static placeholder list, order never changes
					key={i}
					className={classNames(styles.row)}
					aria-hidden="true"
				/>
			))}
		</div>
	);
};
