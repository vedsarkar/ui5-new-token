import type { Meta, StoryObj } from "@storybook/react";
import { CodeBrackets } from "./CodeBrackets";
import styles from "./IconStories.module.css";

const meta: Meta<typeof CodeBrackets> = {
	component: CodeBrackets,
	title: "Icons/CodeBrackets",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof CodeBrackets>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<CodeBrackets size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<CodeBrackets size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<CodeBrackets size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<CodeBrackets size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<CodeBrackets color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<CodeBrackets color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<CodeBrackets color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<CodeBrackets color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<CodeBrackets color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "CodeBrackets icon",
	},
};
