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
		// biome-ignore lint/a11y/useSemanticElements: div with role="separator" supports children (labeled divider)
		// biome-ignore lint/a11y/useFocusableInteractive: non-interactive separator, no focus needed
		<div
			// biome-ignore lint/a11y/useAriaPropsForRole: visual separator, aria-valuenow not applicable for static divider
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
