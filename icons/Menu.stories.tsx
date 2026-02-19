import type { Meta, StoryObj } from "@storybook/react";
import styles from "./IconStories.module.css";
import { Menu } from "./Menu";

const meta: Meta<typeof Menu> = {
	component: Menu,
	title: "Icons/Menu",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Menu size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Menu size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Menu size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Menu size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Menu color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Menu color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Menu color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Menu color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Menu color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Menu icon",
	},
};
