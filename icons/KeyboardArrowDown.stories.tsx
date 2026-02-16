import type { Meta, StoryObj } from "@storybook/react";
import styles from "./IconStories.module.css";
import { KeyboardArrowDown } from "./KeyboardArrowDown";

const meta: Meta<typeof KeyboardArrowDown> = {
	component: KeyboardArrowDown,
	title: "Icons/KeyboardArrowDown",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof KeyboardArrowDown>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<KeyboardArrowDown size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<KeyboardArrowDown size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<KeyboardArrowDown size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<KeyboardArrowDown size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<KeyboardArrowDown color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<KeyboardArrowDown color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<KeyboardArrowDown color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<KeyboardArrowDown color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<KeyboardArrowDown color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "KeyboardArrowDown icon",
	},
};
