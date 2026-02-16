import type { Meta, StoryObj } from "@storybook/react";
import styles from "./IconStories.module.css";
import { Save } from "./Save";

const meta: Meta<typeof Save> = {
	component: Save,
	title: "Icons/Save",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Save>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Save size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Save size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Save size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Save size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Save color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Save color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Save color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Save color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Save color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Save icon",
	},
};
