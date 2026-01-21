import type { Meta, StoryObj } from "@storybook/react";
import { Edit } from "./Edit";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Edit> = {
	component: Edit,
	title: "Icons/Edit",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Edit>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Edit size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Edit size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Edit size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Edit size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Edit color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Edit color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Edit color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Edit color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Edit color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Edit icon",
	},
};
