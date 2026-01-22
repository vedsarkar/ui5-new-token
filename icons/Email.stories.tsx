import type { Meta, StoryObj } from "@storybook/react";
import { Email } from "./Email";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Email> = {
	component: Email,
	title: "Icons/Email",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Email>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Email size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Email size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Email size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Email size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Email color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Email color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Email color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Email color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Email color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Email icon",
	},
};
