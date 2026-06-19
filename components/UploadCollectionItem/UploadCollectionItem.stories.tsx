import { UploadCollection } from "@ui5/webcomponents-react/UploadCollection";
import { UploadCollectionItem } from "@ui5/webcomponents-react/UploadCollectionItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: UploadCollectionItem,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<UploadCollection style={{ width: "440px" }} accessibleName="Documents">
		<UploadCollectionItem fileName="contract.pdf">
			1.2 MB · uploaded 2024-02-01
		</UploadCollectionItem>
		<UploadCollectionItem fileName="extract.csv">540 KB</UploadCollectionItem>
	</UploadCollection>
));
