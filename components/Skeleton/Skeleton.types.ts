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
};
