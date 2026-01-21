import type { Meta, StoryObj } from "@storybook/react";
import { FilterList } from "./FilterList";
import styles from "./IconStories.module.css";

const meta: Meta<typeof FilterList> = {
	component: FilterList,
	title: "Icons/FilterList",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof FilterList>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<FilterList size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<FilterList size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<FilterList size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<FilterList size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<FilterList color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<FilterList color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<FilterList color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<FilterList color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<FilterList color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "FilterList icon",
	},
};
