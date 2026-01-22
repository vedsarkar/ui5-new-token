import type { Meta, StoryObj } from "@storybook/react";
import { Chat } from "./Chat";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Chat> = {
	component: Chat,
	title: "Icons/Chat",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Chat>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Chat size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Chat size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Chat size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Chat size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Chat color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Chat color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Chat color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Chat color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Chat color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Chat icon",
	},
};
