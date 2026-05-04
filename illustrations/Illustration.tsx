import { classNames } from "@/utils/classNames";
import styles from "./Illustration.module.css";
import type { IllustrationCoreProps } from "./Illustration.types";

export const Illustration = ({
	size = "dialog",
	title,
	description,
	className,
	children,
	...rest
}: IllustrationCoreProps) => {
	const isHidden = title === "";
	const a11yProps = isHidden
		? { "aria-hidden": true as const }
		: { role: "img", "aria-label": title };
	return (
		<div
			className={classNames(styles.root, styles[size], className)}
			{...a11yProps}
			{...rest}
		>
			{children}
			{description ? (
				<span className={classNames(styles.srOnly)}>{description}</span>
			) : null}
		</div>
	);
};
