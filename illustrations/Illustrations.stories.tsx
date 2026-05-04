import type { Meta, StoryObj } from "@storybook/react-vite";
import { Illustration } from "./IllustrationDoc";
import styles from "./IllustrationStories.module.css";
import { illustrationMap as Illustrations } from "./index";

const meta: Meta = {
	title: "Illustrations",
	component: Illustration,
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj;

export const Achievement: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.Achievement size="spot" />
				<Illustrations.Achievement size="dialog" />
				<Illustrations.Achievement size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.Achievement size="spot" />
				<Illustrations.Achievement size="dialog" />
				<Illustrations.Achievement size="scene" />
			</div>
		</div>
	),
};

export const AddDimensions: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.AddDimensions size="spot" />
				<Illustrations.AddDimensions size="dialog" />
				<Illustrations.AddDimensions size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.AddDimensions size="spot" />
				<Illustrations.AddDimensions size="dialog" />
				<Illustrations.AddDimensions size="scene" />
			</div>
		</div>
	),
};

export const AddingColumns: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.AddingColumns size="spot" />
				<Illustrations.AddingColumns size="dialog" />
				<Illustrations.AddingColumns size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.AddingColumns size="spot" />
				<Illustrations.AddingColumns size="dialog" />
				<Illustrations.AddingColumns size="scene" />
			</div>
		</div>
	),
};

export const AddPeopleToCalendar: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.AddPeopleToCalendar size="spot" />
				<Illustrations.AddPeopleToCalendar size="dialog" />
				<Illustrations.AddPeopleToCalendar size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.AddPeopleToCalendar size="spot" />
				<Illustrations.AddPeopleToCalendar size="dialog" />
				<Illustrations.AddPeopleToCalendar size="scene" />
			</div>
		</div>
	),
};

export const BeforeSearch: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.BeforeSearch size="spot" />
				<Illustrations.BeforeSearch size="dialog" />
				<Illustrations.BeforeSearch size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.BeforeSearch size="spot" />
				<Illustrations.BeforeSearch size="dialog" />
				<Illustrations.BeforeSearch size="scene" />
			</div>
		</div>
	),
};

export const DragFilesToUpload: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.DragFilesToUpload size="spot" />
				<Illustrations.DragFilesToUpload size="dialog" />
				<Illustrations.DragFilesToUpload size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.DragFilesToUpload size="spot" />
				<Illustrations.DragFilesToUpload size="dialog" />
				<Illustrations.DragFilesToUpload size="scene" />
			</div>
		</div>
	),
};

export const EmptyPlanningCalendar: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.EmptyPlanningCalendar size="spot" />
				<Illustrations.EmptyPlanningCalendar size="dialog" />
				<Illustrations.EmptyPlanningCalendar size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.EmptyPlanningCalendar size="spot" />
				<Illustrations.EmptyPlanningCalendar size="dialog" />
				<Illustrations.EmptyPlanningCalendar size="scene" />
			</div>
		</div>
	),
};

export const FilteringColumns: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.FilteringColumns size="spot" />
				<Illustrations.FilteringColumns size="dialog" />
				<Illustrations.FilteringColumns size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.FilteringColumns size="spot" />
				<Illustrations.FilteringColumns size="dialog" />
				<Illustrations.FilteringColumns size="scene" />
			</div>
		</div>
	),
};

export const GroupingColumns: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.GroupingColumns size="spot" />
				<Illustrations.GroupingColumns size="dialog" />
				<Illustrations.GroupingColumns size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.GroupingColumns size="spot" />
				<Illustrations.GroupingColumns size="dialog" />
				<Illustrations.GroupingColumns size="scene" />
			</div>
		</div>
	),
};

export const KeyTask: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.KeyTask size="spot" />
				<Illustrations.KeyTask size="dialog" />
				<Illustrations.KeyTask size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.KeyTask size="spot" />
				<Illustrations.KeyTask size="dialog" />
				<Illustrations.KeyTask size="scene" />
			</div>
		</div>
	),
};

export const NewMail: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.NewMail size="spot" />
				<Illustrations.NewMail size="dialog" />
				<Illustrations.NewMail size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.NewMail size="spot" />
				<Illustrations.NewMail size="dialog" />
				<Illustrations.NewMail size="scene" />
			</div>
		</div>
	),
};

export const NoActivities: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.NoActivities size="spot" />
				<Illustrations.NoActivities size="dialog" />
				<Illustrations.NoActivities size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.NoActivities size="spot" />
				<Illustrations.NoActivities size="dialog" />
				<Illustrations.NoActivities size="scene" />
			</div>
		</div>
	),
};

export const NoChartData: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.NoChartData size="spot" />
				<Illustrations.NoChartData size="dialog" />
				<Illustrations.NoChartData size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.NoChartData size="spot" />
				<Illustrations.NoChartData size="dialog" />
				<Illustrations.NoChartData size="scene" />
			</div>
		</div>
	),
};

export const NoColumnsSet: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.NoColumnsSet size="spot" />
				<Illustrations.NoColumnsSet size="dialog" />
				<Illustrations.NoColumnsSet size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.NoColumnsSet size="spot" />
				<Illustrations.NoColumnsSet size="dialog" />
				<Illustrations.NoColumnsSet size="scene" />
			</div>
		</div>
	),
};

export const NoData: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.NoData size="spot" />
				<Illustrations.NoData size="dialog" />
				<Illustrations.NoData size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.NoData size="spot" />
				<Illustrations.NoData size="dialog" />
				<Illustrations.NoData size="scene" />
			</div>
		</div>
	),
};

export const NoEntries: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.NoEntries size="spot" />
				<Illustrations.NoEntries size="dialog" />
				<Illustrations.NoEntries size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.NoEntries size="spot" />
				<Illustrations.NoEntries size="dialog" />
				<Illustrations.NoEntries size="scene" />
			</div>
		</div>
	),
};

export const NoFilterResults: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.NoFilterResults size="spot" />
				<Illustrations.NoFilterResults size="dialog" />
				<Illustrations.NoFilterResults size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.NoFilterResults size="spot" />
				<Illustrations.NoFilterResults size="dialog" />
				<Illustrations.NoFilterResults size="scene" />
			</div>
		</div>
	),
};

export const NoMail: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.NoMail size="spot" />
				<Illustrations.NoMail size="dialog" />
				<Illustrations.NoMail size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.NoMail size="spot" />
				<Illustrations.NoMail size="dialog" />
				<Illustrations.NoMail size="scene" />
			</div>
		</div>
	),
};

export const NoNotifications: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.NoNotifications size="spot" />
				<Illustrations.NoNotifications size="dialog" />
				<Illustrations.NoNotifications size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.NoNotifications size="spot" />
				<Illustrations.NoNotifications size="dialog" />
				<Illustrations.NoNotifications size="scene" />
			</div>
		</div>
	),
};

export const NoSavedItems: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.NoSavedItems size="spot" />
				<Illustrations.NoSavedItems size="dialog" />
				<Illustrations.NoSavedItems size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.NoSavedItems size="spot" />
				<Illustrations.NoSavedItems size="dialog" />
				<Illustrations.NoSavedItems size="scene" />
			</div>
		</div>
	),
};

export const NoSearchResults: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.NoSearchResults size="spot" />
				<Illustrations.NoSearchResults size="dialog" />
				<Illustrations.NoSearchResults size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.NoSearchResults size="spot" />
				<Illustrations.NoSearchResults size="dialog" />
				<Illustrations.NoSearchResults size="scene" />
			</div>
		</div>
	),
};

export const NoTasks: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.NoTasks size="spot" />
				<Illustrations.NoTasks size="dialog" />
				<Illustrations.NoTasks size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.NoTasks size="spot" />
				<Illustrations.NoTasks size="dialog" />
				<Illustrations.NoTasks size="scene" />
			</div>
		</div>
	),
};

export const PageNotFound: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.PageNotFound size="spot" />
				<Illustrations.PageNotFound size="dialog" />
				<Illustrations.PageNotFound size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.PageNotFound size="spot" />
				<Illustrations.PageNotFound size="dialog" />
				<Illustrations.PageNotFound size="scene" />
			</div>
		</div>
	),
};

export const ReceiveAppreciation: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.ReceiveAppreciation size="spot" />
				<Illustrations.ReceiveAppreciation size="dialog" />
				<Illustrations.ReceiveAppreciation size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.ReceiveAppreciation size="spot" />
				<Illustrations.ReceiveAppreciation size="dialog" />
				<Illustrations.ReceiveAppreciation size="scene" />
			</div>
		</div>
	),
};

export const ResizingColumns: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.ResizingColumns size="spot" />
				<Illustrations.ResizingColumns size="dialog" />
				<Illustrations.ResizingColumns size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.ResizingColumns size="spot" />
				<Illustrations.ResizingColumns size="dialog" />
				<Illustrations.ResizingColumns size="scene" />
			</div>
		</div>
	),
};

export const SignOut: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.SignOut size="spot" />
				<Illustrations.SignOut size="dialog" />
				<Illustrations.SignOut size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.SignOut size="spot" />
				<Illustrations.SignOut size="dialog" />
				<Illustrations.SignOut size="scene" />
			</div>
		</div>
	),
};

export const SortingColumns: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.SortingColumns size="spot" />
				<Illustrations.SortingColumns size="dialog" />
				<Illustrations.SortingColumns size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.SortingColumns size="spot" />
				<Illustrations.SortingColumns size="dialog" />
				<Illustrations.SortingColumns size="scene" />
			</div>
		</div>
	),
};

export const UnableToLoad: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.UnableToLoad size="spot" />
				<Illustrations.UnableToLoad size="dialog" />
				<Illustrations.UnableToLoad size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.UnableToLoad size="spot" />
				<Illustrations.UnableToLoad size="dialog" />
				<Illustrations.UnableToLoad size="scene" />
			</div>
		</div>
	),
};

export const UnableToLoadImage: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.UnableToLoadImage size="spot" />
				<Illustrations.UnableToLoadImage size="dialog" />
				<Illustrations.UnableToLoadImage size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.UnableToLoadImage size="spot" />
				<Illustrations.UnableToLoadImage size="dialog" />
				<Illustrations.UnableToLoadImage size="scene" />
			</div>
		</div>
	),
};

export const UnableToUpload: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.UnableToUpload size="spot" />
				<Illustrations.UnableToUpload size="dialog" />
				<Illustrations.UnableToUpload size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.UnableToUpload size="spot" />
				<Illustrations.UnableToUpload size="dialog" />
				<Illustrations.UnableToUpload size="scene" />
			</div>
		</div>
	),
};

export const UploadToCloud: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.UploadToCloud size="spot" />
				<Illustrations.UploadToCloud size="dialog" />
				<Illustrations.UploadToCloud size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.UploadToCloud size="spot" />
				<Illustrations.UploadToCloud size="dialog" />
				<Illustrations.UploadToCloud size="scene" />
			</div>
		</div>
	),
};

export const UserHasSignedUp: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.UserHasSignedUp size="spot" />
				<Illustrations.UserHasSignedUp size="dialog" />
				<Illustrations.UserHasSignedUp size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.UserHasSignedUp size="spot" />
				<Illustrations.UserHasSignedUp size="dialog" />
				<Illustrations.UserHasSignedUp size="scene" />
			</div>
		</div>
	),
};
