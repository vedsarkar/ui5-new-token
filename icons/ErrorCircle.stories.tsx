import type { Meta, StoryObj } from "@storybook/react";
import { ErrorCircle } from "./ErrorCircle";
import styles from "./IconStories.module.css";

const meta: Meta<typeof ErrorCircle> = {
	component: ErrorCircle,
	title: "Icons/ErrorCircle",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof ErrorCircle>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<ErrorCircle size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<ErrorCircle size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<ErrorCircle size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<ErrorCircle size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<ErrorCircle color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<ErrorCircle color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<ErrorCircle color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<ErrorCircle color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<ErrorCircle color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "ErrorCircle icon",
	},
};
