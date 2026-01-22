import type { Meta, StoryObj } from "@storybook/react";
import { Person } from "./Person";
import styles from "./IconStories.module.css";

const meta: Meta<typeof Person> = {
	component: Person,
	title: "Icons/Person",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Person>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.sizes}`}>
			<span className={styles.icon}>
				<Person size="small" />
			</span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}>
				<Person size="medium" />
			</span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}>
				<Person size="large" />
			</span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}>
				<Person size="xlarge" />
			</span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={`${styles.grid} ${styles.colors}`}>
			<span className={styles.icon}>
				<Person color="inherited" />
			</span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}>
				<Person color="primary" />
			</span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}>
				<Person color="success" />
			</span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}>
				<Person color="warning" />
			</span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}>
				<Person color="error" />
			</span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Person icon",
	},
};
