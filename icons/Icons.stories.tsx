import { Description, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconLibrary } from "@/.storybook/blocks/IconLibrary";
import { Icon } from "./IconDoc";
import styles from "./IconStories.module.css";
import { iconMap as Icons } from "./index";

const meta: Meta = {
	title: "Icons",
	component: Icon,
	parameters: {
		layout: "centered",
		docs: {
			toc: { headingSelector: "[data-toc]" },
			page: () => (
				<>
					<Title />
					<Description />
					<IconLibrary />
				</>
			),
		},
	},
};

export default meta;
type Story = StoryObj;

export const Accelerated: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Accelerated size="small" color="success" />
				<Icons.Accelerated />
				<Icons.Accelerated size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Accelerated size="small" color="success" />
				<Icons.Accelerated />
				<Icons.Accelerated size="large" color="error" />
			</div>
		</div>
	),
};

export const Accept: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Accept size="small" color="success" />
				<Icons.Accept />
				<Icons.Accept size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Accept size="small" color="success" />
				<Icons.Accept />
				<Icons.Accept size="large" color="error" />
			</div>
		</div>
	),
};

export const Accessibility: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Accessibility size="small" color="success" />
				<Icons.Accessibility />
				<Icons.Accessibility size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Accessibility size="small" color="success" />
				<Icons.Accessibility />
				<Icons.Accessibility size="large" color="error" />
			</div>
		</div>
	),
};

export const AccidentalLeave: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AccidentalLeave size="small" color="success" />
				<Icons.AccidentalLeave />
				<Icons.AccidentalLeave size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AccidentalLeave size="small" color="success" />
				<Icons.AccidentalLeave />
				<Icons.AccidentalLeave size="large" color="error" />
			</div>
		</div>
	),
};

export const Account: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Account size="small" color="success" />
				<Icons.Account />
				<Icons.Account size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Account size="small" color="success" />
				<Icons.Account />
				<Icons.Account size="large" color="error" />
			</div>
		</div>
	),
};

export const AccountingDocumentVerification: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AccountingDocumentVerification size="small" color="success" />
				<Icons.AccountingDocumentVerification />
				<Icons.AccountingDocumentVerification size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AccountingDocumentVerification size="small" color="success" />
				<Icons.AccountingDocumentVerification />
				<Icons.AccountingDocumentVerification size="large" color="error" />
			</div>
		</div>
	),
};

export const Action: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Action size="small" color="success" />
				<Icons.Action />
				<Icons.Action size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Action size="small" color="success" />
				<Icons.Action />
				<Icons.Action size="large" color="error" />
			</div>
		</div>
	),
};

export const ActionSettings: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ActionSettings size="small" color="success" />
				<Icons.ActionSettings />
				<Icons.ActionSettings size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ActionSettings size="small" color="success" />
				<Icons.ActionSettings />
				<Icons.ActionSettings size="large" color="error" />
			</div>
		</div>
	),
};

export const Activate: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Activate size="small" color="success" />
				<Icons.Activate />
				<Icons.Activate size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Activate size="small" color="success" />
				<Icons.Activate />
				<Icons.Activate size="large" color="error" />
			</div>
		</div>
	),
};

export const Activities: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Activities size="small" color="success" />
				<Icons.Activities />
				<Icons.Activities size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Activities size="small" color="success" />
				<Icons.Activities />
				<Icons.Activities size="large" color="error" />
			</div>
		</div>
	),
};

export const Activity2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Activity2 size="small" color="success" />
				<Icons.Activity2 />
				<Icons.Activity2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Activity2 size="small" color="success" />
				<Icons.Activity2 />
				<Icons.Activity2 size="large" color="error" />
			</div>
		</div>
	),
};

export const ActivityAssignedToGoal: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ActivityAssignedToGoal size="small" color="success" />
				<Icons.ActivityAssignedToGoal />
				<Icons.ActivityAssignedToGoal size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ActivityAssignedToGoal size="small" color="success" />
				<Icons.ActivityAssignedToGoal />
				<Icons.ActivityAssignedToGoal size="large" color="error" />
			</div>
		</div>
	),
};

export const ActivityIndividual: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ActivityIndividual size="small" color="success" />
				<Icons.ActivityIndividual />
				<Icons.ActivityIndividual size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ActivityIndividual size="small" color="success" />
				<Icons.ActivityIndividual />
				<Icons.ActivityIndividual size="large" color="error" />
			</div>
		</div>
	),
};

export const ActivityItems: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ActivityItems size="small" color="success" />
				<Icons.ActivityItems />
				<Icons.ActivityItems size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ActivityItems size="small" color="success" />
				<Icons.ActivityItems />
				<Icons.ActivityItems size="large" color="error" />
			</div>
		</div>
	),
};

export const Add: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Add size="small" color="success" />
				<Icons.Add />
				<Icons.Add size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Add size="small" color="success" />
				<Icons.Add />
				<Icons.Add size="large" color="error" />
			</div>
		</div>
	),
};

export const AddActivity: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddActivity size="small" color="success" />
				<Icons.AddActivity />
				<Icons.AddActivity size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddActivity size="small" color="success" />
				<Icons.AddActivity />
				<Icons.AddActivity size="large" color="error" />
			</div>
		</div>
	),
};

export const AddActivity2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddActivity2 size="small" color="success" />
				<Icons.AddActivity2 />
				<Icons.AddActivity2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddActivity2 size="small" color="success" />
				<Icons.AddActivity2 />
				<Icons.AddActivity2 size="large" color="error" />
			</div>
		</div>
	),
};

export const AddCalendar: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddCalendar size="small" color="success" />
				<Icons.AddCalendar />
				<Icons.AddCalendar size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddCalendar size="small" color="success" />
				<Icons.AddCalendar />
				<Icons.AddCalendar size="large" color="error" />
			</div>
		</div>
	),
};

export const AddContact: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddContact size="small" color="success" />
				<Icons.AddContact />
				<Icons.AddContact size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddContact size="small" color="success" />
				<Icons.AddContact />
				<Icons.AddContact size="large" color="error" />
			</div>
		</div>
	),
};

export const AddCoursebook: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddCoursebook size="small" color="success" />
				<Icons.AddCoursebook />
				<Icons.AddCoursebook size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddCoursebook size="small" color="success" />
				<Icons.AddCoursebook />
				<Icons.AddCoursebook size="large" color="error" />
			</div>
		</div>
	),
};

export const AddDocument: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddDocument size="small" color="success" />
				<Icons.AddDocument />
				<Icons.AddDocument size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddDocument size="small" color="success" />
				<Icons.AddDocument />
				<Icons.AddDocument size="large" color="error" />
			</div>
		</div>
	),
};

export const AddEmployee: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddEmployee size="small" color="success" />
				<Icons.AddEmployee />
				<Icons.AddEmployee size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddEmployee size="small" color="success" />
				<Icons.AddEmployee />
				<Icons.AddEmployee size="large" color="error" />
			</div>
		</div>
	),
};

export const AddEquipment: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddEquipment size="small" color="success" />
				<Icons.AddEquipment />
				<Icons.AddEquipment size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddEquipment size="small" color="success" />
				<Icons.AddEquipment />
				<Icons.AddEquipment size="large" color="error" />
			</div>
		</div>
	),
};

export const AddFavorite: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddFavorite size="small" color="success" />
				<Icons.AddFavorite />
				<Icons.AddFavorite size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddFavorite size="small" color="success" />
				<Icons.AddFavorite />
				<Icons.AddFavorite size="large" color="error" />
			</div>
		</div>
	),
};

export const AddFilter: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddFilter size="small" color="success" />
				<Icons.AddFilter />
				<Icons.AddFilter size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddFilter size="small" color="success" />
				<Icons.AddFilter />
				<Icons.AddFilter size="large" color="error" />
			</div>
		</div>
	),
};

export const AddFolder: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddFolder size="small" color="success" />
				<Icons.AddFolder />
				<Icons.AddFolder size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddFolder size="small" color="success" />
				<Icons.AddFolder />
				<Icons.AddFolder size="large" color="error" />
			</div>
		</div>
	),
};

export const AddPhoto: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddPhoto size="small" color="success" />
				<Icons.AddPhoto />
				<Icons.AddPhoto size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddPhoto size="small" color="success" />
				<Icons.AddPhoto />
				<Icons.AddPhoto size="large" color="error" />
			</div>
		</div>
	),
};

export const AddProcess: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddProcess size="small" color="success" />
				<Icons.AddProcess />
				<Icons.AddProcess size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddProcess size="small" color="success" />
				<Icons.AddProcess />
				<Icons.AddProcess size="large" color="error" />
			</div>
		</div>
	),
};

export const AddProduct: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddProduct size="small" color="success" />
				<Icons.AddProduct />
				<Icons.AddProduct size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddProduct size="small" color="success" />
				<Icons.AddProduct />
				<Icons.AddProduct size="large" color="error" />
			</div>
		</div>
	),
};

export const AddressBook: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AddressBook size="small" color="success" />
				<Icons.AddressBook />
				<Icons.AddressBook size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AddressBook size="small" color="success" />
				<Icons.AddressBook />
				<Icons.AddressBook size="large" color="error" />
			</div>
		</div>
	),
};

export const Addresses: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Addresses size="small" color="success" />
				<Icons.Addresses />
				<Icons.Addresses size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Addresses size="small" color="success" />
				<Icons.Addresses />
				<Icons.Addresses size="large" color="error" />
			</div>
		</div>
	),
};

export const Ai: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Ai size="small" color="success" />
				<Icons.Ai />
				<Icons.Ai size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Ai size="small" color="success" />
				<Icons.Ai />
				<Icons.Ai size="large" color="error" />
			</div>
		</div>
	),
};

export const Alert: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Alert size="small" color="success" />
				<Icons.Alert />
				<Icons.Alert size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Alert size="small" color="success" />
				<Icons.Alert />
				<Icons.Alert size="large" color="error" />
			</div>
		</div>
	),
};

export const AlongStackedChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AlongStackedChart size="small" color="success" />
				<Icons.AlongStackedChart />
				<Icons.AlongStackedChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AlongStackedChart size="small" color="success" />
				<Icons.AlongStackedChart />
				<Icons.AlongStackedChart size="large" color="error" />
			</div>
		</div>
	),
};

export const AlphabeticalOrder: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AlphabeticalOrder size="small" color="success" />
				<Icons.AlphabeticalOrder />
				<Icons.AlphabeticalOrder size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AlphabeticalOrder size="small" color="success" />
				<Icons.AlphabeticalOrder />
				<Icons.AlphabeticalOrder size="large" color="error" />
			</div>
		</div>
	),
};

export const AppearOffline: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AppearOffline size="small" color="success" />
				<Icons.AppearOffline />
				<Icons.AppearOffline size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AppearOffline size="small" color="success" />
				<Icons.AppearOffline />
				<Icons.AppearOffline size="large" color="error" />
			</div>
		</div>
	),
};

export const Appointment: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Appointment size="small" color="success" />
				<Icons.Appointment />
				<Icons.Appointment size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Appointment size="small" color="success" />
				<Icons.Appointment />
				<Icons.Appointment size="large" color="error" />
			</div>
		</div>
	),
};

export const Appointment2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Appointment2 size="small" color="success" />
				<Icons.Appointment2 />
				<Icons.Appointment2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Appointment2 size="small" color="success" />
				<Icons.Appointment2 />
				<Icons.Appointment2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Approvals: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Approvals size="small" color="success" />
				<Icons.Approvals />
				<Icons.Approvals size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Approvals size="small" color="success" />
				<Icons.Approvals />
				<Icons.Approvals size="large" color="error" />
			</div>
		</div>
	),
};

export const AreaChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AreaChart size="small" color="success" />
				<Icons.AreaChart />
				<Icons.AreaChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AreaChart size="small" color="success" />
				<Icons.AreaChart />
				<Icons.AreaChart size="large" color="error" />
			</div>
		</div>
	),
};

export const Arobase: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Arobase size="small" color="success" />
				<Icons.Arobase />
				<Icons.Arobase size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Arobase size="small" color="success" />
				<Icons.Arobase />
				<Icons.Arobase size="large" color="error" />
			</div>
		</div>
	),
};

export const ArrowBottom: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ArrowBottom size="small" color="success" />
				<Icons.ArrowBottom />
				<Icons.ArrowBottom size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ArrowBottom size="small" color="success" />
				<Icons.ArrowBottom />
				<Icons.ArrowBottom size="large" color="error" />
			</div>
		</div>
	),
};

export const ArrowDown: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ArrowDown size="small" color="success" />
				<Icons.ArrowDown />
				<Icons.ArrowDown size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ArrowDown size="small" color="success" />
				<Icons.ArrowDown />
				<Icons.ArrowDown size="large" color="error" />
			</div>
		</div>
	),
};

export const ArrowLeft: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ArrowLeft size="small" color="success" />
				<Icons.ArrowLeft />
				<Icons.ArrowLeft size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ArrowLeft size="small" color="success" />
				<Icons.ArrowLeft />
				<Icons.ArrowLeft size="large" color="error" />
			</div>
		</div>
	),
};

export const ArrowRight: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ArrowRight size="small" color="success" />
				<Icons.ArrowRight />
				<Icons.ArrowRight size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ArrowRight size="small" color="success" />
				<Icons.ArrowRight />
				<Icons.ArrowRight size="large" color="error" />
			</div>
		</div>
	),
};

export const ArrowTop: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ArrowTop size="small" color="success" />
				<Icons.ArrowTop />
				<Icons.ArrowTop size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ArrowTop size="small" color="success" />
				<Icons.ArrowTop />
				<Icons.ArrowTop size="large" color="error" />
			</div>
		</div>
	),
};

export const Attachment: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Attachment size="small" color="success" />
				<Icons.Attachment />
				<Icons.Attachment size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Attachment size="small" color="success" />
				<Icons.Attachment />
				<Icons.Attachment size="large" color="error" />
			</div>
		</div>
	),
};

export const AttachmentAudio: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AttachmentAudio size="small" color="success" />
				<Icons.AttachmentAudio />
				<Icons.AttachmentAudio size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AttachmentAudio size="small" color="success" />
				<Icons.AttachmentAudio />
				<Icons.AttachmentAudio size="large" color="error" />
			</div>
		</div>
	),
};

export const AttachmentEPub: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AttachmentEPub size="small" color="success" />
				<Icons.AttachmentEPub />
				<Icons.AttachmentEPub size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AttachmentEPub size="small" color="success" />
				<Icons.AttachmentEPub />
				<Icons.AttachmentEPub size="large" color="error" />
			</div>
		</div>
	),
};

export const AttachmentHtml: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AttachmentHtml size="small" color="success" />
				<Icons.AttachmentHtml />
				<Icons.AttachmentHtml size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AttachmentHtml size="small" color="success" />
				<Icons.AttachmentHtml />
				<Icons.AttachmentHtml size="large" color="error" />
			</div>
		</div>
	),
};

export const AttachmentPhoto: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AttachmentPhoto size="small" color="success" />
				<Icons.AttachmentPhoto />
				<Icons.AttachmentPhoto size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AttachmentPhoto size="small" color="success" />
				<Icons.AttachmentPhoto />
				<Icons.AttachmentPhoto size="large" color="error" />
			</div>
		</div>
	),
};

export const AttachmentTextFile: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AttachmentTextFile size="small" color="success" />
				<Icons.AttachmentTextFile />
				<Icons.AttachmentTextFile size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AttachmentTextFile size="small" color="success" />
				<Icons.AttachmentTextFile />
				<Icons.AttachmentTextFile size="large" color="error" />
			</div>
		</div>
	),
};

export const AttachmentVideo: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AttachmentVideo size="small" color="success" />
				<Icons.AttachmentVideo />
				<Icons.AttachmentVideo size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AttachmentVideo size="small" color="success" />
				<Icons.AttachmentVideo />
				<Icons.AttachmentVideo size="large" color="error" />
			</div>
		</div>
	),
};

export const AttachmentZipFile: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.AttachmentZipFile size="small" color="success" />
				<Icons.AttachmentZipFile />
				<Icons.AttachmentZipFile size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.AttachmentZipFile size="small" color="success" />
				<Icons.AttachmentZipFile />
				<Icons.AttachmentZipFile size="large" color="error" />
			</div>
		</div>
	),
};

export const Away: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Away size="small" color="success" />
				<Icons.Away />
				<Icons.Away size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Away size="small" color="success" />
				<Icons.Away />
				<Icons.Away size="large" color="error" />
			</div>
		</div>
	),
};

export const Background: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Background size="small" color="success" />
				<Icons.Background />
				<Icons.Background size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Background size="small" color="success" />
				<Icons.Background />
				<Icons.Background size="large" color="error" />
			</div>
		</div>
	),
};

export const BackToTop: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BackToTop size="small" color="success" />
				<Icons.BackToTop />
				<Icons.BackToTop size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BackToTop size="small" color="success" />
				<Icons.BackToTop />
				<Icons.BackToTop size="large" color="error" />
			</div>
		</div>
	),
};

export const Badge: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Badge size="small" color="success" />
				<Icons.Badge />
				<Icons.Badge size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Badge size="small" color="success" />
				<Icons.Badge />
				<Icons.Badge size="large" color="error" />
			</div>
		</div>
	),
};

export const BarChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BarChart size="small" color="success" />
				<Icons.BarChart />
				<Icons.BarChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BarChart size="small" color="success" />
				<Icons.BarChart />
				<Icons.BarChart size="large" color="error" />
			</div>
		</div>
	),
};

export const BarCode: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BarCode size="small" color="success" />
				<Icons.BarCode />
				<Icons.BarCode size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BarCode size="small" color="success" />
				<Icons.BarCode />
				<Icons.BarCode size="large" color="error" />
			</div>
		</div>
	),
};

export const Basket: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Basket size="small" color="success" />
				<Icons.Basket />
				<Icons.Basket size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Basket size="small" color="success" />
				<Icons.Basket />
				<Icons.Basket size="large" color="error" />
			</div>
		</div>
	),
};

export const BatchPayments: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BatchPayments size="small" color="success" />
				<Icons.BatchPayments />
				<Icons.BatchPayments size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BatchPayments size="small" color="success" />
				<Icons.BatchPayments />
				<Icons.BatchPayments size="large" color="error" />
			</div>
		</div>
	),
};

export const BbydActiveSales: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BbydActiveSales size="small" color="success" />
				<Icons.BbydActiveSales />
				<Icons.BbydActiveSales size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BbydActiveSales size="small" color="success" />
				<Icons.BbydActiveSales />
				<Icons.BbydActiveSales size="large" color="error" />
			</div>
		</div>
	),
};

export const BbydDashboard: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BbydDashboard size="small" color="success" />
				<Icons.BbydDashboard />
				<Icons.BbydDashboard size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BbydDashboard size="small" color="success" />
				<Icons.BbydDashboard />
				<Icons.BbydDashboard size="large" color="error" />
			</div>
		</div>
	),
};

export const Bed: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Bed size="small" color="success" />
				<Icons.Bed />
				<Icons.Bed size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Bed size="small" color="success" />
				<Icons.Bed />
				<Icons.Bed size="large" color="error" />
			</div>
		</div>
	),
};

export const Begin: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Begin size="small" color="success" />
				<Icons.Begin />
				<Icons.Begin size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Begin size="small" color="success" />
				<Icons.Begin />
				<Icons.Begin size="large" color="error" />
			</div>
		</div>
	),
};

export const Bell: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Bell size="small" color="success" />
				<Icons.Bell />
				<Icons.Bell size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Bell size="small" color="success" />
				<Icons.Bell />
				<Icons.Bell size="large" color="error" />
			</div>
		</div>
	),
};

export const Bell2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Bell2 size="small" color="success" />
				<Icons.Bell2 />
				<Icons.Bell2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Bell2 size="small" color="success" />
				<Icons.Bell2 />
				<Icons.Bell2 size="large" color="error" />
			</div>
		</div>
	),
};

export const BiometricFace: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BiometricFace size="small" color="success" />
				<Icons.BiometricFace />
				<Icons.BiometricFace size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BiometricFace size="small" color="success" />
				<Icons.BiometricFace />
				<Icons.BiometricFace size="large" color="error" />
			</div>
		</div>
	),
};

export const BiometricThumb: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BiometricThumb size="small" color="success" />
				<Icons.BiometricThumb />
				<Icons.BiometricThumb size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BiometricThumb size="small" color="success" />
				<Icons.BiometricThumb />
				<Icons.BiometricThumb size="large" color="error" />
			</div>
		</div>
	),
};

export const BlankTag: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BlankTag size="small" color="success" />
				<Icons.BlankTag />
				<Icons.BlankTag size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BlankTag size="small" color="success" />
				<Icons.BlankTag />
				<Icons.BlankTag size="large" color="error" />
			</div>
		</div>
	),
};

export const BlankTag2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BlankTag2 size="small" color="success" />
				<Icons.BlankTag2 />
				<Icons.BlankTag2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BlankTag2 size="small" color="success" />
				<Icons.BlankTag2 />
				<Icons.BlankTag2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Blur: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Blur size="small" color="success" />
				<Icons.Blur />
				<Icons.Blur size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Blur size="small" color="success" />
				<Icons.Blur />
				<Icons.Blur size="large" color="error" />
			</div>
		</div>
	),
};

export const BoldText: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BoldText size="small" color="success" />
				<Icons.BoldText />
				<Icons.BoldText size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BoldText size="small" color="success" />
				<Icons.BoldText />
				<Icons.BoldText size="large" color="error" />
			</div>
		</div>
	),
};

export const Bookmark: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Bookmark size="small" color="success" />
				<Icons.Bookmark />
				<Icons.Bookmark size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Bookmark size="small" color="success" />
				<Icons.Bookmark />
				<Icons.Bookmark size="large" color="error" />
			</div>
		</div>
	),
};

export const Bookmark2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Bookmark2 size="small" color="success" />
				<Icons.Bookmark2 />
				<Icons.Bookmark2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Bookmark2 size="small" color="success" />
				<Icons.Bookmark2 />
				<Icons.Bookmark2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Border: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Border size="small" color="success" />
				<Icons.Border />
				<Icons.Border size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Border size="small" color="success" />
				<Icons.Border />
				<Icons.Border size="large" color="error" />
			</div>
		</div>
	),
};

export const BoStrategyManagement: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BoStrategyManagement size="small" color="success" />
				<Icons.BoStrategyManagement />
				<Icons.BoStrategyManagement size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BoStrategyManagement size="small" color="success" />
				<Icons.BoStrategyManagement />
				<Icons.BoStrategyManagement size="large" color="error" />
			</div>
		</div>
	),
};

export const BrokenLink: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BrokenLink size="small" color="success" />
				<Icons.BrokenLink />
				<Icons.BrokenLink size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BrokenLink size="small" color="success" />
				<Icons.BrokenLink />
				<Icons.BrokenLink size="large" color="error" />
			</div>
		</div>
	),
};

export const BrowseFolder: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BrowseFolder size="small" color="success" />
				<Icons.BrowseFolder />
				<Icons.BrowseFolder size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BrowseFolder size="small" color="success" />
				<Icons.BrowseFolder />
				<Icons.BrowseFolder size="large" color="error" />
			</div>
		</div>
	),
};

export const BubbleChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BubbleChart size="small" color="success" />
				<Icons.BubbleChart />
				<Icons.BubbleChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BubbleChart size="small" color="success" />
				<Icons.BubbleChart />
				<Icons.BubbleChart size="large" color="error" />
			</div>
		</div>
	),
};

export const Building: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Building size="small" color="success" />
				<Icons.Building />
				<Icons.Building size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Building size="small" color="success" />
				<Icons.Building />
				<Icons.Building size="large" color="error" />
			</div>
		</div>
	),
};

export const BulletText: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BulletText size="small" color="success" />
				<Icons.BulletText />
				<Icons.BulletText size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BulletText size="small" color="success" />
				<Icons.BulletText />
				<Icons.BulletText size="large" color="error" />
			</div>
		</div>
	),
};

export const Burglary: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Burglary size="small" color="success" />
				<Icons.Burglary />
				<Icons.Burglary size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Burglary size="small" color="success" />
				<Icons.Burglary />
				<Icons.Burglary size="large" color="error" />
			</div>
		</div>
	),
};

export const BusinessByDesign: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BusinessByDesign size="small" color="success" />
				<Icons.BusinessByDesign />
				<Icons.BusinessByDesign size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BusinessByDesign size="small" color="success" />
				<Icons.BusinessByDesign />
				<Icons.BusinessByDesign size="large" color="error" />
			</div>
		</div>
	),
};

export const BusinessCard: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BusinessCard size="small" color="success" />
				<Icons.BusinessCard />
				<Icons.BusinessCard size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BusinessCard size="small" color="success" />
				<Icons.BusinessCard />
				<Icons.BusinessCard size="large" color="error" />
			</div>
		</div>
	),
};

export const BusinessObjectsExperience: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BusinessObjectsExperience size="small" color="success" />
				<Icons.BusinessObjectsExperience />
				<Icons.BusinessObjectsExperience size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BusinessObjectsExperience size="small" color="success" />
				<Icons.BusinessObjectsExperience />
				<Icons.BusinessObjectsExperience size="large" color="error" />
			</div>
		</div>
	),
};

export const BusinessObjectsExplorer: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BusinessObjectsExplorer size="small" color="success" />
				<Icons.BusinessObjectsExplorer />
				<Icons.BusinessObjectsExplorer size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BusinessObjectsExplorer size="small" color="success" />
				<Icons.BusinessObjectsExplorer />
				<Icons.BusinessObjectsExplorer size="large" color="error" />
			</div>
		</div>
	),
};

export const BusinessObjectsMobile: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BusinessObjectsMobile size="small" color="success" />
				<Icons.BusinessObjectsMobile />
				<Icons.BusinessObjectsMobile size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BusinessObjectsMobile size="small" color="success" />
				<Icons.BusinessObjectsMobile />
				<Icons.BusinessObjectsMobile size="large" color="error" />
			</div>
		</div>
	),
};

export const BusinessOne: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BusinessOne size="small" color="success" />
				<Icons.BusinessOne />
				<Icons.BusinessOne size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BusinessOne size="small" color="success" />
				<Icons.BusinessOne />
				<Icons.BusinessOne size="large" color="error" />
			</div>
		</div>
	),
};

export const BusPublicTransport: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.BusPublicTransport size="small" color="success" />
				<Icons.BusPublicTransport />
				<Icons.BusPublicTransport size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.BusPublicTransport size="small" color="success" />
				<Icons.BusPublicTransport />
				<Icons.BusPublicTransport size="large" color="error" />
			</div>
		</div>
	),
};

export const Busy: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Busy size="small" color="success" />
				<Icons.Busy />
				<Icons.Busy size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Busy size="small" color="success" />
				<Icons.Busy />
				<Icons.Busy size="large" color="error" />
			</div>
		</div>
	),
};

export const Calendar: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Calendar size="small" color="success" />
				<Icons.Calendar />
				<Icons.Calendar size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Calendar size="small" color="success" />
				<Icons.Calendar />
				<Icons.Calendar size="large" color="error" />
			</div>
		</div>
	),
};

export const Call: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Call size="small" color="success" />
				<Icons.Call />
				<Icons.Call size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Call size="small" color="success" />
				<Icons.Call />
				<Icons.Call size="large" color="error" />
			</div>
		</div>
	),
};

export const Camera: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Camera size="small" color="success" />
				<Icons.Camera />
				<Icons.Camera size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Camera size="small" color="success" />
				<Icons.Camera />
				<Icons.Camera size="large" color="error" />
			</div>
		</div>
	),
};

export const Cancel: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Cancel size="small" color="success" />
				<Icons.Cancel />
				<Icons.Cancel size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Cancel size="small" color="success" />
				<Icons.Cancel />
				<Icons.Cancel size="large" color="error" />
			</div>
		</div>
	),
};

export const CancelMaintenance: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CancelMaintenance size="small" color="success" />
				<Icons.CancelMaintenance />
				<Icons.CancelMaintenance size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CancelMaintenance size="small" color="success" />
				<Icons.CancelMaintenance />
				<Icons.CancelMaintenance size="large" color="error" />
			</div>
		</div>
	),
};

export const CancelShare: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CancelShare size="small" color="success" />
				<Icons.CancelShare />
				<Icons.CancelShare size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CancelShare size="small" color="success" />
				<Icons.CancelShare />
				<Icons.CancelShare size="large" color="error" />
			</div>
		</div>
	),
};

export const CapitalProjects: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CapitalProjects size="small" color="success" />
				<Icons.CapitalProjects />
				<Icons.CapitalProjects size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CapitalProjects size="small" color="success" />
				<Icons.CapitalProjects />
				<Icons.CapitalProjects size="large" color="error" />
			</div>
		</div>
	),
};

export const Card: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Card size="small" color="success" />
				<Icons.Card />
				<Icons.Card size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Card size="small" color="success" />
				<Icons.Card />
				<Icons.Card size="large" color="error" />
			</div>
		</div>
	),
};

export const CargoTrain: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CargoTrain size="small" color="success" />
				<Icons.CargoTrain />
				<Icons.CargoTrain size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CargoTrain size="small" color="success" />
				<Icons.CargoTrain />
				<Icons.CargoTrain size="large" color="error" />
			</div>
		</div>
	),
};

export const CarRental: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CarRental size="small" color="success" />
				<Icons.CarRental />
				<Icons.CarRental size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CarRental size="small" color="success" />
				<Icons.CarRental />
				<Icons.CarRental size="large" color="error" />
			</div>
		</div>
	),
};

export const Cart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Cart size="small" color="success" />
				<Icons.Cart />
				<Icons.Cart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Cart size="small" color="success" />
				<Icons.Cart />
				<Icons.Cart size="large" color="error" />
			</div>
		</div>
	),
};

export const Cart2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Cart2 size="small" color="success" />
				<Icons.Cart2 />
				<Icons.Cart2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Cart2 size="small" color="success" />
				<Icons.Cart2 />
				<Icons.Cart2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Cart3: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Cart3 size="small" color="success" />
				<Icons.Cart3 />
				<Icons.Cart3 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Cart3 size="small" color="success" />
				<Icons.Cart3 />
				<Icons.Cart3 size="large" color="error" />
			</div>
		</div>
	),
};

export const Cart4: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Cart4 size="small" color="success" />
				<Icons.Cart4 />
				<Icons.Cart4 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Cart4 size="small" color="success" />
				<Icons.Cart4 />
				<Icons.Cart4 size="large" color="error" />
			</div>
		</div>
	),
};

export const Cart5: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Cart5 size="small" color="success" />
				<Icons.Cart5 />
				<Icons.Cart5 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Cart5 size="small" color="success" />
				<Icons.Cart5 />
				<Icons.Cart5 size="large" color="error" />
			</div>
		</div>
	),
};

export const CartApproval: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CartApproval size="small" color="success" />
				<Icons.CartApproval />
				<Icons.CartApproval size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CartApproval size="small" color="success" />
				<Icons.CartApproval />
				<Icons.CartApproval size="large" color="error" />
			</div>
		</div>
	),
};

export const CartFull: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CartFull size="small" color="success" />
				<Icons.CartFull />
				<Icons.CartFull size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CartFull size="small" color="success" />
				<Icons.CartFull />
				<Icons.CartFull size="large" color="error" />
			</div>
		</div>
	),
};

export const Cause: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Cause size="small" color="success" />
				<Icons.Cause />
				<Icons.Cause size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Cause size="small" color="success" />
				<Icons.Cause />
				<Icons.Cause size="large" color="error" />
			</div>
		</div>
	),
};

export const ChainLink: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ChainLink size="small" color="success" />
				<Icons.ChainLink />
				<Icons.ChainLink size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ChainLink size="small" color="success" />
				<Icons.ChainLink />
				<Icons.ChainLink size="large" color="error" />
			</div>
		</div>
	),
};

export const Chalkboard: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Chalkboard size="small" color="success" />
				<Icons.Chalkboard />
				<Icons.Chalkboard size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Chalkboard size="small" color="success" />
				<Icons.Chalkboard />
				<Icons.Chalkboard size="large" color="error" />
			</div>
		</div>
	),
};

export const ChartAxis: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ChartAxis size="small" color="success" />
				<Icons.ChartAxis />
				<Icons.ChartAxis size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ChartAxis size="small" color="success" />
				<Icons.ChartAxis />
				<Icons.ChartAxis size="large" color="error" />
			</div>
		</div>
	),
};

export const ChartTableView: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ChartTableView size="small" color="success" />
				<Icons.ChartTableView />
				<Icons.ChartTableView size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ChartTableView size="small" color="success" />
				<Icons.ChartTableView />
				<Icons.ChartTableView size="large" color="error" />
			</div>
		</div>
	),
};

export const ChartTreeMap: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ChartTreeMap size="small" color="success" />
				<Icons.ChartTreeMap />
				<Icons.ChartTreeMap size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ChartTreeMap size="small" color="success" />
				<Icons.ChartTreeMap />
				<Icons.ChartTreeMap size="large" color="error" />
			</div>
		</div>
	),
};

export const CheckAvailability: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CheckAvailability size="small" color="success" />
				<Icons.CheckAvailability />
				<Icons.CheckAvailability size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CheckAvailability size="small" color="success" />
				<Icons.CheckAvailability />
				<Icons.CheckAvailability size="large" color="error" />
			</div>
		</div>
	),
};

export const Checklist: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Checklist size="small" color="success" />
				<Icons.Checklist />
				<Icons.Checklist size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Checklist size="small" color="success" />
				<Icons.Checklist />
				<Icons.Checklist size="large" color="error" />
			</div>
		</div>
	),
};

export const Checklist2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Checklist2 size="small" color="success" />
				<Icons.Checklist2 />
				<Icons.Checklist2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Checklist2 size="small" color="success" />
				<Icons.Checklist2 />
				<Icons.Checklist2 size="large" color="error" />
			</div>
		</div>
	),
};

export const ChecklistItem: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ChecklistItem size="small" color="success" />
				<Icons.ChecklistItem />
				<Icons.ChecklistItem size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ChecklistItem size="small" color="success" />
				<Icons.ChecklistItem />
				<Icons.ChecklistItem size="large" color="error" />
			</div>
		</div>
	),
};

export const ChecklistItem2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ChecklistItem2 size="small" color="success" />
				<Icons.ChecklistItem2 />
				<Icons.ChecklistItem2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ChecklistItem2 size="small" color="success" />
				<Icons.ChecklistItem2 />
				<Icons.ChecklistItem2 size="large" color="error" />
			</div>
		</div>
	),
};

export const ChevronPhase: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ChevronPhase size="small" color="success" />
				<Icons.ChevronPhase />
				<Icons.ChevronPhase size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ChevronPhase size="small" color="success" />
				<Icons.ChevronPhase />
				<Icons.ChevronPhase size="large" color="error" />
			</div>
		</div>
	),
};

export const ChevronPhase2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ChevronPhase2 size="small" color="success" />
				<Icons.ChevronPhase2 />
				<Icons.ChevronPhase2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ChevronPhase2 size="small" color="success" />
				<Icons.ChevronPhase2 />
				<Icons.ChevronPhase2 size="large" color="error" />
			</div>
		</div>
	),
};

export const ChoroplethChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ChoroplethChart size="small" color="success" />
				<Icons.ChoroplethChart />
				<Icons.ChoroplethChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ChoroplethChart size="small" color="success" />
				<Icons.ChoroplethChart />
				<Icons.ChoroplethChart size="large" color="error" />
			</div>
		</div>
	),
};

export const CircleTask: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CircleTask size="small" color="success" />
				<Icons.CircleTask />
				<Icons.CircleTask size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CircleTask size="small" color="success" />
				<Icons.CircleTask />
				<Icons.CircleTask size="large" color="error" />
			</div>
		</div>
	),
};

export const CircleTask2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CircleTask2 size="small" color="success" />
				<Icons.CircleTask2 />
				<Icons.CircleTask2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CircleTask2 size="small" color="success" />
				<Icons.CircleTask2 />
				<Icons.CircleTask2 size="large" color="error" />
			</div>
		</div>
	),
};

export const CitizenConnect: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CitizenConnect size="small" color="success" />
				<Icons.CitizenConnect />
				<Icons.CitizenConnect size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CitizenConnect size="small" color="success" />
				<Icons.CitizenConnect />
				<Icons.CitizenConnect size="large" color="error" />
			</div>
		</div>
	),
};

export const ClearAll: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ClearAll size="small" color="success" />
				<Icons.ClearAll />
				<Icons.ClearAll size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ClearAll size="small" color="success" />
				<Icons.ClearAll />
				<Icons.ClearAll size="large" color="error" />
			</div>
		</div>
	),
};

export const ClearFilter: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ClearFilter size="small" color="success" />
				<Icons.ClearFilter />
				<Icons.ClearFilter size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ClearFilter size="small" color="success" />
				<Icons.ClearFilter />
				<Icons.ClearFilter size="large" color="error" />
			</div>
		</div>
	),
};

export const ClinicalOrder: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ClinicalOrder size="small" color="success" />
				<Icons.ClinicalOrder />
				<Icons.ClinicalOrder size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ClinicalOrder size="small" color="success" />
				<Icons.ClinicalOrder />
				<Icons.ClinicalOrder size="large" color="error" />
			</div>
		</div>
	),
};

export const ClinicalTaskTracker: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ClinicalTaskTracker size="small" color="success" />
				<Icons.ClinicalTaskTracker />
				<Icons.ClinicalTaskTracker size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ClinicalTaskTracker size="small" color="success" />
				<Icons.ClinicalTaskTracker />
				<Icons.ClinicalTaskTracker size="large" color="error" />
			</div>
		</div>
	),
};

export const CloseCommandField: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CloseCommandField size="small" color="success" />
				<Icons.CloseCommandField />
				<Icons.CloseCommandField size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CloseCommandField size="small" color="success" />
				<Icons.CloseCommandField />
				<Icons.CloseCommandField size="large" color="error" />
			</div>
		</div>
	),
};

export const Cloud: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Cloud size="small" color="success" />
				<Icons.Cloud />
				<Icons.Cloud size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Cloud size="small" color="success" />
				<Icons.Cloud />
				<Icons.Cloud size="large" color="error" />
			</div>
		</div>
	),
};

export const CloudCheck: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CloudCheck size="small" color="success" />
				<Icons.CloudCheck />
				<Icons.CloudCheck size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CloudCheck size="small" color="success" />
				<Icons.CloudCheck />
				<Icons.CloudCheck size="large" color="error" />
			</div>
		</div>
	),
};

export const Co: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Co size="small" color="success" />
				<Icons.Co />
				<Icons.Co size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Co size="small" color="success" />
				<Icons.Co />
				<Icons.Co size="large" color="error" />
			</div>
		</div>
	),
};

export const Collaborate: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Collaborate size="small" color="success" />
				<Icons.Collaborate />
				<Icons.Collaborate size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Collaborate size="small" color="success" />
				<Icons.Collaborate />
				<Icons.Collaborate size="large" color="error" />
			</div>
		</div>
	),
};

export const Collapse: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Collapse size="small" color="success" />
				<Icons.Collapse />
				<Icons.Collapse size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Collapse size="small" color="success" />
				<Icons.Collapse />
				<Icons.Collapse size="large" color="error" />
			</div>
		</div>
	),
};

export const CollapseAll: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CollapseAll size="small" color="success" />
				<Icons.CollapseAll />
				<Icons.CollapseAll size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CollapseAll size="small" color="success" />
				<Icons.CollapseAll />
				<Icons.CollapseAll size="large" color="error" />
			</div>
		</div>
	),
};

export const CollapseGroup: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CollapseGroup size="small" color="success" />
				<Icons.CollapseGroup />
				<Icons.CollapseGroup size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CollapseGroup size="small" color="success" />
				<Icons.CollapseGroup />
				<Icons.CollapseGroup size="large" color="error" />
			</div>
		</div>
	),
};

export const CollectionsInsight: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CollectionsInsight size="small" color="success" />
				<Icons.CollectionsInsight />
				<Icons.CollectionsInsight size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CollectionsInsight size="small" color="success" />
				<Icons.CollectionsInsight />
				<Icons.CollectionsInsight size="large" color="error" />
			</div>
		</div>
	),
};

export const CollectionsManagement: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CollectionsManagement size="small" color="success" />
				<Icons.CollectionsManagement />
				<Icons.CollectionsManagement size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CollectionsManagement size="small" color="success" />
				<Icons.CollectionsManagement />
				<Icons.CollectionsManagement size="large" color="error" />
			</div>
		</div>
	),
};

export const Collision: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Collision size="small" color="success" />
				<Icons.Collision />
				<Icons.Collision size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Collision size="small" color="success" />
				<Icons.Collision />
				<Icons.Collision size="large" color="error" />
			</div>
		</div>
	),
};

export const ColorFill: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ColorFill size="small" color="success" />
				<Icons.ColorFill />
				<Icons.ColorFill size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ColorFill size="small" color="success" />
				<Icons.ColorFill />
				<Icons.ColorFill size="large" color="error" />
			</div>
		</div>
	),
};

export const ColumnChartDualAxis: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ColumnChartDualAxis size="small" color="success" />
				<Icons.ColumnChartDualAxis />
				<Icons.ColumnChartDualAxis size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ColumnChartDualAxis size="small" color="success" />
				<Icons.ColumnChartDualAxis />
				<Icons.ColumnChartDualAxis size="large" color="error" />
			</div>
		</div>
	),
};

export const Combine: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Combine size="small" color="success" />
				<Icons.Combine />
				<Icons.Combine size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Combine size="small" color="success" />
				<Icons.Combine />
				<Icons.Combine size="large" color="error" />
			</div>
		</div>
	),
};

export const CommandLineInterfaces: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CommandLineInterfaces size="small" color="success" />
				<Icons.CommandLineInterfaces />
				<Icons.CommandLineInterfaces size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CommandLineInterfaces size="small" color="success" />
				<Icons.CommandLineInterfaces />
				<Icons.CommandLineInterfaces size="large" color="error" />
			</div>
		</div>
	),
};

export const Comment: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Comment size="small" color="success" />
				<Icons.Comment />
				<Icons.Comment size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Comment size="small" color="success" />
				<Icons.Comment />
				<Icons.Comment size="large" color="error" />
			</div>
		</div>
	),
};

export const CommissionCheck: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CommissionCheck size="small" color="success" />
				<Icons.CommissionCheck />
				<Icons.CommissionCheck size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CommissionCheck size="small" color="success" />
				<Icons.CommissionCheck />
				<Icons.CommissionCheck size="large" color="error" />
			</div>
		</div>
	),
};

export const CompanyView: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CompanyView size="small" color="success" />
				<Icons.CompanyView />
				<Icons.CompanyView size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CompanyView size="small" color="success" />
				<Icons.CompanyView />
				<Icons.CompanyView size="large" color="error" />
			</div>
		</div>
	),
};

export const Compare: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Compare size="small" color="success" />
				<Icons.Compare />
				<Icons.Compare size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Compare size="small" color="success" />
				<Icons.Compare />
				<Icons.Compare size="large" color="error" />
			</div>
		</div>
	),
};

export const Compare2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Compare2 size="small" color="success" />
				<Icons.Compare2 />
				<Icons.Compare2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Compare2 size="small" color="success" />
				<Icons.Compare2 />
				<Icons.Compare2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Competitor: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Competitor size="small" color="success" />
				<Icons.Competitor />
				<Icons.Competitor size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Competitor size="small" color="success" />
				<Icons.Competitor />
				<Icons.Competitor size="large" color="error" />
			</div>
		</div>
	),
};

export const Complete: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Complete size="small" color="success" />
				<Icons.Complete />
				<Icons.Complete size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Complete size="small" color="success" />
				<Icons.Complete />
				<Icons.Complete size="large" color="error" />
			</div>
		</div>
	),
};

export const Connected: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Connected size="small" color="success" />
				<Icons.Connected />
				<Icons.Connected size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Connected size="small" color="success" />
				<Icons.Connected />
				<Icons.Connected size="large" color="error" />
			</div>
		</div>
	),
};

export const Contacts: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Contacts size="small" color="success" />
				<Icons.Contacts />
				<Icons.Contacts size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Contacts size="small" color="success" />
				<Icons.Contacts />
				<Icons.Contacts size="large" color="error" />
			</div>
		</div>
	),
};

export const Copy: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Copy size="small" color="success" />
				<Icons.Copy />
				<Icons.Copy size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Copy size="small" color="success" />
				<Icons.Copy />
				<Icons.Copy size="large" color="error" />
			</div>
		</div>
	),
};

export const CourseBook: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CourseBook size="small" color="success" />
				<Icons.CourseBook />
				<Icons.CourseBook size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CourseBook size="small" color="success" />
				<Icons.CourseBook />
				<Icons.CourseBook size="large" color="error" />
			</div>
		</div>
	),
};

export const CourseProgram: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CourseProgram size="small" color="success" />
				<Icons.CourseProgram />
				<Icons.CourseProgram size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CourseProgram size="small" color="success" />
				<Icons.CourseProgram />
				<Icons.CourseProgram size="large" color="error" />
			</div>
		</div>
	),
};

export const Create: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Create size="small" color="success" />
				<Icons.Create />
				<Icons.Create size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Create size="small" color="success" />
				<Icons.Create />
				<Icons.Create size="large" color="error" />
			</div>
		</div>
	),
};

export const CreateEntryTime: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CreateEntryTime size="small" color="success" />
				<Icons.CreateEntryTime />
				<Icons.CreateEntryTime size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CreateEntryTime size="small" color="success" />
				<Icons.CreateEntryTime />
				<Icons.CreateEntryTime size="large" color="error" />
			</div>
		</div>
	),
};

export const CreateForm: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CreateForm size="small" color="success" />
				<Icons.CreateForm />
				<Icons.CreateForm size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CreateForm size="small" color="success" />
				<Icons.CreateForm />
				<Icons.CreateForm size="large" color="error" />
			</div>
		</div>
	),
};

export const CreateLeaveRequest: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CreateLeaveRequest size="small" color="success" />
				<Icons.CreateLeaveRequest />
				<Icons.CreateLeaveRequest size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CreateLeaveRequest size="small" color="success" />
				<Icons.CreateLeaveRequest />
				<Icons.CreateLeaveRequest size="large" color="error" />
			</div>
		</div>
	),
};

export const CreateSession: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CreateSession size="small" color="success" />
				<Icons.CreateSession />
				<Icons.CreateSession size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CreateSession size="small" color="success" />
				<Icons.CreateSession />
				<Icons.CreateSession size="large" color="error" />
			</div>
		</div>
	),
};

export const CreditCard: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CreditCard size="small" color="success" />
				<Icons.CreditCard />
				<Icons.CreditCard size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CreditCard size="small" color="success" />
				<Icons.CreditCard />
				<Icons.CreditCard size="large" color="error" />
			</div>
		</div>
	),
};

export const CrmSales: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CrmSales size="small" color="success" />
				<Icons.CrmSales />
				<Icons.CrmSales size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CrmSales size="small" color="success" />
				<Icons.CrmSales />
				<Icons.CrmSales size="large" color="error" />
			</div>
		</div>
	),
};

export const CrmServiceManager: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CrmServiceManager size="small" color="success" />
				<Icons.CrmServiceManager />
				<Icons.CrmServiceManager size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CrmServiceManager size="small" color="success" />
				<Icons.CrmServiceManager />
				<Icons.CrmServiceManager size="large" color="error" />
			</div>
		</div>
	),
};

export const Crop: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Crop size="small" color="success" />
				<Icons.Crop />
				<Icons.Crop size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Crop size="small" color="success" />
				<Icons.Crop />
				<Icons.Crop size="large" color="error" />
			</div>
		</div>
	),
};

export const CrossedLineChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CrossedLineChart size="small" color="success" />
				<Icons.CrossedLineChart />
				<Icons.CrossedLineChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CrossedLineChart size="small" color="success" />
				<Icons.CrossedLineChart />
				<Icons.CrossedLineChart size="large" color="error" />
			</div>
		</div>
	),
};

export const Currency: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Currency size="small" color="success" />
				<Icons.Currency />
				<Icons.Currency size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Currency size="small" color="success" />
				<Icons.Currency />
				<Icons.Currency size="large" color="error" />
			</div>
		</div>
	),
};

export const Curriculum: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Curriculum size="small" color="success" />
				<Icons.Curriculum />
				<Icons.Curriculum size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Curriculum size="small" color="success" />
				<Icons.Curriculum />
				<Icons.Curriculum size="large" color="error" />
			</div>
		</div>
	),
};

export const CursorArrow: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CursorArrow size="small" color="success" />
				<Icons.CursorArrow />
				<Icons.CursorArrow size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CursorArrow size="small" color="success" />
				<Icons.CursorArrow />
				<Icons.CursorArrow size="large" color="error" />
			</div>
		</div>
	),
};

export const Customer: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Customer size="small" color="success" />
				<Icons.Customer />
				<Icons.Customer size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Customer size="small" color="success" />
				<Icons.Customer />
				<Icons.Customer size="large" color="error" />
			</div>
		</div>
	),
};

export const CustomerAndContacts: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CustomerAndContacts size="small" color="success" />
				<Icons.CustomerAndContacts />
				<Icons.CustomerAndContacts size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CustomerAndContacts size="small" color="success" />
				<Icons.CustomerAndContacts />
				<Icons.CustomerAndContacts size="large" color="error" />
			</div>
		</div>
	),
};

export const CustomerAndSupplier: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CustomerAndSupplier size="small" color="success" />
				<Icons.CustomerAndSupplier />
				<Icons.CustomerAndSupplier size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CustomerAndSupplier size="small" color="success" />
				<Icons.CustomerAndSupplier />
				<Icons.CustomerAndSupplier size="large" color="error" />
			</div>
		</div>
	),
};

export const CustomerBriefing: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CustomerBriefing size="small" color="success" />
				<Icons.CustomerBriefing />
				<Icons.CustomerBriefing size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CustomerBriefing size="small" color="success" />
				<Icons.CustomerBriefing />
				<Icons.CustomerBriefing size="large" color="error" />
			</div>
		</div>
	),
};

export const CustomerFinancialFactSheet: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CustomerFinancialFactSheet size="small" color="success" />
				<Icons.CustomerFinancialFactSheet />
				<Icons.CustomerFinancialFactSheet size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CustomerFinancialFactSheet size="small" color="success" />
				<Icons.CustomerFinancialFactSheet />
				<Icons.CustomerFinancialFactSheet size="large" color="error" />
			</div>
		</div>
	),
};

export const CustomerHistory: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CustomerHistory size="small" color="success" />
				<Icons.CustomerHistory />
				<Icons.CustomerHistory size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CustomerHistory size="small" color="success" />
				<Icons.CustomerHistory />
				<Icons.CustomerHistory size="large" color="error" />
			</div>
		</div>
	),
};

export const CustomerOrderEntry: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CustomerOrderEntry size="small" color="success" />
				<Icons.CustomerOrderEntry />
				<Icons.CustomerOrderEntry size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CustomerOrderEntry size="small" color="success" />
				<Icons.CustomerOrderEntry />
				<Icons.CustomerOrderEntry size="large" color="error" />
			</div>
		</div>
	),
};

export const CustomerView: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.CustomerView size="small" color="success" />
				<Icons.CustomerView />
				<Icons.CustomerView size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.CustomerView size="small" color="success" />
				<Icons.CustomerView />
				<Icons.CustomerView size="large" color="error" />
			</div>
		</div>
	),
};

export const Customize: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Customize size="small" color="success" />
				<Icons.Customize />
				<Icons.Customize size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Customize size="small" color="success" />
				<Icons.Customize />
				<Icons.Customize size="large" color="error" />
			</div>
		</div>
	),
};

export const Da: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Da size="small" color="success" />
				<Icons.Da />
				<Icons.Da size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Da size="small" color="success" />
				<Icons.Da />
				<Icons.Da size="large" color="error" />
			</div>
		</div>
	),
};

export const Da2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Da2 size="small" color="success" />
				<Icons.Da2 />
				<Icons.Da2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Da2 size="small" color="success" />
				<Icons.Da2 />
				<Icons.Da2 size="large" color="error" />
			</div>
		</div>
	),
};

export const DarkMode: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DarkMode size="small" color="success" />
				<Icons.DarkMode />
				<Icons.DarkMode size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DarkMode size="small" color="success" />
				<Icons.DarkMode />
				<Icons.DarkMode size="large" color="error" />
			</div>
		</div>
	),
};

export const Database: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Database size="small" color="success" />
				<Icons.Database />
				<Icons.Database size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Database size="small" color="success" />
				<Icons.Database />
				<Icons.Database size="large" color="error" />
			</div>
		</div>
	),
};

export const DateTime: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DateTime size="small" color="success" />
				<Icons.DateTime />
				<Icons.DateTime size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DateTime size="small" color="success" />
				<Icons.DateTime />
				<Icons.DateTime size="large" color="error" />
			</div>
		</div>
	),
};

export const Decision: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Decision size="small" color="success" />
				<Icons.Decision />
				<Icons.Decision size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Decision size="small" color="success" />
				<Icons.Decision />
				<Icons.Decision size="large" color="error" />
			</div>
		</div>
	),
};

export const Decline: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Decline size="small" color="success" />
				<Icons.Decline />
				<Icons.Decline size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Decline size="small" color="success" />
				<Icons.Decline />
				<Icons.Decline size="large" color="error" />
			</div>
		</div>
	),
};

export const DecreaseLineHeight: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DecreaseLineHeight size="small" color="success" />
				<Icons.DecreaseLineHeight />
				<Icons.DecreaseLineHeight size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DecreaseLineHeight size="small" color="success" />
				<Icons.DecreaseLineHeight />
				<Icons.DecreaseLineHeight size="large" color="error" />
			</div>
		</div>
	),
};

export const Delete: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Delete size="small" color="success" />
				<Icons.Delete />
				<Icons.Delete size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Delete size="small" color="success" />
				<Icons.Delete />
				<Icons.Delete size="large" color="error" />
			</div>
		</div>
	),
};

export const DesktopMobile: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DesktopMobile size="small" color="success" />
				<Icons.DesktopMobile />
				<Icons.DesktopMobile size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DesktopMobile size="small" color="success" />
				<Icons.DesktopMobile />
				<Icons.DesktopMobile size="large" color="error" />
			</div>
		</div>
	),
};

export const DetailLess: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DetailLess size="small" color="success" />
				<Icons.DetailLess />
				<Icons.DetailLess size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DetailLess size="small" color="success" />
				<Icons.DetailLess />
				<Icons.DetailLess size="large" color="error" />
			</div>
		</div>
	),
};

export const DetailMore: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DetailMore size="small" color="success" />
				<Icons.DetailMore />
				<Icons.DetailMore size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DetailMore size="small" color="success" />
				<Icons.DetailMore />
				<Icons.DetailMore size="large" color="error" />
			</div>
		</div>
	),
};

export const DetailView: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DetailView size="small" color="success" />
				<Icons.DetailView />
				<Icons.DetailView size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DetailView size="small" color="success" />
				<Icons.DetailView />
				<Icons.DetailView size="large" color="error" />
			</div>
		</div>
	),
};

export const DeveloperSettings: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DeveloperSettings size="small" color="success" />
				<Icons.DeveloperSettings />
				<Icons.DeveloperSettings size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DeveloperSettings size="small" color="success" />
				<Icons.DeveloperSettings />
				<Icons.DeveloperSettings size="large" color="error" />
			</div>
		</div>
	),
};

export const Dimension: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Dimension size="small" color="success" />
				<Icons.Dimension />
				<Icons.Dimension size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Dimension size="small" color="success" />
				<Icons.Dimension />
				<Icons.Dimension size="large" color="error" />
			</div>
		</div>
	),
};

export const DirectionArrows: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DirectionArrows size="small" color="success" />
				<Icons.DirectionArrows />
				<Icons.DirectionArrows size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DirectionArrows size="small" color="success" />
				<Icons.DirectionArrows />
				<Icons.DirectionArrows size="large" color="error" />
			</div>
		</div>
	),
};

export const Disconnected: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Disconnected size="small" color="success" />
				<Icons.Disconnected />
				<Icons.Disconnected size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Disconnected size="small" color="success" />
				<Icons.Disconnected />
				<Icons.Disconnected size="large" color="error" />
			</div>
		</div>
	),
};

export const Discussion: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Discussion size="small" color="success" />
				<Icons.Discussion />
				<Icons.Discussion size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Discussion size="small" color="success" />
				<Icons.Discussion />
				<Icons.Discussion size="large" color="error" />
			</div>
		</div>
	),
};

export const Discussion2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Discussion2 size="small" color="success" />
				<Icons.Discussion2 />
				<Icons.Discussion2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Discussion2 size="small" color="success" />
				<Icons.Discussion2 />
				<Icons.Discussion2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Dishwasher: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Dishwasher size="small" color="success" />
				<Icons.Dishwasher />
				<Icons.Dishwasher size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Dishwasher size="small" color="success" />
				<Icons.Dishwasher />
				<Icons.Dishwasher size="large" color="error" />
			</div>
		</div>
	),
};

export const Display: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Display size="small" color="success" />
				<Icons.Display />
				<Icons.Display size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Display size="small" color="success" />
				<Icons.Display />
				<Icons.Display size="large" color="error" />
			</div>
		</div>
	),
};

export const DisplayMore: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DisplayMore size="small" color="success" />
				<Icons.DisplayMore />
				<Icons.DisplayMore size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DisplayMore size="small" color="success" />
				<Icons.DisplayMore />
				<Icons.DisplayMore size="large" color="error" />
			</div>
		</div>
	),
};

export const DocAttachment: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DocAttachment size="small" color="success" />
				<Icons.DocAttachment />
				<Icons.DocAttachment size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DocAttachment size="small" color="success" />
				<Icons.DocAttachment />
				<Icons.DocAttachment size="large" color="error" />
			</div>
		</div>
	),
};

export const Doctor: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Doctor size="small" color="success" />
				<Icons.Doctor />
				<Icons.Doctor size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Doctor size="small" color="success" />
				<Icons.Doctor />
				<Icons.Doctor size="large" color="error" />
			</div>
		</div>
	),
};

export const Document: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Document size="small" color="success" />
				<Icons.Document />
				<Icons.Document size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Document size="small" color="success" />
				<Icons.Document />
				<Icons.Document size="large" color="error" />
			</div>
		</div>
	),
};

export const Documents: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Documents size="small" color="success" />
				<Icons.Documents />
				<Icons.Documents size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Documents size="small" color="success" />
				<Icons.Documents />
				<Icons.Documents size="large" color="error" />
			</div>
		</div>
	),
};

export const DocumentText: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DocumentText size="small" color="success" />
				<Icons.DocumentText />
				<Icons.DocumentText size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DocumentText size="small" color="success" />
				<Icons.DocumentText />
				<Icons.DocumentText size="large" color="error" />
			</div>
		</div>
	),
};

export const DonutChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DonutChart size="small" color="success" />
				<Icons.DonutChart />
				<Icons.DonutChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DonutChart size="small" color="success" />
				<Icons.DonutChart />
				<Icons.DonutChart size="large" color="error" />
			</div>
		</div>
	),
};

export const Down: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Down size="small" color="success" />
				<Icons.Down />
				<Icons.Down size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Down size="small" color="success" />
				<Icons.Down />
				<Icons.Down size="large" color="error" />
			</div>
		</div>
	),
};

export const Download: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Download size="small" color="success" />
				<Icons.Download />
				<Icons.Download size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Download size="small" color="success" />
				<Icons.Download />
				<Icons.Download size="large" color="error" />
			</div>
		</div>
	),
};

export const DownloadFromCloud: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DownloadFromCloud size="small" color="success" />
				<Icons.DownloadFromCloud />
				<Icons.DownloadFromCloud size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DownloadFromCloud size="small" color="success" />
				<Icons.DownloadFromCloud />
				<Icons.DownloadFromCloud size="large" color="error" />
			</div>
		</div>
	),
};

export const DrawRectangle: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DrawRectangle size="small" color="success" />
				<Icons.DrawRectangle />
				<Icons.DrawRectangle size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DrawRectangle size="small" color="success" />
				<Icons.DrawRectangle />
				<Icons.DrawRectangle size="large" color="error" />
			</div>
		</div>
	),
};

export const DrillDown: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DrillDown size="small" color="success" />
				<Icons.DrillDown />
				<Icons.DrillDown size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DrillDown size="small" color="success" />
				<Icons.DrillDown />
				<Icons.DrillDown size="large" color="error" />
			</div>
		</div>
	),
};

export const DrillUp: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DrillUp size="small" color="success" />
				<Icons.DrillUp />
				<Icons.DrillUp size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DrillUp size="small" color="success" />
				<Icons.DrillUp />
				<Icons.DrillUp size="large" color="error" />
			</div>
		</div>
	),
};

export const Dropdown: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Dropdown size="small" color="success" />
				<Icons.Dropdown />
				<Icons.Dropdown size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Dropdown size="small" color="success" />
				<Icons.Dropdown />
				<Icons.Dropdown size="large" color="error" />
			</div>
		</div>
	),
};

export const DropDownList: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.DropDownList size="small" color="success" />
				<Icons.DropDownList />
				<Icons.DropDownList size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.DropDownList size="small" color="success" />
				<Icons.DropDownList />
				<Icons.DropDownList size="large" color="error" />
			</div>
		</div>
	),
};

export const Duplicate: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Duplicate size="small" color="success" />
				<Icons.Duplicate />
				<Icons.Duplicate size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Duplicate size="small" color="success" />
				<Icons.Duplicate />
				<Icons.Duplicate size="large" color="error" />
			</div>
		</div>
	),
};

export const EamWorkOrder: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.EamWorkOrder size="small" color="success" />
				<Icons.EamWorkOrder />
				<Icons.EamWorkOrder size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.EamWorkOrder size="small" color="success" />
				<Icons.EamWorkOrder />
				<Icons.EamWorkOrder size="large" color="error" />
			</div>
		</div>
	),
};

export const ECare: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ECare size="small" color="success" />
				<Icons.ECare />
				<Icons.ECare size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ECare size="small" color="success" />
				<Icons.ECare />
				<Icons.ECare size="large" color="error" />
			</div>
		</div>
	),
};

export const Edit: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Edit size="small" color="success" />
				<Icons.Edit />
				<Icons.Edit size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Edit size="small" color="success" />
				<Icons.Edit />
				<Icons.Edit size="large" color="error" />
			</div>
		</div>
	),
};

export const EditOutside: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.EditOutside size="small" color="success" />
				<Icons.EditOutside />
				<Icons.EditOutside size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.EditOutside size="small" color="success" />
				<Icons.EditOutside />
				<Icons.EditOutside size="large" color="error" />
			</div>
		</div>
	),
};

export const Education: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Education size="small" color="success" />
				<Icons.Education />
				<Icons.Education size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Education size="small" color="success" />
				<Icons.Education />
				<Icons.Education size="large" color="error" />
			</div>
		</div>
	),
};

export const ELearning: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ELearning size="small" color="success" />
				<Icons.ELearning />
				<Icons.ELearning size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ELearning size="small" color="success" />
				<Icons.ELearning />
				<Icons.ELearning size="large" color="error" />
			</div>
		</div>
	),
};

export const Electrocardiogram: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Electrocardiogram size="small" color="success" />
				<Icons.Electrocardiogram />
				<Icons.Electrocardiogram size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Electrocardiogram size="small" color="success" />
				<Icons.Electrocardiogram />
				<Icons.Electrocardiogram size="large" color="error" />
			</div>
		</div>
	),
};

export const ElectronicMedicalRecord: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ElectronicMedicalRecord size="small" color="success" />
				<Icons.ElectronicMedicalRecord />
				<Icons.ElectronicMedicalRecord size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ElectronicMedicalRecord size="small" color="success" />
				<Icons.ElectronicMedicalRecord />
				<Icons.ElectronicMedicalRecord size="large" color="error" />
			</div>
		</div>
	),
};

export const Email: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Email size="small" color="success" />
				<Icons.Email />
				<Icons.Email size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Email size="small" color="success" />
				<Icons.Email />
				<Icons.Email size="large" color="error" />
			</div>
		</div>
	),
};

export const EmailRead: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.EmailRead size="small" color="success" />
				<Icons.EmailRead />
				<Icons.EmailRead size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.EmailRead size="small" color="success" />
				<Icons.EmailRead />
				<Icons.EmailRead size="large" color="error" />
			</div>
		</div>
	),
};

export const Employee: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Employee size="small" color="success" />
				<Icons.Employee />
				<Icons.Employee size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Employee size="small" color="success" />
				<Icons.Employee />
				<Icons.Employee size="large" color="error" />
			</div>
		</div>
	),
};

export const EmployeeApprovals: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.EmployeeApprovals size="small" color="success" />
				<Icons.EmployeeApprovals />
				<Icons.EmployeeApprovals size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.EmployeeApprovals size="small" color="success" />
				<Icons.EmployeeApprovals />
				<Icons.EmployeeApprovals size="large" color="error" />
			</div>
		</div>
	),
};

export const EmployeeLookup: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.EmployeeLookup size="small" color="success" />
				<Icons.EmployeeLookup />
				<Icons.EmployeeLookup size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.EmployeeLookup size="small" color="success" />
				<Icons.EmployeeLookup />
				<Icons.EmployeeLookup size="large" color="error" />
			</div>
		</div>
	),
};

export const EmployeePane: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.EmployeePane size="small" color="success" />
				<Icons.EmployeePane />
				<Icons.EmployeePane size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.EmployeePane size="small" color="success" />
				<Icons.EmployeePane />
				<Icons.EmployeePane size="large" color="error" />
			</div>
		</div>
	),
};

export const EmployeeRejections: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.EmployeeRejections size="small" color="success" />
				<Icons.EmployeeRejections />
				<Icons.EmployeeRejections size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.EmployeeRejections size="small" color="success" />
				<Icons.EmployeeRejections />
				<Icons.EmployeeRejections size="large" color="error" />
			</div>
		</div>
	),
};

export const Enablement: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Enablement size="small" color="success" />
				<Icons.Enablement />
				<Icons.Enablement size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Enablement size="small" color="success" />
				<Icons.Enablement />
				<Icons.Enablement size="large" color="error" />
			</div>
		</div>
	),
};

export const Endoscopy: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Endoscopy size="small" color="success" />
				<Icons.Endoscopy />
				<Icons.Endoscopy size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Endoscopy size="small" color="success" />
				<Icons.Endoscopy />
				<Icons.Endoscopy size="large" color="error" />
			</div>
		</div>
	),
};

export const EndUserExperienceMonitoring: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.EndUserExperienceMonitoring size="small" color="success" />
				<Icons.EndUserExperienceMonitoring />
				<Icons.EndUserExperienceMonitoring size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.EndUserExperienceMonitoring size="small" color="success" />
				<Icons.EndUserExperienceMonitoring />
				<Icons.EndUserExperienceMonitoring size="large" color="error" />
			</div>
		</div>
	),
};

export const EnergySavingLightbulb: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.EnergySavingLightbulb size="small" color="success" />
				<Icons.EnergySavingLightbulb />
				<Icons.EnergySavingLightbulb size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.EnergySavingLightbulb size="small" color="success" />
				<Icons.EnergySavingLightbulb />
				<Icons.EnergySavingLightbulb size="large" color="error" />
			</div>
		</div>
	),
};

export const EnterMore: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.EnterMore size="small" color="success" />
				<Icons.EnterMore />
				<Icons.EnterMore size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.EnterMore size="small" color="success" />
				<Icons.EnterMore />
				<Icons.EnterMore size="large" color="error" />
			</div>
		</div>
	),
};

export const Eraser: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Eraser size="small" color="success" />
				<Icons.Eraser />
				<Icons.Eraser size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Eraser size="small" color="success" />
				<Icons.Eraser />
				<Icons.Eraser size="large" color="error" />
			</div>
		</div>
	),
};

export const Error: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Error size="small" color="success" />
				<Icons.Error />
				<Icons.Error size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Error size="small" color="success" />
				<Icons.Error />
				<Icons.Error size="large" color="error" />
			</div>
		</div>
	),
};

export const Example: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Example size="small" color="success" />
				<Icons.Example />
				<Icons.Example size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Example size="small" color="success" />
				<Icons.Example />
				<Icons.Example size="large" color="error" />
			</div>
		</div>
	),
};

export const ExcelAttachment: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ExcelAttachment size="small" color="success" />
				<Icons.ExcelAttachment />
				<Icons.ExcelAttachment size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ExcelAttachment size="small" color="success" />
				<Icons.ExcelAttachment />
				<Icons.ExcelAttachment size="large" color="error" />
			</div>
		</div>
	),
};

export const ExitFullscreen: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ExitFullscreen size="small" color="success" />
				<Icons.ExitFullscreen />
				<Icons.ExitFullscreen size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ExitFullscreen size="small" color="success" />
				<Icons.ExitFullscreen />
				<Icons.ExitFullscreen size="large" color="error" />
			</div>
		</div>
	),
};

export const Expand: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Expand size="small" color="success" />
				<Icons.Expand />
				<Icons.Expand size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Expand size="small" color="success" />
				<Icons.Expand />
				<Icons.Expand size="large" color="error" />
			</div>
		</div>
	),
};

export const ExpandAll: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ExpandAll size="small" color="success" />
				<Icons.ExpandAll />
				<Icons.ExpandAll size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ExpandAll size="small" color="success" />
				<Icons.ExpandAll />
				<Icons.ExpandAll size="large" color="error" />
			</div>
		</div>
	),
};

export const ExpandGroup: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ExpandGroup size="small" color="success" />
				<Icons.ExpandGroup />
				<Icons.ExpandGroup size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ExpandGroup size="small" color="success" />
				<Icons.ExpandGroup />
				<Icons.ExpandGroup size="large" color="error" />
			</div>
		</div>
	),
};

export const ExpenseReport: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ExpenseReport size="small" color="success" />
				<Icons.ExpenseReport />
				<Icons.ExpenseReport size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ExpenseReport size="small" color="success" />
				<Icons.ExpenseReport />
				<Icons.ExpenseReport size="large" color="error" />
			</div>
		</div>
	),
};

export const Explorer: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Explorer size="small" color="success" />
				<Icons.Explorer />
				<Icons.Explorer size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Explorer size="small" color="success" />
				<Icons.Explorer />
				<Icons.Explorer size="large" color="error" />
			</div>
		</div>
	),
};

export const Factory: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Factory size="small" color="success" />
				<Icons.Factory />
				<Icons.Factory size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Factory size="small" color="success" />
				<Icons.Factory />
				<Icons.Factory size="large" color="error" />
			</div>
		</div>
	),
};

export const Fallback: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Fallback size="small" color="success" />
				<Icons.Fallback />
				<Icons.Fallback size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Fallback size="small" color="success" />
				<Icons.Fallback />
				<Icons.Fallback size="large" color="error" />
			</div>
		</div>
	),
};

export const FamilyCare: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FamilyCare size="small" color="success" />
				<Icons.FamilyCare />
				<Icons.FamilyCare size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FamilyCare size="small" color="success" />
				<Icons.FamilyCare />
				<Icons.FamilyCare size="large" color="error" />
			</div>
		</div>
	),
};

export const FamilyProtection: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FamilyProtection size="small" color="success" />
				<Icons.FamilyProtection />
				<Icons.FamilyProtection size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FamilyProtection size="small" color="success" />
				<Icons.FamilyProtection />
				<Icons.FamilyProtection size="large" color="error" />
			</div>
		</div>
	),
};

export const Favorite: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Favorite size="small" color="success" />
				<Icons.Favorite />
				<Icons.Favorite size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Favorite size="small" color="success" />
				<Icons.Favorite />
				<Icons.Favorite size="large" color="error" />
			</div>
		</div>
	),
};

export const FavoriteList: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FavoriteList size="small" color="success" />
				<Icons.FavoriteList />
				<Icons.FavoriteList size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FavoriteList size="small" color="success" />
				<Icons.FavoriteList />
				<Icons.FavoriteList size="large" color="error" />
			</div>
		</div>
	),
};

export const FaxMachine: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FaxMachine size="small" color="success" />
				<Icons.FaxMachine />
				<Icons.FaxMachine size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FaxMachine size="small" color="success" />
				<Icons.FaxMachine />
				<Icons.FaxMachine size="large" color="error" />
			</div>
		</div>
	),
};

export const Feed: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Feed size="small" color="success" />
				<Icons.Feed />
				<Icons.Feed size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Feed size="small" color="success" />
				<Icons.Feed />
				<Icons.Feed size="large" color="error" />
			</div>
		</div>
	),
};

export const Feedback: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Feedback size="small" color="success" />
				<Icons.Feedback />
				<Icons.Feedback size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Feedback size="small" color="success" />
				<Icons.Feedback />
				<Icons.Feedback size="large" color="error" />
			</div>
		</div>
	),
};

export const FeederArrow: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FeederArrow size="small" color="success" />
				<Icons.FeederArrow />
				<Icons.FeederArrow size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FeederArrow size="small" color="success" />
				<Icons.FeederArrow />
				<Icons.FeederArrow size="large" color="error" />
			</div>
		</div>
	),
};

export const Female: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Female size="small" color="success" />
				<Icons.Female />
				<Icons.Female size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Female size="small" color="success" />
				<Icons.Female />
				<Icons.Female size="large" color="error" />
			</div>
		</div>
	),
};

export const Filter: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Filter size="small" color="success" />
				<Icons.Filter />
				<Icons.Filter size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Filter size="small" color="success" />
				<Icons.Filter />
				<Icons.Filter size="large" color="error" />
			</div>
		</div>
	),
};

export const FilterAnalytics: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FilterAnalytics size="small" color="success" />
				<Icons.FilterAnalytics />
				<Icons.FilterAnalytics size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FilterAnalytics size="small" color="success" />
				<Icons.FilterAnalytics />
				<Icons.FilterAnalytics size="large" color="error" />
			</div>
		</div>
	),
};

export const FilterFacets: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FilterFacets size="small" color="success" />
				<Icons.FilterFacets />
				<Icons.FilterFacets size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FilterFacets size="small" color="success" />
				<Icons.FilterFacets />
				<Icons.FilterFacets size="large" color="error" />
			</div>
		</div>
	),
};

export const FilterFields: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FilterFields size="small" color="success" />
				<Icons.FilterFields />
				<Icons.FilterFields size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FilterFields size="small" color="success" />
				<Icons.FilterFields />
				<Icons.FilterFields size="large" color="error" />
			</div>
		</div>
	),
};

export const Flag: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Flag size="small" color="success" />
				<Icons.Flag />
				<Icons.Flag size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Flag size="small" color="success" />
				<Icons.Flag />
				<Icons.Flag size="large" color="error" />
			</div>
		</div>
	),
};

export const Flag2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Flag2 size="small" color="success" />
				<Icons.Flag2 />
				<Icons.Flag2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Flag2 size="small" color="success" />
				<Icons.Flag2 />
				<Icons.Flag2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Flight: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Flight size="small" color="success" />
				<Icons.Flight />
				<Icons.Flight size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Flight size="small" color="success" />
				<Icons.Flight />
				<Icons.Flight size="large" color="error" />
			</div>
		</div>
	),
};

export const FobWatch: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FobWatch size="small" color="success" />
				<Icons.FobWatch />
				<Icons.FobWatch size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FobWatch size="small" color="success" />
				<Icons.FobWatch />
				<Icons.FobWatch size="large" color="error" />
			</div>
		</div>
	),
};

export const Folder: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Folder size="small" color="success" />
				<Icons.Folder />
				<Icons.Folder size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Folder size="small" color="success" />
				<Icons.Folder />
				<Icons.Folder size="large" color="error" />
			</div>
		</div>
	),
};

export const Folder2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Folder2 size="small" color="success" />
				<Icons.Folder2 />
				<Icons.Folder2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Folder2 size="small" color="success" />
				<Icons.Folder2 />
				<Icons.Folder2 size="large" color="error" />
			</div>
		</div>
	),
};

export const FolderBlank: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FolderBlank size="small" color="success" />
				<Icons.FolderBlank />
				<Icons.FolderBlank size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FolderBlank size="small" color="success" />
				<Icons.FolderBlank />
				<Icons.FolderBlank size="large" color="error" />
			</div>
		</div>
	),
};

export const FolderFull: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FolderFull size="small" color="success" />
				<Icons.FolderFull />
				<Icons.FolderFull size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FolderFull size="small" color="success" />
				<Icons.FolderFull />
				<Icons.FolderFull size="large" color="error" />
			</div>
		</div>
	),
};

export const Form: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Form size="small" color="success" />
				<Icons.Form />
				<Icons.Form size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Form size="small" color="success" />
				<Icons.Form />
				<Icons.Form size="large" color="error" />
			</div>
		</div>
	),
};

export const Forward: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Forward size="small" color="success" />
				<Icons.Forward />
				<Icons.Forward size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Forward size="small" color="success" />
				<Icons.Forward />
				<Icons.Forward size="large" color="error" />
			</div>
		</div>
	),
};

export const Fridge: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Fridge size="small" color="success" />
				<Icons.Fridge />
				<Icons.Fridge size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Fridge size="small" color="success" />
				<Icons.Fridge />
				<Icons.Fridge size="large" color="error" />
			</div>
		</div>
	),
};

export const FullScreen: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FullScreen size="small" color="success" />
				<Icons.FullScreen />
				<Icons.FullScreen size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FullScreen size="small" color="success" />
				<Icons.FullScreen />
				<Icons.FullScreen size="large" color="error" />
			</div>
		</div>
	),
};

export const FullStackedChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FullStackedChart size="small" color="success" />
				<Icons.FullStackedChart />
				<Icons.FullStackedChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FullStackedChart size="small" color="success" />
				<Icons.FullStackedChart />
				<Icons.FullStackedChart size="large" color="error" />
			</div>
		</div>
	),
};

export const FullStackedColumnChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FullStackedColumnChart size="small" color="success" />
				<Icons.FullStackedColumnChart />
				<Icons.FullStackedColumnChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FullStackedColumnChart size="small" color="success" />
				<Icons.FullStackedColumnChart />
				<Icons.FullStackedColumnChart size="large" color="error" />
			</div>
		</div>
	),
};

export const FunctionalLocation: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.FunctionalLocation size="small" color="success" />
				<Icons.FunctionalLocation />
				<Icons.FunctionalLocation size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.FunctionalLocation size="small" color="success" />
				<Icons.FunctionalLocation />
				<Icons.FunctionalLocation size="large" color="error" />
			</div>
		</div>
	),
};

export const Future: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Future size="small" color="success" />
				<Icons.Future />
				<Icons.Future size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Future size="small" color="success" />
				<Icons.Future />
				<Icons.Future size="large" color="error" />
			</div>
		</div>
	),
};

export const Fx: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Fx size="small" color="success" />
				<Icons.Fx />
				<Icons.Fx size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Fx size="small" color="success" />
				<Icons.Fx />
				<Icons.Fx size="large" color="error" />
			</div>
		</div>
	),
};

export const GanttBars: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.GanttBars size="small" color="success" />
				<Icons.GanttBars />
				<Icons.GanttBars size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.GanttBars size="small" color="success" />
				<Icons.GanttBars />
				<Icons.GanttBars size="large" color="error" />
			</div>
		</div>
	),
};

export const GenderMaleAndFemale: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.GenderMaleAndFemale size="small" color="success" />
				<Icons.GenderMaleAndFemale />
				<Icons.GenderMaleAndFemale size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.GenderMaleAndFemale size="small" color="success" />
				<Icons.GenderMaleAndFemale />
				<Icons.GenderMaleAndFemale size="large" color="error" />
			</div>
		</div>
	),
};

export const GeneralLeaveRequest: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.GeneralLeaveRequest size="small" color="success" />
				<Icons.GeneralLeaveRequest />
				<Icons.GeneralLeaveRequest size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.GeneralLeaveRequest size="small" color="success" />
				<Icons.GeneralLeaveRequest />
				<Icons.GeneralLeaveRequest size="large" color="error" />
			</div>
		</div>
	),
};

export const GenerateShortcut: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.GenerateShortcut size="small" color="success" />
				<Icons.GenerateShortcut />
				<Icons.GenerateShortcut size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.GenerateShortcut size="small" color="success" />
				<Icons.GenerateShortcut />
				<Icons.GenerateShortcut size="large" color="error" />
			</div>
		</div>
	),
};

export const GeographicBubbleChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.GeographicBubbleChart size="small" color="success" />
				<Icons.GeographicBubbleChart />
				<Icons.GeographicBubbleChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.GeographicBubbleChart size="small" color="success" />
				<Icons.GeographicBubbleChart />
				<Icons.GeographicBubbleChart size="large" color="error" />
			</div>
		</div>
	),
};

export const Globe: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Globe size="small" color="success" />
				<Icons.Globe />
				<Icons.Globe size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Globe size="small" color="success" />
				<Icons.Globe />
				<Icons.Globe size="large" color="error" />
			</div>
		</div>
	),
};

export const Goal: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Goal size="small" color="success" />
				<Icons.Goal />
				<Icons.Goal size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Goal size="small" color="success" />
				<Icons.Goal />
				<Icons.Goal size="large" color="error" />
			</div>
		</div>
	),
};

export const Goalseek: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Goalseek size="small" color="success" />
				<Icons.Goalseek />
				<Icons.Goalseek size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Goalseek size="small" color="success" />
				<Icons.Goalseek />
				<Icons.Goalseek size="large" color="error" />
			</div>
		</div>
	),
};

export const Grid: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Grid size="small" color="success" />
				<Icons.Grid />
				<Icons.Grid size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Grid size="small" color="success" />
				<Icons.Grid />
				<Icons.Grid size="large" color="error" />
			</div>
		</div>
	),
};

export const Group: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Group size="small" color="success" />
				<Icons.Group />
				<Icons.Group size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Group size="small" color="success" />
				<Icons.Group />
				<Icons.Group size="large" color="error" />
			</div>
		</div>
	),
};

export const Group2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Group2 size="small" color="success" />
				<Icons.Group2 />
				<Icons.Group2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Group2 size="small" color="success" />
				<Icons.Group2 />
				<Icons.Group2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Header: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Header size="small" color="success" />
				<Icons.Header />
				<Icons.Header size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Header size="small" color="success" />
				<Icons.Header />
				<Icons.Header size="large" color="error" />
			</div>
		</div>
	),
};

export const Heading1: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Heading1 size="small" color="success" />
				<Icons.Heading1 />
				<Icons.Heading1 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Heading1 size="small" color="success" />
				<Icons.Heading1 />
				<Icons.Heading1 size="large" color="error" />
			</div>
		</div>
	),
};

export const Heading2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Heading2 size="small" color="success" />
				<Icons.Heading2 />
				<Icons.Heading2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Heading2 size="small" color="success" />
				<Icons.Heading2 />
				<Icons.Heading2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Heading3: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Heading3 size="small" color="success" />
				<Icons.Heading3 />
				<Icons.Heading3 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Heading3 size="small" color="success" />
				<Icons.Heading3 />
				<Icons.Heading3 size="large" color="error" />
			</div>
		</div>
	),
};

export const Headset: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Headset size="small" color="success" />
				<Icons.Headset />
				<Icons.Headset size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Headset size="small" color="success" />
				<Icons.Headset />
				<Icons.Headset size="large" color="error" />
			</div>
		</div>
	),
};

export const Heart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Heart size="small" color="success" />
				<Icons.Heart />
				<Icons.Heart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Heart size="small" color="success" />
				<Icons.Heart />
				<Icons.Heart size="large" color="error" />
			</div>
		</div>
	),
};

export const Heart2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Heart2 size="small" color="success" />
				<Icons.Heart2 />
				<Icons.Heart2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Heart2 size="small" color="success" />
				<Icons.Heart2 />
				<Icons.Heart2 size="large" color="error" />
			</div>
		</div>
	),
};

export const HeatingCooling: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.HeatingCooling size="small" color="success" />
				<Icons.HeatingCooling />
				<Icons.HeatingCooling size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.HeatingCooling size="small" color="success" />
				<Icons.HeatingCooling />
				<Icons.HeatingCooling size="large" color="error" />
			</div>
		</div>
	),
};

export const HeatmapChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.HeatmapChart size="small" color="success" />
				<Icons.HeatmapChart />
				<Icons.HeatmapChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.HeatmapChart size="small" color="success" />
				<Icons.HeatmapChart />
				<Icons.HeatmapChart size="large" color="error" />
			</div>
		</div>
	),
};

export const HelloWorld: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.HelloWorld size="small" color="success" />
				<Icons.HelloWorld />
				<Icons.HelloWorld size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.HelloWorld size="small" color="success" />
				<Icons.HelloWorld />
				<Icons.HelloWorld size="large" color="error" />
			</div>
		</div>
	),
};

export const Hide: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Hide size="small" color="success" />
				<Icons.Hide />
				<Icons.Hide size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Hide size="small" color="success" />
				<Icons.Hide />
				<Icons.Hide size="large" color="error" />
			</div>
		</div>
	),
};

export const HighPriority: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.HighPriority size="small" color="success" />
				<Icons.HighPriority />
				<Icons.HighPriority size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.HighPriority size="small" color="success" />
				<Icons.HighPriority />
				<Icons.HighPriority size="large" color="error" />
			</div>
		</div>
	),
};

export const Hint: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Hint size="small" color="success" />
				<Icons.Hint />
				<Icons.Hint size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Hint size="small" color="success" />
				<Icons.Hint />
				<Icons.Hint size="large" color="error" />
			</div>
		</div>
	),
};

export const History: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.History size="small" color="success" />
				<Icons.History />
				<Icons.History size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.History size="small" color="success" />
				<Icons.History />
				<Icons.History size="large" color="error" />
			</div>
		</div>
	),
};

export const Home: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Home size="small" color="success" />
				<Icons.Home />
				<Icons.Home size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Home size="small" color="success" />
				<Icons.Home />
				<Icons.Home size="large" color="error" />
			</div>
		</div>
	),
};

export const HomeShare: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.HomeShare size="small" color="success" />
				<Icons.HomeShare />
				<Icons.HomeShare size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.HomeShare size="small" color="success" />
				<Icons.HomeShare />
				<Icons.HomeShare size="large" color="error" />
			</div>
		</div>
	),
};

export const HorizontalBarChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.HorizontalBarChart size="small" color="success" />
				<Icons.HorizontalBarChart />
				<Icons.HorizontalBarChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.HorizontalBarChart size="small" color="success" />
				<Icons.HorizontalBarChart />
				<Icons.HorizontalBarChart size="large" color="error" />
			</div>
		</div>
	),
};

export const HorizontalBarChart2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.HorizontalBarChart2 size="small" color="success" />
				<Icons.HorizontalBarChart2 />
				<Icons.HorizontalBarChart2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.HorizontalBarChart2 size="small" color="success" />
				<Icons.HorizontalBarChart2 />
				<Icons.HorizontalBarChart2 size="large" color="error" />
			</div>
		</div>
	),
};

export const HorizontalBulletChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.HorizontalBulletChart size="small" color="success" />
				<Icons.HorizontalBulletChart />
				<Icons.HorizontalBulletChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.HorizontalBulletChart size="small" color="success" />
				<Icons.HorizontalBulletChart />
				<Icons.HorizontalBulletChart size="large" color="error" />
			</div>
		</div>
	),
};

export const HorizontalCombinationChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.HorizontalCombinationChart size="small" color="success" />
				<Icons.HorizontalCombinationChart />
				<Icons.HorizontalCombinationChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.HorizontalCombinationChart size="small" color="success" />
				<Icons.HorizontalCombinationChart />
				<Icons.HorizontalCombinationChart size="large" color="error" />
			</div>
		</div>
	),
};

export const HorizontalGrip: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.HorizontalGrip size="small" color="success" />
				<Icons.HorizontalGrip />
				<Icons.HorizontalGrip size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.HorizontalGrip size="small" color="success" />
				<Icons.HorizontalGrip />
				<Icons.HorizontalGrip size="large" color="error" />
			</div>
		</div>
	),
};

export const HorizontalStackedChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.HorizontalStackedChart size="small" color="success" />
				<Icons.HorizontalStackedChart />
				<Icons.HorizontalStackedChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.HorizontalStackedChart size="small" color="success" />
				<Icons.HorizontalStackedChart />
				<Icons.HorizontalStackedChart size="large" color="error" />
			</div>
		</div>
	),
};

export const HorizontalWaterfallChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.HorizontalWaterfallChart size="small" color="success" />
				<Icons.HorizontalWaterfallChart />
				<Icons.HorizontalWaterfallChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.HorizontalWaterfallChart size="small" color="success" />
				<Icons.HorizontalWaterfallChart />
				<Icons.HorizontalWaterfallChart size="large" color="error" />
			</div>
		</div>
	),
};

export const HrApproval: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.HrApproval size="small" color="success" />
				<Icons.HrApproval />
				<Icons.HrApproval size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.HrApproval size="small" color="success" />
				<Icons.HrApproval />
				<Icons.HrApproval size="large" color="error" />
			</div>
		</div>
	),
};

export const IdeaWall: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.IdeaWall size="small" color="success" />
				<Icons.IdeaWall />
				<Icons.IdeaWall size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.IdeaWall size="small" color="success" />
				<Icons.IdeaWall />
				<Icons.IdeaWall size="large" color="error" />
			</div>
		</div>
	),
};

export const ImageViewer: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ImageViewer size="small" color="success" />
				<Icons.ImageViewer />
				<Icons.ImageViewer size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ImageViewer size="small" color="success" />
				<Icons.ImageViewer />
				<Icons.ImageViewer size="large" color="error" />
			</div>
		</div>
	),
};

export const Inbox: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Inbox size="small" color="success" />
				<Icons.Inbox />
				<Icons.Inbox size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Inbox size="small" color="success" />
				<Icons.Inbox />
				<Icons.Inbox size="large" color="error" />
			</div>
		</div>
	),
};

export const Incident: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Incident size="small" color="success" />
				<Icons.Incident />
				<Icons.Incident size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Incident size="small" color="success" />
				<Icons.Incident />
				<Icons.Incident size="large" color="error" />
			</div>
		</div>
	),
};

export const IncomingCall: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.IncomingCall size="small" color="success" />
				<Icons.IncomingCall />
				<Icons.IncomingCall size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.IncomingCall size="small" color="success" />
				<Icons.IncomingCall />
				<Icons.IncomingCall size="large" color="error" />
			</div>
		</div>
	),
};

export const IncreaseLineHeight: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.IncreaseLineHeight size="small" color="success" />
				<Icons.IncreaseLineHeight />
				<Icons.IncreaseLineHeight size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.IncreaseLineHeight size="small" color="success" />
				<Icons.IncreaseLineHeight />
				<Icons.IncreaseLineHeight size="large" color="error" />
			</div>
		</div>
	),
};

export const Indent: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Indent size="small" color="success" />
				<Icons.Indent />
				<Icons.Indent size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Indent size="small" color="success" />
				<Icons.Indent />
				<Icons.Indent size="large" color="error" />
			</div>
		</div>
	),
};

export const Information: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Information size="small" color="success" />
				<Icons.Information />
				<Icons.Information size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Information size="small" color="success" />
				<Icons.Information />
				<Icons.Information size="large" color="error" />
			</div>
		</div>
	),
};

export const Initiative: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Initiative size="small" color="success" />
				<Icons.Initiative />
				<Icons.Initiative size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Initiative size="small" color="success" />
				<Icons.Initiative />
				<Icons.Initiative size="large" color="error" />
			</div>
		</div>
	),
};

export const InProgress: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.InProgress size="small" color="success" />
				<Icons.InProgress />
				<Icons.InProgress size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.InProgress size="small" color="success" />
				<Icons.InProgress />
				<Icons.InProgress size="large" color="error" />
			</div>
		</div>
	),
};

export const InProgress2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.InProgress2 size="small" color="success" />
				<Icons.InProgress2 />
				<Icons.InProgress2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.InProgress2 size="small" color="success" />
				<Icons.InProgress2 />
				<Icons.InProgress2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Inspect: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Inspect size="small" color="success" />
				<Icons.Inspect />
				<Icons.Inspect size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Inspect size="small" color="success" />
				<Icons.Inspect />
				<Icons.Inspect size="large" color="error" />
			</div>
		</div>
	),
};

export const InspectDown: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.InspectDown size="small" color="success" />
				<Icons.InspectDown />
				<Icons.InspectDown size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.InspectDown size="small" color="success" />
				<Icons.InspectDown />
				<Icons.InspectDown size="large" color="error" />
			</div>
		</div>
	),
};

export const Inspection: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Inspection size="small" color="success" />
				<Icons.Inspection />
				<Icons.Inspection size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Inspection size="small" color="success" />
				<Icons.Inspection />
				<Icons.Inspection size="large" color="error" />
			</div>
		</div>
	),
};

export const Instance: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Instance size="small" color="success" />
				<Icons.Instance />
				<Icons.Instance size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Instance size="small" color="success" />
				<Icons.Instance />
				<Icons.Instance size="large" color="error" />
			</div>
		</div>
	),
};

export const InsuranceCar: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.InsuranceCar size="small" color="success" />
				<Icons.InsuranceCar />
				<Icons.InsuranceCar size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.InsuranceCar size="small" color="success" />
				<Icons.InsuranceCar />
				<Icons.InsuranceCar size="large" color="error" />
			</div>
		</div>
	),
};

export const InsuranceHouse: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.InsuranceHouse size="small" color="success" />
				<Icons.InsuranceHouse />
				<Icons.InsuranceHouse size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.InsuranceHouse size="small" color="success" />
				<Icons.InsuranceHouse />
				<Icons.InsuranceHouse size="large" color="error" />
			</div>
		</div>
	),
};

export const InsuranceLife: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.InsuranceLife size="small" color="success" />
				<Icons.InsuranceLife />
				<Icons.InsuranceLife size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.InsuranceLife size="small" color="success" />
				<Icons.InsuranceLife />
				<Icons.InsuranceLife size="large" color="error" />
			</div>
		</div>
	),
};

export const InternetBrowser: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.InternetBrowser size="small" color="success" />
				<Icons.InternetBrowser />
				<Icons.InternetBrowser size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.InternetBrowser size="small" color="success" />
				<Icons.InternetBrowser />
				<Icons.InternetBrowser size="large" color="error" />
			</div>
		</div>
	),
};

export const Inventory: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Inventory size="small" color="success" />
				<Icons.Inventory />
				<Icons.Inventory size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Inventory size="small" color="success" />
				<Icons.Inventory />
				<Icons.Inventory size="large" color="error" />
			</div>
		</div>
	),
};

export const Ipad: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Ipad size="small" color="success" />
				<Icons.Ipad />
				<Icons.Ipad size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Ipad size="small" color="success" />
				<Icons.Ipad />
				<Icons.Ipad size="large" color="error" />
			</div>
		</div>
	),
};

export const Ipad2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Ipad2 size="small" color="success" />
				<Icons.Ipad2 />
				<Icons.Ipad2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Ipad2 size="small" color="success" />
				<Icons.Ipad2 />
				<Icons.Ipad2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Iphone: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Iphone size="small" color="success" />
				<Icons.Iphone />
				<Icons.Iphone size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Iphone size="small" color="success" />
				<Icons.Iphone />
				<Icons.Iphone size="large" color="error" />
			</div>
		</div>
	),
};

export const Iphone2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Iphone2 size="small" color="success" />
				<Icons.Iphone2 />
				<Icons.Iphone2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Iphone2 size="small" color="success" />
				<Icons.Iphone2 />
				<Icons.Iphone2 size="large" color="error" />
			</div>
		</div>
	),
};

export const ItalicText: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ItalicText size="small" color="success" />
				<Icons.ItalicText />
				<Icons.ItalicText size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ItalicText size="small" color="success" />
				<Icons.ItalicText />
				<Icons.ItalicText size="large" color="error" />
			</div>
		</div>
	),
};

export const ItHost: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ItHost size="small" color="success" />
				<Icons.ItHost />
				<Icons.ItHost size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ItHost size="small" color="success" />
				<Icons.ItHost />
				<Icons.ItHost size="large" color="error" />
			</div>
		</div>
	),
};

export const ItInstance: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ItInstance size="small" color="success" />
				<Icons.ItInstance />
				<Icons.ItInstance size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ItInstance size="small" color="success" />
				<Icons.ItInstance />
				<Icons.ItInstance size="large" color="error" />
			</div>
		</div>
	),
};

export const ItSystem: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ItSystem size="small" color="success" />
				<Icons.ItSystem />
				<Icons.ItSystem size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ItSystem size="small" color="success" />
				<Icons.ItSystem />
				<Icons.ItSystem size="large" color="error" />
			</div>
		</div>
	),
};

export const Jam: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Jam size="small" color="success" />
				<Icons.Jam />
				<Icons.Jam size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Jam size="small" color="success" />
				<Icons.Jam />
				<Icons.Jam size="large" color="error" />
			</div>
		</div>
	),
};

export const JourneyArrive: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.JourneyArrive size="small" color="success" />
				<Icons.JourneyArrive />
				<Icons.JourneyArrive size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.JourneyArrive size="small" color="success" />
				<Icons.JourneyArrive />
				<Icons.JourneyArrive size="large" color="error" />
			</div>
		</div>
	),
};

export const JourneyChange: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.JourneyChange size="small" color="success" />
				<Icons.JourneyChange />
				<Icons.JourneyChange size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.JourneyChange size="small" color="success" />
				<Icons.JourneyChange />
				<Icons.JourneyChange size="large" color="error" />
			</div>
		</div>
	),
};

export const JourneyDepart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.JourneyDepart size="small" color="success" />
				<Icons.JourneyDepart />
				<Icons.JourneyDepart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.JourneyDepart size="small" color="success" />
				<Icons.JourneyDepart />
				<Icons.JourneyDepart size="large" color="error" />
			</div>
		</div>
	),
};

export const Key: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Key size="small" color="success" />
				<Icons.Key />
				<Icons.Key size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Key size="small" color="success" />
				<Icons.Key />
				<Icons.Key size="large" color="error" />
			</div>
		</div>
	),
};

export const KeyboardAndMouse: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.KeyboardAndMouse size="small" color="success" />
				<Icons.KeyboardAndMouse />
				<Icons.KeyboardAndMouse size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.KeyboardAndMouse size="small" color="success" />
				<Icons.KeyboardAndMouse />
				<Icons.KeyboardAndMouse size="large" color="error" />
			</div>
		</div>
	),
};

export const KeyUserSetting: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.KeyUserSetting size="small" color="success" />
				<Icons.KeyUserSetting />
				<Icons.KeyUserSetting size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.KeyUserSetting size="small" color="success" />
				<Icons.KeyUserSetting />
				<Icons.KeyUserSetting size="large" color="error" />
			</div>
		</div>
	),
};

export const KpiCorporatePerformance: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.KpiCorporatePerformance size="small" color="success" />
				<Icons.KpiCorporatePerformance />
				<Icons.KpiCorporatePerformance size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.KpiCorporatePerformance size="small" color="success" />
				<Icons.KpiCorporatePerformance />
				<Icons.KpiCorporatePerformance size="large" color="error" />
			</div>
		</div>
	),
};

export const KpiManagingMyArea: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.KpiManagingMyArea size="small" color="success" />
				<Icons.KpiManagingMyArea />
				<Icons.KpiManagingMyArea size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.KpiManagingMyArea size="small" color="success" />
				<Icons.KpiManagingMyArea />
				<Icons.KpiManagingMyArea size="large" color="error" />
			</div>
		</div>
	),
};

export const Lab: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Lab size="small" color="success" />
				<Icons.Lab />
				<Icons.Lab size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Lab size="small" color="success" />
				<Icons.Lab />
				<Icons.Lab size="large" color="error" />
			</div>
		</div>
	),
};

export const Laptop: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Laptop size="small" color="success" />
				<Icons.Laptop />
				<Icons.Laptop size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Laptop size="small" color="success" />
				<Icons.Laptop />
				<Icons.Laptop size="large" color="error" />
			</div>
		</div>
	),
};

export const Lateness: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Lateness size="small" color="success" />
				<Icons.Lateness />
				<Icons.Lateness size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Lateness size="small" color="success" />
				<Icons.Lateness />
				<Icons.Lateness size="large" color="error" />
			</div>
		</div>
	),
};

export const Lead: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Lead size="small" color="success" />
				<Icons.Lead />
				<Icons.Lead size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Lead size="small" color="success" />
				<Icons.Lead />
				<Icons.Lead size="large" color="error" />
			</div>
		</div>
	),
};

export const LeadOutdated: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.LeadOutdated size="small" color="success" />
				<Icons.LeadOutdated />
				<Icons.LeadOutdated size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.LeadOutdated size="small" color="success" />
				<Icons.LeadOutdated />
				<Icons.LeadOutdated size="large" color="error" />
			</div>
		</div>
	),
};

export const Leads: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Leads size="small" color="success" />
				<Icons.Leads />
				<Icons.Leads size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Leads size="small" color="success" />
				<Icons.Leads />
				<Icons.Leads size="large" color="error" />
			</div>
		</div>
	),
};

export const LearningAssistant: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.LearningAssistant size="small" color="success" />
				<Icons.LearningAssistant />
				<Icons.LearningAssistant size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.LearningAssistant size="small" color="success" />
				<Icons.LearningAssistant />
				<Icons.LearningAssistant size="large" color="error" />
			</div>
		</div>
	),
};

export const Legend: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Legend size="small" color="success" />
				<Icons.Legend />
				<Icons.Legend size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Legend size="small" color="success" />
				<Icons.Legend />
				<Icons.Legend size="large" color="error" />
			</div>
		</div>
	),
};

export const Less: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Less size="small" color="success" />
				<Icons.Less />
				<Icons.Less size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Less size="small" color="success" />
				<Icons.Less />
				<Icons.Less size="large" color="error" />
			</div>
		</div>
	),
};

export const Letter: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Letter size="small" color="success" />
				<Icons.Letter />
				<Icons.Letter size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Letter size="small" color="success" />
				<Icons.Letter />
				<Icons.Letter size="large" color="error" />
			</div>
		</div>
	),
};

export const Lightbulb: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Lightbulb size="small" color="success" />
				<Icons.Lightbulb />
				<Icons.Lightbulb size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Lightbulb size="small" color="success" />
				<Icons.Lightbulb />
				<Icons.Lightbulb size="large" color="error" />
			</div>
		</div>
	),
};

export const LightMode: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.LightMode size="small" color="success" />
				<Icons.LightMode />
				<Icons.LightMode size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.LightMode size="small" color="success" />
				<Icons.LightMode />
				<Icons.LightMode size="large" color="error" />
			</div>
		</div>
	),
};

export const LineChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.LineChart size="small" color="success" />
				<Icons.LineChart />
				<Icons.LineChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.LineChart size="small" color="success" />
				<Icons.LineChart />
				<Icons.LineChart size="large" color="error" />
			</div>
		</div>
	),
};

export const LineChartDualAxis: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.LineChartDualAxis size="small" color="success" />
				<Icons.LineChartDualAxis />
				<Icons.LineChartDualAxis size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.LineChartDualAxis size="small" color="success" />
				<Icons.LineChartDualAxis />
				<Icons.LineChartDualAxis size="large" color="error" />
			</div>
		</div>
	),
};

export const LineCharts: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.LineCharts size="small" color="success" />
				<Icons.LineCharts />
				<Icons.LineCharts size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.LineCharts size="small" color="success" />
				<Icons.LineCharts />
				<Icons.LineCharts size="large" color="error" />
			</div>
		</div>
	),
};

export const LineChartTimeAxis: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.LineChartTimeAxis size="small" color="success" />
				<Icons.LineChartTimeAxis />
				<Icons.LineChartTimeAxis size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.LineChartTimeAxis size="small" color="success" />
				<Icons.LineChartTimeAxis />
				<Icons.LineChartTimeAxis size="large" color="error" />
			</div>
		</div>
	),
};

export const List: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.List size="small" color="success" />
				<Icons.List />
				<Icons.List size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.List size="small" color="success" />
				<Icons.List />
				<Icons.List size="large" color="error" />
			</div>
		</div>
	),
};

export const Loan: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Loan size="small" color="success" />
				<Icons.Loan />
				<Icons.Loan size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Loan size="small" color="success" />
				<Icons.Loan />
				<Icons.Loan size="large" color="error" />
			</div>
		</div>
	),
};

export const LocateMe: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.LocateMe size="small" color="success" />
				<Icons.LocateMe />
				<Icons.LocateMe size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.LocateMe size="small" color="success" />
				<Icons.LocateMe />
				<Icons.LocateMe size="large" color="error" />
			</div>
		</div>
	),
};

export const LocateMe2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.LocateMe2 size="small" color="success" />
				<Icons.LocateMe2 />
				<Icons.LocateMe2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.LocateMe2 size="small" color="success" />
				<Icons.LocateMe2 />
				<Icons.LocateMe2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Locked: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Locked size="small" color="success" />
				<Icons.Locked />
				<Icons.Locked size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Locked size="small" color="success" />
				<Icons.Locked />
				<Icons.Locked size="large" color="error" />
			</div>
		</div>
	),
};

export const Log: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Log size="small" color="success" />
				<Icons.Log />
				<Icons.Log size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Log size="small" color="success" />
				<Icons.Log />
				<Icons.Log size="large" color="error" />
			</div>
		</div>
	),
};

export const Machine: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Machine size="small" color="success" />
				<Icons.Machine />
				<Icons.Machine size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Machine size="small" color="success" />
				<Icons.Machine />
				<Icons.Machine size="large" color="error" />
			</div>
		</div>
	),
};

export const Male: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Male size="small" color="success" />
				<Icons.Male />
				<Icons.Male size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Male size="small" color="success" />
				<Icons.Male />
				<Icons.Male size="large" color="error" />
			</div>
		</div>
	),
};

export const Manager: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Manager size="small" color="success" />
				<Icons.Manager />
				<Icons.Manager size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Manager size="small" color="success" />
				<Icons.Manager />
				<Icons.Manager size="large" color="error" />
			</div>
		</div>
	),
};

export const ManagerInsight: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ManagerInsight size="small" color="success" />
				<Icons.ManagerInsight />
				<Icons.ManagerInsight size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ManagerInsight size="small" color="success" />
				<Icons.ManagerInsight />
				<Icons.ManagerInsight size="large" color="error" />
			</div>
		</div>
	),
};

export const Map: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Map size="small" color="success" />
				<Icons.Map />
				<Icons.Map size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Map size="small" color="success" />
				<Icons.Map />
				<Icons.Map size="large" color="error" />
			</div>
		</div>
	),
};

export const Map2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Map2 size="small" color="success" />
				<Icons.Map2 />
				<Icons.Map2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Map2 size="small" color="success" />
				<Icons.Map2 />
				<Icons.Map2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Map3: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Map3 size="small" color="success" />
				<Icons.Map3 />
				<Icons.Map3 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Map3 size="small" color="success" />
				<Icons.Map3 />
				<Icons.Map3 size="large" color="error" />
			</div>
		</div>
	),
};

export const MapFill: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MapFill size="small" color="success" />
				<Icons.MapFill />
				<Icons.MapFill size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MapFill size="small" color="success" />
				<Icons.MapFill />
				<Icons.MapFill size="large" color="error" />
			</div>
		</div>
	),
};

export const MarketingCampaign: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MarketingCampaign size="small" color="success" />
				<Icons.MarketingCampaign />
				<Icons.MarketingCampaign size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MarketingCampaign size="small" color="success" />
				<Icons.MarketingCampaign />
				<Icons.MarketingCampaign size="large" color="error" />
			</div>
		</div>
	),
};

export const MasterTaskTriangle: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MasterTaskTriangle size="small" color="success" />
				<Icons.MasterTaskTriangle />
				<Icons.MasterTaskTriangle size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MasterTaskTriangle size="small" color="success" />
				<Icons.MasterTaskTriangle />
				<Icons.MasterTaskTriangle size="large" color="error" />
			</div>
		</div>
	),
};

export const MasterTaskTriangle2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MasterTaskTriangle2 size="small" color="success" />
				<Icons.MasterTaskTriangle2 />
				<Icons.MasterTaskTriangle2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MasterTaskTriangle2 size="small" color="success" />
				<Icons.MasterTaskTriangle2 />
				<Icons.MasterTaskTriangle2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Meal: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Meal size="small" color="success" />
				<Icons.Meal />
				<Icons.Meal size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Meal size="small" color="success" />
				<Icons.Meal />
				<Icons.Meal size="large" color="error" />
			</div>
		</div>
	),
};

export const Measure: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Measure size="small" color="success" />
				<Icons.Measure />
				<Icons.Measure size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Measure size="small" color="success" />
				<Icons.Measure />
				<Icons.Measure size="large" color="error" />
			</div>
		</div>
	),
};

export const MeasurementDocument: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MeasurementDocument size="small" color="success" />
				<Icons.MeasurementDocument />
				<Icons.MeasurementDocument size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MeasurementDocument size="small" color="success" />
				<Icons.MeasurementDocument />
				<Icons.MeasurementDocument size="large" color="error" />
			</div>
		</div>
	),
};

export const MeasuringPoint: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MeasuringPoint size="small" color="success" />
				<Icons.MeasuringPoint />
				<Icons.MeasuringPoint size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MeasuringPoint size="small" color="success" />
				<Icons.MeasuringPoint />
				<Icons.MeasuringPoint size="large" color="error" />
			</div>
		</div>
	),
};

export const MediaForward: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MediaForward size="small" color="success" />
				<Icons.MediaForward />
				<Icons.MediaForward size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MediaForward size="small" color="success" />
				<Icons.MediaForward />
				<Icons.MediaForward size="large" color="error" />
			</div>
		</div>
	),
};

export const MediaPause: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MediaPause size="small" color="success" />
				<Icons.MediaPause />
				<Icons.MediaPause size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MediaPause size="small" color="success" />
				<Icons.MediaPause />
				<Icons.MediaPause size="large" color="error" />
			</div>
		</div>
	),
};

export const MediaPlay: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MediaPlay size="small" color="success" />
				<Icons.MediaPlay />
				<Icons.MediaPlay size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MediaPlay size="small" color="success" />
				<Icons.MediaPlay />
				<Icons.MediaPlay size="large" color="error" />
			</div>
		</div>
	),
};

export const MediaReverse: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MediaReverse size="small" color="success" />
				<Icons.MediaReverse />
				<Icons.MediaReverse size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MediaReverse size="small" color="success" />
				<Icons.MediaReverse />
				<Icons.MediaReverse size="large" color="error" />
			</div>
		</div>
	),
};

export const MediaRewind: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MediaRewind size="small" color="success" />
				<Icons.MediaRewind />
				<Icons.MediaRewind size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MediaRewind size="small" color="success" />
				<Icons.MediaRewind />
				<Icons.MediaRewind size="large" color="error" />
			</div>
		</div>
	),
};

export const MeetingRoom: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MeetingRoom size="small" color="success" />
				<Icons.MeetingRoom />
				<Icons.MeetingRoom size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MeetingRoom size="small" color="success" />
				<Icons.MeetingRoom />
				<Icons.MeetingRoom size="large" color="error" />
			</div>
		</div>
	),
};

export const Megamenu: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Megamenu size="small" color="success" />
				<Icons.Megamenu />
				<Icons.Megamenu size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Megamenu size="small" color="success" />
				<Icons.Megamenu />
				<Icons.Megamenu size="large" color="error" />
			</div>
		</div>
	),
};

export const Menu: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Menu size="small" color="success" />
				<Icons.Menu />
				<Icons.Menu size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Menu size="small" color="success" />
				<Icons.Menu />
				<Icons.Menu size="large" color="error" />
			</div>
		</div>
	),
};

export const Menu2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Menu2 size="small" color="success" />
				<Icons.Menu2 />
				<Icons.Menu2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Menu2 size="small" color="success" />
				<Icons.Menu2 />
				<Icons.Menu2 size="large" color="error" />
			</div>
		</div>
	),
};

export const MessageError: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MessageError size="small" color="success" />
				<Icons.MessageError />
				<Icons.MessageError size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MessageError size="small" color="success" />
				<Icons.MessageError />
				<Icons.MessageError size="large" color="error" />
			</div>
		</div>
	),
};

export const MessageInformation: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MessageInformation size="small" color="success" />
				<Icons.MessageInformation />
				<Icons.MessageInformation size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MessageInformation size="small" color="success" />
				<Icons.MessageInformation />
				<Icons.MessageInformation size="large" color="error" />
			</div>
		</div>
	),
};

export const MessagePopup: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MessagePopup size="small" color="success" />
				<Icons.MessagePopup />
				<Icons.MessagePopup size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MessagePopup size="small" color="success" />
				<Icons.MessagePopup />
				<Icons.MessagePopup size="large" color="error" />
			</div>
		</div>
	),
};

export const MessageSuccess: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MessageSuccess size="small" color="success" />
				<Icons.MessageSuccess />
				<Icons.MessageSuccess size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MessageSuccess size="small" color="success" />
				<Icons.MessageSuccess />
				<Icons.MessageSuccess size="large" color="error" />
			</div>
		</div>
	),
};

export const MessageWarning: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MessageWarning size="small" color="success" />
				<Icons.MessageWarning />
				<Icons.MessageWarning size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MessageWarning size="small" color="success" />
				<Icons.MessageWarning />
				<Icons.MessageWarning size="large" color="error" />
			</div>
		</div>
	),
};

export const Microphone: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Microphone size="small" color="success" />
				<Icons.Microphone />
				<Icons.Microphone size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Microphone size="small" color="success" />
				<Icons.Microphone />
				<Icons.Microphone size="large" color="error" />
			</div>
		</div>
	),
};

export const Mileage: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Mileage size="small" color="success" />
				<Icons.Mileage />
				<Icons.Mileage size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Mileage size="small" color="success" />
				<Icons.Mileage />
				<Icons.Mileage size="large" color="error" />
			</div>
		</div>
	),
};

export const Minimize: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Minimize size="small" color="success" />
				<Icons.Minimize />
				<Icons.Minimize size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Minimize size="small" color="success" />
				<Icons.Minimize />
				<Icons.Minimize size="large" color="error" />
			</div>
		</div>
	),
};

export const MirroredTaskCircle: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MirroredTaskCircle size="small" color="success" />
				<Icons.MirroredTaskCircle />
				<Icons.MirroredTaskCircle size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MirroredTaskCircle size="small" color="success" />
				<Icons.MirroredTaskCircle />
				<Icons.MirroredTaskCircle size="large" color="error" />
			</div>
		</div>
	),
};

export const MirroredTaskCircle2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MirroredTaskCircle2 size="small" color="success" />
				<Icons.MirroredTaskCircle2 />
				<Icons.MirroredTaskCircle2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MirroredTaskCircle2 size="small" color="success" />
				<Icons.MirroredTaskCircle2 />
				<Icons.MirroredTaskCircle2 size="large" color="error" />
			</div>
		</div>
	),
};

export const MoneyBills: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MoneyBills size="small" color="success" />
				<Icons.MoneyBills />
				<Icons.MoneyBills size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MoneyBills size="small" color="success" />
				<Icons.MoneyBills />
				<Icons.MoneyBills size="large" color="error" />
			</div>
		</div>
	),
};

export const MonitorPayments: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MonitorPayments size="small" color="success" />
				<Icons.MonitorPayments />
				<Icons.MonitorPayments size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MonitorPayments size="small" color="success" />
				<Icons.MonitorPayments />
				<Icons.MonitorPayments size="large" color="error" />
			</div>
		</div>
	),
};

export const Move: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Move size="small" color="success" />
				<Icons.Move />
				<Icons.Move size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Move size="small" color="success" />
				<Icons.Move />
				<Icons.Move size="large" color="error" />
			</div>
		</div>
	),
};

export const MriScan: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MriScan size="small" color="success" />
				<Icons.MriScan />
				<Icons.MriScan size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MriScan size="small" color="success" />
				<Icons.MriScan />
				<Icons.MriScan size="large" color="error" />
			</div>
		</div>
	),
};

export const MultipleBarChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MultipleBarChart size="small" color="success" />
				<Icons.MultipleBarChart />
				<Icons.MultipleBarChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MultipleBarChart size="small" color="success" />
				<Icons.MultipleBarChart />
				<Icons.MultipleBarChart size="large" color="error" />
			</div>
		</div>
	),
};

export const MultipleLineChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MultipleLineChart size="small" color="success" />
				<Icons.MultipleLineChart />
				<Icons.MultipleLineChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MultipleLineChart size="small" color="success" />
				<Icons.MultipleLineChart />
				<Icons.MultipleLineChart size="large" color="error" />
			</div>
		</div>
	),
};

export const MultiplePieChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MultiplePieChart size="small" color="success" />
				<Icons.MultiplePieChart />
				<Icons.MultiplePieChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MultiplePieChart size="small" color="success" />
				<Icons.MultiplePieChart />
				<Icons.MultiplePieChart size="large" color="error" />
			</div>
		</div>
	),
};

export const MultipleRadarChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MultipleRadarChart size="small" color="success" />
				<Icons.MultipleRadarChart />
				<Icons.MultipleRadarChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MultipleRadarChart size="small" color="success" />
				<Icons.MultipleRadarChart />
				<Icons.MultipleRadarChart size="large" color="error" />
			</div>
		</div>
	),
};

export const MultiSelect: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MultiSelect size="small" color="success" />
				<Icons.MultiSelect />
				<Icons.MultiSelect size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MultiSelect size="small" color="success" />
				<Icons.MultiSelect />
				<Icons.MultiSelect size="large" color="error" />
			</div>
		</div>
	),
};

export const MultiselectAll: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MultiselectAll size="small" color="success" />
				<Icons.MultiselectAll />
				<Icons.MultiselectAll size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MultiselectAll size="small" color="success" />
				<Icons.MultiselectAll />
				<Icons.MultiselectAll size="large" color="error" />
			</div>
		</div>
	),
};

export const MultiselectNone: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MultiselectNone size="small" color="success" />
				<Icons.MultiselectNone />
				<Icons.MultiselectNone size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MultiselectNone size="small" color="success" />
				<Icons.MultiselectNone />
				<Icons.MultiselectNone size="large" color="error" />
			</div>
		</div>
	),
};

export const MySalesOrder: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MySalesOrder size="small" color="success" />
				<Icons.MySalesOrder />
				<Icons.MySalesOrder size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MySalesOrder size="small" color="success" />
				<Icons.MySalesOrder />
				<Icons.MySalesOrder size="large" color="error" />
			</div>
		</div>
	),
};

export const MyView: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.MyView size="small" color="success" />
				<Icons.MyView />
				<Icons.MyView size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.MyView size="small" color="success" />
				<Icons.MyView />
				<Icons.MyView size="large" color="error" />
			</div>
		</div>
	),
};

export const NavBack: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.NavBack size="small" color="success" />
				<Icons.NavBack />
				<Icons.NavBack size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.NavBack size="small" color="success" />
				<Icons.NavBack />
				<Icons.NavBack size="large" color="error" />
			</div>
		</div>
	),
};

export const NavigationDownArrow: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.NavigationDownArrow size="small" color="success" />
				<Icons.NavigationDownArrow />
				<Icons.NavigationDownArrow size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.NavigationDownArrow size="small" color="success" />
				<Icons.NavigationDownArrow />
				<Icons.NavigationDownArrow size="large" color="error" />
			</div>
		</div>
	),
};

export const NavigationLeftArrow: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.NavigationLeftArrow size="small" color="success" />
				<Icons.NavigationLeftArrow />
				<Icons.NavigationLeftArrow size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.NavigationLeftArrow size="small" color="success" />
				<Icons.NavigationLeftArrow />
				<Icons.NavigationLeftArrow size="large" color="error" />
			</div>
		</div>
	),
};

export const NavigationRightArrow: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.NavigationRightArrow size="small" color="success" />
				<Icons.NavigationRightArrow />
				<Icons.NavigationRightArrow size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.NavigationRightArrow size="small" color="success" />
				<Icons.NavigationRightArrow />
				<Icons.NavigationRightArrow size="large" color="error" />
			</div>
		</div>
	),
};

export const NavigationUpArrow: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.NavigationUpArrow size="small" color="success" />
				<Icons.NavigationUpArrow />
				<Icons.NavigationUpArrow size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.NavigationUpArrow size="small" color="success" />
				<Icons.NavigationUpArrow />
				<Icons.NavigationUpArrow size="large" color="error" />
			</div>
		</div>
	),
};

export const Negative: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Negative size="small" color="success" />
				<Icons.Negative />
				<Icons.Negative size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Negative size="small" color="success" />
				<Icons.Negative />
				<Icons.Negative size="large" color="error" />
			</div>
		</div>
	),
};

export const NetweaverBusinessClient: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.NetweaverBusinessClient size="small" color="success" />
				<Icons.NetweaverBusinessClient />
				<Icons.NetweaverBusinessClient size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.NetweaverBusinessClient size="small" color="success" />
				<Icons.NetweaverBusinessClient />
				<Icons.NetweaverBusinessClient size="large" color="error" />
			</div>
		</div>
	),
};

export const Newspaper: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Newspaper size="small" color="success" />
				<Icons.Newspaper />
				<Icons.Newspaper size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Newspaper size="small" color="success" />
				<Icons.Newspaper />
				<Icons.Newspaper size="large" color="error" />
			</div>
		</div>
	),
};

export const NonBinary: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.NonBinary size="small" color="success" />
				<Icons.NonBinary />
				<Icons.NonBinary size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.NonBinary size="small" color="success" />
				<Icons.NonBinary />
				<Icons.NonBinary size="large" color="error" />
			</div>
		</div>
	),
};

export const NotEditable: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.NotEditable size="small" color="success" />
				<Icons.NotEditable />
				<Icons.NotEditable size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.NotEditable size="small" color="success" />
				<Icons.NotEditable />
				<Icons.NotEditable size="large" color="error" />
			</div>
		</div>
	),
};

export const Notes: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Notes size="small" color="success" />
				<Icons.Notes />
				<Icons.Notes size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Notes size="small" color="success" />
				<Icons.Notes />
				<Icons.Notes size="large" color="error" />
			</div>
		</div>
	),
};

export const Notification: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Notification size="small" color="success" />
				<Icons.Notification />
				<Icons.Notification size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Notification size="small" color="success" />
				<Icons.Notification />
				<Icons.Notification size="large" color="error" />
			</div>
		</div>
	),
};

export const Notification2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Notification2 size="small" color="success" />
				<Icons.Notification2 />
				<Icons.Notification2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Notification2 size="small" color="success" />
				<Icons.Notification2 />
				<Icons.Notification2 size="large" color="error" />
			</div>
		</div>
	),
};

export const NumberedText: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.NumberedText size="small" color="success" />
				<Icons.NumberedText />
				<Icons.NumberedText size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.NumberedText size="small" color="success" />
				<Icons.NumberedText />
				<Icons.NumberedText size="large" color="error" />
			</div>
		</div>
	),
};

export const NumberSign: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.NumberSign size="small" color="success" />
				<Icons.NumberSign />
				<Icons.NumberSign size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.NumberSign size="small" color="success" />
				<Icons.NumberSign />
				<Icons.NumberSign size="large" color="error" />
			</div>
		</div>
	),
};

export const Nurse: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Nurse size="small" color="success" />
				<Icons.Nurse />
				<Icons.Nurse size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Nurse size="small" color="success" />
				<Icons.Nurse />
				<Icons.Nurse size="large" color="error" />
			</div>
		</div>
	),
};

export const NutritionActivity: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.NutritionActivity size="small" color="success" />
				<Icons.NutritionActivity />
				<Icons.NutritionActivity size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.NutritionActivity size="small" color="success" />
				<Icons.NutritionActivity />
				<Icons.NutritionActivity size="large" color="error" />
			</div>
		</div>
	),
};

export const OfficialService: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.OfficialService size="small" color="success" />
				<Icons.OfficialService />
				<Icons.OfficialService size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.OfficialService size="small" color="success" />
				<Icons.OfficialService />
				<Icons.OfficialService size="large" color="error" />
			</div>
		</div>
	),
};

export const OffsiteWork: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.OffsiteWork size="small" color="success" />
				<Icons.OffsiteWork />
				<Icons.OffsiteWork size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.OffsiteWork size="small" color="success" />
				<Icons.OffsiteWork />
				<Icons.OffsiteWork size="large" color="error" />
			</div>
		</div>
	),
};

export const OpenCommandField: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.OpenCommandField size="small" color="success" />
				<Icons.OpenCommandField />
				<Icons.OpenCommandField size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.OpenCommandField size="small" color="success" />
				<Icons.OpenCommandField />
				<Icons.OpenCommandField size="large" color="error" />
			</div>
		</div>
	),
};

export const OpenFolder: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.OpenFolder size="small" color="success" />
				<Icons.OpenFolder />
				<Icons.OpenFolder size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.OpenFolder size="small" color="success" />
				<Icons.OpenFolder />
				<Icons.OpenFolder size="large" color="error" />
			</div>
		</div>
	),
};

export const Opportunities: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Opportunities size="small" color="success" />
				<Icons.Opportunities />
				<Icons.Opportunities size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Opportunities size="small" color="success" />
				<Icons.Opportunities />
				<Icons.Opportunities size="large" color="error" />
			</div>
		</div>
	),
};

export const Opportunity: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Opportunity size="small" color="success" />
				<Icons.Opportunity />
				<Icons.Opportunity size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Opportunity size="small" color="success" />
				<Icons.Opportunity />
				<Icons.Opportunity size="large" color="error" />
			</div>
		</div>
	),
};

export const OrderStatus: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.OrderStatus size="small" color="success" />
				<Icons.OrderStatus />
				<Icons.OrderStatus size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.OrderStatus size="small" color="success" />
				<Icons.OrderStatus />
				<Icons.OrderStatus size="large" color="error" />
			</div>
		</div>
	),
};

export const OrgChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.OrgChart size="small" color="success" />
				<Icons.OrgChart />
				<Icons.OrgChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.OrgChart size="small" color="success" />
				<Icons.OrgChart />
				<Icons.OrgChart size="large" color="error" />
			</div>
		</div>
	),
};

export const Outbox: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Outbox size="small" color="success" />
				<Icons.Outbox />
				<Icons.Outbox size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Outbox size="small" color="success" />
				<Icons.Outbox />
				<Icons.Outbox size="large" color="error" />
			</div>
		</div>
	),
};

export const Outdent: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Outdent size="small" color="success" />
				<Icons.Outdent />
				<Icons.Outdent size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Outdent size="small" color="success" />
				<Icons.Outdent />
				<Icons.Outdent size="large" color="error" />
			</div>
		</div>
	),
};

export const OutgoingCall: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.OutgoingCall size="small" color="success" />
				<Icons.OutgoingCall />
				<Icons.OutgoingCall size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.OutgoingCall size="small" color="success" />
				<Icons.OutgoingCall />
				<Icons.OutgoingCall size="large" color="error" />
			</div>
		</div>
	),
};

export const Overflow: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Overflow size="small" color="success" />
				<Icons.Overflow />
				<Icons.Overflow size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Overflow size="small" color="success" />
				<Icons.Overflow />
				<Icons.Overflow size="large" color="error" />
			</div>
		</div>
	),
};

export const Overlay: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Overlay size="small" color="success" />
				<Icons.Overlay />
				<Icons.Overlay size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Overlay size="small" color="success" />
				<Icons.Overlay />
				<Icons.Overlay size="large" color="error" />
			</div>
		</div>
	),
};

export const OverviewChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.OverviewChart size="small" color="success" />
				<Icons.OverviewChart />
				<Icons.OverviewChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.OverviewChart size="small" color="success" />
				<Icons.OverviewChart />
				<Icons.OverviewChart size="large" color="error" />
			</div>
		</div>
	),
};

export const Paging: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Paging size="small" color="success" />
				<Icons.Paging />
				<Icons.Paging size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Paging size="small" color="success" />
				<Icons.Paging />
				<Icons.Paging size="large" color="error" />
			</div>
		</div>
	),
};

export const PaidLeave: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PaidLeave size="small" color="success" />
				<Icons.PaidLeave />
				<Icons.PaidLeave size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PaidLeave size="small" color="success" />
				<Icons.PaidLeave />
				<Icons.PaidLeave size="large" color="error" />
			</div>
		</div>
	),
};

export const PaintBucket: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PaintBucket size="small" color="success" />
				<Icons.PaintBucket />
				<Icons.PaintBucket size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PaintBucket size="small" color="success" />
				<Icons.PaintBucket />
				<Icons.PaintBucket size="large" color="error" />
			</div>
		</div>
	),
};

export const Palette: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Palette size="small" color="success" />
				<Icons.Palette />
				<Icons.Palette size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Palette size="small" color="success" />
				<Icons.Palette />
				<Icons.Palette size="large" color="error" />
			</div>
		</div>
	),
};

export const PaperPlane: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PaperPlane size="small" color="success" />
				<Icons.PaperPlane />
				<Icons.PaperPlane size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PaperPlane size="small" color="success" />
				<Icons.PaperPlane />
				<Icons.PaperPlane size="large" color="error" />
			</div>
		</div>
	),
};

export const PassengerTrain: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PassengerTrain size="small" color="success" />
				<Icons.PassengerTrain />
				<Icons.PassengerTrain size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PassengerTrain size="small" color="success" />
				<Icons.PassengerTrain />
				<Icons.PassengerTrain size="large" color="error" />
			</div>
		</div>
	),
};

export const Past: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Past size="small" color="success" />
				<Icons.Past />
				<Icons.Past size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Past size="small" color="success" />
				<Icons.Past />
				<Icons.Past size="large" color="error" />
			</div>
		</div>
	),
};

export const Paste: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Paste size="small" color="success" />
				<Icons.Paste />
				<Icons.Paste size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Paste size="small" color="success" />
				<Icons.Paste />
				<Icons.Paste size="large" color="error" />
			</div>
		</div>
	),
};

export const Pause: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Pause size="small" color="success" />
				<Icons.Pause />
				<Icons.Pause size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Pause size="small" color="success" />
				<Icons.Pause />
				<Icons.Pause size="large" color="error" />
			</div>
		</div>
	),
};

export const PaymentApproved: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PaymentApproved size="small" color="success" />
				<Icons.PaymentApproved />
				<Icons.PaymentApproved size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PaymentApproved size="small" color="success" />
				<Icons.PaymentApproved />
				<Icons.PaymentApproved size="large" color="error" />
			</div>
		</div>
	),
};

export const PdfAttachment: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PdfAttachment size="small" color="success" />
				<Icons.PdfAttachment />
				<Icons.PdfAttachment size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PdfAttachment size="small" color="success" />
				<Icons.PdfAttachment />
				<Icons.PdfAttachment size="large" color="error" />
			</div>
		</div>
	),
};

export const PdfReader: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PdfReader size="small" color="success" />
				<Icons.PdfReader />
				<Icons.PdfReader size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PdfReader size="small" color="success" />
				<Icons.PdfReader />
				<Icons.PdfReader size="large" color="error" />
			</div>
		</div>
	),
};

export const Pending: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Pending size="small" color="success" />
				<Icons.Pending />
				<Icons.Pending size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Pending size="small" color="success" />
				<Icons.Pending />
				<Icons.Pending size="large" color="error" />
			</div>
		</div>
	),
};

export const PeopleConnected: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PeopleConnected size="small" color="success" />
				<Icons.PeopleConnected />
				<Icons.PeopleConnected size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PeopleConnected size="small" color="success" />
				<Icons.PeopleConnected />
				<Icons.PeopleConnected size="large" color="error" />
			</div>
		</div>
	),
};

export const PerDiem: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PerDiem size="small" color="success" />
				<Icons.PerDiem />
				<Icons.PerDiem size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PerDiem size="small" color="success" />
				<Icons.PerDiem />
				<Icons.PerDiem size="large" color="error" />
			</div>
		</div>
	),
};

export const Performance: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Performance size="small" color="success" />
				<Icons.Performance />
				<Icons.Performance size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Performance size="small" color="success" />
				<Icons.Performance />
				<Icons.Performance size="large" color="error" />
			</div>
		</div>
	),
};

export const Permission: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Permission size="small" color="success" />
				<Icons.Permission />
				<Icons.Permission size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Permission size="small" color="success" />
				<Icons.Permission />
				<Icons.Permission size="large" color="error" />
			</div>
		</div>
	),
};

export const PersonnelView: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PersonnelView size="small" color="success" />
				<Icons.PersonnelView />
				<Icons.PersonnelView size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PersonnelView size="small" color="success" />
				<Icons.PersonnelView />
				<Icons.PersonnelView size="large" color="error" />
			</div>
		</div>
	),
};

export const PersonPlaceholder: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PersonPlaceholder size="small" color="success" />
				<Icons.PersonPlaceholder />
				<Icons.PersonPlaceholder size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PersonPlaceholder size="small" color="success" />
				<Icons.PersonPlaceholder />
				<Icons.PersonPlaceholder size="large" color="error" />
			</div>
		</div>
	),
};

export const Pharmacy: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Pharmacy size="small" color="success" />
				<Icons.Pharmacy />
				<Icons.Pharmacy size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Pharmacy size="small" color="success" />
				<Icons.Pharmacy />
				<Icons.Pharmacy size="large" color="error" />
			</div>
		</div>
	),
};

export const Phone: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Phone size="small" color="success" />
				<Icons.Phone />
				<Icons.Phone size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Phone size="small" color="success" />
				<Icons.Phone />
				<Icons.Phone size="large" color="error" />
			</div>
		</div>
	),
};

export const PhotoVoltaic: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PhotoVoltaic size="small" color="success" />
				<Icons.PhotoVoltaic />
				<Icons.PhotoVoltaic size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PhotoVoltaic size="small" color="success" />
				<Icons.PhotoVoltaic />
				<Icons.PhotoVoltaic size="large" color="error" />
			</div>
		</div>
	),
};

export const PhysicalActivity: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PhysicalActivity size="small" color="success" />
				<Icons.PhysicalActivity />
				<Icons.PhysicalActivity size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PhysicalActivity size="small" color="success" />
				<Icons.PhysicalActivity />
				<Icons.PhysicalActivity size="large" color="error" />
			</div>
		</div>
	),
};

export const Picture: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Picture size="small" color="success" />
				<Icons.Picture />
				<Icons.Picture size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Picture size="small" color="success" />
				<Icons.Picture />
				<Icons.Picture size="large" color="error" />
			</div>
		</div>
	),
};

export const PieChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PieChart size="small" color="success" />
				<Icons.PieChart />
				<Icons.PieChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PieChart size="small" color="success" />
				<Icons.PieChart />
				<Icons.PieChart size="large" color="error" />
			</div>
		</div>
	),
};

export const PipelineAnalysis: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PipelineAnalysis size="small" color="success" />
				<Icons.PipelineAnalysis />
				<Icons.PipelineAnalysis size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PipelineAnalysis size="small" color="success" />
				<Icons.PipelineAnalysis />
				<Icons.PipelineAnalysis size="large" color="error" />
			</div>
		</div>
	),
};

export const Pixelate: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Pixelate size="small" color="success" />
				<Icons.Pixelate />
				<Icons.Pixelate size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Pixelate size="small" color="success" />
				<Icons.Pixelate />
				<Icons.Pixelate size="large" color="error" />
			</div>
		</div>
	),
};

export const Play: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Play size="small" color="success" />
				<Icons.Play />
				<Icons.Play size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Play size="small" color="success" />
				<Icons.Play />
				<Icons.Play size="large" color="error" />
			</div>
		</div>
	),
};

export const Pool: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Pool size="small" color="success" />
				<Icons.Pool />
				<Icons.Pool size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Pool size="small" color="success" />
				<Icons.Pool />
				<Icons.Pool size="large" color="error" />
			</div>
		</div>
	),
};

export const PopupWindow: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PopupWindow size="small" color="success" />
				<Icons.PopupWindow />
				<Icons.PopupWindow size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PopupWindow size="small" color="success" />
				<Icons.PopupWindow />
				<Icons.PopupWindow size="large" color="error" />
			</div>
		</div>
	),
};

export const Positive: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Positive size="small" color="success" />
				<Icons.Positive />
				<Icons.Positive size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Positive size="small" color="success" />
				<Icons.Positive />
				<Icons.Positive size="large" color="error" />
			</div>
		</div>
	),
};

export const Post: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Post size="small" color="success" />
				<Icons.Post />
				<Icons.Post size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Post size="small" color="success" />
				<Icons.Post />
				<Icons.Post size="large" color="error" />
			</div>
		</div>
	),
};

export const PptAttachment: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PptAttachment size="small" color="success" />
				<Icons.PptAttachment />
				<Icons.PptAttachment size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PptAttachment size="small" color="success" />
				<Icons.PptAttachment />
				<Icons.PptAttachment size="large" color="error" />
			</div>
		</div>
	),
};

export const Present: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Present size="small" color="success" />
				<Icons.Present />
				<Icons.Present size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Present size="small" color="success" />
				<Icons.Present />
				<Icons.Present size="large" color="error" />
			</div>
		</div>
	),
};

export const PrimaryKey: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PrimaryKey size="small" color="success" />
				<Icons.PrimaryKey />
				<Icons.PrimaryKey size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PrimaryKey size="small" color="success" />
				<Icons.PrimaryKey />
				<Icons.PrimaryKey size="large" color="error" />
			</div>
		</div>
	),
};

export const Print: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Print size="small" color="success" />
				<Icons.Print />
				<Icons.Print size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Print size="small" color="success" />
				<Icons.Print />
				<Icons.Print size="large" color="error" />
			</div>
		</div>
	),
};

export const Private: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Private size="small" color="success" />
				<Icons.Private />
				<Icons.Private size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Private size="small" color="success" />
				<Icons.Private />
				<Icons.Private size="large" color="error" />
			</div>
		</div>
	),
};

export const Process: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Process size="small" color="success" />
				<Icons.Process />
				<Icons.Process size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Process size="small" color="success" />
				<Icons.Process />
				<Icons.Process size="large" color="error" />
			</div>
		</div>
	),
};

export const Product: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Product size="small" color="success" />
				<Icons.Product />
				<Icons.Product size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Product size="small" color="success" />
				<Icons.Product />
				<Icons.Product size="large" color="error" />
			</div>
		</div>
	),
};

export const ProgramTriangles: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ProgramTriangles size="small" color="success" />
				<Icons.ProgramTriangles />
				<Icons.ProgramTriangles size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ProgramTriangles size="small" color="success" />
				<Icons.ProgramTriangles />
				<Icons.ProgramTriangles size="large" color="error" />
			</div>
		</div>
	),
};

export const ProgramTriangles2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ProgramTriangles2 size="small" color="success" />
				<Icons.ProgramTriangles2 />
				<Icons.ProgramTriangles2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ProgramTriangles2 size="small" color="success" />
				<Icons.ProgramTriangles2 />
				<Icons.ProgramTriangles2 size="large" color="error" />
			</div>
		</div>
	),
};

export const ProjectDefinitionTriangle: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ProjectDefinitionTriangle size="small" color="success" />
				<Icons.ProjectDefinitionTriangle />
				<Icons.ProjectDefinitionTriangle size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ProjectDefinitionTriangle size="small" color="success" />
				<Icons.ProjectDefinitionTriangle />
				<Icons.ProjectDefinitionTriangle size="large" color="error" />
			</div>
		</div>
	),
};

export const ProjectDefinitionTriangle2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ProjectDefinitionTriangle2 size="small" color="success" />
				<Icons.ProjectDefinitionTriangle2 />
				<Icons.ProjectDefinitionTriangle2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ProjectDefinitionTriangle2 size="small" color="success" />
				<Icons.ProjectDefinitionTriangle2 />
				<Icons.ProjectDefinitionTriangle2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Projector: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Projector size="small" color="success" />
				<Icons.Projector />
				<Icons.Projector size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Projector size="small" color="success" />
				<Icons.Projector />
				<Icons.Projector size="large" color="error" />
			</div>
		</div>
	),
};

export const Provision: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Provision size="small" color="success" />
				<Icons.Provision />
				<Icons.Provision size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Provision size="small" color="success" />
				<Icons.Provision />
				<Icons.Provision size="large" color="error" />
			</div>
		</div>
	),
};

export const PullDown: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PullDown size="small" color="success" />
				<Icons.PullDown />
				<Icons.PullDown size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PullDown size="small" color="success" />
				<Icons.PullDown />
				<Icons.PullDown size="large" color="error" />
			</div>
		</div>
	),
};

export const PushpinOff: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PushpinOff size="small" color="success" />
				<Icons.PushpinOff />
				<Icons.PushpinOff size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PushpinOff size="small" color="success" />
				<Icons.PushpinOff />
				<Icons.PushpinOff size="large" color="error" />
			</div>
		</div>
	),
};

export const PushpinOn: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.PushpinOn size="small" color="success" />
				<Icons.PushpinOn />
				<Icons.PushpinOn size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.PushpinOn size="small" color="success" />
				<Icons.PushpinOn />
				<Icons.PushpinOn size="large" color="error" />
			</div>
		</div>
	),
};

export const Puzzle: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Puzzle size="small" color="success" />
				<Icons.Puzzle />
				<Icons.Puzzle size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Puzzle size="small" color="success" />
				<Icons.Puzzle />
				<Icons.Puzzle size="large" color="error" />
			</div>
		</div>
	),
};

export const QrCode: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.QrCode size="small" color="success" />
				<Icons.QrCode />
				<Icons.QrCode size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.QrCode size="small" color="success" />
				<Icons.QrCode />
				<Icons.QrCode size="large" color="error" />
			</div>
		</div>
	),
};

export const QualityIssue: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.QualityIssue size="small" color="success" />
				<Icons.QualityIssue />
				<Icons.QualityIssue size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.QualityIssue size="small" color="success" />
				<Icons.QualityIssue />
				<Icons.QualityIssue size="large" color="error" />
			</div>
		</div>
	),
};

export const QuestionMark: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.QuestionMark size="small" color="success" />
				<Icons.QuestionMark />
				<Icons.QuestionMark size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.QuestionMark size="small" color="success" />
				<Icons.QuestionMark />
				<Icons.QuestionMark size="large" color="error" />
			</div>
		</div>
	),
};

export const RadarChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.RadarChart size="small" color="success" />
				<Icons.RadarChart />
				<Icons.RadarChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.RadarChart size="small" color="success" />
				<Icons.RadarChart />
				<Icons.RadarChart size="large" color="error" />
			</div>
		</div>
	),
};

export const Receipt: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Receipt size="small" color="success" />
				<Icons.Receipt />
				<Icons.Receipt size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Receipt size="small" color="success" />
				<Icons.Receipt />
				<Icons.Receipt size="large" color="error" />
			</div>
		</div>
	),
};

export const Record: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Record size="small" color="success" />
				<Icons.Record />
				<Icons.Record size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Record size="small" color="success" />
				<Icons.Record />
				<Icons.Record size="large" color="error" />
			</div>
		</div>
	),
};

export const Redo: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Redo size="small" color="success" />
				<Icons.Redo />
				<Icons.Redo size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Redo size="small" color="success" />
				<Icons.Redo />
				<Icons.Redo size="large" color="error" />
			</div>
		</div>
	),
};

export const Refresh: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Refresh size="small" color="success" />
				<Icons.Refresh />
				<Icons.Refresh size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Refresh size="small" color="success" />
				<Icons.Refresh />
				<Icons.Refresh size="large" color="error" />
			</div>
		</div>
	),
};

export const Repost: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Repost size="small" color="success" />
				<Icons.Repost />
				<Icons.Repost size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Repost size="small" color="success" />
				<Icons.Repost />
				<Icons.Repost size="large" color="error" />
			</div>
		</div>
	),
};

export const Request: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Request size="small" color="success" />
				<Icons.Request />
				<Icons.Request size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Request size="small" color="success" />
				<Icons.Request />
				<Icons.Request size="large" color="error" />
			</div>
		</div>
	),
};

export const Reset: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Reset size="small" color="success" />
				<Icons.Reset />
				<Icons.Reset size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Reset size="small" color="success" />
				<Icons.Reset />
				<Icons.Reset size="large" color="error" />
			</div>
		</div>
	),
};

export const Resize: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Resize size="small" color="success" />
				<Icons.Resize />
				<Icons.Resize size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Resize size="small" color="success" />
				<Icons.Resize />
				<Icons.Resize size="large" color="error" />
			</div>
		</div>
	),
};

export const ResizeCorner: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ResizeCorner size="small" color="success" />
				<Icons.ResizeCorner />
				<Icons.ResizeCorner size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ResizeCorner size="small" color="success" />
				<Icons.ResizeCorner />
				<Icons.ResizeCorner size="large" color="error" />
			</div>
		</div>
	),
};

export const ResizeHorizontal: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ResizeHorizontal size="small" color="success" />
				<Icons.ResizeHorizontal />
				<Icons.ResizeHorizontal size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ResizeHorizontal size="small" color="success" />
				<Icons.ResizeHorizontal />
				<Icons.ResizeHorizontal size="large" color="error" />
			</div>
		</div>
	),
};

export const ResizeVertical: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ResizeVertical size="small" color="success" />
				<Icons.ResizeVertical />
				<Icons.ResizeVertical size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ResizeVertical size="small" color="success" />
				<Icons.ResizeVertical />
				<Icons.ResizeVertical size="large" color="error" />
			</div>
		</div>
	),
};

export const Response: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Response size="small" color="success" />
				<Icons.Response />
				<Icons.Response size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Response size="small" color="success" />
				<Icons.Response />
				<Icons.Response size="large" color="error" />
			</div>
		</div>
	),
};

export const Responsive: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Responsive size="small" color="success" />
				<Icons.Responsive />
				<Icons.Responsive size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Responsive size="small" color="success" />
				<Icons.Responsive />
				<Icons.Responsive size="large" color="error" />
			</div>
		</div>
	),
};

export const Restart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Restart size="small" color="success" />
				<Icons.Restart />
				<Icons.Restart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Restart size="small" color="success" />
				<Icons.Restart />
				<Icons.Restart size="large" color="error" />
			</div>
		</div>
	),
};

export const RetailStore: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.RetailStore size="small" color="success" />
				<Icons.RetailStore />
				<Icons.RetailStore size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.RetailStore size="small" color="success" />
				<Icons.RetailStore />
				<Icons.RetailStore size="large" color="error" />
			</div>
		</div>
	),
};

export const RetailStoreManager: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.RetailStoreManager size="small" color="success" />
				<Icons.RetailStoreManager />
				<Icons.RetailStoreManager size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.RetailStoreManager size="small" color="success" />
				<Icons.RetailStoreManager />
				<Icons.RetailStoreManager size="large" color="error" />
			</div>
		</div>
	),
};

export const RhombusMilestone: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.RhombusMilestone size="small" color="success" />
				<Icons.RhombusMilestone />
				<Icons.RhombusMilestone size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.RhombusMilestone size="small" color="success" />
				<Icons.RhombusMilestone />
				<Icons.RhombusMilestone size="large" color="error" />
			</div>
		</div>
	),
};

export const RhombusMilestone2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.RhombusMilestone2 size="small" color="success" />
				<Icons.RhombusMilestone2 />
				<Icons.RhombusMilestone2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.RhombusMilestone2 size="small" color="success" />
				<Icons.RhombusMilestone2 />
				<Icons.RhombusMilestone2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Role: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Role size="small" color="success" />
				<Icons.Role />
				<Icons.Role size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Role size="small" color="success" />
				<Icons.Role />
				<Icons.Role size="large" color="error" />
			</div>
		</div>
	),
};

export const Rotate: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Rotate size="small" color="success" />
				<Icons.Rotate />
				<Icons.Rotate size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Rotate size="small" color="success" />
				<Icons.Rotate />
				<Icons.Rotate size="large" color="error" />
			</div>
		</div>
	),
};

export const S4hana: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.S4hana size="small" color="success" />
				<Icons.S4hana />
				<Icons.S4hana size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.S4hana size="small" color="success" />
				<Icons.S4hana />
				<Icons.S4hana size="large" color="error" />
			</div>
		</div>
	),
};

export const SalesDocument: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SalesDocument size="small" color="success" />
				<Icons.SalesDocument />
				<Icons.SalesDocument size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SalesDocument size="small" color="success" />
				<Icons.SalesDocument />
				<Icons.SalesDocument size="large" color="error" />
			</div>
		</div>
	),
};

export const SalesNotification: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SalesNotification size="small" color="success" />
				<Icons.SalesNotification />
				<Icons.SalesNotification size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SalesNotification size="small" color="success" />
				<Icons.SalesNotification />
				<Icons.SalesNotification size="large" color="error" />
			</div>
		</div>
	),
};

export const SalesOrder: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SalesOrder size="small" color="success" />
				<Icons.SalesOrder />
				<Icons.SalesOrder size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SalesOrder size="small" color="success" />
				<Icons.SalesOrder />
				<Icons.SalesOrder size="large" color="error" />
			</div>
		</div>
	),
};

export const SalesOrderItem: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SalesOrderItem size="small" color="success" />
				<Icons.SalesOrderItem />
				<Icons.SalesOrderItem size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SalesOrderItem size="small" color="success" />
				<Icons.SalesOrderItem />
				<Icons.SalesOrderItem size="large" color="error" />
			</div>
		</div>
	),
};

export const SalesQuote: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SalesQuote size="small" color="success" />
				<Icons.SalesQuote />
				<Icons.SalesQuote size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SalesQuote size="small" color="success" />
				<Icons.SalesQuote />
				<Icons.SalesQuote size="large" color="error" />
			</div>
		</div>
	),
};

export const SapBox: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SapBox size="small" color="success" />
				<Icons.SapBox />
				<Icons.SapBox size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SapBox size="small" color="success" />
				<Icons.SapBox />
				<Icons.SapBox size="large" color="error" />
			</div>
		</div>
	),
};

export const SapLogoShape: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SapLogoShape size="small" color="success" />
				<Icons.SapLogoShape />
				<Icons.SapLogoShape size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SapLogoShape size="small" color="success" />
				<Icons.SapLogoShape />
				<Icons.SapLogoShape size="large" color="error" />
			</div>
		</div>
	),
};

export const SapUi5: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SapUi5 size="small" color="success" />
				<Icons.SapUi5 />
				<Icons.SapUi5 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SapUi5 size="small" color="success" />
				<Icons.SapUi5 />
				<Icons.SapUi5 size="large" color="error" />
			</div>
		</div>
	),
};

export const Save: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Save size="small" color="success" />
				<Icons.Save />
				<Icons.Save size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Save size="small" color="success" />
				<Icons.Save />
				<Icons.Save size="large" color="error" />
			</div>
		</div>
	),
};

export const ScatterChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ScatterChart size="small" color="success" />
				<Icons.ScatterChart />
				<Icons.ScatterChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ScatterChart size="small" color="success" />
				<Icons.ScatterChart />
				<Icons.ScatterChart size="large" color="error" />
			</div>
		</div>
	),
};

export const Scissors: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Scissors size="small" color="success" />
				<Icons.Scissors />
				<Icons.Scissors size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Scissors size="small" color="success" />
				<Icons.Scissors />
				<Icons.Scissors size="large" color="error" />
			</div>
		</div>
	),
};

export const ScreenSplitOne: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ScreenSplitOne size="small" color="success" />
				<Icons.ScreenSplitOne />
				<Icons.ScreenSplitOne size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ScreenSplitOne size="small" color="success" />
				<Icons.ScreenSplitOne />
				<Icons.ScreenSplitOne size="large" color="error" />
			</div>
		</div>
	),
};

export const ScreenSplitThree: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ScreenSplitThree size="small" color="success" />
				<Icons.ScreenSplitThree />
				<Icons.ScreenSplitThree size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ScreenSplitThree size="small" color="success" />
				<Icons.ScreenSplitThree />
				<Icons.ScreenSplitThree size="large" color="error" />
			</div>
		</div>
	),
};

export const ScreenSplitTwo: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ScreenSplitTwo size="small" color="success" />
				<Icons.ScreenSplitTwo />
				<Icons.ScreenSplitTwo size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ScreenSplitTwo size="small" color="success" />
				<Icons.ScreenSplitTwo />
				<Icons.ScreenSplitTwo size="large" color="error" />
			</div>
		</div>
	),
};

export const Search: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Search size="small" color="success" />
				<Icons.Search />
				<Icons.Search size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Search size="small" color="success" />
				<Icons.Search />
				<Icons.Search size="large" color="error" />
			</div>
		</div>
	),
};

export const SelectAppointments: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SelectAppointments size="small" color="success" />
				<Icons.SelectAppointments />
				<Icons.SelectAppointments size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SelectAppointments size="small" color="success" />
				<Icons.SelectAppointments />
				<Icons.SelectAppointments size="large" color="error" />
			</div>
		</div>
	),
};

export const Settings: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Settings size="small" color="success" />
				<Icons.Settings />
				<Icons.Settings size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Settings size="small" color="success" />
				<Icons.Settings />
				<Icons.Settings size="large" color="error" />
			</div>
		</div>
	),
};

export const Share: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Share size="small" color="success" />
				<Icons.Share />
				<Icons.Share size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Share size="small" color="success" />
				<Icons.Share />
				<Icons.Share size="large" color="error" />
			</div>
		</div>
	),
};

export const Share2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Share2 size="small" color="success" />
				<Icons.Share2 />
				<Icons.Share2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Share2 size="small" color="success" />
				<Icons.Share2 />
				<Icons.Share2 size="large" color="error" />
			</div>
		</div>
	),
};

export const Shelf: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Shelf size="small" color="success" />
				<Icons.Shelf />
				<Icons.Shelf size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Shelf size="small" color="success" />
				<Icons.Shelf />
				<Icons.Shelf size="large" color="error" />
			</div>
		</div>
	),
};

export const Shield: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Shield size="small" color="success" />
				<Icons.Shield />
				<Icons.Shield size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Shield size="small" color="success" />
				<Icons.Shield />
				<Icons.Shield size="large" color="error" />
			</div>
		</div>
	),
};

export const ShippingStatus: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ShippingStatus size="small" color="success" />
				<Icons.ShippingStatus />
				<Icons.ShippingStatus size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ShippingStatus size="small" color="success" />
				<Icons.ShippingStatus />
				<Icons.ShippingStatus size="large" color="error" />
			</div>
		</div>
	),
};

export const Shortcut: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Shortcut size="small" color="success" />
				<Icons.Shortcut />
				<Icons.Shortcut size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Shortcut size="small" color="success" />
				<Icons.Shortcut />
				<Icons.Shortcut size="large" color="error" />
			</div>
		</div>
	),
};

export const Show: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Show size="small" color="success" />
				<Icons.Show />
				<Icons.Show size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Show size="small" color="success" />
				<Icons.Show />
				<Icons.Show size="large" color="error" />
			</div>
		</div>
	),
};

export const ShowEdit: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ShowEdit size="small" color="success" />
				<Icons.ShowEdit />
				<Icons.ShowEdit size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ShowEdit size="small" color="success" />
				<Icons.ShowEdit />
				<Icons.ShowEdit size="large" color="error" />
			</div>
		</div>
	),
};

export const Signature: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Signature size="small" color="success" />
				<Icons.Signature />
				<Icons.Signature size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Signature size="small" color="success" />
				<Icons.Signature />
				<Icons.Signature size="large" color="error" />
			</div>
		</div>
	),
};

export const SimplePayment: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SimplePayment size="small" color="success" />
				<Icons.SimplePayment />
				<Icons.SimplePayment size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SimplePayment size="small" color="success" />
				<Icons.SimplePayment />
				<Icons.SimplePayment size="large" color="error" />
			</div>
		</div>
	),
};

export const Simulate: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Simulate size="small" color="success" />
				<Icons.Simulate />
				<Icons.Simulate size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Simulate size="small" color="success" />
				<Icons.Simulate />
				<Icons.Simulate size="large" color="error" />
			</div>
		</div>
	),
};

export const SlimArrowDown: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SlimArrowDown size="small" color="success" />
				<Icons.SlimArrowDown />
				<Icons.SlimArrowDown size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SlimArrowDown size="small" color="success" />
				<Icons.SlimArrowDown />
				<Icons.SlimArrowDown size="large" color="error" />
			</div>
		</div>
	),
};

export const SlimArrowLeft: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SlimArrowLeft size="small" color="success" />
				<Icons.SlimArrowLeft />
				<Icons.SlimArrowLeft size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SlimArrowLeft size="small" color="success" />
				<Icons.SlimArrowLeft />
				<Icons.SlimArrowLeft size="large" color="error" />
			</div>
		</div>
	),
};

export const SlimArrowRight: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SlimArrowRight size="small" color="success" />
				<Icons.SlimArrowRight />
				<Icons.SlimArrowRight size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SlimArrowRight size="small" color="success" />
				<Icons.SlimArrowRight />
				<Icons.SlimArrowRight size="large" color="error" />
			</div>
		</div>
	),
};

export const SlimArrowUp: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SlimArrowUp size="small" color="success" />
				<Icons.SlimArrowUp />
				<Icons.SlimArrowUp size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SlimArrowUp size="small" color="success" />
				<Icons.SlimArrowUp />
				<Icons.SlimArrowUp size="large" color="error" />
			</div>
		</div>
	),
};

export const SmartWatch: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SmartWatch size="small" color="success" />
				<Icons.SmartWatch />
				<Icons.SmartWatch size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SmartWatch size="small" color="success" />
				<Icons.SmartWatch />
				<Icons.SmartWatch size="large" color="error" />
			</div>
		</div>
	),
};

export const Soccer: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Soccer size="small" color="success" />
				<Icons.Soccer />
				<Icons.Soccer size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Soccer size="small" color="success" />
				<Icons.Soccer />
				<Icons.Soccer size="large" color="error" />
			</div>
		</div>
	),
};

export const Sonography: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Sonography size="small" color="success" />
				<Icons.Sonography />
				<Icons.Sonography size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Sonography size="small" color="success" />
				<Icons.Sonography />
				<Icons.Sonography size="large" color="error" />
			</div>
		</div>
	),
};

export const Sort: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Sort size="small" color="success" />
				<Icons.Sort />
				<Icons.Sort size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Sort size="small" color="success" />
				<Icons.Sort />
				<Icons.Sort size="large" color="error" />
			</div>
		</div>
	),
};

export const SortAscending: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SortAscending size="small" color="success" />
				<Icons.SortAscending />
				<Icons.SortAscending size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SortAscending size="small" color="success" />
				<Icons.SortAscending />
				<Icons.SortAscending size="large" color="error" />
			</div>
		</div>
	),
};

export const SortDescending: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SortDescending size="small" color="success" />
				<Icons.SortDescending />
				<Icons.SortDescending size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SortDescending size="small" color="success" />
				<Icons.SortDescending />
				<Icons.SortDescending size="large" color="error" />
			</div>
		</div>
	),
};

export const SortingRanking: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SortingRanking size="small" color="success" />
				<Icons.SortingRanking />
				<Icons.SortingRanking size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SortingRanking size="small" color="success" />
				<Icons.SortingRanking />
				<Icons.SortingRanking size="large" color="error" />
			</div>
		</div>
	),
};

export const Sound: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Sound size="small" color="success" />
				<Icons.Sound />
				<Icons.Sound size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Sound size="small" color="success" />
				<Icons.Sound />
				<Icons.Sound size="large" color="error" />
			</div>
		</div>
	),
};

export const SoundLoud: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SoundLoud size="small" color="success" />
				<Icons.SoundLoud />
				<Icons.SoundLoud size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SoundLoud size="small" color="success" />
				<Icons.SoundLoud />
				<Icons.SoundLoud size="large" color="error" />
			</div>
		</div>
	),
};

export const SoundOff: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SoundOff size="small" color="success" />
				<Icons.SoundOff />
				<Icons.SoundOff size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SoundOff size="small" color="success" />
				<Icons.SoundOff />
				<Icons.SoundOff size="large" color="error" />
			</div>
		</div>
	),
};

export const SourceCode: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SourceCode size="small" color="success" />
				<Icons.SourceCode />
				<Icons.SourceCode size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SourceCode size="small" color="success" />
				<Icons.SourceCode />
				<Icons.SourceCode size="large" color="error" />
			</div>
		</div>
	),
};

export const SpaceNavigation: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SpaceNavigation size="small" color="success" />
				<Icons.SpaceNavigation />
				<Icons.SpaceNavigation size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SpaceNavigation size="small" color="success" />
				<Icons.SpaceNavigation />
				<Icons.SpaceNavigation size="large" color="error" />
			</div>
		</div>
	),
};

export const Split: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Split size="small" color="success" />
				<Icons.Split />
				<Icons.Split size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Split size="small" color="success" />
				<Icons.Split />
				<Icons.Split size="large" color="error" />
			</div>
		</div>
	),
};

export const StatusCompleted: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.StatusCompleted size="small" color="success" />
				<Icons.StatusCompleted />
				<Icons.StatusCompleted size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.StatusCompleted size="small" color="success" />
				<Icons.StatusCompleted />
				<Icons.StatusCompleted size="large" color="error" />
			</div>
		</div>
	),
};

export const StatusCritical: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.StatusCritical size="small" color="success" />
				<Icons.StatusCritical />
				<Icons.StatusCritical size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.StatusCritical size="small" color="success" />
				<Icons.StatusCritical />
				<Icons.StatusCritical size="large" color="error" />
			</div>
		</div>
	),
};

export const StatusError: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.StatusError size="small" color="success" />
				<Icons.StatusError />
				<Icons.StatusError size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.StatusError size="small" color="success" />
				<Icons.StatusError />
				<Icons.StatusError size="large" color="error" />
			</div>
		</div>
	),
};

export const StatusInactive: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.StatusInactive size="small" color="success" />
				<Icons.StatusInactive />
				<Icons.StatusInactive size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.StatusInactive size="small" color="success" />
				<Icons.StatusInactive />
				<Icons.StatusInactive size="large" color="error" />
			</div>
		</div>
	),
};

export const StatusInProcess: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.StatusInProcess size="small" color="success" />
				<Icons.StatusInProcess />
				<Icons.StatusInProcess size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.StatusInProcess size="small" color="success" />
				<Icons.StatusInProcess />
				<Icons.StatusInProcess size="large" color="error" />
			</div>
		</div>
	),
};

export const StatusNegative: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.StatusNegative size="small" color="success" />
				<Icons.StatusNegative />
				<Icons.StatusNegative size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.StatusNegative size="small" color="success" />
				<Icons.StatusNegative />
				<Icons.StatusNegative size="large" color="error" />
			</div>
		</div>
	),
};

export const StatusPositive: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.StatusPositive size="small" color="success" />
				<Icons.StatusPositive />
				<Icons.StatusPositive size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.StatusPositive size="small" color="success" />
				<Icons.StatusPositive />
				<Icons.StatusPositive size="large" color="error" />
			</div>
		</div>
	),
};

export const Step: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Step size="small" color="success" />
				<Icons.Step />
				<Icons.Step size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Step size="small" color="success" />
				<Icons.Step />
				<Icons.Step size="large" color="error" />
			</div>
		</div>
	),
};

export const Stethoscope: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Stethoscope size="small" color="success" />
				<Icons.Stethoscope />
				<Icons.Stethoscope size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Stethoscope size="small" color="success" />
				<Icons.Stethoscope />
				<Icons.Stethoscope size="large" color="error" />
			</div>
		</div>
	),
};

export const Stop: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Stop size="small" color="success" />
				<Icons.Stop />
				<Icons.Stop size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Stop size="small" color="success" />
				<Icons.Stop />
				<Icons.Stop size="large" color="error" />
			</div>
		</div>
	),
};

export const Strikethrough: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Strikethrough size="small" color="success" />
				<Icons.Strikethrough />
				<Icons.Strikethrough size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Strikethrough size="small" color="success" />
				<Icons.Strikethrough />
				<Icons.Strikethrough size="large" color="error" />
			</div>
		</div>
	),
};

export const StudyLeave: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.StudyLeave size="small" color="success" />
				<Icons.StudyLeave />
				<Icons.StudyLeave size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.StudyLeave size="small" color="success" />
				<Icons.StudyLeave />
				<Icons.StudyLeave size="large" color="error" />
			</div>
		</div>
	),
};

export const SubwayTrain: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SubwayTrain size="small" color="success" />
				<Icons.SubwayTrain />
				<Icons.SubwayTrain size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SubwayTrain size="small" color="success" />
				<Icons.SubwayTrain />
				<Icons.SubwayTrain size="large" color="error" />
			</div>
		</div>
	),
};

export const Suitcase: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Suitcase size="small" color="success" />
				<Icons.Suitcase />
				<Icons.Suitcase size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Suitcase size="small" color="success" />
				<Icons.Suitcase />
				<Icons.Suitcase size="large" color="error" />
			</div>
		</div>
	),
};

export const Sum: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Sum size="small" color="success" />
				<Icons.Sum />
				<Icons.Sum size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Sum size="small" color="success" />
				<Icons.Sum />
				<Icons.Sum size="large" color="error" />
			</div>
		</div>
	),
};

export const Supplier: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Supplier size="small" color="success" />
				<Icons.Supplier />
				<Icons.Supplier size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Supplier size="small" color="success" />
				<Icons.Supplier />
				<Icons.Supplier size="large" color="error" />
			</div>
		</div>
	),
};

export const Survey: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Survey size="small" color="success" />
				<Icons.Survey />
				<Icons.Survey size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Survey size="small" color="success" />
				<Icons.Survey />
				<Icons.Survey size="large" color="error" />
			</div>
		</div>
	),
};

export const SwitchClasses: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SwitchClasses size="small" color="success" />
				<Icons.SwitchClasses />
				<Icons.SwitchClasses size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SwitchClasses size="small" color="success" />
				<Icons.SwitchClasses />
				<Icons.SwitchClasses size="large" color="error" />
			</div>
		</div>
	),
};

export const SwitchViews: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SwitchViews size="small" color="success" />
				<Icons.SwitchViews />
				<Icons.SwitchViews size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SwitchViews size="small" color="success" />
				<Icons.SwitchViews />
				<Icons.SwitchViews size="large" color="error" />
			</div>
		</div>
	),
};

export const Synchronize: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Synchronize size="small" color="success" />
				<Icons.Synchronize />
				<Icons.Synchronize size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Synchronize size="small" color="success" />
				<Icons.Synchronize />
				<Icons.Synchronize size="large" color="error" />
			</div>
		</div>
	),
};

export const Syntax: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Syntax size="small" color="success" />
				<Icons.Syntax />
				<Icons.Syntax size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Syntax size="small" color="success" />
				<Icons.Syntax />
				<Icons.Syntax size="large" color="error" />
			</div>
		</div>
	),
};

export const Syringe: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Syringe size="small" color="success" />
				<Icons.Syringe />
				<Icons.Syringe size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Syringe size="small" color="success" />
				<Icons.Syringe />
				<Icons.Syringe size="large" color="error" />
			</div>
		</div>
	),
};

export const SysAdd: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysAdd size="small" color="success" />
				<Icons.SysAdd />
				<Icons.SysAdd size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysAdd size="small" color="success" />
				<Icons.SysAdd />
				<Icons.SysAdd size="large" color="error" />
			</div>
		</div>
	),
};

export const SysBack: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysBack size="small" color="success" />
				<Icons.SysBack />
				<Icons.SysBack size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysBack size="small" color="success" />
				<Icons.SysBack />
				<Icons.SysBack size="large" color="error" />
			</div>
		</div>
	),
};

export const SysBack2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysBack2 size="small" color="success" />
				<Icons.SysBack2 />
				<Icons.SysBack2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysBack2 size="small" color="success" />
				<Icons.SysBack2 />
				<Icons.SysBack2 size="large" color="error" />
			</div>
		</div>
	),
};

export const SysCancel: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysCancel size="small" color="success" />
				<Icons.SysCancel />
				<Icons.SysCancel size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysCancel size="small" color="success" />
				<Icons.SysCancel />
				<Icons.SysCancel size="large" color="error" />
			</div>
		</div>
	),
};

export const SysCancel2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysCancel2 size="small" color="success" />
				<Icons.SysCancel2 />
				<Icons.SysCancel2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysCancel2 size="small" color="success" />
				<Icons.SysCancel2 />
				<Icons.SysCancel2 size="large" color="error" />
			</div>
		</div>
	),
};

export const SysEnter: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysEnter size="small" color="success" />
				<Icons.SysEnter />
				<Icons.SysEnter size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysEnter size="small" color="success" />
				<Icons.SysEnter />
				<Icons.SysEnter size="large" color="error" />
			</div>
		</div>
	),
};

export const SysEnter2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysEnter2 size="small" color="success" />
				<Icons.SysEnter2 />
				<Icons.SysEnter2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysEnter2 size="small" color="success" />
				<Icons.SysEnter2 />
				<Icons.SysEnter2 size="large" color="error" />
			</div>
		</div>
	),
};

export const SysFind: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysFind size="small" color="success" />
				<Icons.SysFind />
				<Icons.SysFind size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysFind size="small" color="success" />
				<Icons.SysFind />
				<Icons.SysFind size="large" color="error" />
			</div>
		</div>
	),
};

export const SysFindNext: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysFindNext size="small" color="success" />
				<Icons.SysFindNext />
				<Icons.SysFindNext size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysFindNext size="small" color="success" />
				<Icons.SysFindNext />
				<Icons.SysFindNext size="large" color="error" />
			</div>
		</div>
	),
};

export const SysFirstPage: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysFirstPage size="small" color="success" />
				<Icons.SysFirstPage />
				<Icons.SysFirstPage size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysFirstPage size="small" color="success" />
				<Icons.SysFirstPage />
				<Icons.SysFirstPage size="large" color="error" />
			</div>
		</div>
	),
};

export const SysHelp: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysHelp size="small" color="success" />
				<Icons.SysHelp />
				<Icons.SysHelp size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysHelp size="small" color="success" />
				<Icons.SysHelp />
				<Icons.SysHelp size="large" color="error" />
			</div>
		</div>
	),
};

export const SysHelp2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysHelp2 size="small" color="success" />
				<Icons.SysHelp2 />
				<Icons.SysHelp2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysHelp2 size="small" color="success" />
				<Icons.SysHelp2 />
				<Icons.SysHelp2 size="large" color="error" />
			</div>
		</div>
	),
};

export const SysLastPage: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysLastPage size="small" color="success" />
				<Icons.SysLastPage />
				<Icons.SysLastPage size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysLastPage size="small" color="success" />
				<Icons.SysLastPage />
				<Icons.SysLastPage size="large" color="error" />
			</div>
		</div>
	),
};

export const SysMinus: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysMinus size="small" color="success" />
				<Icons.SysMinus />
				<Icons.SysMinus size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysMinus size="small" color="success" />
				<Icons.SysMinus />
				<Icons.SysMinus size="large" color="error" />
			</div>
		</div>
	),
};

export const SysMonitor: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysMonitor size="small" color="success" />
				<Icons.SysMonitor />
				<Icons.SysMonitor size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysMonitor size="small" color="success" />
				<Icons.SysMonitor />
				<Icons.SysMonitor size="large" color="error" />
			</div>
		</div>
	),
};

export const SysNextPage: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysNextPage size="small" color="success" />
				<Icons.SysNextPage />
				<Icons.SysNextPage size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysNextPage size="small" color="success" />
				<Icons.SysNextPage />
				<Icons.SysNextPage size="large" color="error" />
			</div>
		</div>
	),
};

export const SysPrevPage: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SysPrevPage size="small" color="success" />
				<Icons.SysPrevPage />
				<Icons.SysPrevPage size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SysPrevPage size="small" color="success" />
				<Icons.SysPrevPage />
				<Icons.SysPrevPage size="large" color="error" />
			</div>
		</div>
	),
};

export const SystemExit: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SystemExit size="small" color="success" />
				<Icons.SystemExit />
				<Icons.SystemExit size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SystemExit size="small" color="success" />
				<Icons.SystemExit />
				<Icons.SystemExit size="large" color="error" />
			</div>
		</div>
	),
};

export const SystemExit2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.SystemExit2 size="small" color="success" />
				<Icons.SystemExit2 />
				<Icons.SystemExit2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.SystemExit2 size="small" color="success" />
				<Icons.SystemExit2 />
				<Icons.SystemExit2 size="large" color="error" />
			</div>
		</div>
	),
};

export const TableChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TableChart size="small" color="success" />
				<Icons.TableChart />
				<Icons.TableChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TableChart size="small" color="success" />
				<Icons.TableChart />
				<Icons.TableChart size="large" color="error" />
			</div>
		</div>
	),
};

export const TableColumn: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TableColumn size="small" color="success" />
				<Icons.TableColumn />
				<Icons.TableColumn size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TableColumn size="small" color="success" />
				<Icons.TableColumn />
				<Icons.TableColumn size="large" color="error" />
			</div>
		</div>
	),
};

export const TableRow: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TableRow size="small" color="success" />
				<Icons.TableRow />
				<Icons.TableRow size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TableRow size="small" color="success" />
				<Icons.TableRow />
				<Icons.TableRow size="large" color="error" />
			</div>
		</div>
	),
};

export const TableView: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TableView size="small" color="success" />
				<Icons.TableView />
				<Icons.TableView size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TableView size="small" color="success" />
				<Icons.TableView />
				<Icons.TableView size="large" color="error" />
			</div>
		</div>
	),
};

export const Tag: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Tag size="small" color="success" />
				<Icons.Tag />
				<Icons.Tag size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Tag size="small" color="success" />
				<Icons.Tag />
				<Icons.Tag size="large" color="error" />
			</div>
		</div>
	),
};

export const TagCloudChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TagCloudChart size="small" color="success" />
				<Icons.TagCloudChart />
				<Icons.TagCloudChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TagCloudChart size="small" color="success" />
				<Icons.TagCloudChart />
				<Icons.TagCloudChart size="large" color="error" />
			</div>
		</div>
	),
};

export const Tags: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Tags size="small" color="success" />
				<Icons.Tags />
				<Icons.Tags size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Tags size="small" color="success" />
				<Icons.Tags />
				<Icons.Tags size="large" color="error" />
			</div>
		</div>
	),
};

export const TargetGroup: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TargetGroup size="small" color="success" />
				<Icons.TargetGroup />
				<Icons.TargetGroup size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TargetGroup size="small" color="success" />
				<Icons.TargetGroup />
				<Icons.TargetGroup size="large" color="error" />
			</div>
		</div>
	),
};

export const Task: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Task size="small" color="success" />
				<Icons.Task />
				<Icons.Task size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Task size="small" color="success" />
				<Icons.Task />
				<Icons.Task size="large" color="error" />
			</div>
		</div>
	),
};

export const Taxi: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Taxi size="small" color="success" />
				<Icons.Taxi />
				<Icons.Taxi size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Taxi size="small" color="success" />
				<Icons.Taxi />
				<Icons.Taxi size="large" color="error" />
			</div>
		</div>
	),
};

export const TechnicalObject: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TechnicalObject size="small" color="success" />
				<Icons.TechnicalObject />
				<Icons.TechnicalObject size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TechnicalObject size="small" color="success" />
				<Icons.TechnicalObject />
				<Icons.TechnicalObject size="large" color="error" />
			</div>
		</div>
	),
};

export const Temperature: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Temperature size="small" color="success" />
				<Icons.Temperature />
				<Icons.Temperature size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Temperature size="small" color="success" />
				<Icons.Temperature />
				<Icons.Temperature size="large" color="error" />
			</div>
		</div>
	),
};

export const Text: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Text size="small" color="success" />
				<Icons.Text />
				<Icons.Text size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Text size="small" color="success" />
				<Icons.Text />
				<Icons.Text size="large" color="error" />
			</div>
		</div>
	),
};

export const TextAlignCenter: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TextAlignCenter size="small" color="success" />
				<Icons.TextAlignCenter />
				<Icons.TextAlignCenter size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TextAlignCenter size="small" color="success" />
				<Icons.TextAlignCenter />
				<Icons.TextAlignCenter size="large" color="error" />
			</div>
		</div>
	),
};

export const TextAlignJustified: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TextAlignJustified size="small" color="success" />
				<Icons.TextAlignJustified />
				<Icons.TextAlignJustified size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TextAlignJustified size="small" color="success" />
				<Icons.TextAlignJustified />
				<Icons.TextAlignJustified size="large" color="error" />
			</div>
		</div>
	),
};

export const TextAlignLeft: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TextAlignLeft size="small" color="success" />
				<Icons.TextAlignLeft />
				<Icons.TextAlignLeft size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TextAlignLeft size="small" color="success" />
				<Icons.TextAlignLeft />
				<Icons.TextAlignLeft size="large" color="error" />
			</div>
		</div>
	),
};

export const TextAlignRight: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TextAlignRight size="small" color="success" />
				<Icons.TextAlignRight />
				<Icons.TextAlignRight size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TextAlignRight size="small" color="success" />
				<Icons.TextAlignRight />
				<Icons.TextAlignRight size="large" color="error" />
			</div>
		</div>
	),
};

export const TextColor: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TextColor size="small" color="success" />
				<Icons.TextColor />
				<Icons.TextColor size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TextColor size="small" color="success" />
				<Icons.TextColor />
				<Icons.TextColor size="large" color="error" />
			</div>
		</div>
	),
};

export const TextFormatting: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TextFormatting size="small" color="success" />
				<Icons.TextFormatting />
				<Icons.TextFormatting size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TextFormatting size="small" color="success" />
				<Icons.TextFormatting />
				<Icons.TextFormatting size="large" color="error" />
			</div>
		</div>
	),
};

export const Theater: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Theater size="small" color="success" />
				<Icons.Theater />
				<Icons.Theater size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Theater size="small" color="success" />
				<Icons.Theater />
				<Icons.Theater size="large" color="error" />
			</div>
		</div>
	),
};

export const ThingType: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ThingType size="small" color="success" />
				<Icons.ThingType />
				<Icons.ThingType size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ThingType size="small" color="success" />
				<Icons.ThingType />
				<Icons.ThingType size="large" color="error" />
			</div>
		</div>
	),
};

export const ThumbDown: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ThumbDown size="small" color="success" />
				<Icons.ThumbDown />
				<Icons.ThumbDown size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ThumbDown size="small" color="success" />
				<Icons.ThumbDown />
				<Icons.ThumbDown size="large" color="error" />
			</div>
		</div>
	),
};

export const ThumbUp: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ThumbUp size="small" color="success" />
				<Icons.ThumbUp />
				<Icons.ThumbUp size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ThumbUp size="small" color="success" />
				<Icons.ThumbUp />
				<Icons.ThumbUp size="large" color="error" />
			</div>
		</div>
	),
};

export const TimeAccount: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TimeAccount size="small" color="success" />
				<Icons.TimeAccount />
				<Icons.TimeAccount size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TimeAccount size="small" color="success" />
				<Icons.TimeAccount />
				<Icons.TimeAccount size="large" color="error" />
			</div>
		</div>
	),
};

export const TimeEntryRequest: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TimeEntryRequest size="small" color="success" />
				<Icons.TimeEntryRequest />
				<Icons.TimeEntryRequest size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TimeEntryRequest size="small" color="success" />
				<Icons.TimeEntryRequest />
				<Icons.TimeEntryRequest size="large" color="error" />
			</div>
		</div>
	),
};

export const TimeOff: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TimeOff size="small" color="success" />
				<Icons.TimeOff />
				<Icons.TimeOff size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TimeOff size="small" color="success" />
				<Icons.TimeOff />
				<Icons.TimeOff size="large" color="error" />
			</div>
		</div>
	),
};

export const TimeOvertime: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TimeOvertime size="small" color="success" />
				<Icons.TimeOvertime />
				<Icons.TimeOvertime size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TimeOvertime size="small" color="success" />
				<Icons.TimeOvertime />
				<Icons.TimeOvertime size="large" color="error" />
			</div>
		</div>
	),
};

export const Timesheet: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Timesheet size="small" color="success" />
				<Icons.Timesheet />
				<Icons.Timesheet size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Timesheet size="small" color="success" />
				<Icons.Timesheet />
				<Icons.Timesheet size="large" color="error" />
			</div>
		</div>
	),
};

export const ToasterDown: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ToasterDown size="small" color="success" />
				<Icons.ToasterDown />
				<Icons.ToasterDown size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ToasterDown size="small" color="success" />
				<Icons.ToasterDown />
				<Icons.ToasterDown size="large" color="error" />
			</div>
		</div>
	),
};

export const ToasterTop: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ToasterTop size="small" color="success" />
				<Icons.ToasterTop />
				<Icons.ToasterTop size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ToasterTop size="small" color="success" />
				<Icons.ToasterTop />
				<Icons.ToasterTop size="large" color="error" />
			</div>
		</div>
	),
};

export const ToasterUp: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ToasterUp size="small" color="success" />
				<Icons.ToasterUp />
				<Icons.ToasterUp size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ToasterUp size="small" color="success" />
				<Icons.ToasterUp />
				<Icons.ToasterUp size="large" color="error" />
			</div>
		</div>
	),
};

export const ToBeReviewed: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ToBeReviewed size="small" color="success" />
				<Icons.ToBeReviewed />
				<Icons.ToBeReviewed size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ToBeReviewed size="small" color="success" />
				<Icons.ToBeReviewed />
				<Icons.ToBeReviewed size="large" color="error" />
			</div>
		</div>
	),
};

export const ToolsOpportunity: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ToolsOpportunity size="small" color="success" />
				<Icons.ToolsOpportunity />
				<Icons.ToolsOpportunity size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ToolsOpportunity size="small" color="success" />
				<Icons.ToolsOpportunity />
				<Icons.ToolsOpportunity size="large" color="error" />
			</div>
		</div>
	),
};

export const Touch: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Touch size="small" color="success" />
				<Icons.Touch />
				<Icons.Touch size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Touch size="small" color="success" />
				<Icons.Touch />
				<Icons.Touch size="large" color="error" />
			</div>
		</div>
	),
};

export const Translate: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Translate size="small" color="success" />
				<Icons.Translate />
				<Icons.Translate size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Translate size="small" color="success" />
				<Icons.Translate />
				<Icons.Translate size="large" color="error" />
			</div>
		</div>
	),
};

export const TravelExpense: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TravelExpense size="small" color="success" />
				<Icons.TravelExpense />
				<Icons.TravelExpense size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TravelExpense size="small" color="success" />
				<Icons.TravelExpense />
				<Icons.TravelExpense size="large" color="error" />
			</div>
		</div>
	),
};

export const TravelExpenseReport: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TravelExpenseReport size="small" color="success" />
				<Icons.TravelExpenseReport />
				<Icons.TravelExpenseReport size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TravelExpenseReport size="small" color="success" />
				<Icons.TravelExpenseReport />
				<Icons.TravelExpenseReport size="large" color="error" />
			</div>
		</div>
	),
};

export const TravelItinerary: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TravelItinerary size="small" color="success" />
				<Icons.TravelItinerary />
				<Icons.TravelItinerary size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TravelItinerary size="small" color="success" />
				<Icons.TravelItinerary />
				<Icons.TravelItinerary size="large" color="error" />
			</div>
		</div>
	),
};

export const TravelRequest: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TravelRequest size="small" color="success" />
				<Icons.TravelRequest />
				<Icons.TravelRequest size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TravelRequest size="small" color="success" />
				<Icons.TravelRequest />
				<Icons.TravelRequest size="large" color="error" />
			</div>
		</div>
	),
};

export const Tree: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Tree size="small" color="success" />
				<Icons.Tree />
				<Icons.Tree size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Tree size="small" color="success" />
				<Icons.Tree />
				<Icons.Tree size="large" color="error" />
			</div>
		</div>
	),
};

export const TrendDown: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TrendDown size="small" color="success" />
				<Icons.TrendDown />
				<Icons.TrendDown size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TrendDown size="small" color="success" />
				<Icons.TrendDown />
				<Icons.TrendDown size="large" color="error" />
			</div>
		</div>
	),
};

export const TrendUp: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TrendUp size="small" color="success" />
				<Icons.TrendUp />
				<Icons.TrendUp size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TrendUp size="small" color="success" />
				<Icons.TrendUp />
				<Icons.TrendUp size="large" color="error" />
			</div>
		</div>
	),
};

export const TripReport: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TripReport size="small" color="success" />
				<Icons.TripReport />
				<Icons.TripReport size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TripReport size="small" color="success" />
				<Icons.TripReport />
				<Icons.TripReport size="large" color="error" />
			</div>
		</div>
	),
};

export const TriState: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TriState size="small" color="success" />
				<Icons.TriState />
				<Icons.TriState size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TriState size="small" color="success" />
				<Icons.TriState />
				<Icons.TriState size="large" color="error" />
			</div>
		</div>
	),
};

export const TwoKeys: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.TwoKeys size="small" color="success" />
				<Icons.TwoKeys />
				<Icons.TwoKeys size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.TwoKeys size="small" color="success" />
				<Icons.TwoKeys />
				<Icons.TwoKeys size="large" color="error" />
			</div>
		</div>
	),
};

export const UiNotifications: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.UiNotifications size="small" color="success" />
				<Icons.UiNotifications />
				<Icons.UiNotifications size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.UiNotifications size="small" color="success" />
				<Icons.UiNotifications />
				<Icons.UiNotifications size="large" color="error" />
			</div>
		</div>
	),
};

export const Umbrella: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Umbrella size="small" color="success" />
				<Icons.Umbrella />
				<Icons.Umbrella size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Umbrella size="small" color="success" />
				<Icons.Umbrella />
				<Icons.Umbrella size="large" color="error" />
			</div>
		</div>
	),
};

export const UnderlineText: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.UnderlineText size="small" color="success" />
				<Icons.UnderlineText />
				<Icons.UnderlineText size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.UnderlineText size="small" color="success" />
				<Icons.UnderlineText />
				<Icons.UnderlineText size="large" color="error" />
			</div>
		</div>
	),
};

export const Undo: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Undo size="small" color="success" />
				<Icons.Undo />
				<Icons.Undo size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Undo size="small" color="success" />
				<Icons.Undo />
				<Icons.Undo size="large" color="error" />
			</div>
		</div>
	),
};

export const Unfavorite: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Unfavorite size="small" color="success" />
				<Icons.Unfavorite />
				<Icons.Unfavorite size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Unfavorite size="small" color="success" />
				<Icons.Unfavorite />
				<Icons.Unfavorite size="large" color="error" />
			</div>
		</div>
	),
};

export const Unlocked: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Unlocked size="small" color="success" />
				<Icons.Unlocked />
				<Icons.Unlocked size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Unlocked size="small" color="success" />
				<Icons.Unlocked />
				<Icons.Unlocked size="large" color="error" />
			</div>
		</div>
	),
};

export const UnpaidLeave: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.UnpaidLeave size="small" color="success" />
				<Icons.UnpaidLeave />
				<Icons.UnpaidLeave size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.UnpaidLeave size="small" color="success" />
				<Icons.UnpaidLeave />
				<Icons.UnpaidLeave size="large" color="error" />
			</div>
		</div>
	),
};

export const Unsynchronize: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Unsynchronize size="small" color="success" />
				<Icons.Unsynchronize />
				<Icons.Unsynchronize size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Unsynchronize size="small" color="success" />
				<Icons.Unsynchronize />
				<Icons.Unsynchronize size="large" color="error" />
			</div>
		</div>
	),
};

export const Unwired: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Unwired size="small" color="success" />
				<Icons.Unwired />
				<Icons.Unwired size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Unwired size="small" color="success" />
				<Icons.Unwired />
				<Icons.Unwired size="large" color="error" />
			</div>
		</div>
	),
};

export const Up: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Up size="small" color="success" />
				<Icons.Up />
				<Icons.Up size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Up size="small" color="success" />
				<Icons.Up />
				<Icons.Up size="large" color="error" />
			</div>
		</div>
	),
};

export const Upload: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Upload size="small" color="success" />
				<Icons.Upload />
				<Icons.Upload size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Upload size="small" color="success" />
				<Icons.Upload />
				<Icons.Upload size="large" color="error" />
			</div>
		</div>
	),
};

export const UploadToCloud: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.UploadToCloud size="small" color="success" />
				<Icons.UploadToCloud />
				<Icons.UploadToCloud size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.UploadToCloud size="small" color="success" />
				<Icons.UploadToCloud />
				<Icons.UploadToCloud size="large" color="error" />
			</div>
		</div>
	),
};

export const UpstackedChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.UpstackedChart size="small" color="success" />
				<Icons.UpstackedChart />
				<Icons.UpstackedChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.UpstackedChart size="small" color="success" />
				<Icons.UpstackedChart />
				<Icons.UpstackedChart size="large" color="error" />
			</div>
		</div>
	),
};

export const UserEdit: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.UserEdit size="small" color="success" />
				<Icons.UserEdit />
				<Icons.UserEdit size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.UserEdit size="small" color="success" />
				<Icons.UserEdit />
				<Icons.UserEdit size="large" color="error" />
			</div>
		</div>
	),
};

export const UserSettings: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.UserSettings size="small" color="success" />
				<Icons.UserSettings />
				<Icons.UserSettings size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.UserSettings size="small" color="success" />
				<Icons.UserSettings />
				<Icons.UserSettings size="large" color="error" />
			</div>
		</div>
	),
};

export const Validate: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Validate size="small" color="success" />
				<Icons.Validate />
				<Icons.Validate size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Validate size="small" color="success" />
				<Icons.Validate />
				<Icons.Validate size="large" color="error" />
			</div>
		</div>
	),
};

export const ValueHelp: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ValueHelp size="small" color="success" />
				<Icons.ValueHelp />
				<Icons.ValueHelp size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ValueHelp size="small" color="success" />
				<Icons.ValueHelp />
				<Icons.ValueHelp size="large" color="error" />
			</div>
		</div>
	),
};

export const VdsFile: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.VdsFile size="small" color="success" />
				<Icons.VdsFile />
				<Icons.VdsFile size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.VdsFile size="small" color="success" />
				<Icons.VdsFile />
				<Icons.VdsFile size="large" color="error" />
			</div>
		</div>
	),
};

export const VehicleRepair: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.VehicleRepair size="small" color="success" />
				<Icons.VehicleRepair />
				<Icons.VehicleRepair size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.VehicleRepair size="small" color="success" />
				<Icons.VehicleRepair />
				<Icons.VehicleRepair size="large" color="error" />
			</div>
		</div>
	),
};

export const Verified: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Verified size="small" color="success" />
				<Icons.Verified />
				<Icons.Verified size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Verified size="small" color="success" />
				<Icons.Verified />
				<Icons.Verified size="large" color="error" />
			</div>
		</div>
	),
};

export const VerticalBarChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.VerticalBarChart size="small" color="success" />
				<Icons.VerticalBarChart />
				<Icons.VerticalBarChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.VerticalBarChart size="small" color="success" />
				<Icons.VerticalBarChart />
				<Icons.VerticalBarChart size="large" color="error" />
			</div>
		</div>
	),
};

export const VerticalBarChart2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.VerticalBarChart2 size="small" color="success" />
				<Icons.VerticalBarChart2 />
				<Icons.VerticalBarChart2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.VerticalBarChart2 size="small" color="success" />
				<Icons.VerticalBarChart2 />
				<Icons.VerticalBarChart2 size="large" color="error" />
			</div>
		</div>
	),
};

export const VerticalBulletChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.VerticalBulletChart size="small" color="success" />
				<Icons.VerticalBulletChart />
				<Icons.VerticalBulletChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.VerticalBulletChart size="small" color="success" />
				<Icons.VerticalBulletChart />
				<Icons.VerticalBulletChart size="large" color="error" />
			</div>
		</div>
	),
};

export const VerticalGrip: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.VerticalGrip size="small" color="success" />
				<Icons.VerticalGrip />
				<Icons.VerticalGrip size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.VerticalGrip size="small" color="success" />
				<Icons.VerticalGrip />
				<Icons.VerticalGrip size="large" color="error" />
			</div>
		</div>
	),
};

export const VerticalStackedChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.VerticalStackedChart size="small" color="success" />
				<Icons.VerticalStackedChart />
				<Icons.VerticalStackedChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.VerticalStackedChart size="small" color="success" />
				<Icons.VerticalStackedChart />
				<Icons.VerticalStackedChart size="large" color="error" />
			</div>
		</div>
	),
};

export const VerticalWaterfallChart: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.VerticalWaterfallChart size="small" color="success" />
				<Icons.VerticalWaterfallChart />
				<Icons.VerticalWaterfallChart size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.VerticalWaterfallChart size="small" color="success" />
				<Icons.VerticalWaterfallChart />
				<Icons.VerticalWaterfallChart size="large" color="error" />
			</div>
		</div>
	),
};

export const Video: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Video size="small" color="success" />
				<Icons.Video />
				<Icons.Video size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Video size="small" color="success" />
				<Icons.Video />
				<Icons.Video size="large" color="error" />
			</div>
		</div>
	),
};

export const Visits: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Visits size="small" color="success" />
				<Icons.Visits />
				<Icons.Visits size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Visits size="small" color="success" />
				<Icons.Visits />
				<Icons.Visits size="large" color="error" />
			</div>
		</div>
	),
};

export const VrGlasses: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.VrGlasses size="small" color="success" />
				<Icons.VrGlasses />
				<Icons.VrGlasses size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.VrGlasses size="small" color="success" />
				<Icons.VrGlasses />
				<Icons.VrGlasses size="large" color="error" />
			</div>
		</div>
	),
};

export const Waiver: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Waiver size="small" color="success" />
				<Icons.Waiver />
				<Icons.Waiver size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Waiver size="small" color="success" />
				<Icons.Waiver />
				<Icons.Waiver size="large" color="error" />
			</div>
		</div>
	),
};

export const WalkMe: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.WalkMe size="small" color="success" />
				<Icons.WalkMe />
				<Icons.WalkMe size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.WalkMe size="small" color="success" />
				<Icons.WalkMe />
				<Icons.WalkMe size="large" color="error" />
			</div>
		</div>
	),
};

export const Wallet: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Wallet size="small" color="success" />
				<Icons.Wallet />
				<Icons.Wallet size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Wallet size="small" color="success" />
				<Icons.Wallet />
				<Icons.Wallet size="large" color="error" />
			</div>
		</div>
	),
};

export const Warning: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Warning size="small" color="success" />
				<Icons.Warning />
				<Icons.Warning size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Warning size="small" color="success" />
				<Icons.Warning />
				<Icons.Warning size="large" color="error" />
			</div>
		</div>
	),
};

export const Warning2: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Warning2 size="small" color="success" />
				<Icons.Warning2 />
				<Icons.Warning2 size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Warning2 size="small" color="success" />
				<Icons.Warning2 />
				<Icons.Warning2 size="large" color="error" />
			</div>
		</div>
	),
};

export const WashingMachine: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.WashingMachine size="small" color="success" />
				<Icons.WashingMachine />
				<Icons.WashingMachine size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.WashingMachine size="small" color="success" />
				<Icons.WashingMachine />
				<Icons.WashingMachine size="large" color="error" />
			</div>
		</div>
	),
};

export const WeatherProofing: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.WeatherProofing size="small" color="success" />
				<Icons.WeatherProofing />
				<Icons.WeatherProofing size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.WeatherProofing size="small" color="success" />
				<Icons.WeatherProofing />
				<Icons.WeatherProofing size="large" color="error" />
			</div>
		</div>
	),
};

export const WebCam: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.WebCam size="small" color="success" />
				<Icons.WebCam />
				<Icons.WebCam size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.WebCam size="small" color="success" />
				<Icons.WebCam />
				<Icons.WebCam size="large" color="error" />
			</div>
		</div>
	),
};

export const Widgets: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Widgets size="small" color="success" />
				<Icons.Widgets />
				<Icons.Widgets size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Widgets size="small" color="success" />
				<Icons.Widgets />
				<Icons.Widgets size="large" color="error" />
			</div>
		</div>
	),
};

export const WindowsDoors: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.WindowsDoors size="small" color="success" />
				<Icons.WindowsDoors />
				<Icons.WindowsDoors size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.WindowsDoors size="small" color="success" />
				<Icons.WindowsDoors />
				<Icons.WindowsDoors size="large" color="error" />
			</div>
		</div>
	),
};

export const WorkflowTasks: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.WorkflowTasks size="small" color="success" />
				<Icons.WorkflowTasks />
				<Icons.WorkflowTasks size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.WorkflowTasks size="small" color="success" />
				<Icons.WorkflowTasks />
				<Icons.WorkflowTasks size="large" color="error" />
			</div>
		</div>
	),
};

export const WorkHistory: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.WorkHistory size="small" color="success" />
				<Icons.WorkHistory />
				<Icons.WorkHistory size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.WorkHistory size="small" color="success" />
				<Icons.WorkHistory />
				<Icons.WorkHistory size="large" color="error" />
			</div>
		</div>
	),
};

export const World: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.World size="small" color="success" />
				<Icons.World />
				<Icons.World size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.World size="small" color="success" />
				<Icons.World />
				<Icons.World size="large" color="error" />
			</div>
		</div>
	),
};

export const WoundsDoc: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.WoundsDoc size="small" color="success" />
				<Icons.WoundsDoc />
				<Icons.WoundsDoc size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.WoundsDoc size="small" color="success" />
				<Icons.WoundsDoc />
				<Icons.WoundsDoc size="large" color="error" />
			</div>
		</div>
	),
};

export const Wrench: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Wrench size="small" color="success" />
				<Icons.Wrench />
				<Icons.Wrench size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Wrench size="small" color="success" />
				<Icons.Wrench />
				<Icons.Wrench size="large" color="error" />
			</div>
		</div>
	),
};

export const WriteNew: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.WriteNew size="small" color="success" />
				<Icons.WriteNew />
				<Icons.WriteNew size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.WriteNew size="small" color="success" />
				<Icons.WriteNew />
				<Icons.WriteNew size="large" color="error" />
			</div>
		</div>
	),
};

export const WriteNewDocument: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.WriteNewDocument size="small" color="success" />
				<Icons.WriteNewDocument />
				<Icons.WriteNewDocument size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.WriteNewDocument size="small" color="success" />
				<Icons.WriteNewDocument />
				<Icons.WriteNewDocument size="large" color="error" />
			</div>
		</div>
	),
};

export const XRay: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.XRay size="small" color="success" />
				<Icons.XRay />
				<Icons.XRay size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.XRay size="small" color="success" />
				<Icons.XRay />
				<Icons.XRay size="large" color="error" />
			</div>
		</div>
	),
};

export const ZoomIn: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ZoomIn size="small" color="success" />
				<Icons.ZoomIn />
				<Icons.ZoomIn size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ZoomIn size="small" color="success" />
				<Icons.ZoomIn />
				<Icons.ZoomIn size="large" color="error" />
			</div>
		</div>
	),
};

export const ZoomOut: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.ZoomOut size="small" color="success" />
				<Icons.ZoomOut />
				<Icons.ZoomOut size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.ZoomOut size="small" color="success" />
				<Icons.ZoomOut />
				<Icons.ZoomOut size="large" color="error" />
			</div>
		</div>
	),
};
