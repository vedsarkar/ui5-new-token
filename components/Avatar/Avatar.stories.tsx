import { Avatar } from "@ui5/webcomponents-react/Avatar";
import { fn } from "storybook/test";
import employeeIcon from "@/icons/sap/employee";
import productIcon from "@/icons/sap/product";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Avatar,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		initials: "JD",
		accessibleName: "Jane Doe",
		onClick: fn(),
	},
});

export default meta;

export const Default = meta.story({});

export const WithIcon = meta.story({
	args: {
		initials: undefined,
		icon: employeeIcon,
		accessibleName: "User",
	},
});

export const WithImage = meta.story({
	args: {
		initials: undefined,
		accessibleName: "Jane Doe",
	},
	render: (args) => (
		<Avatar {...args}>
			<img alt="" src="https://i.pravatar.cc/100?img=12" />
		</Avatar>
	),
});

export const ShapeSquare = meta.story({
	args: {
		shape: "Square",
		initials: undefined,
		icon: productIcon,
		accessibleName: "Product entity",
	},
});

export const Small = meta.story({
	args: {
		size: "S",
	},
});

export const Large = meta.story({
	args: {
		size: "L",
	},
});

export const ColorAccent3 = meta.story({
	args: {
		colorScheme: "Accent3",
	},
});

export const ColorAccent7 = meta.story({
	args: {
		colorScheme: "Accent7",
		initials: "REL",
		accessibleName: "Reltio Tenant",
	},
});

export const PlaceholderColor = meta.story({
	args: {
		colorScheme: "Placeholder",
		initials: "?",
		accessibleName: "Unknown entity",
	},
});

export const InEntityRow = meta.story({
	args: {
		initials: undefined,
	},
	render: () => (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "12px",
				padding: "8px 12px",
				border: "1px solid var(--sapList_BorderColor)",
				borderRadius: "8px",
				width: "320px",
			}}
		>
			<Avatar
				initials="JD"
				size="M"
				colorScheme="Accent4"
				accessibleName="Jane Doe"
			/>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<span style={{ fontWeight: 600 }}>Jane Doe</span>
				<span
					style={{
						fontSize: "12px",
						color: "var(--sapContent_LabelColor)",
					}}
				>
					Account Manager · West Region
				</span>
			</div>
		</div>
	),
});
