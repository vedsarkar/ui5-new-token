import type { Meta, StoryObj } from "@storybook/react";
import { ArrowLeft } from "./ArrowLeft";
import styles from "./IconStories.module.css";

const meta: Meta<typeof ArrowLeft> = {
	component: ArrowLeft,
	title: "Icons/ArrowLeft",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof ArrowLeft>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<ArrowLeft size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<ArrowLeft size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<ArrowLeft size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<ArrowLeft size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<ArrowLeft color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<ArrowLeft color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<ArrowLeft color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<ArrowLeft color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<ArrowLeft color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "ArrowLeft icon",
	},
};
