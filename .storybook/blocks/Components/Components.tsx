import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import { useMemo, useState } from "react";
import {
	Icon,
	Input,
	Link,
	Option,
	SegmentedButton,
	SegmentedButtonItem,
	Select,
	Table,
	TableCell,
	TableHeaderCell,
	TableHeaderRow,
	TableRow,
	Tag,
	Text,
} from "@/components";
import styles from "./Components.module.css";
import type {
	ComponentEntry,
	Relationship,
	StatusFilter,
} from "./Components.types";
import data from "./components.json";

type TagDesign = "Positive" | "Neutral" | "Information";

const STATUS_BADGE: Record<Relationship, { label: string; design: TagDesign }> =
	{
		endorsed: { label: "Endorsed", design: "Positive" },
		backlog: { label: "Backlog", design: "Neutral" },
		excluded: { label: "Excluded", design: "Information" },
		"reltio-only": { label: "Reltio", design: "Positive" },
		"reltio-replacement": { label: "Reltio", design: "Positive" },
	};

const STATUS_FILTERS: StatusFilter[] = [
	"all",
	"endorsed",
	"backlog",
	"excluded",
	"reltio",
];

const STATUS_FILTER_LABEL: Record<StatusFilter, string> = {
	all: "All",
	endorsed: "Endorsed",
	backlog: "Backlog",
	excluded: "Excluded",
	reltio: "Reltio",
};

const filterGroup = (relationship: Relationship): StatusFilter =>
	relationship === "reltio-only" || relationship === "reltio-replacement"
		? "reltio"
		: relationship;

const components = data.components as ComponentEntry[];

export const Components = () => {
	const [status, setStatus] = useState<StatusFilter>("all");
	const [category, setCategory] = useState<string>("all");
	const [query, setQuery] = useState("");

	const categories = useMemo(
		() => [...new Set(components.map((c) => c.category))].sort(),
		[],
	);

	const visible = useMemo(() => {
		const q = query.trim().toLowerCase();
		return components.filter(
			(c) =>
				(status === "all" || filterGroup(c.relationship) === status) &&
				(category === "all" || c.category === category) &&
				(q === "" || c.name.toLowerCase().includes(q)),
		);
	}, [status, category, query]);

	const counts: Record<StatusFilter, number> = {
		all: data.totals.total,
		endorsed: data.totals.endorsed,
		backlog: data.totals.backlog,
		excluded: data.totals.excluded,
		reltio: data.totals.reltio,
	};

	return (
		<div className={styles.root}>
			<div className={styles.toolbar}>
				<SegmentedButton
					accessibleName="Filter by status"
					onSelectionChange={(e) => {
						const selected = e.detail.selectedItems[0];
						const next = selected?.dataset.status as StatusFilter | undefined;
						if (next) {
							setStatus(next);
						}
					}}
				>
					{STATUS_FILTERS.map((s) => (
						<SegmentedButtonItem
							key={s}
							data-status={s}
							selected={status === s}
						>
							{STATUS_FILTER_LABEL[s]} ({counts[s]})
						</SegmentedButtonItem>
					))}
				</SegmentedButton>
				<div className={styles.filters}>
					<Select
						accessibleName="Filter by category"
						onChange={(e) => {
							setCategory(e.detail.selectedOption.dataset.value ?? "all");
						}}
					>
						<Option data-value="all" selected={category === "all"}>
							All categories
						</Option>
						{categories.map((c) => (
							<Option key={c} data-value={c} selected={category === c}>
								{c}
							</Option>
						))}
					</Select>
					<Input
						className={styles.search}
						icon={<Icon name="search" />}
						placeholder="Search component…"
						value={query}
						onInput={(e) => setQuery(e.target.value)}
						accessibleName="Search component by name"
					/>
				</div>
			</div>

			<Text className={styles.resultCount}>
				Showing {visible.length} of {components.length} components
			</Text>

			<Table
				className={styles.table}
				noDataText="No components match the current filters."
			>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell>
						<span>Component</span>
					</TableHeaderCell>
					<TableHeaderCell>
						<span>Category</span>
					</TableHeaderCell>
					<TableHeaderCell>
						<span>Status</span>
					</TableHeaderCell>
					<TableHeaderCell>
						<span>UI5 React</span>
					</TableHeaderCell>
					<TableHeaderCell>
						<span>Reltio Design</span>
					</TableHeaderCell>
				</TableHeaderRow>
				{visible.map((c) => (
					<TableRow key={c.name} rowKey={c.name}>
						<TableCell>
							<Text className={styles.name}>{c.name}</Text>
						</TableCell>
						<TableCell>{c.category}</TableCell>
						<TableCell>
							{c.relationship === "excluded" && c.note ? (
								<span className={styles.tooltipAnchor} title={c.note}>
									<Tag design={STATUS_BADGE[c.relationship].design}>
										{STATUS_BADGE[c.relationship].label}
									</Tag>
								</span>
							) : (
								<Tag design={STATUS_BADGE[c.relationship].design}>
									{STATUS_BADGE[c.relationship].label}
								</Tag>
							)}
						</TableCell>
						<TableCell>
							{c.ui5 === null ? (
								<Text className={styles.muted}>—</Text>
							) : c.ui5.status === "deprecated" ? (
								<span className={styles.ui5Cell}>
									<Icon name="alert" className={styles.deprecatedIcon} />
									<Link href={c.ui5.url} target="_blank" design="Subtle">
										Deprecated
									</Link>
								</span>
							) : (
								<Link href={c.ui5.url} target="_blank">
									Docs
								</Link>
							)}
						</TableCell>
						<TableCell>
							{c.reltio === null ? (
								<Text className={styles.muted}>—</Text>
							) : (
								<span className={styles.reltioCell}>
									{c.reltio.mode === "wrapper" ||
									c.reltio.mode === "renamed" ? (
										<Tag design="Information" size="S">
											{c.reltio.mode}
										</Tag>
									) : null}
									{c.reltio.url ? <Link href={c.reltio.url}>View</Link> : null}
								</span>
							)}
						</TableCell>
					</TableRow>
				))}
			</Table>
		</div>
	);
};
