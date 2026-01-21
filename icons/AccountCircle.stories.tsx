import type { Meta, StoryObj } from "@storybook/react";
import { AccountCircle } from "./AccountCircle";
import styles from "./IconStories.module.css";

const meta: Meta<typeof AccountCircle> = {
	component: AccountCircle,
	title: "Icons/AccountCircle",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof AccountCircle>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<AccountCircle size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<AccountCircle size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<AccountCircle size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<AccountCircle size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<AccountCircle color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<AccountCircle color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<AccountCircle color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<AccountCircle color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<AccountCircle color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "AccountCircle icon",
	},
};
