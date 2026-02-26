import { useState } from "react";
import styles from "./IconLibrary.module.css";
import { iconMap } from "./index";
import manifest from "./manifest.json";

export const IconLibrary = () => {
	const [search, setSearch] = useState("");
	const [copiedId, setCopiedId] = useState<string | null>(null);

	const filteredIcons = manifest.icons.filter(
		(icon) =>
			icon.name.toLowerCase().includes(search.toLowerCase()) ||
			icon.kebabName.toLowerCase().includes(search.toLowerCase()),
	);

	const copy = async (text: string, id: string) => {
		await navigator.clipboard.writeText(text);
		setCopiedId(id);
		setTimeout(() => setCopiedId(null), 1500);
	};

	return (
		<div>
			<div className={styles.searchContainer}>
				<input
					type="text"
					placeholder="Search icons..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className={styles.searchInput}
				/>
				<span className={styles.iconCount}>{filteredIcons.length} icons</span>
			</div>

			<table>
				<thead>
					<tr>
						<th style={{ width: "10%" }}></th>
						<th style={{ width: "55%" }}>Import</th>
						<th style={{ width: "35%" }}>URL</th>
					</tr>
				</thead>
				<tbody>
					{filteredIcons.map((icon) => {
						const IconComponent = iconMap[icon.name];
						if (!IconComponent) return null;
						const url = `https://reltio.design${icon.path}`;
						const isImportCopied = copiedId === `import-${icon.name}`;
						const isUrlCopied = copiedId === `url-${icon.name}`;
						return (
							<tr key={icon.name}>
								<td className={styles.iconCell}>
									<IconComponent size="medium" />
								</td>
								<td
									className={styles.copyCell}
									onClick={() => copy(icon.import, `import-${icon.name}`)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ")
											copy(icon.import, `import-${icon.name}`);
									}}
									title="Click to copy"
								>
									<code
										className={isImportCopied ? styles.codeCopied : undefined}
									>
										{isImportCopied ? "Copied!" : icon.import}
									</code>
								</td>
								<td
									className={styles.copyCell}
									onClick={() => copy(url, `url-${icon.name}`)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ")
											copy(url, `url-${icon.name}`);
									}}
									title="Click to copy"
								>
									<code className={isUrlCopied ? styles.codeCopied : undefined}>
										{isUrlCopied ? "Copied!" : icon.path}
									</code>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			{filteredIcons.length === 0 && (
				<p className={styles.noResults}>No icons found matching "{search}"</p>
			)}
		</div>
	);
};
