import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight } from "./ChevronRight";
import styles from "./IconStories.module.css";

const meta: Meta<typeof ChevronRight> = {
	component: ChevronRight,
	title: "Icons/ChevronRight",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof ChevronRight>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<ChevronRight size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<ChevronRight size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<ChevronRight size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<ChevronRight size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<ChevronRight color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<ChevronRight color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<ChevronRight color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<ChevronRight color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<ChevronRight color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "ChevronRight icon",
	},
};
