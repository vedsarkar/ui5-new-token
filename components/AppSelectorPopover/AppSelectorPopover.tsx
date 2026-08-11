import { Avatar } from "@ui5/webcomponents-react/Avatar";
import { Popover } from "@ui5/webcomponents-react/Popover";
import { ProductSwitch } from "@ui5/webcomponents-react/ProductSwitch";
import { ProductSwitchItem } from "@ui5/webcomponents-react/ProductSwitchItem";
import { useMemo } from "react";
import internetBrowserIcon from "@/icons/sap/internet-browser";
import type { AppSelectorPopoverProps } from "./AppSelectorPopover.types";
import {
	buildTargetSrc,
	DEFAULT_CATEGORY,
	orderApps,
} from "./AppSelectorPopover.utils";

/**
 * Application-catalog popover built on top of the SAP Fiori
 * [`ProductSwitch`](https://ui5.github.io/webcomponents/components/fiori/ProductSwitch/).
 *
 * `AppSelectorPopover` renders **only the popover** — it does NOT own a
 * trigger. The caller must supply an `opener` (element or element ID) and
 * drive `open` / `onClose` externally. This split makes the popover reusable
 * from any anchor and lets `<ShellBar>` mount it against UI5's native
 * product-switch button without a duplicate custom-item wrapper in the
 * default slot.
 *
 * The apps list follows the Reltio Config Service shape:
 * - Apps missing `name` or `uri` are silently filtered out.
 * - Apps are re-ordered so that entries sharing a `category` stay adjacent
 *   in the flat `ProductSwitch` grid; category order matches first
 *   appearance in the input.
 * - `${environment}` / `${tenant}` placeholders in `uri` are substituted
 *   with the `env` / `tenant` props.
 * - `icon` is optional; when omitted the item falls back to the SAP
 *   `internet-browser` icon so the grid stays uniform.
 */
export const AppSelectorPopover = ({
	open,
	apps,
	env,
	tenant,
	placement = "Bottom",
	onClose,
	...props
}: AppSelectorPopoverProps) => {
	const orderedApps = useMemo(() => orderApps(apps), [apps]);

	return (
		<Popover open={open} placement={placement} {...props} onClose={onClose}>
			<ProductSwitch>
				{orderedApps.map((app) => (
					<ProductSwitchItem
						key={app.name}
						titleText={app.name}
						subtitleText={app.category || DEFAULT_CATEGORY}
						targetSrc={buildTargetSrc(app.uri, env, tenant)}
						target="_blank"
						icon={app.icon ? undefined : internetBrowserIcon}
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
	);
};
