import type { Meta, StoryObj } from "@storybook/react";
import { Close } from "./Close";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Close> = {
	component: Close,
	title: "Icons/Close",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Close>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Close size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Close size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Close size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Close size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Close color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Close color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Close color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Close color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Close color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Close icon",
	},
};
