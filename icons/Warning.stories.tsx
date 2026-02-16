import type { Meta, StoryObj } from "@storybook/react";
import styles from "./IconStories.module.css";
import { Warning } from "./Warning";

const meta: Meta<typeof Warning> = {
	component: Warning,
	title: "Icons/Warning",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Warning>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Warning size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Warning size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Warning size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Warning size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Warning color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Warning color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Warning color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Warning color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Warning color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Warning icon",
	},
};
