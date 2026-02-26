import type React from "react";

/**
 * Props for the AssistantLoader component
 */
export type AssistantLoaderProps = React.ComponentPropsWithoutRef<"div"> & {
	/** Overall size of the loader (e.g. "32px", "2rem", "100%"). Defaults to 32px. */
	size?: string;
};
