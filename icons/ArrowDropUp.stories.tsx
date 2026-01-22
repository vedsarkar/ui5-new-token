import type { Meta, StoryObj } from "@storybook/react";
import { ArrowDropUp } from "./ArrowDropUp";
import styles from "./IconStories.module.css";

const meta: Meta<typeof ArrowDropUp> = {
	component: ArrowDropUp,
	title: "Icons/ArrowDropUp",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof ArrowDropUp>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<ArrowDropUp size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<ArrowDropUp size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<ArrowDropUp size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<ArrowDropUp size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<ArrowDropUp color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<ArrowDropUp color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<ArrowDropUp color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<ArrowDropUp color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<ArrowDropUp color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "ArrowDropUp icon",
	},
};
