import type { Meta, StoryObj } from "@storybook/react";
import styles from "./IconStories.module.css";
import { Logout } from "./Logout";

const meta: Meta<typeof Logout> = {
	component: Logout,
	title: "Icons/Logout",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Logout>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Logout size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Logout size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Logout size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Logout size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Logout color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Logout color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Logout color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Logout color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Logout color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Logout icon",
	},
};
