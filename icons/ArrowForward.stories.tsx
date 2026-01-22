import type { Meta, StoryObj } from "@storybook/react";
import { ArrowForward } from "./ArrowForward";
import styles from "./IconStories.module.css";

const meta: Meta<typeof ArrowForward> = {
	component: ArrowForward,
	title: "Icons/ArrowForward",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof ArrowForward>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<ArrowForward size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<ArrowForward size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<ArrowForward size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<ArrowForward size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<ArrowForward color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<ArrowForward color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<ArrowForward color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<ArrowForward color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<ArrowForward color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "ArrowForward icon",
	},
};
