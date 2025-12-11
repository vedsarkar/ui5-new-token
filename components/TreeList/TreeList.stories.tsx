import type { Meta, StoryObj } from "@storybook/react";
import { TreeList } from "./TreeList";
import type { TreeItem } from "./TreeList.types";

const defaultData: TreeItem[] = [
	{
		id: "root",
		label: "Root",
		children: [
			{ id: "a", label: "Node A" },
			{
				id: "b",
				label: "Node B",
				children: [
					{ id: "b1", label: "Child B1" },
					{
						id: "b2",
						label: "Child B2",
						children: [
							{
								id: "b21",
								label: "Child B21",
								children: [
									{ id: "b211", label: "Child B211" },
									{ id: "b212", label: "Child B212" },
								],
							},
							{ id: "b22", label: "Child B22" },
						],
					},
				],
			},
		],
	},
];

const meta: Meta<typeof TreeList> = {
	title: "Components/TreeList",
	component: TreeList,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		data: { control: { type: "object" } },
		onItemClick: { action: "itemClick" },
	},
	args: {
		data: defaultData,
	},
};

export default meta;

type Story = StoryObj<typeof TreeList>;

export const Default: Story = {
	render: (args) => (
		<div style={{ width: 400, height: 300 }}>
			<TreeList {...args} />
		</div>
	),
};
