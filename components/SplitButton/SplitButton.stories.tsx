import { Menu } from "@ui5/webcomponents-react/Menu";
import { MenuItem } from "@ui5/webcomponents-react/MenuItem";
import { SplitButton } from "@ui5/webcomponents-react/SplitButton";
import { useRef, useState } from "react";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-icons/dist/save.js";
import "@ui5/webcomponents-icons/dist/decline.js";

const meta = preview.meta({
	component: SplitButton,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Save",
		icon: "save",
		onClick: fn(),
		onArrowClick: fn(),
	},
});

export default meta;

export const Default = meta.story({});

export const Emphasized = meta.story({
	args: {
		design: "Emphasized",
	},
});

export const Positive = meta.story({
	args: {
		design: "Positive",
		children: "Approve",
		icon: undefined,
	},
});

export const Negative = meta.story({
	args: {
		design: "Negative",
		children: "Delete",
		icon: "decline",
	},
});

export const Disabled = meta.story({
	args: {
		disabled: true,
	},
});

export const WithDropdownMenu = meta.story({
	args: {
		design: "Emphasized",
		children: "Save",
		icon: "save",
	},
	render: (args) => {
		const SplitButtonWithMenu = () => {
			const splitRef = useRef<HTMLElement>(null);
			const [menuOpen, setMenuOpen] = useState(false);
			return (
				<>
					<SplitButton
						{...args}
						ref={splitRef as never}
						onArrowClick={() => setMenuOpen(true)}
					/>
					<Menu
						opener={splitRef.current ?? undefined}
						open={menuOpen}
						onClose={() => setMenuOpen(false)}
					>
						<MenuItem text="Save" />
						<MenuItem text="Save and continue" />
						<MenuItem text="Save as draft" />
					</Menu>
				</>
			);
		};
		return <SplitButtonWithMenu />;
	},
});
