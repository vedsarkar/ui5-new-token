import { Avatar } from "@ui5/webcomponents-react/Avatar";
import { Button } from "@ui5/webcomponents-react/Button";
import { Popover } from "@ui5/webcomponents-react/Popover";
import { ProductSwitch } from "@ui5/webcomponents-react/ProductSwitch";
import { ProductSwitchItem } from "@ui5/webcomponents-react/ProductSwitchItem";
import { useId, useState } from "react";
import gridIcon from "@/icons/sap/grid";
import internetBrowserIcon from "@/icons/sap/internet-browser";
import { classNames } from "@/utils/classNames";
import styles from "./AppSelector.module.css";
import type { AppEntry, AppSelectorProps } from "./AppSelector.types";

const DEFAULT_CATEGORY = "Applications";
const FALLBACK_ICON = internetBrowserIcon;

type Placement = "Top" | "Bottom" | "Start" | "End";

/** Application navigator popover for switching between the Reltio platform apps available to the current tenant. */
export const AppSelector = ({
	apps,
	env,
	tenant,
	label,
	className,
	positionArea = "right span-top",
	...rest
}: AppSelectorProps) => {
	const reactId = useId();
	const triggerId = `reltio-app-selector-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
	const [open, setOpen] = useState(false);

	const orderedApps = groupAndOrderApps(apps);
	const placement = mapPositionAreaToPlacement(positionArea);
	const accessibleName = label || "Applications";

	return (
		<nav
			className={classNames(styles.root, className)}
			aria-label="Applications"
			{...rest}
		>
			<Button
				id={triggerId}
				design="Transparent"
				icon={gridIcon}
				accessibleName={accessibleName}
				onClick={() => setOpen((value) => !value)}
			>
				{label}
			</Button>
			<Popover
				opener={triggerId}
				open={open}
				placement={placement}
				onClose={() => setOpen(false)}
			>
				<ProductSwitch>
					{orderedApps.map((app) => (
						<ProductSwitchItem
							key={app.name}
							titleText={app.name}
							subtitleText={app.category || DEFAULT_CATEGORY}
							targetSrc={resolveUri(app.uri, env, tenant)}
							target="_blank"
							icon={app.icon ? undefined : FALLBACK_ICON}
							image={
								app.icon ? (
									<Avatar size="S" shape="Square" colorScheme="Transparent">
										<img src={app.icon} alt="" />
									</Avatar>
								) : undefined
							}
						/>
					))}
				</ProductSwitch>
			</Popover>
		</nav>
	);
};

/** Filter out incomplete entries and sort so that apps sharing a category
 * stay adjacent in the flat `ProductSwitch` grid. Categories appear in the
 * order they are first seen in the input; apps within a category preserve
 * their relative input order. */
const groupAndOrderApps = (apps: AppEntry[]): AppEntry[] => {
	const validApps = apps.filter((app) => app.name && app.uri);
	const groups = Object.groupBy(
		validApps,
		({ category }) => category || DEFAULT_CATEGORY,
	);
	return Object.values(groups)
		.flat()
		.filter((app): app is AppEntry => app !== undefined);
};

const resolveUri = (
	uri: string | undefined,
	env: string | undefined,
	tenant: string | undefined,
): string | undefined =>
	uri
		// biome-ignore lint/suspicious/noTemplateCurlyInString: intentional URI template placeholders
		?.replaceAll("${environment}", String(env))
		// biome-ignore lint/suspicious/noTemplateCurlyInString: intentional URI template placeholders
		.replaceAll("${tenant}", String(tenant));

/** Map a CSS `position-area`-style string to the UI5 `Popover` placement enum. */
const mapPositionAreaToPlacement = (positionArea: string): Placement => {
	const first = positionArea.trim().toLowerCase().split(/\s+/)[0];
	switch (first) {
		case "top":
			return "Top";
		case "bottom":
			return "Bottom";
		case "left":
			return "Start";
		case "right":
			return "End";
		default:
			return "Bottom";
	}
};
