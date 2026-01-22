import type { Meta, StoryObj } from "@storybook/react";
import { Settings } from "./Settings";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Settings> = {
	component: Settings,
	title: "Icons/Settings",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Settings>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Settings size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Settings size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Settings size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Settings size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Settings color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Settings color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Settings color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Settings color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Settings color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Settings icon",
	},
};
