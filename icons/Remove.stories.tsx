import type { Meta, StoryObj } from "@storybook/react";
import { Remove } from "./Remove";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Remove> = {
	component: Remove,
	title: "Icons/Remove",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Remove>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Remove size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Remove size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Remove size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Remove size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Remove color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Remove color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Remove color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Remove color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Remove color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Remove icon",
	},
};
