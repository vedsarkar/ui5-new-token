import { classNames } from "@/utils/classNames";
import styles from "./Tabs.module.css";
import type { TabsProps } from "./Tabs.types";

/**
 * SAP Fiori Tab Bar (Inline Mode)
 *
 * Horizontal tab navigation with selection indicator bar.
 * Uses SAP Tab tokens for selected/inactive states.
 *
 * @see https://www.sap.com/design-system/fiori-design-web/ui-elements/tab-bar-web-component/
 */
export const Tabs = ({
	items,
	value,
	onValueChange,
	className,
	...rest
}: TabsProps) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const tabValue = e.currentTarget.dataset.value;
		if (tabValue) {
			onValueChange?.(tabValue);
		}
	};

	return (
		<div
			role="tablist"
			className={classNames(styles.root, className)}
			{...rest}
		>
			{items.map((item) => {
				const isActive = item.value === value;
				return (
					<button
						data-value={item.value}
						key={item.value}
						role="tab"
						type="button"
						disabled={item.disabled}
						aria-selected={isActive}
						className={classNames(styles.tab, isActive && styles.active)}
						onClick={handleClick}
					>
						<span className={classNames(styles.tabContent)}>{item.label}</span>
						{isActive && <span className={classNames(styles.selectionBar)} />}
					</button>
				);
			})}
		</div>
	);
};
