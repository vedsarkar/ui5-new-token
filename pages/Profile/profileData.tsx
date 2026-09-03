import { Icon } from "@ui5/webcomponents-react/Icon";
import type { ReactNode } from "react";
import type { FileTreeNode } from "@/components/FileTree";
import employeeIcon from "@/icons/sap/employee";
import { classNames } from "@/utils/classNames";

import styles from "./Profile.module.css";

/** Sample content for the Profile screen. Illustrative only — not real data. */

const Count = ({ children }: { children: ReactNode }) => (
	<span className={classNames(styles.countBadge)}>{children}</span>
);

const person = <Icon name={employeeIcon} style={{ width: 14, height: 14 }} />;

/** A hierarchy row: person glyph, name, and an optional direct-report count. */
const node = (
	id: string,
	name: string,
	count?: number,
	children?: FileTreeNode[],
): FileTreeNode => ({
	id,
	name,
	icon: person,
	...(count === undefined ? {} : { endContent: <Count>{count}</Count> }),
	...(children ? { children } : {}),
});

/** An attribute row: muted field name beside its value. */
const attr = (id: string, label: string, value?: string): FileTreeNode => ({
	id,
	name: (
		<>
			<span className={classNames(styles.attrLabel)}>{label}</span>
			{value ? (
				<span className={classNames(styles.attrValue)}>{value}</span>
			) : null}
		</>
	),
});

export const attributes: FileTreeNode[] = [
	attr("full-name", "Full Name", "Kris Marrier"),
	attr("name", "Name", "Kris"),
	attr("last-name", "Last Name", "Marrier"),
	{
		id: "address",
		name: <span className={classNames(styles.attrLabel)}>Address</span>,
		children: [
			{
				id: "street-group",
				name: (
					<span className={classNames(styles.attrValue)}>
						228 Runamuck Pl #2808, Baltimore, MD,, US
					</span>
				),
				children: [
					attr("street", "Street", "228 Runamuck Pl #2808"),
					attr("house-number", "House Number", "228"),
					attr("unit", "Unit", "#2808"),
					attr("street-name", "Street Name", "Runamuck Pl"),
				],
			},
			attr("city", "City", "Baltimore"),
			attr("state", "State", "MD"),
			attr("postal", "Postal Code", "21201"),
			{
				id: "country-group",
				name: (
					<>
						<span className={classNames(styles.attrLabel)}>Country</span>
						<span className={classNames(styles.attrValue)}>US</span>
					</>
				),
				children: [
					attr("country-code", "Country Code", "US"),
					attr("country-name", "Country Name", "United States"),
				],
			},
		],
	},
	{
		id: "phone",
		name: <span className={classNames(styles.attrLabel)}>Phone</span>,
		children: [
			attr("number", "Number", "*******8723"),
			attr("phone-country", "Country Code", "US"),
			attr("formatted", "Formatted Number", "**********8723"),
		],
	},
];

export const reportingHierarchy: FileTreeNode[] = [
	node("gladys", "Gladys Rim", 1, [
		node("kris-1", "Kris Marrier", 2, [
			node("donette", "Donette Foller", 1, [
				node("james", "James Butt", 4, [
					node("art", "Art Venere", 1),
					node("graciela", "Graciela Ruta", 2, [
						node("kris-2", "Kris Marrier", 4),
						node("sage", "Sage Wieser", 1, [node("abel", "Abel Maclead", 1)]),
					]),
				]),
				node("mattie", "Mattie Poquette"),
				node("meaghan", "Meaghan Garufi", 2),
			]),
		]),
		node("jack", "Jack"),
	]),
];

export const potentialMatches: FileTreeNode[] = [
	node("pm-graciela", "Graciela Ruta", undefined, [
		node("pm-kris", "Kris Marrier"),
	]),
];

/** The path list is flat with an explicit depth, since it numbers its roots. */
export const reportingPath: {
	label: string;
	depth: number;
	link?: boolean;
}[] = [
	{ label: "1. Kiley Caldarera", depth: 0 },
	{ label: "Kris Marrier", depth: 1, link: true },
	{ label: "2. Gladys Rim", depth: 0 },
	{ label: "Kris Marrier", depth: 1, link: true },
	{ label: "3. Minna Amigon", depth: 0 },
	{ label: "James Butt", depth: 1 },
	{ label: "Graciela Ruta", depth: 2 },
	{ label: "Kris Marrier", depth: 3, link: true },
	{ label: "4. Donette Foller", depth: 0 },
	{ label: "James Butt", depth: 1 },
	{ label: "Graciela Ruta", depth: 2 },
	{ label: "Kris Marrier", depth: 3, link: true },
	{ label: "5. Lenna Paprocki", depth: 0 },
];

export const relations: { name: string; role: string }[] = [
	{ name: "Gladys Rim", role: "Reportee" },
	{ name: "Graciela Ruta", role: "Reportee" },
	{ name: "Kiley Caldarera", role: "Reportee" },
	{ name: "Rudy Inc", role: "employs" },
];
