import { useState } from "react";
import styles from "./IconLibrary.module.css";
import { iconMap } from "./index";
import manifest from "./manifest.json";

type IconEntry = (typeof manifest.icons)[number];

export const IconLibrary = () => {
	const [search, setSearch] = useState("");
	const [copiedId, setCopiedId] = useState<string | null>(null);

	const filteredIcons = manifest.icons.filter(
		(icon) =>
			icon.name.toLowerCase().includes(search.toLowerCase()) ||
			icon.kebabName.toLowerCase().includes(search.toLowerCase()),
	);

	const copyToClipboard = async (text: string, id: string) => {
		await navigator.clipboard.writeText(text);
		setCopiedId(id);
		setTimeout(() => setCopiedId(null), 2000);
	};

	const renderIcon = (icon: IconEntry) => {
		const IconComponent = iconMap[icon.name];
		if (!IconComponent) return null;
		return <IconComponent size="large" />;
	};

	return (
		<div className={styles.root}>
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

			<div className={styles.grid}>
				{filteredIcons.map((icon) => {
					const storyPath = `/?path=/docs/icons-${icon.name.toLowerCase()}--docs`;
					return (
						<div key={icon.name} className={styles.iconCard}>
							<a href={storyPath} className={styles.iconLink}>
								<div className={styles.iconPreview}>{renderIcon(icon)}</div>
								<div className={styles.iconName}>{icon.name}</div>
							</a>
							<div className={styles.actions}>
								<button
									type="button"
									className={styles.copyButton}
									onClick={() =>
										copyToClipboard(
											`https://reltio.design${icon.path}`,
											`url-${icon.name}`,
										)
									}
								>
									{copiedId === `url-${icon.name}` ? "Copied!" : "Copy URL"}
								</button>
								<button
									type="button"
									className={styles.copyButton}
									onClick={() =>
										copyToClipboard(icon.import, `import-${icon.name}`)
									}
								>
									{copiedId === `import-${icon.name}`
										? "Copied!"
										: "Copy Import"}
								</button>
							</div>
						</div>
					);
				})}
			</div>

			{filteredIcons.length === 0 && (
				<div className={styles.noResults}>
					No icons found matching "{search}"
				</div>
			)}
		</div>
	);
};
