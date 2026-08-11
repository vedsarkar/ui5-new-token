import { ShellBarItem } from "@ui5/webcomponents-react";
import { useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import gridIcon from "@/icons/sap/grid";
import { AppSelectorPopover } from "../AppSelectorPopover";
import type { AppSelectorProps } from "./AppSelector.types";

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

	const placement = useMemo(() => {
		return mapPositionAreaToPlacement(positionArea);
	}, [positionArea]);

	// The popover is rendered through a portal so it never becomes a slotted
	// light-DOM child of a host like ShellBar — only the trigger button stays
	// inline. Otherwise the host would reserve a layout slot for the closed
	// overlay, producing phantom gaps.
	const popover = (
		<AppSelectorPopover
			open={open}
			opener={triggerId}
			apps={apps}
			env={env}
			tenant={tenant}
			placement={placement}
			onClose={() => setOpen(false)}
		/>
	);

	return (
		<>
			<ShellBarItem
				{...rest}
				id={triggerId}
				className={className}
				icon={gridIcon}
				text={label ?? "Applications"}
				onClick={() => setOpen((value) => !value)}
			/>
			{typeof document === "undefined"
				? popover
				: createPortal(popover, document.body)}
		</>
	);
};

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
