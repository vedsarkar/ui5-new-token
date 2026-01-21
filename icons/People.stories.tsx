import type { Meta, StoryObj } from "@storybook/react";
import { People } from "./People";
import styles from "./IconStories.module.css";

const meta: Meta<typeof People> = {
	component: People,
	title: "Icons/People",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof People>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<People size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<People size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<People size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<People size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<People color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<People color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<People color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<People color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<People color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "People icon",
	},
};
