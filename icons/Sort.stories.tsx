import type { Meta, StoryObj } from "@storybook/react";
import { Sort } from "./Sort";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Sort> = {
	component: Sort,
	title: "Icons/Sort",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Sort>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Sort size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Sort size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Sort size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Sort size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Sort color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Sort color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Sort color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Sort color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Sort color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Sort icon",
	},
};
