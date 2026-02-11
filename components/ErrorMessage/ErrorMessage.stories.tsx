import preview from "@/.storybook/preview";
import { ErrorMessage } from "@/components/ErrorMessage";

const meta = preview.meta({
	component: ErrorMessage,
	parameters: {
		layout: "centered",
	},
});

export const DefaultMessage = meta.story({
	args: {},
});

export const CustomMessage = meta.story({
	args: {
		children: "Invalid email address. Please check and try again.",
	},
});

export const LongText = meta.story({
	args: {
		children:
			"An unexpected error occurred while processing your request. This could be due to a temporary server issue, invalid input, or a network problem. Please verify your data and try again. If the problem persists, contact support.",
	},
});
