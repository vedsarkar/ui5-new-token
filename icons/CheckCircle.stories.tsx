import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle } from "./CheckCircle";
import styles from "./IconStories.module.css";

const meta: Meta<typeof CheckCircle> = {
	component: CheckCircle,
	title: "Icons/CheckCircle",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof CheckCircle>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<CheckCircle size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<CheckCircle size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<CheckCircle size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<CheckCircle size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<CheckCircle color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<CheckCircle color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<CheckCircle color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<CheckCircle color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<CheckCircle color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "CheckCircle icon",
	},
};
