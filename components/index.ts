// Endorsed SAP Fiori (UI5) components — the curated surface re-exported
// from `@reltio/design` for every Reltio application. Mirrored here so
// in-monorepo code reaching for them via `@/components` sees the same
// surface the published package exposes. Direct `@ui5/webcomponents-react/X`
// imports remain available inside the monorepo for component authors that
// build Reltio wrappers on top of UI5 (see `components/AGENTS.md`).
//
// `ProductSwitch` and `ProductSwitchItem` are intentionally NOT endorsed:
// the Reltio `AppSelector` business component (re-exported below) is the
// canonical app navigator across every Reltio product and supersedes them.
export { ActionSheet } from "@ui5/webcomponents-react/ActionSheet";
export { Avatar } from "@ui5/webcomponents-react/Avatar";
export { AvatarBadge } from "@ui5/webcomponents-react/AvatarBadge";
export { AvatarGroup } from "@ui5/webcomponents-react/AvatarGroup";
export { Bar } from "@ui5/webcomponents-react/Bar";
export { Breadcrumbs } from "@ui5/webcomponents-react/Breadcrumbs";
export { BreadcrumbsItem } from "@ui5/webcomponents-react/BreadcrumbsItem";
export { BusyIndicator } from "@ui5/webcomponents-react/BusyIndicator";
export { Button } from "@ui5/webcomponents-react/Button";
export { ButtonBadge } from "@ui5/webcomponents-react/ButtonBadge";
export { Calendar } from "@ui5/webcomponents-react/Calendar";
export { CalendarDate } from "@ui5/webcomponents-react/CalendarDate";
export { CalendarDateRange } from "@ui5/webcomponents-react/CalendarDateRange";
export { CalendarLegend } from "@ui5/webcomponents-react/CalendarLegend";
export { CalendarLegendItem } from "@ui5/webcomponents-react/CalendarLegendItem";
export { Card } from "@ui5/webcomponents-react/Card";
export { CardHeader } from "@ui5/webcomponents-react/CardHeader";
export { Carousel } from "@ui5/webcomponents-react/Carousel";
export { CheckBox } from "@ui5/webcomponents-react/CheckBox";
export { ColorPalette } from "@ui5/webcomponents-react/ColorPalette";
export { ColorPaletteItem } from "@ui5/webcomponents-react/ColorPaletteItem";
export { ColorPalettePopover } from "@ui5/webcomponents-react/ColorPalettePopover";
export { ColorPicker } from "@ui5/webcomponents-react/ColorPicker";
export { ComboBox } from "@ui5/webcomponents-react/ComboBox";
export { ComboBoxItem } from "@ui5/webcomponents-react/ComboBoxItem";
export { ComboBoxItemGroup } from "@ui5/webcomponents-react/ComboBoxItemGroup";
export { DatePicker } from "@ui5/webcomponents-react/DatePicker";
export { DateRangePicker } from "@ui5/webcomponents-react/DateRangePicker";
export { DateTimePicker } from "@ui5/webcomponents-react/DateTimePicker";
export { Dialog } from "@ui5/webcomponents-react/Dialog";
export { DynamicDateRange } from "@ui5/webcomponents-react/DynamicDateRange";
export { DynamicSideContent } from "@ui5/webcomponents-react/DynamicSideContent";
export { ExpandableText } from "@ui5/webcomponents-react/ExpandableText";
export { FileUploader } from "@ui5/webcomponents-react/FileUploader";
export { FlexBox } from "@ui5/webcomponents-react/FlexBox";
export { Grid } from "@ui5/webcomponents-react/Grid";
export { Icon } from "@ui5/webcomponents-react/Icon";
export { IllustratedMessage } from "@ui5/webcomponents-react/IllustratedMessage";
export { Input } from "@ui5/webcomponents-react/Input";
export { Label } from "@ui5/webcomponents-react/Label";
export { Link } from "@ui5/webcomponents-react/Link";
export { List } from "@ui5/webcomponents-react/List";
export { ListItemGroup } from "@ui5/webcomponents-react/ListItemGroup";
// Reltio endorses a single `ListItem` (SAP Fiori `ListItemStandard`) as the
// canonical list-row entity, customised via props and children. UI5's
// `ListItemCustom` is intentionally NOT endorsed — one obvious item entity
// over the Standard/Custom split. See `components/ListItem/README.md`.
export { ListItemStandard as ListItem } from "@ui5/webcomponents-react/ListItemStandard";
export { MediaGallery } from "@ui5/webcomponents-react/MediaGallery";
export { MediaGalleryItem } from "@ui5/webcomponents-react/MediaGalleryItem";
export { Menu } from "@ui5/webcomponents-react/Menu";
export { MenuItem } from "@ui5/webcomponents-react/MenuItem";
export { MenuItemGroup } from "@ui5/webcomponents-react/MenuItemGroup";
export { MenuSeparator } from "@ui5/webcomponents-react/MenuSeparator";
export { MessageBox } from "@ui5/webcomponents-react/MessageBox";
export { MessageItem } from "@ui5/webcomponents-react/MessageItem";
export { MessageStrip } from "@ui5/webcomponents-react/MessageStrip";
export { MessageView } from "@ui5/webcomponents-react/MessageView";
export { MessageViewButton } from "@ui5/webcomponents-react/MessageViewButton";
export { MultiComboBox } from "@ui5/webcomponents-react/MultiComboBox";
export { MultiComboBoxItem } from "@ui5/webcomponents-react/MultiComboBoxItem";
export { MultiComboBoxItemGroup } from "@ui5/webcomponents-react/MultiComboBoxItemGroup";
export { MultiInput } from "@ui5/webcomponents-react/MultiInput";
export { NotificationList } from "@ui5/webcomponents-react/NotificationList";
export { NotificationListGroupItem } from "@ui5/webcomponents-react/NotificationListGroupItem";
export { NotificationListItem } from "@ui5/webcomponents-react/NotificationListItem";
export { NumericSideIndicator } from "@ui5/webcomponents-react/NumericSideIndicator";
export { ObjectStatus } from "@ui5/webcomponents-react/ObjectStatus";
export { Option } from "@ui5/webcomponents-react/Option";
export { OptionCustom } from "@ui5/webcomponents-react/OptionCustom";
export { Page } from "@ui5/webcomponents-react/Page";
export { Panel } from "@ui5/webcomponents-react/Panel";
export { Popover } from "@ui5/webcomponents-react/Popover";
export { ProgressIndicator } from "@ui5/webcomponents-react/ProgressIndicator";
export { RadioButton } from "@ui5/webcomponents-react/RadioButton";
export { RangeSlider } from "@ui5/webcomponents-react/RangeSlider";
export { RatingIndicator } from "@ui5/webcomponents-react/RatingIndicator";
export { ResponsivePopover } from "@ui5/webcomponents-react/ResponsivePopover";
export { SegmentedButton } from "@ui5/webcomponents-react/SegmentedButton";
export { SegmentedButtonItem } from "@ui5/webcomponents-react/SegmentedButtonItem";
export { Select } from "@ui5/webcomponents-react/Select";
export { SelectDialog } from "@ui5/webcomponents-react/SelectDialog";
export { ShellBarItem } from "@ui5/webcomponents-react/ShellBarItem";
export { ShellBarSpacer } from "@ui5/webcomponents-react/ShellBarSpacer";
export { Slider } from "@ui5/webcomponents-react/Slider";
export { SpecialCalendarDate } from "@ui5/webcomponents-react/SpecialCalendarDate";
export { SplitButton } from "@ui5/webcomponents-react/SplitButton";
export { SplitterElement } from "@ui5/webcomponents-react/SplitterElement";
export { SplitterLayout } from "@ui5/webcomponents-react/SplitterLayout";
export { StepInput } from "@ui5/webcomponents-react/StepInput";
export { SuggestionItem } from "@ui5/webcomponents-react/SuggestionItem";
export { SuggestionItemCustom } from "@ui5/webcomponents-react/SuggestionItemCustom";
export { SuggestionItemGroup } from "@ui5/webcomponents-react/SuggestionItemGroup";
export { Switch } from "@ui5/webcomponents-react/Switch";
export { Tab } from "@ui5/webcomponents-react/Tab";
export { TabContainer } from "@ui5/webcomponents-react/TabContainer";
export { Table } from "@ui5/webcomponents-react/Table";
export { TableCell } from "@ui5/webcomponents-react/TableCell";
export { TableGrowing } from "@ui5/webcomponents-react/TableGrowing";
export { TableHeaderCell } from "@ui5/webcomponents-react/TableHeaderCell";
export { TableHeaderRow } from "@ui5/webcomponents-react/TableHeaderRow";
export { TableRow } from "@ui5/webcomponents-react/TableRow";
export { TableRowAction } from "@ui5/webcomponents-react/TableRowAction";
export { TableSelectionMulti } from "@ui5/webcomponents-react/TableSelectionMulti";
export { TableSelectionSingle } from "@ui5/webcomponents-react/TableSelectionSingle";
export { TabSeparator } from "@ui5/webcomponents-react/TabSeparator";
export { Tag } from "@ui5/webcomponents-react/Tag";
export { Text } from "@ui5/webcomponents-react/Text";
export { Timeline } from "@ui5/webcomponents-react/Timeline";
export { TimelineGroupItem } from "@ui5/webcomponents-react/TimelineGroupItem";
export { TimelineItem } from "@ui5/webcomponents-react/TimelineItem";
export { TimePicker } from "@ui5/webcomponents-react/TimePicker";
export { Title } from "@ui5/webcomponents-react/Title";
export { Toast } from "@ui5/webcomponents-react/Toast";
export { ToggleButton } from "@ui5/webcomponents-react/ToggleButton";
export { Token } from "@ui5/webcomponents-react/Token";
export { Toolbar } from "@ui5/webcomponents-react/Toolbar";
export { ToolbarButton } from "@ui5/webcomponents-react/ToolbarButton";
export { ToolbarItem } from "@ui5/webcomponents-react/ToolbarItem";
export { ToolbarSelect } from "@ui5/webcomponents-react/ToolbarSelect";
export { ToolbarSelectOption } from "@ui5/webcomponents-react/ToolbarSelectOption";
export { ToolbarSeparator } from "@ui5/webcomponents-react/ToolbarSeparator";
export { ToolbarSpacer } from "@ui5/webcomponents-react/ToolbarSpacer";
// `Tree` is a 1:1 UI5 re-export. Its node entity is the Reltio `TreeItem`
// wrapper (exported from the Reltio section below), which collapses UI5's
// `TreeItem` / `TreeItemCustom` split into one `content`-based entity.
export { Tree } from "@ui5/webcomponents-react/Tree";
export { UploadCollection } from "@ui5/webcomponents-react/UploadCollection";
export { UploadCollectionItem } from "@ui5/webcomponents-react/UploadCollectionItem";
export { UserMenuItem } from "@ui5/webcomponents-react/UserMenuItem";
export { UserMenuItemGroup } from "@ui5/webcomponents-react/UserMenuItemGroup";
export { Wizard } from "@ui5/webcomponents-react/Wizard";
export { WizardStep } from "@ui5/webcomponents-react/WizardStep";
// Reltio business components & primitives.
export * from "./AppNavigation";
export * from "./AppSelector";
export * from "./Chat";
export * from "./Details";
export * from "./ErrorBoundary";
// `Form` is a thin Reltio wrapper (not a 1:1 re-export): it renders the UI5
// Form floorplan inside a native `<form>` and adds an `onSubmit(formData)`
// callback that serializes the form-associated UI5 fields. `FormGroup` and
// `FormItem` remain 1:1 UI5 re-exports. See `components/Form/README.md`.
export * from "./Form";
export type { IconProps } from "./Icon/Icon.types";
export * from "./Markdown";
export * from "./ShellBar";
export * from "./SideNavigation";
export * from "./SideNavigationGroup";
export * from "./SideNavigationItem";
export * from "./SideNavigationSubItem";
export * from "./Skeleton";
export * from "./TenantSelector";
export * from "./TextArea";
export * from "./TreeItem";
export * from "./UserMenu";
