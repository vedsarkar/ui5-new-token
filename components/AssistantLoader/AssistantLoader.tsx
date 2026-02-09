import type React from "react";
import { classNames } from "@/utils/classNames";
import styles from "./AssistantLoader.module.css";
import type { AssistantLoaderProps } from "./AssistantLoader.types";

const DEFAULT_LABEL = "Loading";

/**
 * Assistant loader component path relative to public (served from root in Storybook/Vite).
 */
const LOADING_GIF_SRC = "/icons/loading.gif";

const DEFAULT_SIZE_PX = 32;

/**
 * AssistantLoader Component
 *
 * Displays a standardized loading indicator for assistant responses using a GIF animation.
 * Size is specified in pixels. Supports accessibility attributes (aria-busy, aria-label).
 */
export const AssistantLoader = ({
	size = DEFAULT_SIZE_PX,
	label,
	className,
	style,
	...rest
}: AssistantLoaderProps) => {
	const ariaLabel = label ?? DEFAULT_LABEL;
	const sizeStyle =
		size !== undefined
			? ({
					"--reltio-assistant-loader-size": `${size}px`,
				} as React.CSSProperties)
			: undefined;
	const mergedStyle = { ...sizeStyle, ...style };

	return (
		// biome-ignore lint/a11y/useSemanticElements: status role is correct for loading indicator; output is for calculation results
		<div
			className={classNames(styles.root, className)}
			style={mergedStyle}
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
