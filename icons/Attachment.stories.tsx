import type { Meta, StoryObj } from "@storybook/react";
import { Attachment } from "./Attachment";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Attachment> = {
	component: Attachment,
	title: "Icons/Attachment",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Attachment>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Attachment size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Attachment size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Attachment size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Attachment size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Attachment color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Attachment color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Attachment color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Attachment color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Attachment color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Attachment icon",
	},
};
