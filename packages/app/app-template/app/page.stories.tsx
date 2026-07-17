import type { Meta, StoryObj } from "@storybook/react-vite";
import WelcomePage from "./page";

const meta = {
	title: "Pages/Welcome",
	component: WelcomePage,
} satisfies Meta<typeof WelcomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoTenantSelected: Story = {
	parameters: {
		appShell: { tenant: "", env: "", customer: "" },
	},
};
