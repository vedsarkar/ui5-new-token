import type { Meta, StoryObj } from "@storybook/react";
import styles from "./IconStories.module.css";
import { Refresh } from "./Refresh";

const meta: Meta<typeof Refresh> = {
	component: Refresh,
	title: "Icons/Refresh",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Refresh>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Refresh size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Refresh size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Refresh size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Refresh size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Refresh color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Refresh color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Refresh color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Refresh color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Refresh color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Refresh icon",
	},
};
