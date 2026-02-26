import { classNames } from "@/utils/classNames";
import styles from "./AssistantLoader.module.css";
import type { AssistantLoaderProps } from "./AssistantLoader.types";

const LOADING_GIF_SRC = "/icons/loading.gif";
const DEFAULT_LABEL = "thinking";

/**
 * Displays a standardized loading indicator for assistant responses using a GIF animation.
 * Includes accessibility attributes (aria-busy, aria-label, role="status").
 */
export const AssistantLoader = ({
	className,
	size,
	style,
	...rest
}: AssistantLoaderProps) => {
	const rootStyle = size
		? ({ ...style, "--size": size } as React.CSSProperties)
		: style;

	return (
		// biome-ignore lint/a11y/useSemanticElements: status role is correct for loading placeholder; output is for calculation results
		<div
			className={classNames(styles.root, className)}
			aria-busy="true"
			aria-label={DEFAULT_LABEL}
			role="status"
			style={rootStyle}
			{...rest}
		>
			<img
				src={LOADING_GIF_SRC}
				alt=""
				className={classNames(styles.indicator)}
				aria-hidden="true"
			/>
			<div className={classNames(styles.dotFlashing)} aria-hidden="true" />
		</div>
	);
};
