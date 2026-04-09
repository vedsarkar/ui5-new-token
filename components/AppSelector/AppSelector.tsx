import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Popover } from "@/components/Popover";
import { Applications } from "@/icons/Applications";
import { Link } from "@/icons/Link";
import { classNames } from "@/utils/classNames";
import styles from "./AppSelector.module.css";
import type { AppSelectorProps } from "./AppSelector.types";

const DEFAULT_CATEGORY = "Applications";

/** Navigation popover for switching between Reltio platform applications.
 * Displays apps grouped by category in a grid layout.
 */
export const AppSelector = ({
	apps,
	env,
	tenant,
	label,
	className,
	positionArea = "right span-top",
	...rest
}: AppSelectorProps) => {
	const validApps = apps.filter((app) => app.name && app.uri);
	const groups = Object.groupBy(
		validApps,
		({ category }) => category || DEFAULT_CATEGORY,
	);

	return (
		<nav className={classNames(className)} aria-label="Applications" {...rest}>
			<Popover
				trigger={
					label ? (
						<Button variant="text">
							<Applications /> {label}
						</Button>
					) : (
						<Button variant="text" aria-label="Applications">
							<Applications />
						</Button>
					)
				}
				positionArea={positionArea}
			>
				<div className={classNames(styles.content)}>
					{Object.entries(groups).map(([category, apps]) => (
						<div key={category} className={classNames(styles.group)}>
							<Divider className={classNames(styles.divider)}>
								{category}
							</Divider>
							<div className={classNames(styles.grid)}>
								{apps?.map((app) => (
									<a
										key={app.name}
										href={resolveUri(app.uri, env, tenant)}
										target="_blank"
										rel="noopener noreferrer"
										className={classNames(styles.app)}
									>
										{app.icon ? (
											<img
												src={app.icon}
												alt=""
												className={classNames(styles.appIcon)}
											/>
										) : (
											<Link size="xlarge" />
										)}
										{app.name}
									</a>
								))}
							</div>
						</div>
					))}
				</div>
			</Popover>
		</nav>
	);
};

const resolveUri = (
	uri: string | undefined,
	env: string | undefined,
	tenant: string | undefined,
): string | undefined =>
	uri
		?.replaceAll("${environment}", String(env))
		.replaceAll("${tenant}", String(tenant));
