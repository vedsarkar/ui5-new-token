import { classNames } from "@/utils/classNames";
import styles from "./Divider.module.css";
import type { DividerProps } from "./Divider.types";

export const Divider = ({
	align = "start",
	children,
	className,
	...rest
}: DividerProps) => {
	return (
		<div
			role="separator"
			className={classNames(
				styles.root,
				children ? styles.labeled : styles.plain,
				children ? styles[align] : undefined,
				className,
			)}
			{...rest}
		>
			{children}
		</div>
	);
};
