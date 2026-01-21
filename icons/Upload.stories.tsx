import type { Meta, StoryObj } from "@storybook/react";
import { Upload } from "./Upload";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Upload> = {
	component: Upload,
	title: "Icons/Upload",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Upload>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Upload size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Upload size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Upload size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Upload size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Upload color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Upload color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Upload color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Upload color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Upload color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Upload icon",
	},
};
