import type React from "react";
import { CheckCircle } from "@/icons/CheckCircle";
import { Close } from "@/icons/Close";
import { ErrorCircle } from "@/icons/ErrorCircle";
import { Info } from "@/icons/Info";
import { Warning } from "@/icons/Warning";
import { classNames } from "@/utils/classNames";
import styles from "./Banner.module.css";
import type { BannerColor, BannerProps } from "./Banner.types";

const defaultIcons: Record<BannerColor, React.ReactNode> = {
	info: <Info size="medium" />,
	success: <CheckCircle size="medium" />,
	warning: <Warning size="medium" />,
	error: <ErrorCircle size="medium" />,
};

export const Banner = ({
	title,
	children,
	color = "info",
	dismissible = false,
	onDismiss,
	icon,
	className,
	style,
	...rest
}: BannerProps) => {
	const showIcon = icon !== null;
	const resolvedIcon = icon === undefined ? defaultIcons[color] : icon;

	return (
		<div
			role="alert"
			className={classNames(styles.root, styles[color], className)}
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
