import { RELTIO_ICON_COLLECTION } from "@/icons";
import { SideNavigation } from "../SideNavigation";
import { SideNavigationGroup } from "../SideNavigationGroup";
import { SideNavigationItem } from "../SideNavigationItem";
import type {
	AppNavigationApp,
	AppNavigationGroup as AppNavigationGroupType,
	AppNavigationProps,
} from "./AppNavigation.types";
import appIcons from "./appIcons.json";

// SAP Fiori icon for the optional "Home" entry.
import "@ui5/webcomponents-icons/dist/home.js";
// Register every Reltio icon referenced by the internal config (plus the
// generic fallback) as tree-shakable side-effect imports.
import "@/icons/data-cloud-warehouse-pipeline";
import "@/icons/data-loader";
import "@/icons/data-modeler";
import "@/icons/export";
import "@/icons/external-match";
import "@/icons/generic";
import "@/icons/inbox";
import "@/icons/performance";
import "@/icons/security-configuration";
import "@/icons/shield-encryption";
import "@/icons/tenant-management";
import "@/icons/ui-modeler";
import "@/icons/user-management";
import "@/icons/workflow-modeler";

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
					icon="home"
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
	const icon = (name && ICON_BY_APP_NAME[name]) || FALLBACK_ICON;
	return `${RELTIO_ICON_COLLECTION}/${icon}`;
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
