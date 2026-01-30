import { classNames } from "@/utils/classNames";
import styles from "./Loading.module.css";
import type { LoadingProps } from "./Loading.types";

const DEFAULT_LABEL = "Loading";

/**
 * Loading component path relative to public (served from root in Storybook/Vite).
 */
const LOADING_GIF_SRC = "/icons/loading.gif";

/**
 * Loading Component
 *
 * Displays a standardized loading indicator using a GIF animation.
 * Supports size variants and accessibility attributes (aria-busy, aria-label).
 */
export const Loading = ({
	size = "medium",
	label,
	className,
	style,
	...rest
}: LoadingProps) => {
	const ariaLabel = label ?? DEFAULT_LABEL;

	return (
		// biome-ignore lint/a11y/useSemanticElements: status role is correct for loading indicator; output is for calculation results
		<div
			className={classNames(styles.root, styles[size], className)}
			style={style}
			aria-busy="true"
			aria-label={ariaLabel}
			role="status"
			{...rest}
		>
			<img
				src={LOADING_GIF_SRC}
				alt=""
				className={styles.indicator}
				aria-hidden="true"
			/>
			<div className={classNames(styles.dotFlashing)} aria-hidden="true" />
		</div>
	);
};
