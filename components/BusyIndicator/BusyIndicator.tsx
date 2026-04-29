import { useEffect, useState } from "react";
import { useId } from "@/hooks/useId";
import { classNames } from "@/utils/classNames";
import styles from "./BusyIndicator.module.css";
import type { BusyIndicatorProps } from "./BusyIndicator.types";

/**
 * SAP Fiori BusyIndicator
 *
 * An indeterminate loading indicator with three animated dots.
 * Supports size variants, optional text label, delay mechanism,
 * and overlay mode for wrapping content.
 *
 * @see https://experience.sap.com/fiori-design-web/busy-indicator/
 */
export const BusyIndicator = ({
	active = false,
	delay = 1000,
	size = "M",
	text,
	children,
	className,
	...rest
}: BusyIndicatorProps) => {
	const [isBusy, setIsBusy] = useState(false);
	const labelId = useId("busy-indicator");

	useEffect(() => {
		if (!active) {
			setIsBusy(false);
			return;
		}

		if (delay <= 0) {
			setIsBusy(true);
			return;
		}

		const timer = setTimeout(() => setIsBusy(true), delay);
		return () => clearTimeout(timer);
	}, [active, delay]);

	const hasChildren = children != null;

	const busyArea = isBusy ? (
		<div
			className={classNames(
				styles.busyArea,
				hasChildren && styles.busyAreaOverlay,
			)}
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuetext="Busy"
			aria-labelledby={text ? labelId : undefined}
			title="Please wait"
			tabIndex={hasChildren ? 0 : undefined}
		>
			<div className={classNames(styles.dots)}>
				<span className={classNames(styles.dot, styles.dot1)} />
				<span className={classNames(styles.dot, styles.dot2)} />
				<span className={classNames(styles.dot, styles.dot3)} />
			</div>
			{text && (
				<span id={labelId} className={classNames(styles.text)}>
					{text}
				</span>
			)}
		</div>
	) : null;

	if (hasChildren) {
		return (
			<div
				className={classNames(styles.overlay, styles[size], className)}
				{...rest}
			>
				<div
					className={classNames(
						styles.overlayContent,
						isBusy && styles.overlayContentDimmed,
					)}
				>
					{children}
				</div>
				{busyArea}
			</div>
		);
	}

	if (!isBusy) return null;

	return (
		<div className={classNames(styles.root, styles[size], className)} {...rest}>
			{busyArea}
		</div>
	);
};
