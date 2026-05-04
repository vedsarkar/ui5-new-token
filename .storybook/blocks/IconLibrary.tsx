import { useState } from "react";
import { iconMap } from "@/icons/index";
import styles from "./IconLibrary.module.css";

function toKebabCase(name: string) {
	return name
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
		.toLowerCase();
}

const icons = Object.keys(iconMap).map((name) => {
	const kebabName = toKebabCase(name);
	return {
		name,
		kebabName,
		importStr: `import { ${name} } from "@reltio/design/icons"`,
	};
});

export const IconLibrary = () => {
	const [copiedId, setCopiedId] = useState<string | null>(null);

	const copy = async (text: string, id: string) => {
		await navigator.clipboard.writeText(text);
		setCopiedId(id);
		setTimeout(() => setCopiedId(null), 1500);
	};

	return (
		<div>
			<table>
				<tbody>
					{icons.map((icon) => {
						const IconComponent = iconMap[icon.name];
						const isImportCopied = copiedId === `import-${icon.name}`;
						return (
							<tr key={icon.name}>
								<td className={styles.iconCell} style={{ width: "1px" }}>
									<IconComponent size="medium" />
								</td>
								<td
									className={styles.copyCell}
									onClick={() => copy(icon.importStr, `import-${icon.name}`)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ")
											copy(icon.importStr, `import-${icon.name}`);
									}}
									title="Click to copy"
								>
									<code
										className={isImportCopied ? styles.codeCopied : undefined}
									>
										{isImportCopied ? (
											"Copied!"
										) : (
											<>
												{"import { "}
												<code data-toc="" id={icon.kebabName}>
													{icon.name}
												</code>
												{' } from "@reltio/design/icons"'}
											</>
										)}
									</code>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
