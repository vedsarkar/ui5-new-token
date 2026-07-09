// Import each Reltio icon referenced by the internal config (plus the generic
// fallback) by its NAME default. Referencing them in `ICONS` below registers the
// icons and keeps them from being tree-shaken under `sideEffects: false` — a bare
// `import "@/icons/reltio/<name>"` would be dropped.
import dataCloudWarehousePipeline from "@/icons/reltio/data-cloud-warehouse-pipeline";
import dataLoader from "@/icons/reltio/data-loader";
import dataModeler from "@/icons/reltio/data-modeler";
import exportIcon from "@/icons/reltio/export";
import externalMatch from "@/icons/reltio/external-match";
import generic from "@/icons/reltio/generic";
import inbox from "@/icons/reltio/inbox";
import performance from "@/icons/reltio/performance";
import securityConfiguration from "@/icons/reltio/security-configuration";
import shieldEncryption from "@/icons/reltio/shield-encryption";
import tenantManagement from "@/icons/reltio/tenant-management";
import uiModeler from "@/icons/reltio/ui-modeler";
import userManagement from "@/icons/reltio/user-management";
import workflowModeler from "@/icons/reltio/workflow-modeler";
// SAP Fiori icon name for the optional "Home" entry (import registers it).
import homeIcon from "@/icons/sap/home";
import { SideNavigation } from "../SideNavigation";
import { SideNavigationGroup } from "../SideNavigationGroup";
import { SideNavigationItem } from "../SideNavigationItem";
import type {
	AppNavigationApp,
	AppNavigationGroup as AppNavigationGroupType,
	AppNavigationProps,
} from "./AppNavigation.types";
import appIcons from "./appIcons.json";

/** Registered Reltio icons this component may render, keyed by their config slug.
 * Values are the fully-qualified registry names returned by each icon module. */
const ICONS: Record<string, string> = {
	"data-cloud-warehouse-pipeline": dataCloudWarehousePipeline,
	"data-loader": dataLoader,
	"data-modeler": dataModeler,
	export: exportIcon,
	"external-match": externalMatch,
	generic,
	inbox,
	performance,
	"security-configuration": securityConfiguration,
	"shield-encryption": shieldEncryption,
	"tenant-management": tenantManagement,
	"ui-modeler": uiModeler,
	"user-management": userManagement,
	"workflow-modeler": workflowModeler,
};

const ICON_BY_APP_NAME: Record<string, string> = appIcons;
const FALLBACK_ICON = "generic";

/** Side navigation for the Reltio application catalog. Renders the apps returned
 * by the Reltio Config Service, using only their `name` and `url` and resolving
 * each icon internally from the curated Reltio icon set. */
export const AppNavigation = ({
	apps,
	homeUrl,
	env,
	tenant,
	accessibleName = "Applications",
	collapsable = false,
	...rest
}: AppNavigationProps) => {
	const groups = (apps ?? []).filter(isRenderableGroup);

	return (
		<SideNavigation
			accessibleName={accessibleName}
			collapsable={collapsable}
			{...rest}
		>
			{homeUrl ? (
				<SideNavigationItem
					text="Home"
					tooltip="Home"
					icon={homeIcon}
					href={resolveUrl(homeUrl, env, tenant)}
				/>
			) : null}
			{groups.map((group) => (
				<SideNavigationGroup key={group.name} text={group.name} expanded>
					{getRenderableApps(group).map((app) => (
						<SideNavigationItem
							key={app.name}
							text={app.name}
							tooltip={app.name}
							icon={resolveIcon(app.name)}
							href={resolveUrl(app.url, env, tenant)}
							target="_blank"
							unselectable
						/>
					))}
				</SideNavigationGroup>
			))}
		</SideNavigation>
	);
};

/** A group renders only when it has a title and at least one valid app. */
const isRenderableGroup = (group: AppNavigationGroupType): boolean =>
	Boolean(group?.name) && getRenderableApps(group).length > 0;

const getRenderableApps = (group: AppNavigationGroupType): AppNavigationApp[] =>
	(group.items ?? []).filter((app) => Boolean(app?.name && app?.url));

/** Map an app name to its Reltio icon, falling back to a generic glyph. */
const resolveIcon = (name: string | undefined): string => {
	const slug = (name && ICON_BY_APP_NAME[name]) || FALLBACK_ICON;
	return ICONS[slug] ?? ICONS[FALLBACK_ICON];
};

const resolveUrl = (
	url: string | undefined,
	env: string | undefined,
	tenant: string | undefined,
): string | undefined =>
	url
		// biome-ignore lint/suspicious/noTemplateCurlyInString: intentional URL template placeholders
		?.replaceAll("${environment}", String(env))
		// biome-ignore lint/suspicious/noTemplateCurlyInString: intentional URL template placeholders
		.replaceAll("${tenant}", String(tenant));
