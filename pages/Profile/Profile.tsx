import { Avatar } from "@ui5/webcomponents-react/Avatar";
import { Button } from "@ui5/webcomponents-react/Button";
import { Icon } from "@ui5/webcomponents-react/Icon";
import { Input } from "@ui5/webcomponents-react/Input";
import { Link } from "@ui5/webcomponents-react/Link";
import { MessageStrip } from "@ui5/webcomponents-react/MessageStrip";
import { ShellBarItem } from "@ui5/webcomponents-react/ShellBarItem";
import { Tab } from "@ui5/webcomponents-react/Tab";
import { TabContainer } from "@ui5/webcomponents-react/TabContainer";
import { Tag } from "@ui5/webcomponents-react/Tag";
import type { ReactNode } from "react";
import { FileTree } from "@/components/FileTree";
import { ShellBar } from "@/components/ShellBar";
import { UserMenu } from "@/components/UserMenu";
import appointmentIcon from "@/icons/sap/appointment-2";
import barChartIcon from "@/icons/sap/bar-chart";
import bellIcon from "@/icons/sap/bell";
import buildingIcon from "@/icons/sap/building";
import discussionIcon from "@/icons/sap/discussion";
import documentIcon from "@/icons/sap/document";
import downloadIcon from "@/icons/sap/download";
import employeeIcon from "@/icons/sap/employee";
import filterIcon from "@/icons/sap/filter";
import historyIcon from "@/icons/sap/history";
import informationIcon from "@/icons/sap/information";
import listIcon from "@/icons/sap/list";
import overflowIcon from "@/icons/sap/overflow";
import searchIcon from "@/icons/sap/search";
import showIcon from "@/icons/sap/show";
import slimArrowDownIcon from "@/icons/sap/slim-arrow-down";
import slimArrowLeftIcon from "@/icons/sap/slim-arrow-left";
import slimArrowRightIcon from "@/icons/sap/slim-arrow-right";
import sourceCodeIcon from "@/icons/sap/source-code";
import sysHelpIcon from "@/icons/sap/sys-help";
import { classNames } from "@/utils/classNames";

import styles from "./Profile.module.css";
import type { ProfileProps } from "./Profile.types";
import {
	attributes,
	potentialMatches,
	relations,
	reportingHierarchy,
	reportingPath,
} from "./profileData";

/** The collapsed product rail down the left edge. */
const IconRail = () => (
	<nav aria-label="Product navigation" className={classNames(styles.iconRail)}>
		<span className={classNames(styles.railLogo)}>
			<Icon name={sourceCodeIcon} style={{ width: 24, height: 24 }} />
		</span>
		{[
			{ icon: discussionIcon, label: "Conversations", selected: true },
			{ icon: historyIcon, label: "Discover", selected: false },
			{ icon: listIcon, label: "Spaces", selected: false },
			{ icon: barChartIcon, label: "Analytics", selected: false },
			{ icon: sourceCodeIcon, label: "Develop", selected: false },
		].map((item) => (
			<button
				aria-current={item.selected ? "page" : undefined}
				aria-label={item.label}
				className={classNames(
					styles.railItem,
					item.selected && styles.railItemSelected,
				)}
				key={item.label}
				type="button"
			>
				<Icon name={item.icon} style={{ width: 20, height: 20 }} />
			</button>
		))}
	</nav>
);

/** The action rail down the right edge. */
const ActionRail = () => (
	<div className={classNames(styles.actionRail)}>
		{[
			{ icon: downloadIcon, label: "Export" },
			{ icon: discussionIcon, label: "Comments" },
			{ icon: historyIcon, label: "History" },
			{ icon: documentIcon, label: "Documents" },
		].map((item) => (
			<Button
				accessibleName={item.label}
				design="Transparent"
				icon={item.icon}
				key={item.label}
			/>
		))}
	</div>
);

/**
 * A content panel: the tool header the design repeats above every card, with
 * the card's own body below it.
 */
const PanelCard = ({
	title,
	icon,
	children,
	flexible = false,
	flush = false,
}: {
	title: string;
	icon: string;
	children: ReactNode;
	flexible?: boolean;
	flush?: boolean;
}) => (
	<section
		className={classNames(styles.card, flexible && styles.cardFlexible)}
		aria-label={title}
	>
		<header className={classNames(styles.cardHeader)}>
			<span className={classNames(styles.cardHeaderIcon)}>
				<Icon name={icon} style={{ width: 20, height: 20 }} />
			</span>
			<span className={classNames(styles.cardTitle)}>{title}</span>
			<Button accessibleName="Search" design="Transparent" icon={searchIcon} />
			<Button accessibleName="Filter" design="Transparent" icon={filterIcon} />
			<Button
				accessibleName="More actions"
				design="Transparent"
				icon={overflowIcon}
			/>
		</header>
		<div className={classNames(styles.cardBody, flush && styles.cardBodyFlush)}>
			{children}
		</div>
	</section>
);

const user = {
	username: "Sam Dover",
	email: "sam.dover@reltio.com",
};

/** The Reltio profile screen — entity header, warnings, and the analysis panels. */
export const Profile = ({ className, ...rest }: ProfileProps) => (
	<div className={classNames(styles.screen, className)} {...rest}>
		<ShellBar
			primaryTitle="RELTIO Product Identifier"
			searchField={
				<Input icon={<Icon name={searchIcon} />} placeholder="Search" />
			}
			tenantSelector={
				<Button
					design="Transparent"
					endIcon={slimArrowDownIcon}
					icon={buildingIcon}
				>
					Tenant environment
				</Button>
			}
			userMenu={
				<UserMenu appVersion="1.0.0" onSignOut={() => {}} user={user} />
			}
		>
			<ShellBarItem icon={bellIcon} text="Notifications" />
			<ShellBarItem icon={sysHelpIcon} text="Help" />
			<ShellBarItem icon={overflowIcon} text="More" />
		</ShellBar>

		<div className={classNames(styles.body)}>
			<IconRail />

			<div className={classNames(styles.main)}>
				<TabContainer>
					{[
						"Profile",
						"Relationships",
						"Potential Matches",
						"Interactions",
						"Hierarchy",
						"Graph",
						"Sources",
					].map((label, index) => (
						<Tab
							items={<Tab text={`All ${label}`} />}
							key={label}
							selected={index === 0}
							text={label}
						/>
					))}
				</TabContainer>

				<div className={classNames(styles.workspace)}>
					<div className={classNames(styles.content)}>
						<header className={classNames(styles.banner)}>
							<div className={classNames(styles.identity)}>
								<Avatar colorScheme="Accent6" initials="SD" size="M" />
								<div className={classNames(styles.identityText)}>
									<span className={classNames(styles.entityName)}>
										Glucofast Tablet Strip (SKU-3001)
									</span>
									<span className={classNames(styles.entityMeta)}>
										<Tag design="Set1" colorScheme="6">
											Product
										</Tag>
										Entity ID: RkOkDcc
									</span>
								</div>
							</div>
							<div className={classNames(styles.bannerActions)}>
								<span className={classNames(styles.searchCount)}>
									22 Search results
								</span>
								<Button
									accessibleName="Previous result"
									design="Transparent"
									icon={slimArrowLeftIcon}
								/>
								<Button
									accessibleName="Next result"
									design="Transparent"
									icon={slimArrowRightIcon}
								/>
								<Button endIcon={slimArrowDownIcon} icon={showIcon}>
									Viewing
								</Button>
							</div>
						</header>

						<div className={classNames(styles.strip)}>
							<MessageStrip design="Critical">
								You have 2 warnings. <Link href="#">Learn More</Link>
							</MessageStrip>
						</div>

						<div className={classNames(styles.grid)}>
							<div className={classNames(styles.column)}>
								<PanelCard
									flexible
									flush
									icon={listIcon}
									title="Attributes View"
								>
									<FileTree
										className={classNames(styles.flushTree)}
										defaultExpandedIds={[
											"address",
											"street-group",
											"country-group",
											"phone",
										]}
										items={attributes}
									/>
								</PanelCard>
							</div>

							<div className={classNames(styles.column)}>
								<PanelCard
									flexible
									flush
									icon={listIcon}
									title="Reporting Hierarchy"
								>
									<div className={classNames(styles.filterRow)}>
										<Input
											icon={<Icon name={appointmentIcon} />}
											placeholder="e.g. Dec 31, 2023"
											style={{ width: "100%" }}
										/>
									</div>
									<FileTree
										className={classNames(styles.flushTree)}
										defaultExpandedIds={[
											"gladys",
											"kris-1",
											"donette",
											"james",
											"graciela",
										]}
										items={reportingHierarchy}
									/>
								</PanelCard>
								<PanelCard flush icon={listIcon} title="Potential Match">
									<div className={classNames(styles.filterRow)}>
										<Input
											icon={<Icon name={appointmentIcon} />}
											placeholder="e.g. Dec 31, 2023"
											style={{ width: "100%" }}
										/>
									</div>
									<FileTree
										className={classNames(styles.flushTree)}
										defaultExpandedIds={["pm-graciela"]}
										items={potentialMatches}
									/>
								</PanelCard>
							</div>

							<div className={classNames(styles.column)}>
								<PanelCard
									flexible
									flush
									icon={listIcon}
									title="Reporting Hierarchy Path"
								>
									<ol className={classNames(styles.pathList)}>
										{reportingPath.map((entry) => (
											<li key={`${entry.label}-${entry.depth}`}>
												<div
													className={classNames(styles.pathRow)}
													style={{ paddingLeft: 8 + entry.depth * 20 }}
												>
													<span className={classNames(styles.pathIcon)}>
														<Icon
															name={employeeIcon}
															style={{ width: 14, height: 14 }}
														/>
													</span>
													{entry.link ? (
														<Link href="#">{entry.label}</Link>
													) : (
														<span>{entry.label}</span>
													)}
												</div>
											</li>
										))}
									</ol>
								</PanelCard>
								<PanelCard flush icon={listIcon} title="Relations">
									<div style={{ padding: 8 }}>
										{relations.map((relation) => (
											<div
												className={classNames(styles.relationRow)}
												key={relation.name}
											>
												<span className={classNames(styles.pathIcon)}>
													<Icon
														name={employeeIcon}
														style={{ width: 14, height: 14 }}
													/>
												</span>
												<span className={classNames(styles.relationRole)}>
													<Link href="#">{relation.name}</Link>, {relation.role}
												</span>
												<span className={classNames(styles.relationInfo)}>
													<Icon
														name={informationIcon}
														style={{ width: 16, height: 16 }}
													/>
												</span>
											</div>
										))}
									</div>
								</PanelCard>
							</div>
						</div>
					</div>

					<ActionRail />
				</div>
			</div>
		</div>
	</div>
);
