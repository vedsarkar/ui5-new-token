import { Icon } from "@ui5/webcomponents-react/Icon";
import type { ReactNode } from "react";
import barChartIcon from "@/icons/sap/bar-chart";
import discussionIcon from "@/icons/sap/discussion";
import historyIcon from "@/icons/sap/history";
import listIcon from "@/icons/sap/list";
import sourceCodeIcon from "@/icons/sap/source-code";
import { classNames } from "@/utils/classNames";

import styles from "./pageChrome.module.css";

/**
 * Chrome shared by the reference screens. These are page-local compositions,
 * not design-system components — they exist because the screens repeat them,
 * and they stay here rather than in `components/` until a product needs them.
 */

const railItems = [
	{ icon: discussionIcon, label: "Conversations" },
	{ icon: historyIcon, label: "Discover" },
	{ icon: listIcon, label: "Spaces" },
	{ icon: barChartIcon, label: "Analytics" },
	{ icon: sourceCodeIcon, label: "Develop" },
];

/** The collapsed product rail down the left edge. */
export const IconRail = ({ selected = 0 }: { selected?: number }) => (
	<nav aria-label="Product navigation" className={classNames(styles.iconRail)}>
		<span className={classNames(styles.railLogo)}>
			<Icon name={sourceCodeIcon} style={{ width: 24, height: 24 }} />
		</span>
		{railItems.map((item, index) => (
			<button
				aria-current={index === selected ? "page" : undefined}
				aria-label={item.label}
				className={classNames(
					styles.railItem,
					index === selected && styles.railItemSelected,
				)}
				key={item.label}
				type="button"
			>
				<Icon name={item.icon} style={{ width: 20, height: 20 }} />
			</button>
		))}
	</nav>
);

/** A content panel: a header row above the card's body. */
export const PanelCard = ({
	title,
	icon,
	actions,
	children,
	flexible = false,
	flush = false,
	className,
}: {
	title: ReactNode;
	icon?: string;
	actions?: ReactNode;
	children: ReactNode;
	flexible?: boolean;
	flush?: boolean;
	className?: string;
}) => (
	<section
		className={classNames(
			styles.card,
			flexible && styles.cardFlexible,
			className,
		)}
	>
		<header className={classNames(styles.cardHeader)}>
			{icon ? (
				<span className={classNames(styles.cardHeaderIcon)}>
					<Icon name={icon} style={{ width: 20, height: 20 }} />
				</span>
			) : null}
			<span className={classNames(styles.cardTitle)}>{title}</span>
			{actions}
		</header>
		<div className={classNames(styles.cardBody, flush && styles.cardBodyFlush)}>
			{children}
		</div>
	</section>
);

export { styles as pageChromeStyles };
