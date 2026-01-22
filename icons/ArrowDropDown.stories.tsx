import type { Meta, StoryObj } from "@storybook/react";
import { ArrowDropDown } from "./ArrowDropDown";
import styles from "./IconStories.module.css";

const meta: Meta<typeof ArrowDropDown> = {
	component: ArrowDropDown,
	title: "Icons/ArrowDropDown",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof ArrowDropDown>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<ArrowDropDown size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<ArrowDropDown size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<ArrowDropDown size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<ArrowDropDown size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<ArrowDropDown color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<ArrowDropDown color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<ArrowDropDown color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<ArrowDropDown color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<ArrowDropDown color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "ArrowDropDown icon",
	},
};
