import type React from "react";

/**
 * Props for the Details component
 */
export type DetailsProps = {
	/** @default false */
	open?: boolean;
} & Omit<React.ComponentPropsWithoutRef<"details">, "open">;
