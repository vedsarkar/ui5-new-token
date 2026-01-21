import type { Meta, StoryObj } from "@storybook/react";
import { KeyboardArrowUp } from "./KeyboardArrowUp";
import styles from "./IconStories.module.css";

const meta: Meta<typeof KeyboardArrowUp> = {
	component: KeyboardArrowUp,
	title: "Icons/KeyboardArrowUp",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof KeyboardArrowUp>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<KeyboardArrowUp size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<KeyboardArrowUp size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<KeyboardArrowUp size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<KeyboardArrowUp size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<KeyboardArrowUp color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<KeyboardArrowUp color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<KeyboardArrowUp color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<KeyboardArrowUp color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<KeyboardArrowUp color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "KeyboardArrowUp icon",
	},
};
