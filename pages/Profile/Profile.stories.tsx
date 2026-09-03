import preview from "../../.storybook/preview";
import { Profile } from "./Profile";

const meta = preview.meta({
	title: "Pages/Profile",
	component: Profile,
	parameters: {
		layout: "fullscreen",
		// The screen is a fixed 1440×900 fidelity reference, so the two themes
		// stack rather than sitting side by side.
		dualTheme: { split: "vertical" },
	},
});

export default meta;

export const Default = meta.story({});
