import type { Meta, StoryObj } from "@storybook/react";
import { Download } from "./Download";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Download> = {
	component: Download,
	title: "Icons/Download",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Download>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Download size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Download size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Download size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Download size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Download color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Download color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Download color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Download color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Download color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Download icon",
	},
};
