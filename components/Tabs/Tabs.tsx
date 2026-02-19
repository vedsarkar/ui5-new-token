import { classNames } from "@/utils/classNames";
import styles from "./Tabs.module.css";
import type { TabsProps } from "./Tabs.types";

export const Tabs = ({
	items,
	value,
	onValueChange,
	className,
	...rest
}: TabsProps) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const value = e.currentTarget.dataset.value;
		if (value) {
			onValueChange?.(value);
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
						{item.label}
					</button>
				);
			})}
		</div>
	);
};
