import type { Meta, StoryObj } from "@storybook/react";
import { ContentCopy } from "./ContentCopy";
import styles from "./IconStories.module.css";

const meta: Meta<typeof ContentCopy> = {
	component: ContentCopy,
	title: "Icons/ContentCopy",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof ContentCopy>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<ContentCopy size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<ContentCopy size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<ContentCopy size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<ContentCopy size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<ContentCopy color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<ContentCopy color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<ContentCopy color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<ContentCopy color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<ContentCopy color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "ContentCopy icon",
	},
};
