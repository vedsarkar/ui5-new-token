import { MediaGallery } from "@ui5/webcomponents-react/MediaGallery";
import { MediaGalleryItem } from "@ui5/webcomponents-react/MediaGalleryItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: MediaGalleryItem,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
		dualTheme: { split: "vertical" },
	},
});

export default meta;

export const Default = meta.story(() => (
	<MediaGallery style={{ height: "280px", width: "440px" }}>
		<MediaGalleryItem>
			<img
				slot="thumbnail"
				alt=""
				src="https://picsum.photos/seed/11/200/200"
				style={{ width: "100%", height: "100%", objectFit: "cover" }}
			/>
		</MediaGalleryItem>
		<MediaGalleryItem>
			<img
				slot="thumbnail"
				alt=""
				src="https://picsum.photos/seed/22/200/200"
				style={{ width: "100%", height: "100%", objectFit: "cover" }}
			/>
		</MediaGalleryItem>
	</MediaGallery>
));
