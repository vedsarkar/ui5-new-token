import { Bar } from "@ui5/webcomponents-react/Bar";
import { Button } from "@ui5/webcomponents-react/Button";
import { ButtonBadge } from "@ui5/webcomponents-react/ButtonBadge";
import { Dialog } from "@ui5/webcomponents-react/Dialog";
import { Icon } from "@ui5/webcomponents-react/Icon";
import { IllustratedMessage } from "@ui5/webcomponents-react/IllustratedMessage";
import type { InputDomRef } from "@ui5/webcomponents-react/Input";
import { Input } from "@ui5/webcomponents-react/Input";
import { Option } from "@ui5/webcomponents-react/Option";
import { Popover } from "@ui5/webcomponents-react/Popover";
import { Select } from "@ui5/webcomponents-react/Select";
import { Table } from "@ui5/webcomponents-react/Table";
import { TableCell } from "@ui5/webcomponents-react/TableCell";
import { TableHeaderCell } from "@ui5/webcomponents-react/TableHeaderCell";
import { TableHeaderRow } from "@ui5/webcomponents-react/TableHeaderRow";
import { TableRow } from "@ui5/webcomponents-react/TableRow";
import {
	cloneElement,
	isValidElement,
	type ReactNode,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import buildingIcon from "@/icons/sap/building";
import filterIcon from "@/icons/sap/filter";
import searchIcon from "@/icons/sap/search";
import slimArrowDownIcon from "@/icons/sap/slim-arrow-down";
import { classNames } from "@/utils/classNames";
import styles from "./TenantSelector.module.css";
import type { TenantEntry, TenantSelectorProps } from "./TenantSelector.types";
import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js";
import "@ui5/webcomponents-fiori/dist/illustrations/NoEntries.js";

type ColumnKey = keyof TenantEntry;
type SortDirection = "Ascending" | "Descending";

const COLUMNS: { key: ColumnKey; label: string }[] = [
	{ key: "customerName", label: "Customer name" },
	{ key: "tenantName", label: "Tenant name" },
	{ key: "tenantId", label: "Tenant ID" },
	{ key: "environment", label: "Environment" },
];

const ALL_CUSTOMERS = "All customers";
const ALL_ENVIRONMENTS = "All environments";

/** Collision-safe row id — plain concatenation of tenantId+environment can collide
 * (e.g. "ab"+"cdef" vs "abc"+"def"). */
const tenantRowKey = ({
	tenantId,
	environment,
}: Pick<TenantEntry, "tenantId" | "environment">) =>
	JSON.stringify([tenantId, environment]);

/** Tenant picker for the Reltio header — a trigger label that opens a searchable, filterable, sortable dialog of available tenants. */
export const TenantSelector = ({
	tenants,
	selectedTenantId,
	selectedEnvironment,
	onSelect,
	trigger,
	loading,
	className,
	...rest
}: TenantSelectorProps) => {
	const filterId = useId();
	const searchRef = useRef<InputDomRef>(null);
	const [open, setOpen] = useState(false);
	const [searchExpanded, setSearchExpanded] = useState(false);
	const [query, setQuery] = useState("");
	const [filterOpen, setFilterOpen] = useState(false);
	const [customerFilter, setCustomerFilter] = useState("");
	const [environmentFilter, setEnvironmentFilter] = useState("");
	const [sortColumn, setSortColumn] = useState<ColumnKey>("customerName");
	const [sortDirection, setSortDirection] =
		useState<SortDirection>("Ascending");

	useEffect(() => {
		if (searchExpanded) {
			searchRef.current?.focus();
		}
	}, [searchExpanded]);

	const selectedTenant = tenants.find(
		(tenant) =>
			tenant.tenantId === selectedTenantId &&
			(selectedEnvironment == null ||
				tenant.environment === selectedEnvironment),
	);
	const triggerLabel = selectedTenant
		? `${selectedTenant.customerName} - ${selectedTenant.tenantName} - ${selectedTenant.environment}`
		: "Select tenant";

	const customers = useMemo(
		() =>
			Array.from(new Set(tenants.map((tenant) => tenant.customerName))).sort(
				(a, b) => a.localeCompare(b),
			),
		[tenants],
	);
	const environments = useMemo(
		() =>
			Array.from(new Set(tenants.map((tenant) => tenant.environment))).sort(
				(a, b) => a.localeCompare(b),
			),
		[tenants],
	);

	const visibleTenants = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		const filtered = tenants.filter((tenant) => {
			const matchesQuery =
				!normalizedQuery ||
				COLUMNS.some((column) =>
					tenant[column.key].toLowerCase().includes(normalizedQuery),
				);
			const matchesCustomer =
				!customerFilter || tenant.customerName === customerFilter;
			const matchesEnvironment =
				!environmentFilter || tenant.environment === environmentFilter;
			return matchesQuery && matchesCustomer && matchesEnvironment;
		});
		const direction = sortDirection === "Ascending" ? 1 : -1;
		return [...filtered].sort(
			(a, b) =>
				a[sortColumn].localeCompare(b[sortColumn], undefined, {
					sensitivity: "base",
				}) * direction,
		);
	}, [
		tenants,
		query,
		customerFilter,
		environmentFilter,
		sortColumn,
		sortDirection,
	]);

	const sortBy = (key: ColumnKey) => {
		if (key === sortColumn) {
			setSortDirection((current) =>
				current === "Ascending" ? "Descending" : "Ascending",
			);
			return;
		}
		setSortColumn(key);
		setSortDirection("Ascending");
	};

	const close = () => {
		setOpen(false);
		setSearchExpanded(false);
		setQuery("");
		setFilterOpen(false);
		setCustomerFilter("");
		setEnvironmentFilter("");
		setSortColumn("customerName");
		setSortDirection("Ascending");
	};

	const hasTenants = tenants.length > 0;
	const activeFilterCount = [customerFilter, environmentFilter].filter(
		Boolean,
	).length;
	const filtersApplied = activeFilterCount > 0;

	const openDialog = () => setOpen(true);

	const defaultTrigger = (
		<Button
			design="Transparent"
			className={classNames(styles.trigger)}
			icon={buildingIcon}
			endIcon={slimArrowDownIcon}
			tooltip={triggerLabel}
			loading={loading}
			loadingDelay={0}
			accessibilityAttributes={{ hasPopup: "dialog" }}
		>
			{triggerLabel}
		</Button>
	);

	const triggerNode = trigger ?? defaultTrigger;
	const renderedTrigger = isValidElement<{
		onClick?: (event: unknown) => void;
	}>(triggerNode)
		? cloneElement(triggerNode, {
				onClick: (event: unknown) => {
					triggerNode.props.onClick?.(event);
					openDialog();
				},
			})
		: triggerNode;

	let dialogBody: ReactNode;
	if (!hasTenants) {
		dialogBody = (
			<div className={classNames(styles.empty)}>
				<IllustratedMessage
					name="NoEntries"
					titleText="No tenants available"
					subtitleText="There are no tenants to choose from."
				/>
			</div>
		);
	} else if (visibleTenants.length === 0) {
		dialogBody = (
			<div className={classNames(styles.empty)}>
				<IllustratedMessage
					name="NoData"
					titleText="No tenants match your search"
					subtitleText="Try a different search term or adjust the filters."
				/>
			</div>
		);
	} else {
		dialogBody = (
			<Table
				className={classNames(styles.table)}
				onRowClick={(event) => {
					const tenant = visibleTenants.find(
						(entry) => tenantRowKey(entry) === event.detail.row.rowKey,
					);
					if (tenant) {
						onSelect(tenant);
						close();
					}
				}}
			>
				<TableHeaderRow slot="headerRow" sticky>
					{COLUMNS.map((column) => (
						<TableHeaderCell
							key={column.key}
							sortIndicator={sortColumn === column.key ? sortDirection : "None"}
							onClick={() => sortBy(column.key)}
						>
							{column.label}
						</TableHeaderCell>
					))}
				</TableHeaderRow>
				{visibleTenants.map((tenant) => (
					<TableRow
						key={tenantRowKey(tenant)}
						rowKey={tenantRowKey(tenant)}
						interactive
						className={classNames(
							selectedTenant != null &&
								tenant.tenantId === selectedTenant.tenantId &&
								tenant.environment === selectedTenant.environment &&
								styles.selectedRow,
						)}
					>
						<TableCell>{tenant.customerName}</TableCell>
						<TableCell>{tenant.tenantName}</TableCell>
						<TableCell>{tenant.tenantId}</TableCell>
						<TableCell>{tenant.environment}</TableCell>
					</TableRow>
				))}
			</Table>
		);
	}

	return (
		<div className={classNames(styles.root, className)} {...rest}>
			{renderedTrigger}
			<Dialog
				open={open}
				className={classNames(styles.dialog)}
				onClose={close}
				header={
					<Bar
						design="Header"
						startContent={
							<span className={classNames(styles.dialogTitle)}>
								Select tenant
							</span>
						}
						endContent={
							hasTenants ? (
								<>
									{searchExpanded ? (
										<Input
											ref={searchRef}
											className={classNames(styles.search)}
											value={query}
											placeholder="Search tenants"
											showClearIcon
											icon={<Icon name={searchIcon} />}
											onInput={(event) => setQuery(event.target.value)}
											onBlur={() => {
												if (!query.trim()) {
													setSearchExpanded(false);
												}
											}}
										/>
									) : (
										<Button
											design="Transparent"
											icon={searchIcon}
											accessibleName="Search tenants"
											onClick={() => setSearchExpanded(true)}
										/>
									)}
									<Button
										id={filterId}
										design="Transparent"
										icon={filterIcon}
										accessibleName={
											filtersApplied
												? "Filter tenants (filters applied)"
												: "Filter tenants"
										}
										badge={
											filtersApplied ? (
												<ButtonBadge
													design="InlineText"
													text={String(activeFilterCount)}
												/>
											) : undefined
										}
										onClick={() => setFilterOpen((value) => !value)}
									/>
								</>
							) : undefined
						}
					/>
				}
				footer={
					<Bar
						design="Footer"
						endContent={
							<Button design="Transparent" onClick={close}>
								Cancel
							</Button>
						}
					/>
				}
			>
				{dialogBody}
				<Popover
					opener={filterId}
					open={filterOpen}
					placement="Bottom"
					onClose={() => setFilterOpen(false)}
				>
					<div className={classNames(styles.filterMenu)}>
						<div className={classNames(styles.filterField)}>
							<span className={classNames(styles.filterLabel)}>Customer</span>
							<Select
								onChange={(event) => {
									const value = (
										event.detail.selectedOption?.textContent ?? ""
									).trim();
									setCustomerFilter(value === ALL_CUSTOMERS ? "" : value);
								}}
							>
								<Option selected={!customerFilter}>{ALL_CUSTOMERS}</Option>
								{customers.map((customer) => (
									<Option key={customer} selected={customerFilter === customer}>
										{customer}
									</Option>
								))}
							</Select>
						</div>
						<div className={classNames(styles.filterField)}>
							<span className={classNames(styles.filterLabel)}>
								Environment
							</span>
							<Select
								onChange={(event) => {
									const value = (
										event.detail.selectedOption?.textContent ?? ""
									).trim();
									setEnvironmentFilter(value === ALL_ENVIRONMENTS ? "" : value);
								}}
							>
								<Option selected={!environmentFilter}>
									{ALL_ENVIRONMENTS}
								</Option>
								{environments.map((environment) => (
									<Option
										key={environment}
										selected={environmentFilter === environment}
									>
										{environment}
									</Option>
								))}
							</Select>
						</div>
						<Button
							design="Transparent"
							className={classNames(styles.clearFilter)}
							onClick={() => {
								setCustomerFilter("");
								setEnvironmentFilter("");
							}}
						>
							Clear filter
						</Button>
					</div>
				</Popover>
			</Dialog>
		</div>
	);
};
