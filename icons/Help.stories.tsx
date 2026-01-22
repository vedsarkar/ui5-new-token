import type { Meta, StoryObj } from "@storybook/react";
import { Help } from "./Help";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Help> = {
	component: Help,
	title: "Icons/Help",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Help>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Help size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Help size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Help size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Help size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Help color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Help color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Help color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Help color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Help color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Help icon",
	},
};
