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
export { Avatar } from "@ui5/webcomponents-react/Avatar";
export { Bar } from "@ui5/webcomponents-react/Bar";
export { BusyIndicator } from "@ui5/webcomponents-react/BusyIndicator";
export { Button } from "@ui5/webcomponents-react/Button";
export { Calendar } from "@ui5/webcomponents-react/Calendar";
export { CalendarDate } from "@ui5/webcomponents-react/CalendarDate";
export { CalendarDateRange } from "@ui5/webcomponents-react/CalendarDateRange";
export { CalendarLegend } from "@ui5/webcomponents-react/CalendarLegend";
export { CalendarLegendItem } from "@ui5/webcomponents-react/CalendarLegendItem";
export { CheckBox } from "@ui5/webcomponents-react/CheckBox";
export { ComboBox } from "@ui5/webcomponents-react/ComboBox";
export { ComboBoxItem } from "@ui5/webcomponents-react/ComboBoxItem";
export { ComboBoxItemGroup } from "@ui5/webcomponents-react/ComboBoxItemGroup";
export { DatePicker } from "@ui5/webcomponents-react/DatePicker";
export { DateRangePicker } from "@ui5/webcomponents-react/DateRangePicker";
export { DateTimePicker } from "@ui5/webcomponents-react/DateTimePicker";
export { Dialog } from "@ui5/webcomponents-react/Dialog";
export { DynamicDateRange } from "@ui5/webcomponents-react/DynamicDateRange";
export { FileUploader } from "@ui5/webcomponents-react/FileUploader";
export { Icon } from "@ui5/webcomponents-react/Icon";
export { IllustratedMessage } from "@ui5/webcomponents-react/IllustratedMessage";
export { Input } from "@ui5/webcomponents-react/Input";
export { Label } from "@ui5/webcomponents-react/Label";
export { List } from "@ui5/webcomponents-react/List";
export { ListItemGroup } from "@ui5/webcomponents-react/ListItemGroup";
// Reltio endorses a single `ListItem` (SAP Fiori `ListItemStandard`) as the
// canonical list-row entity, customised via props and children. UI5's
// `ListItemCustom` is intentionally NOT endorsed — one obvious item entity
// over the Standard/Custom split. See `components/ListItem/README.md`.
export { ListItemStandard as ListItem } from "@ui5/webcomponents-react/ListItemStandard";
export { MessageStrip } from "@ui5/webcomponents-react/MessageStrip";
export { MultiComboBox } from "@ui5/webcomponents-react/MultiComboBox";
export { MultiComboBoxItem } from "@ui5/webcomponents-react/MultiComboBoxItem";
export { MultiComboBoxItemGroup } from "@ui5/webcomponents-react/MultiComboBoxItemGroup";
export { MultiInput } from "@ui5/webcomponents-react/MultiInput";
export { Option } from "@ui5/webcomponents-react/Option";
export { OptionCustom } from "@ui5/webcomponents-react/OptionCustom";
export { Panel } from "@ui5/webcomponents-react/Panel";
export { Popover } from "@ui5/webcomponents-react/Popover";
export { ProgressIndicator } from "@ui5/webcomponents-react/ProgressIndicator";
export { RadioButton } from "@ui5/webcomponents-react/RadioButton";
export { RangeSlider } from "@ui5/webcomponents-react/RangeSlider";
export { ResponsivePopover } from "@ui5/webcomponents-react/ResponsivePopover";
export { SegmentedButton } from "@ui5/webcomponents-react/SegmentedButton";
export { SegmentedButtonItem } from "@ui5/webcomponents-react/SegmentedButtonItem";
export { Select } from "@ui5/webcomponents-react/Select";
export { ShellBarBranding } from "@ui5/webcomponents-react/ShellBarBranding";
export { ShellBarItem } from "@ui5/webcomponents-react/ShellBarItem";
export { ShellBarSearch } from "@ui5/webcomponents-react/ShellBarSearch";
export { Slider } from "@ui5/webcomponents-react/Slider";
export { SpecialCalendarDate } from "@ui5/webcomponents-react/SpecialCalendarDate";
export { SplitButton } from "@ui5/webcomponents-react/SplitButton";
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
export { TimePicker } from "@ui5/webcomponents-react/TimePicker";
export { Toast } from "@ui5/webcomponents-react/Toast";
export { Token } from "@ui5/webcomponents-react/Token";
// `Tree` is a 1:1 UI5 re-export. Its node entity is the Reltio `TreeItem`
// wrapper (exported from the Reltio section below), which collapses UI5's
// `TreeItem` / `TreeItemCustom` split into one `content`-based entity.
export { Tree } from "@ui5/webcomponents-react/Tree";
export { Wizard } from "@ui5/webcomponents-react/Wizard";
export { WizardStep } from "@ui5/webcomponents-react/WizardStep";

// Reltio business components & primitives.
export * from "./AppSelector";
export * from "./Chat";
export * from "./Details";
export * from "./ErrorBoundary";
// `Form` is a thin Reltio wrapper (not a 1:1 re-export): it renders the UI5
// Form floorplan inside a native `<form>` and adds an `onSubmit(formData)`
// callback that serializes the form-associated UI5 fields. `FormGroup` and
// `FormItem` remain 1:1 UI5 re-exports. See `components/Form/README.md`.
export * from "./Form";
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
