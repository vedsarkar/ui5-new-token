import type { Meta, StoryObj } from "@storybook/react";
import { ArrowBack } from "./ArrowBack";
import styles from "./IconStories.module.css";

const meta: Meta<typeof ArrowBack> = {
	component: ArrowBack,
	title: "Icons/ArrowBack",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof ArrowBack>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<ArrowBack size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<ArrowBack size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<ArrowBack size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<ArrowBack size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<ArrowBack color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<ArrowBack color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<ArrowBack color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<ArrowBack color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<ArrowBack color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "ArrowBack icon",
	},
};
