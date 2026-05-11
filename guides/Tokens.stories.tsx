import tokens from "@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/variables.json";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TokenTable } from "@/.storybook/blocks/TokenTable";

const root = (tokens as { root: Record<string, string> }).root;
const keys = Object.keys(root);

const pick = (filter: (k: string) => boolean): Record<string, string> =>
	Object.fromEntries(keys.filter(filter).map((k) => [k, root[k]]));

const baseKeys = new Set([
	"sapBrandColor",
	"sapHighlightColor",
	"sapHighlightTextColor",
	"sapBaseColor",
	"sapShellColor",
	"sapBackgroundColor",
	"sapBackgroundImage",
	"sapBackgroundImageOpacity",
	"sapBackgroundImageRepeat",
	"sapTextColor",
	"sapTitleColor",
	"sapLinkColor",
	"sapSelectedColor",
	"sapHoverColor",
	"sapActiveColor",
	"sapCompanyLogo",
	"sapFavicon",
	"sapSapThemeId",
]);

const meta: Meta<typeof TokenTable> = {
	title: "Design Tokens/Horizon Morning",
	component: TokenTable,
	tags: ["!autodocs"],
	parameters: {
		layout: "padded",
		dualTheme: false,
	},
};

export default meta;

type Story = StoryObj<typeof TokenTable>;

export const Base: Story = {
	args: { tokens: pick((k) => baseKeys.has(k)) },
};

export const Semantic: Story = {
	args: {
		tokens: pick((k) =>
			/^sap(Negative|Critical|Positive|Informative|Neutral|Error|Warning|Success|Information)/.test(
				k,
			),
		),
	},
};

export const Accent: Story = {
	args: { tokens: pick((k) => k.startsWith("sapAccent")) },
};

export const Element: Story = {
	args: { tokens: pick((k) => k.startsWith("sapElement")) },
};

export const Content: Story = {
	args: { tokens: pick((k) => k.startsWith("sapContent_")) },
};

export const Typography: Story = {
	args: {
		tokens: pick((k) => k.startsWith("sapFont") && !k.startsWith("sapFontUrl")),
	},
};

export const Link: Story = {
	args: { tokens: pick((k) => k.startsWith("sapLink_")) },
};

export const Shell: Story = {
	args: { tokens: pick((k) => k.startsWith("sapShell_")) },
};

export const Assistant: Story = {
	args: { tokens: pick((k) => k.startsWith("sapAssistant_")) },
};

export const Avatar: Story = {
	args: { tokens: pick((k) => k.startsWith("sapAvatar_")) },
};

export const Button: Story = {
	args: { tokens: pick((k) => k.startsWith("sapButton_")) },
};

export const Field: Story = {
	args: { tokens: pick((k) => k.startsWith("sapField_")) },
};

export const GroupAndToolbar: Story = {
	name: "Group & Toolbar",
	args: {
		tokens: pick(
			(k) => k.startsWith("sapGroup_") || k.startsWith("sapToolbar_"),
		),
	},
};

export const List: Story = {
	args: { tokens: pick((k) => k.startsWith("sapList_")) },
};

export const Tab: Story = {
	args: { tokens: pick((k) => k.startsWith("sapTab_")) },
};

export const Tile: Story = {
	args: { tokens: pick((k) => k.startsWith("sapTile_")) },
};

export const PageAndLayout: Story = {
	name: "Page & Layout",
	args: {
		tokens: pick((k) =>
			/^sap(PageHeader_|PageFooter_|Infobar|ObjectHeader_|BlockLayer_|Popover_|Message_)/.test(
				k,
			),
		),
	},
};

export const Progress: Story = {
	args: { tokens: pick((k) => k.startsWith("sapProgress_")) },
};

export const ScrollBarAndSlider: Story = {
	name: "ScrollBar & Slider",
	args: {
		tokens: pick(
			(k) => k.startsWith("sapScrollBar_") || k.startsWith("sapSlider_"),
		),
	},
};

export const Indication: Story = {
	args: { tokens: pick((k) => k.startsWith("sapIndicationColor_")) },
};

export const Legend: Story = {
	args: { tokens: pick((k) => k.startsWith("sapLegend")) },
};

export const Chart: Story = {
	args: {
		tokens: pick(
			(k) =>
				k.startsWith("sapChart_") &&
				!k.startsWith("sapChart_Sequence_") &&
				!k.startsWith("sapChart_OrderedColor_"),
		),
	},
};

export const ChartOrdered: Story = {
	name: "Chart Ordered",
	args: { tokens: pick((k) => k.startsWith("sapChart_OrderedColor_")) },
};

export const ChartSequence1To6: Story = {
	name: "Chart Sequence 1–6",
	args: {
		tokens: pick((k) => /^sapChart_Sequence_[1-6](_|$)/.test(k)),
	},
};

export const ChartSequence7To12: Story = {
	name: "Chart Sequence 7–12",
	args: {
		tokens: pick((k) => /^sapChart_Sequence_(7|8|9|1[0-2])(_|$)/.test(k)),
	},
};

export const ChartSequenceSemantic: Story = {
	name: "Chart Sequence Semantic",
	args: {
		tokens: pick((k) =>
			/^sapChart_Sequence_(Bad|Critical|Good|Neutral)(_|$)/.test(k),
		),
	},
};

export const Breakpoint: Story = {
	args: { tokens: pick((k) => k.startsWith("sapBreakpoint_")) },
};
