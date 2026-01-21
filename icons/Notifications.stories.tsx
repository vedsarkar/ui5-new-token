import type { Meta, StoryObj } from "@storybook/react";
import { Notifications } from "./Notifications";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Notifications> = {
	component: Notifications,
	title: "Icons/Notifications",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Notifications>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Notifications size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Notifications size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Notifications size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Notifications size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Notifications color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Notifications color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Notifications color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Notifications color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Notifications color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Notifications icon",
	},
};
