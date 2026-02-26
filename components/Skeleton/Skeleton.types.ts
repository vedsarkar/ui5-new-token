import type React from "react";

/**
 * Props for the Skeleton component
 */
export type SkeletonProps = Omit<
	React.ComponentPropsWithoutRef<"div">,
	"children"
> & {
	/**
	 * Number of rectangular placeholder bars to display
	 * @default 3
	 */
	rows?: number;
	/** Height of each row bar (e.g. "16px", "1rem", "2em"). Defaults to 16px. */
	size?: string;
};
