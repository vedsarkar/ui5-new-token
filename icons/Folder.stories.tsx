import type { Meta, StoryObj } from "@storybook/react";
import { Folder } from "./Folder";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Folder> = {
	component: Folder,
	title: "Icons/Folder",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Folder>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Folder size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Folder size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Folder size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Folder size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Folder color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Folder color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Folder color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Folder color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Folder color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Folder icon",
	},
};
