import type { Meta, StoryObj } from "@storybook/react";
import styles from "./IconStories.module.css";
import { Share } from "./Share";

const meta: Meta<typeof Share> = {
	component: Share,
	title: "Icons/Share",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Share>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Share size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Share size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Share size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Share size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Share color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Share color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Share color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Share color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Share color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Share icon",
	},
};
