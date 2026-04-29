import type React from "react";
import { CheckCircle } from "@/icons/CheckCircle";
import { Close } from "@/icons/Close";
import { ErrorCircle } from "@/icons/ErrorCircle";
import { Info } from "@/icons/Info";
import { Warning } from "@/icons/Warning";
import { classNames } from "@/utils/classNames";
import styles from "./Banner.module.css";
import type { BannerDesign, BannerProps } from "./Banner.types";

const defaultIcons: Record<BannerDesign, React.ReactNode> = {
	information: <Info size="medium" />,
	positive: <CheckCircle size="medium" />,
	critical: <Warning size="medium" />,
	negative: <ErrorCircle size="medium" />,
};

/**
 * SAP Fiori MessageStrip (Banner)
 *
 * Displays an inline notification message with semantic coloring.
 *
 * @see https://experience.sap.com/fiori-design-web/message-strip/
 */
export const Banner = ({
	title,
	children,
	design = "information",
	dismissible = false,
	onDismiss,
	icon,
	className,
	style,
	...rest
}: BannerProps) => {
	const showIcon = icon !== null;
	const resolvedIcon = icon === undefined ? defaultIcons[design] : icon;

	return (
		<div
			role="alert"
			className={classNames(styles.root, styles[design], className)}
			style={style}
			{...rest}
		>
			{showIcon && (
				<span className={classNames(styles.icon)}>{resolvedIcon}</span>
			)}
			<div className={classNames(styles.content)}>
				{title && <span className={classNames(styles.title)}>{title}</span>}
				{children && (
					<span className={classNames(styles.description)}>{children}</span>
				)}
			</div>
			{dismissible && (
				<button
					type="button"
					className={classNames(styles.closeButton)}
					onClick={onDismiss}
					aria-label="Dismiss"
				>
					<Close size="medium" />
				</button>
			)}
		</div>
	);
};
