import type { Meta, StoryObj } from "@storybook/react";
import { Comment } from "./Comment";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Comment> = {
	component: Comment,
	title: "Icons/Comment",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Comment size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Comment size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Comment size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Comment size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Comment color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Comment color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Comment color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Comment color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Comment color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Comment icon",
	},
};
