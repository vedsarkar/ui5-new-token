import {
	ArgTypes,
	Description as Desc,
	Stories,
	Subtitle,
	Title,
} from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react";
import type { IconProps } from "./Icon.types";
import { IconLibrary } from "./IconLibrary";
import { Accessibility as IconRef, iconMap } from "./index";
import styles from "./IconStories.module.css";

type StoryProps = IconProps & { name: string };

const meta: Meta<StoryProps> = {
	title: "Icons",
	component: IconRef as React.FC,
	argTypes: {
		color: {
			control: "select",
			options: [
				"inherited",
				"primary",
				"secondary",
				"success",
				"warning",
				"error",
			],
		},
	},
	parameters: {
		layout: "centered",
		docs: {
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Desc />
					<h3>Props</h3>
					<ArgTypes />
					<IconLibrary />
				</>
			),
		},
	},
	render: ({ name }) => {
		const Icon = iconMap[name];
		return (
			<div className={styles.story}>
				<Icon size="small" color="success" />
				<Icon />
				<Icon size="large" color="error" />
			</div>
		);
	},
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Accessibility: Story = { args: { name: "Accessibility" } };

export const AccessTime: Story = { args: { name: "AccessTime" } };

export const AccountCircle: Story = { args: { name: "AccountCircle" } };

export const AcessConversations: Story = {
	args: { name: "AcessConversations" },
};

export const ActionsMenu: Story = { args: { name: "ActionsMenu" } };

export const ActivateUser: Story = { args: { name: "ActivateUser" } };

export const Add: Story = { args: { name: "Add" } };

export const AddChild: Story = { args: { name: "AddChild" } };

export const AddCircle: Story = { args: { name: "AddCircle" } };

export const AddParent: Story = { args: { name: "AddParent" } };

export const AddSibling: Story = { args: { name: "AddSibling" } };

export const AdvancedProperties: Story = {
	args: { name: "AdvancedProperties" },
};

export const AdvancedPropertiesClear: Story = {
	args: { name: "AdvancedPropertiesClear" },
};

export const Analitycal: Story = { args: { name: "Analitycal" } };

export const ApiMonitor: Story = { args: { name: "ApiMonitor" } };

export const ApiPerformance: Story = { args: { name: "ApiPerformance" } };

export const ApiPerformanceStat: Story = {
	args: { name: "ApiPerformanceStat" },
};

export const Applications: Story = { args: { name: "Applications" } };

export const ArrowBack: Story = { args: { name: "ArrowBack" } };

export const ArrowDownward: Story = { args: { name: "ArrowDownward" } };

export const ArrowDropDown: Story = { args: { name: "ArrowDropDown" } };

export const ArrowDropUp: Story = { args: { name: "ArrowDropUp" } };

export const ArrowForward: Story = { args: { name: "ArrowForward" } };

export const ArrowLeft: Story = { args: { name: "ArrowLeft" } };

export const ArrowRight: Story = { args: { name: "ArrowRight" } };

export const ArrowUpward: Story = { args: { name: "ArrowUpward" } };

export const Attachment: Story = { args: { name: "Attachment" } };

export const Attribute: Story = { args: { name: "Attribute" } };

export const Back: Story = { args: { name: "Back" } };

export const Calendar: Story = { args: { name: "Calendar" } };

export const CalendarRange: Story = { args: { name: "CalendarRange" } };

export const CalendarToday: Story = { args: { name: "CalendarToday" } };

export const Cancel: Story = { args: { name: "Cancel" } };

export const Chat: Story = { args: { name: "Chat" } };

export const Check: Story = { args: { name: "Check" } };

export const Checkbox: Story = { args: { name: "Checkbox" } };

export const CheckboxFilled: Story = { args: { name: "CheckboxFilled" } };

export const CheckboxIndeterminate: Story = {
	args: { name: "CheckboxIndeterminate" },
};

export const CheckboxIndeterminateFilled: Story = {
	args: { name: "CheckboxIndeterminateFilled" },
};

export const CheckboxOutlined: Story = { args: { name: "CheckboxOutlined" } };

export const CheckCircle: Story = { args: { name: "CheckCircle" } };

export const ChevronLeft: Story = { args: { name: "ChevronLeft" } };

export const ChevronRight: Story = { args: { name: "ChevronRight" } };

export const Cleansing: Story = { args: { name: "Cleansing" } };

export const Close: Story = { args: { name: "Close" } };

export const Colapse: Story = { args: { name: "Colapse" } };

export const CollapseDrawer: Story = { args: { name: "CollapseDrawer" } };

export const Comment: Story = { args: { name: "Comment" } };

export const Comments: Story = { args: { name: "Comments" } };

export const ComplexAttribute: Story = { args: { name: "ComplexAttribute" } };

export const Consolidated: Story = { args: { name: "Consolidated" } };

export const ContentCopy: Story = { args: { name: "ContentCopy" } };

export const ContentPaste: Story = { args: { name: "ContentPaste" } };

export const ControlAttriibute: Story = { args: { name: "ControlAttriibute" } };

export const Copy: Story = { args: { name: "Copy" } };

export const CriticalError: Story = { args: { name: "CriticalError" } };

export const DashboardChart: Story = { args: { name: "DashboardChart" } };

export const DashboardGlobal: Story = { args: { name: "DashboardGlobal" } };

export const DataPrep: Story = { args: { name: "DataPrep" } };

export const DataUpload: Story = { args: { name: "DataUpload" } };

export const DcrComment: Story = { args: { name: "DcrComment" } };

export const DeactivateUser: Story = { args: { name: "DeactivateUser" } };

export const Delete: Story = { args: { name: "Delete" } };

export const DerivedAttribute: Story = { args: { name: "DerivedAttribute" } };

export const Description: Story = { args: { name: "Description" } };

export const DesignServices: Story = { args: { name: "DesignServices" } };

export const Dev: Story = { args: { name: "Dev" } };

export const Done: Story = { args: { name: "Done" } };

export const Down: Story = { args: { name: "Down" } };

export const Download: Story = { args: { name: "Download" } };

export const Draft: Story = { args: { name: "Draft" } };

export const Drag: Story = { args: { name: "Drag" } };

export const DragHoriz: Story = { args: { name: "DragHoriz" } };

export const DuplicateGroup: Story = { args: { name: "DuplicateGroup" } };

export const DuplicateJob: Story = { args: { name: "DuplicateJob" } };

export const DuplicateRole: Story = { args: { name: "DuplicateRole" } };

export const Duration: Story = { args: { name: "Duration" } };

export const Edit: Story = { args: { name: "Edit" } };

export const EditSchedule: Story = { args: { name: "EditSchedule" } };

export const Email: Story = { args: { name: "Email" } };

export const EndDate: Story = { args: { name: "EndDate" } };

export const EndDateFlag: Story = { args: { name: "EndDateFlag" } };

export const Error: Story = { args: { name: "Error" } };

export const ErrorCircle: Story = { args: { name: "ErrorCircle" } };

export const Event: Story = { args: { name: "Event" } };

export const Expand: Story = { args: { name: "Expand" } };

export const ExpandLess: Story = { args: { name: "ExpandLess" } };

export const ExpandMore: Story = { args: { name: "ExpandMore" } };

export const Explore: Story = { args: { name: "Explore" } };

export const Favorite: Story = { args: { name: "Favorite" } };

export const File: Story = { args: { name: "File" } };

export const FilterAdd: Story = { args: { name: "FilterAdd" } };

export const FilterClear: Story = { args: { name: "FilterClear" } };

export const FilterList: Story = { args: { name: "FilterList" } };

export const FilterSelect: Story = { args: { name: "FilterSelect" } };

export const FindMatch: Story = { args: { name: "FindMatch" } };

export const Flag: Story = { args: { name: "Flag" } };

export const Folder: Story = { args: { name: "Folder" } };

export const FolderOpen: Story = { args: { name: "FolderOpen" } };

export const FolderSelected: Story = { args: { name: "FolderSelected" } };

export const ForamteListNumbered: Story = {
	args: { name: "ForamteListNumbered" },
};

export const FormatBold: Story = { args: { name: "FormatBold" } };

export const FormateListPoints: Story = { args: { name: "FormateListPoints" } };

export const FormatItalics: Story = { args: { name: "FormatItalics" } };

export const FormatUnderline: Story = { args: { name: "FormatUnderline" } };

export const Fullscreen: Story = { args: { name: "Fullscreen" } };

export const FullscreenExit: Story = { args: { name: "FullscreenExit" } };

export const Group: Story = { args: { name: "Group" } };

export const Help: Story = { args: { name: "Help" } };

export const History: Story = { args: { name: "History" } };

export const Hyperink: Story = { args: { name: "Hyperink" } };

export const Indicator: Story = { args: { name: "Indicator" } };

export const Info: Story = { args: { name: "Info" } };

export const Inheritance: Story = { args: { name: "Inheritance" } };

export const KeyboardArrowDown: Story = { args: { name: "KeyboardArrowDown" } };

export const KeyboardArrowLeft: Story = { args: { name: "KeyboardArrowLeft" } };

export const KeyboardArrowRight: Story = {
	args: { name: "KeyboardArrowRight" },
};

export const KeyboardArrowUp: Story = { args: { name: "KeyboardArrowUp" } };

export const KeyId: Story = { args: { name: "KeyId" } };

export const Lightbulb: Story = { args: { name: "Lightbulb" } };

export const Link: Story = { args: { name: "Link" } };

export const LocationOn: Story = { args: { name: "LocationOn" } };

export const Lock: Story = { args: { name: "Lock" } };

export const LockOpen: Story = { args: { name: "LockOpen" } };

export const Login: Story = { args: { name: "Login" } };

export const Logout: Story = { args: { name: "Logout" } };

export const LookupType: Story = { args: { name: "LookupType" } };

export const LostMerge: Story = { args: { name: "LostMerge" } };

export const ManageAgent: Story = { args: { name: "ManageAgent" } };

export const MatchRule: Story = { args: { name: "MatchRule" } };

export const Menu: Story = { args: { name: "Menu" } };

export const Merge: Story = { args: { name: "Merge" } };

export const Mic: Story = { args: { name: "Mic" } };

export const MlModel: Story = { args: { name: "MlModel" } };

export const MoreHoriz: Story = { args: { name: "MoreHoriz" } };

export const MoreVert: Story = { args: { name: "MoreVert" } };

export const Move: Story = { args: { name: "Move" } };

export const NestedAttribute: Story = { args: { name: "NestedAttribute" } };

export const NetworkNode: Story = { args: { name: "NetworkNode" } };

export const Next: Story = { args: { name: "Next" } };

export const NotAMatch: Story = { args: { name: "NotAMatch" } };

export const NotificationManagement: Story = {
	args: { name: "NotificationManagement" },
};

export const Notifications: Story = { args: { name: "Notifications" } };

export const NotificationsActive: Story = {
	args: { name: "NotificationsActive" },
};

export const NotMatched: Story = { args: { name: "NotMatched" } };

export const NotMatchesSet: Story = { args: { name: "NotMatchesSet" } };

export const OpenDrawer: Story = { args: { name: "OpenDrawer" } };

export const OvMarker: Story = { args: { name: "OvMarker" } };

export const PasswordExpired: Story = { args: { name: "PasswordExpired" } };

export const Pause: Story = { args: { name: "Pause" } };

export const People: Story = { args: { name: "People" } };

export const PermIdentity: Story = { args: { name: "PermIdentity" } };

export const Person: Story = { args: { name: "Person" } };

export const Pin: Story = { args: { name: "Pin" } };

export const Play: Story = { args: { name: "Play" } };

export const Poll: Story = { args: { name: "Poll" } };

export const PotentialMatches: Story = { args: { name: "PotentialMatches" } };

export const Profile: Story = { args: { name: "Profile" } };

export const Profiles: Story = { args: { name: "Profiles" } };

export const QueryBuilder: Story = { args: { name: "QueryBuilder" } };

export const RadioChecked: Story = { args: { name: "RadioChecked" } };

export const RadioUnchecked: Story = { args: { name: "RadioUnchecked" } };

export const Recommend: Story = { args: { name: "Recommend" } };

export const Recommended: Story = { args: { name: "Recommended" } };

export const ReferenceProfile: Story = { args: { name: "ReferenceProfile" } };

export const Refresh: Story = { args: { name: "Refresh" } };

export const RefreshDate: Story = { args: { name: "RefreshDate" } };

export const RelationsView: Story = { args: { name: "RelationsView" } };

export const Remove: Story = { args: { name: "Remove" } };

export const RemoveCircle: Story = { args: { name: "RemoveCircle" } };

export const Replay: Story = { args: { name: "Replay" } };

export const Required: Story = { args: { name: "Required" } };

export const RequiredOff: Story = { args: { name: "RequiredOff" } };

export const Reset: Story = { args: { name: "Reset" } };

export const ResetPassword: Story = { args: { name: "ResetPassword" } };

export const ResizeFacetSize: Story = { args: { name: "ResizeFacetSize" } };

export const Resume: Story = { args: { name: "Resume" } };

export const Review: Story = { args: { name: "Review" } };

export const Roles: Story = { args: { name: "Roles" } };

export const Save: Story = { args: { name: "Save" } };

export const Scope: Story = { args: { name: "Scope" } };

export const Search: Story = { args: { name: "Search" } };

export const SearchConnections: Story = { args: { name: "SearchConnections" } };

export const SearchGlobal: Story = { args: { name: "SearchGlobal" } };

export const Segments: Story = { args: { name: "Segments" } };

export const SelectedNode: Story = { args: { name: "SelectedNode" } };

export const Send: Story = { args: { name: "Send" } };

export const Settings: Story = { args: { name: "Settings" } };

export const Share: Story = { args: { name: "Share" } };

export const ShoppingCart: Story = { args: { name: "ShoppingCart" } };

export const ShowGraph: Story = { args: { name: "ShowGraph" } };

export const ShowhideColumns: Story = { args: { name: "ShowhideColumns" } };

export const ShowPanel: Story = { args: { name: "ShowPanel" } };

export const SideNav: Story = { args: { name: "SideNav" } };

export const SimpleAttribute: Story = { args: { name: "SimpleAttribute" } };

export const Sort: Story = { args: { name: "Sort" } };

export const Sorting: Story = { args: { name: "Sorting" } };

export const Split: Story = { args: { name: "Split" } };

export const Star: Story = { args: { name: "Star" } };

export const StarSelected: Story = { args: { name: "StarSelected" } };

export const StartDate: Story = { args: { name: "StartDate" } };

export const StopJob: Story = { args: { name: "StopJob" } };

export const Style: Story = { args: { name: "Style" } };

export const Suggest: Story = { args: { name: "Suggest" } };

export const Survivorship: Story = { args: { name: "Survivorship" } };

export const Sync: Story = { args: { name: "Sync" } };

export const TaskList: Story = { args: { name: "TaskList" } };

export const ThumbDown: Story = { args: { name: "ThumbDown" } };

export const ThumbUp: Story = { args: { name: "ThumbUp" } };

export const Today: Story = { args: { name: "Today" } };

export const Training: Story = { args: { name: "Training" } };

export const TrainingBulb: Story = { args: { name: "TrainingBulb" } };

export const TrainingBulbReady: Story = { args: { name: "TrainingBulbReady" } };

export const TrainingContinue: Story = { args: { name: "TrainingContinue" } };

export const TrainingReady: Story = { args: { name: "TrainingReady" } };

export const Transform: Story = { args: { name: "Transform" } };

export const Tune: Story = { args: { name: "Tune" } };

export const Unmerge: Story = { args: { name: "Unmerge" } };

export const Unpublish: Story = { args: { name: "Unpublish" } };

export const Unshare: Story = { args: { name: "Unshare" } };

export const Up: Story = { args: { name: "Up" } };

export const Upload: Story = { args: { name: "Upload" } };

export const UsageApp: Story = { args: { name: "UsageApp" } };

export const Users: Story = { args: { name: "Users" } };

export const VerticalAlign: Story = { args: { name: "VerticalAlign" } };

export const ViewCards: Story = { args: { name: "ViewCards" } };

export const ViewChart: Story = { args: { name: "ViewChart" } };

export const ViewColumn: Story = { args: { name: "ViewColumn" } };

export const ViewHierarchy: Story = { args: { name: "ViewHierarchy" } };

export const ViewList: Story = { args: { name: "ViewList" } };

export const ViewMap: Story = { args: { name: "ViewMap" } };

export const ViewTable: Story = { args: { name: "ViewTable" } };

export const Visibility: Story = { args: { name: "Visibility" } };

export const VisibilityOff: Story = { args: { name: "VisibilityOff" } };

export const Warning: Story = { args: { name: "Warning" } };

export const Working: Story = { args: { name: "Working" } };
