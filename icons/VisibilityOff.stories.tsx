import type { Meta, StoryObj } from "@storybook/react";
import { VisibilityOff } from "./VisibilityOff";
import styles from "./IconStories.module.css";

const meta: Meta<typeof VisibilityOff> = {
	component: VisibilityOff,
	title: "Icons/VisibilityOff",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof VisibilityOff>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<VisibilityOff size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<VisibilityOff size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<VisibilityOff size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<VisibilityOff size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<VisibilityOff color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<VisibilityOff color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<VisibilityOff color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<VisibilityOff color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<VisibilityOff color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "VisibilityOff icon",
	},
};
