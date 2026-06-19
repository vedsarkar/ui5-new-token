import { UploadCollection } from "@ui5/webcomponents-react/UploadCollection";
import { UploadCollectionItem } from "@ui5/webcomponents-react/UploadCollectionItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: UploadCollection,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
	args: {
		accessibleName: "Attached documents",
		style: { width: "480px" },
	},
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<UploadCollection {...args}>
			<UploadCollectionItem fileName="contract.pdf">
				1.2 MB · uploaded 2024-02-01
			</UploadCollectionItem>
			<UploadCollectionItem fileName="source-extract.csv">
				540 KB · uploaded 2024-02-03
			</UploadCollectionItem>
		</UploadCollection>
	),
});

export const Empty = meta.story({
	args: {
		noDataText: "No documents attached",
		noDataDescription: "Drag files here or use the upload action.",
	},
	render: (args) => <UploadCollection {...args} />,
});
