import {
	Alert,
	Calendar,
	Cart,
	Employee,
	ErrorCircle,
	Filter,
	Globe,
	Group,
	Heart,
	History,
	Home,
	Settings,
	SysEnter,
} from "@reltio/design/icons";
import type React from "react";
import { fn } from "storybook/test";
import preview from "@/.storybook/preview";
import { Badge } from "../Badge";
import { Tabs } from "./Tabs";
import cssClasses from "./Tabs.module.css";

const defaultItems = [
	{ value: "tab1", label: "First Tab" },
	{ value: "tab2", label: "Second Tab" },
	{ value: "tab3", label: "Third Tab" },
];

const meta = preview.meta({
	component: Tabs,
	parameters: {
		layout: "padded",
		cssClasses,
	},
	args: {
		items: defaultItems,
		onValueChange: fn(),
	},
});

// --- Inline Mode (text only) ---

export const Default = meta.story({
	args: {
		items: defaultItems,
	},
});

export const WithSelectedTab = meta.story({
	args: {
		items: defaultItems,
		value: "tab2",
	},
});

export const WithDisabledTab = meta.story({
	args: {
		value: "tab1",
		items: [
			{ value: "tab1", label: "Enabled" },
			{ value: "tab2", label: "Disabled", disabled: true },
			{ value: "tab3", label: "Also Enabled" },
		],
	},
});

export const ManyTabs = meta.story({
	args: {
		value: "data-share",
		items: [
			{ value: "data-share", label: "Data Share" },
			{ value: "zero-copy", label: "Zero Copy" },
			{ value: "pipelines", label: "Data Pipelines" },
			{ value: "auth", label: "Authentication Methods" },
			{ value: "settings", label: "Settings" },
			{ value: "monitoring", label: "Monitoring" },
			{ value: "logs", label: "Logs" },
		],
	},
});

// --- Semantic colors (inline) ---

export const SemanticColors = meta.story({
	args: {
		value: "tab1",
		items: [
			{ value: "tab1", label: "Tab Text" },
			{
				value: "tab2",
				label: (
					<span style={{ color: "var(--sapTab_Positive_TextColor)" }}>
						Tab Text
					</span>
				),
			},
			{
				value: "tab3",
				label: (
					<span style={{ color: "var(--sapTab_Critical_TextColor)" }}>
						Tab Text
					</span>
				),
			},
			{
				value: "tab4",
				label: (
					<span style={{ color: "var(--sapTab_Negative_TextColor)" }}>
						Tab Text
					</span>
				),
			},
			{
				value: "tab5",
				label: (
					<span style={{ color: "var(--sapTab_Neutral_TextColor)" }}>
						Tab Text
					</span>
				),
			},
		],
	},
});

// --- Icon only ---

export const IconOnly = meta.story({
	args: {
		value: "home",
		items: [
			{ value: "home", label: <Home /> },
			{ value: "calendar", label: <Calendar /> },
			{ value: "employee", label: <Employee /> },
			{ value: "settings", label: <Settings /> },
		],
	},
});

// --- Icon + Text ---

export const IconAndText = meta.story({
	args: {
		value: "home",
		items: [
			{
				value: "home",
				label: (
					<>
						<Home size="small" /> Home
					</>
				),
			},
			{
				value: "history",
				label: (
					<>
						<History size="small" /> History
					</>
				),
			},
			{
				value: "favorites",
				label: (
					<>
						<Heart size="small" /> Favorites
					</>
				),
			},
			{
				value: "globe",
				label: (
					<>
						<Globe size="small" /> Global
					</>
				),
			},
		],
	},
});

// --- With badges (count indicators) ---

export const WithBadges = meta.story({
	args: {
		value: "inbox",
		items: [
			{
				value: "inbox",
				label: (
					<>
						Inbox <Badge content={12} />
					</>
				),
			},
			{
				value: "drafts",
				label: (
					<>
						Drafts <Badge content={3} />
					</>
				),
			},
			{ value: "sent", label: "Sent" },
			{
				value: "spam",
				label: (
					<>
						Spam <Badge content={99} color="error" />
					</>
				),
			},
		],
	},
});

// --- Process tabs (numbered steps) ---

export const ProcessTabs = meta.story({
	args: {
		value: "step2",
		items: [
			{
				value: "step1",
				label: (
					<>
						<span
							style={{
								display: "inline-flex",
								alignItems: "center",
								justifyContent: "center",
								width: 20,
								height: 20,
								borderRadius: "50%",
								background: "var(--sapTab_ForegroundColor)",
								color: "var(--sapTab_Selected_IconColor)",
								fontSize: 12,
								fontWeight: 700,
							}}
						>
							1
						</span>
						Products
					</>
				),
			},
			{
				value: "step2",
				label: (
					<>
						<span
							style={{
								display: "inline-flex",
								alignItems: "center",
								justifyContent: "center",
								width: 20,
								height: 20,
								borderRadius: "50%",
								background: "var(--sapTab_ForegroundColor)",
								color: "var(--sapTab_Selected_IconColor)",
								fontSize: 12,
								fontWeight: 700,
							}}
						>
							2
						</span>
						Shipping
					</>
				),
			},
			{
				value: "step3",
				label: (
					<>
						<span
							style={{
								display: "inline-flex",
								alignItems: "center",
								justifyContent: "center",
								width: 20,
								height: 20,
								borderRadius: "50%",
								background: "var(--sapTab_Neutral_ForegroundColor)",
								color: "var(--sapTab_Selected_IconColor)",
								fontSize: 12,
								fontWeight: 700,
							}}
						>
							3
						</span>
						Payment
					</>
				),
			},
		],
	},
});

// --- Filter tabs (icon + text + count) ---

export const FilterTabs = meta.story({
	args: {
		value: "all",
		items: [
			{
				value: "all",
				label: (
					<>
						<Filter size="small" /> All Items
					</>
				),
			},
			{
				value: "products",
				label: (
					<>
						<Cart size="small" /> Products
					</>
				),
			},
			{
				value: "services",
				label: (
					<>
						<Settings size="small" /> Services
					</>
				),
			},
		],
	},
});

// --- Filter Tabs Semantic (complex: count header + icon avatars + status icons) ---

const iconAvatarStyle = (borderColor: string): React.CSSProperties => ({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: 36,
	height: 36,
	borderRadius: "100px",
	border: `2px solid ${borderColor}`,
	background: "var(--sapTab_Background)",
	boxSizing: "border-box",
	flexShrink: 0,
});

const filterTabTextStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	gap: 4,
	fontSize: 12,
	alignItems: "flex-start",
};

const FilterTabItem = ({
	icon,
	borderColor,
	count,
	label,
	statusIcon,
}: {
	icon: React.ReactNode;
	borderColor: string;
	count: string;
	label: string;
	statusIcon?: React.ReactNode;
}) => (
	<div style={{ display: "flex", alignItems: "center", gap: 8, height: 60 }}>
		<div style={iconAvatarStyle(borderColor)}>{icon}</div>
		<div style={filterTabTextStyle}>
			<span style={{ color: "var(--sapContent_LabelColor)", fontWeight: 400 }}>
				{count}
			</span>
			<span
				style={{
					display: "flex",
					alignItems: "center",
					gap: 8,
					color: "var(--sapTextColor)",
					fontWeight: 700,
				}}
			>
				{statusIcon}
				{label}
			</span>
		</div>
	</div>
);

export const FilterTabsSemantic = meta.story({
	args: {
		value: "products",
		items: [
			{
				value: "products",
				label: (
					<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
						<span
							style={{
								fontSize: 24,
								fontWeight: 700,
								color: "var(--sapTextColor)",
							}}
						>
							123
						</span>
						<span
							style={{
								fontSize: 12,
								color: "var(--sapTextColor)",
							}}
						>
							Products
						</span>
					</div>
				),
			},
			{
				value: "tab1",
				label: (
					<FilterTabItem
						icon={<Group />}
						borderColor="var(--sapNeutralElementColor)"
						count="53 of 123"
						label="Tab Text"
					/>
				),
			},
			{
				value: "tab2",
				label: (
					<FilterTabItem
						icon={<Group />}
						borderColor="var(--sapTab_Positive_ForegroundColor)"
						count="53 of 123"
						label="Tab Text"
						statusIcon={
							<SysEnter
								size="small"
								style={{ color: "var(--sapTab_Positive_ForegroundColor)" }}
							/>
						}
					/>
				),
			},
			{
				value: "tab3",
				label: (
					<FilterTabItem
						icon={<Group />}
						borderColor="var(--sapTab_Negative_ForegroundColor)"
						count="53 of 123"
						label="Tab Text"
						statusIcon={
							<ErrorCircle
								size="small"
								style={{ color: "var(--sapTab_Negative_ForegroundColor)" }}
							/>
						}
					/>
				),
			},
			{
				value: "tab4",
				label: (
					<FilterTabItem
						icon={<Group />}
						borderColor="var(--sapTab_Critical_ForegroundColor)"
						count="53 of 123"
						label="Tab Text"
						statusIcon={
							<Alert
								size="small"
								style={{ color: "var(--sapTab_Critical_ForegroundColor)" }}
							/>
						}
					/>
				),
			},
			{
				value: "tab5",
				label: (
					<FilterTabItem
						icon={<Group />}
						borderColor="var(--sapNeutralElementColor)"
						count="53 of 123"
						label="Tab Text"
					/>
				),
			},
			{
				value: "tab6",
				label: (
					<FilterTabItem
						icon={<Group />}
						borderColor="var(--sapTab_Positive_ForegroundColor)"
						count="53 of 123"
						label="Tab Text"
						statusIcon={
							<SysEnter
								size="small"
								style={{ color: "var(--sapTab_Positive_ForegroundColor)" }}
							/>
						}
					/>
				),
			},
		],
	},
});
