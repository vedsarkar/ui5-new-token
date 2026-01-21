import type { Meta, StoryObj } from "@storybook/react";
import { Description } from "./Description";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Description> = {
	component: Description,
	title: "Icons/Description",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Description>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Description size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Description size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Description size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Description size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Description color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Description color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Description color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Description color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Description color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Description icon",
	},
};
