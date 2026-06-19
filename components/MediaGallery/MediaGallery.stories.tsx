import { MediaGallery } from "@ui5/webcomponents-react/MediaGallery";
import { MediaGalleryItem } from "@ui5/webcomponents-react/MediaGalleryItem";
import preview from "../../.storybook/preview";

const img = (seed: number) => (
	<img
		slot="thumbnail"
		alt=""
		src={`https://picsum.photos/seed/${seed}/200/200`}
		style={{ width: "100%", height: "100%", objectFit: "cover" }}
	/>
);

const meta = preview.meta({
	component: MediaGallery,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
		dualTheme: { split: "vertical" },
	},
	args: {
		style: { height: "320px", width: "480px" },
	},
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<MediaGallery {...args}>
			<MediaGalleryItem>{img(11)}</MediaGalleryItem>
			<MediaGalleryItem>{img(22)}</MediaGalleryItem>
			<MediaGalleryItem>{img(33)}</MediaGalleryItem>
		</MediaGallery>
	),
});

export const AllThumbnails = meta.story({
	args: {
		showAllThumbnails: true,
	},
	render: (args) => (
		<MediaGallery {...args}>
			<MediaGalleryItem>{img(11)}</MediaGalleryItem>
			<MediaGalleryItem>{img(22)}</MediaGalleryItem>
			<MediaGalleryItem>{img(33)}</MediaGalleryItem>
			<MediaGalleryItem>{img(44)}</MediaGalleryItem>
		</MediaGallery>
	),
});
