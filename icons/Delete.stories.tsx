import type { Meta, StoryObj } from "@storybook/react";
import { Delete } from "./Delete";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Delete> = {
	component: Delete,
	title: "Icons/Delete",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Delete>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Delete size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Delete size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Delete size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Delete size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Delete color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Delete color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Delete color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Delete color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Delete color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Delete icon",
	},
};
