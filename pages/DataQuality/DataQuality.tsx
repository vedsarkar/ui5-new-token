import { Button } from "@ui5/webcomponents-react/Button";
import { Icon } from "@ui5/webcomponents-react/Icon";
import { IllustratedMessage } from "@ui5/webcomponents-react/IllustratedMessage";
import { Input } from "@ui5/webcomponents-react/Input";
import { MessageStrip } from "@ui5/webcomponents-react/MessageStrip";
import { ShellBarItem } from "@ui5/webcomponents-react/ShellBarItem";
import type { ReactNode } from "react";
import { BarChart } from "@/charts";
import { ShellBar } from "@/components/ShellBar";
import { UserMenu } from "@/components/UserMenu";
import bellIcon from "@/icons/sap/bell";
import buildingIcon from "@/icons/sap/building";
import contactsIcon from "@/icons/sap/contacts";
import filterIcon from "@/icons/sap/filter";
import informationIcon from "@/icons/sap/information";
import overflowIcon from "@/icons/sap/overflow";
import refreshIcon from "@/icons/sap/refresh";
import searchIcon from "@/icons/sap/search";
import slimArrowDownIcon from "@/icons/sap/slim-arrow-down";
import slimArrowRightIcon from "@/icons/sap/slim-arrow-right";
import sysHelpIcon from "@/icons/sap/sys-help";
import { classNames } from "@/utils/classNames";
// UI5 loads illustrations on demand, so the one this screen uses is registered
// explicitly — without this the component renders an error rather than art.
import "@ui5/webcomponents-fiori/dist/illustrations/NoSearchResults.js";
import {
	pageChromeStyles as chrome,
	IconRail,
	PanelCard,
} from "../shared/PageChrome";

import styles from "./DataQuality.module.css";
import type { DataQualityProps } from "./DataQuality.types";
import {
	attributeGroups,
	attributes,
	consolidationSeries,
	kpis,
	sourceProfiles,
	sourceSystems,
	user,
} from "./dataQualityData";

/** The three-dot action every card in this screen carries. */
const CardActions = ({ withInfo = false }: { withInfo?: boolean }) => (
	<>
		{withInfo ? (
			<Button
				accessibleName="About this card"
				design="Transparent"
				icon={informationIcon}
			/>
		) : null}
		<Button
			accessibleName="More actions"
			design="Transparent"
			icon={overflowIcon}
		/>
	</>
);

/** A completeness track: how much of the attribute is populated. */
const Completeness = ({ filled }: { filled: number }) => (
	<div className={classNames(styles.completeness)}>
		<span
			className={classNames(styles.completenessFilled)}
			style={{ width: `${filled}%` }}
		/>
		<span
			className={classNames(styles.completenessMissing)}
			style={{ width: `${100 - filled}%` }}
		/>
	</div>
);

/** One attribute row: type, name, source badges, completeness. */
const AttributeRow = ({
	type,
	name,
	badges,
	filled,
}: {
	type: ReactNode;
	name: string;
	badges: number;
	filled: number;
}) => (
	<div className={classNames(styles.attrRow)}>
		<div className={classNames(styles.attrTop)}>
			<span className={classNames(styles.attrType)}>{type}</span>
			<span className={classNames(styles.attrName)}>{name}</span>
			<span className={classNames(styles.attrBadges)}>
				{Array.from({ length: badges }, (_, index) => (
					<span
						className={classNames(styles.attrBadge)}
						// biome-ignore lint/suspicious/noArrayIndexKey: badges are identical markers, position is their only identity
						key={index}
					>
						<Icon name={contactsIcon} style={{ width: 14, height: 14 }} />
					</span>
				))}
			</span>
		</div>
		<Completeness filled={filled} />
	</div>
);

/** The Reltio data-quality dashboard for an entity type. */
export const DataQuality = ({ className, ...rest }: DataQualityProps) => (
	<div className={classNames(chrome.screen, className)} {...rest}>
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

		<div className={classNames(chrome.body)}>
			<IconRail selected={0} />

			<div className={classNames(chrome.main)}>
				<div className={classNames(styles.workspace)}>
					<header className={classNames(styles.pageHeader)}>
						<span className={classNames(styles.pageTitle)}>Data Quality</span>
						<Button
							design="Transparent"
							endIcon={slimArrowDownIcon}
							icon={contactsIcon}
						>
							Contact
						</Button>
						<span className={classNames(styles.headerSpacer)} />
						<Button icon={refreshIcon}>Refresh</Button>
					</header>

					<div className={classNames(styles.columns)}>
						<div className={classNames(styles.analysis)}>
							<div className={classNames(styles.analysisTop)}>
								<PanelCard
									className={classNames(styles.entityCard)}
									flush
									title="Entity: Contact"
								>
									<div className={classNames(styles.kpiRow)}>
										{kpis.map((kpi) => (
											<div className={classNames(styles.kpi)} key={kpi.label}>
												<span className={classNames(styles.kpiLabel)}>
													{kpi.label}
												</span>
												<span
													className={classNames(
														styles.kpiValue,
														kpi.accent && styles.kpiValueAccent,
													)}
												>
													{kpi.value}
												</span>
											</div>
										))}
									</div>
								</PanelCard>

								<PanelCard
									actions={<CardActions />}
									className={classNames(styles.mappingCard)}
									title="RDM value mapping status"
								>
									<div className={classNames(styles.mappingBar)}>
										<span
											className={classNames(styles.mappingMapped)}
											style={{ width: "99.6%" }}
										/>
										<span
											className={classNames(styles.mappingUnmapped)}
											style={{ width: "0.4%" }}
										/>
									</div>
									<div className={classNames(styles.scaleRow)}>
										<span>0</span>
										<span>100</span>
									</div>
									<div className={classNames(styles.legendRow)}>
										<span className={classNames(styles.legendItem)}>
											<span
												className={classNames(styles.legendSwatch)}
												style={{ background: "var(--sapLinkColor)" }}
											/>
											Mapped values
											<span className={classNames(styles.legendValue)}>
												99.6% (419.8K)
											</span>
										</span>
										<span className={classNames(styles.legendItem)}>
											<span
												className={classNames(styles.legendSwatch)}
												style={{ background: "var(--sapField_BorderColor)" }}
											/>
											Unmapped values
											<span className={classNames(styles.legendValue)}>
												0.4% (1.8K)
											</span>
										</span>
									</div>
								</PanelCard>
							</div>

							<PanelCard
								actions={<CardActions />}
								flush
								title="Consolidation rate"
							>
								<div className={classNames(styles.consolidationBody)}>
									<MessageStrip design="Information" hideCloseButton>
										Consolidation rate: 66.3% (1.3M to 428.1K profiles)
									</MessageStrip>
									<div className={classNames(styles.consolidationSplit)}>
										<div className={classNames(styles.chartBox)}>
											<BarChart
												data={consolidationSeries}
												series={[{ key: "profiles", name: "No. of profiles" }]}
												units="K"
												xKey="stage"
											/>
										</div>
										<div className={classNames(styles.sourceLegend)}>
											<span className={classNames(styles.sourceLegendTitle)}>
												Source system (6)
											</span>
											{sourceSystems.map((system) => (
												<span
													className={classNames(styles.legendItem)}
													key={system.name}
												>
													<span
														className={classNames(styles.legendSwatch)}
														style={{ background: system.color }}
													/>
													<span className={classNames(styles.legendValue)}>
														{system.name}
													</span>
												</span>
											))}
										</div>
										<div className={classNames(styles.sourceProfiles)}>
											<div className={classNames(styles.sourceProfilesHead)}>
												<span>Source profiles</span>
												<span>746.2K</span>
											</div>
											{sourceProfiles.map((row) => (
												<div
													className={classNames(styles.sourceRow)}
													key={row.label}
												>
													<span className={classNames(styles.sourceValue)}>
														{row.label}
													</span>
													<span className={classNames(styles.sourceTrack)}>
														<span
															className={classNames(styles.sourceFill)}
															style={{ width: `${row.share}%` }}
														/>
													</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</PanelCard>

							<PanelCard
								actions={<CardActions withInfo />}
								flexible
								title="Profile with invalid data"
							>
								<div className={classNames(styles.illustrationBox)}>
									<IllustratedMessage
										design="Dialog"
										name="NoSearchResults"
										subtitleText="No profiles with invalid data were found for this entity type."
										titleText="Nothing to review"
									/>
								</div>
							</PanelCard>
						</div>

						<div className={classNames(styles.attributesColumn)}>
							<PanelCard
								actions={
									<>
										<Button
											accessibleName="Search attributes"
											design="Transparent"
											icon={searchIcon}
										/>
										<Button
											accessibleName="Filter attributes"
											design="Transparent"
											icon={filterIcon}
										/>
									</>
								}
								flexible
								flush
								title="Attributes  |  41 items"
							>
								<div className={classNames(styles.attrList)}>
									{attributes.map((attribute) => (
										<AttributeRow key={attribute.name} {...attribute} />
									))}
									{attributeGroups.map((group) => (
										<div key={group.name}>
											<div className={classNames(styles.groupRow)}>
												<Icon
													name={slimArrowRightIcon}
													style={{ width: 12, height: 12 }}
												/>
												<span className={classNames(styles.groupName)}>
													{group.name}
												</span>
												<span className={classNames(styles.attrBadge)}>
													<Icon
														name={contactsIcon}
														style={{ width: 14, height: 14 }}
													/>
												</span>
											</div>
											<div className={classNames(styles.groupChildren)}>
												{group.children.map((child) => (
													<AttributeRow key={child.name} {...child} />
												))}
											</div>
										</div>
									))}
								</div>
							</PanelCard>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);
