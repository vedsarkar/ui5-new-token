import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const ICONS_SOURCE_DIR = "public/icons";
const ICONS_OUTPUT_DIR = "icons";

function kebabToPascal(str) {
	return str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("");
}

function extractSvgContent(svgString) {
	const match = svgString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
	if (!match) return "";
	return match[1].trim();
}

function extractViewBox(svgString) {
	const match = svgString.match(/viewBox="([^"]+)"/);
	return match ? match[1] : "0 0 24 24";
}

function generateComponent(iconName, svgContent, viewBox) {
	return `import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ${iconName} = ({
	size = "medium",
	color = "inherited",
	className,
	style,
	"aria-label": ariaLabel,
}: IconProps) => {
	return (
		<svg
			className={classNames(styles.root, styles[size], styles[color], className)}
			style={style}
			viewBox="${viewBox}"
			aria-hidden={!ariaLabel}
			aria-label={ariaLabel}
			role={ariaLabel ? "img" : undefined}
		>
			${svgContent}
		</svg>
	);
};
`;
}

function generateStories(iconName) {
	return `import type { Meta, StoryObj } from "@storybook/react";
import { ${iconName} } from "./${iconName}";
import styles from "./IconStories.module.css";

const meta: Meta<typeof ${iconName}> = {
	component: ${iconName},
	title: "Icons/${iconName}",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof ${iconName}>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className={\`\${styles.grid} \${styles.sizes}\`}>
			<span className={styles.icon}><${iconName} size="small" /></span>
			<span className={styles.label}>small</span>
			<span className={styles.icon}><${iconName} size="medium" /></span>
			<span className={styles.label}>medium</span>
			<span className={styles.icon}><${iconName} size="large" /></span>
			<span className={styles.label}>large</span>
			<span className={styles.icon}><${iconName} size="xlarge" /></span>
			<span className={styles.label}>xlarge</span>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={\`\${styles.grid} \${styles.colors}\`}>
			<span className={styles.icon}><${iconName} color="inherited" /></span>
			<span className={styles.label}>inherited</span>
			<span className={styles.icon}><${iconName} color="primary" /></span>
			<span className={styles.label}>primary</span>
			<span className={styles.icon}><${iconName} color="success" /></span>
			<span className={styles.label}>success</span>
			<span className={styles.icon}><${iconName} color="warning" /></span>
			<span className={styles.label}>warning</span>
			<span className={styles.icon}><${iconName} color="error" /></span>
			<span className={styles.label}>error</span>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "${iconName} icon",
	},
};
`;
}

function generateIndex(icons) {
	const sortedIcons = [...icons].sort((a, b) => a.name.localeCompare(b.name));

	const imports = sortedIcons
		.map(({ name }) => `import { ${name} } from "./${name}";`)
		.join("\n");

	const exports = sortedIcons.map(({ name }) => `\t${name},`).join("\n");

	const iconMapEntries = sortedIcons
		.map(({ name }) => `\t${name}: ${name},`)
		.join("\n");

	return `export type { IconColor, IconProps, IconSize } from "./Icon.types";

${imports}

export {
${exports}
};

export const iconMap: Record<string, React.ComponentType<import("./Icon.types").IconProps>> = {
${iconMapEntries}
};
`;
}

function generateManifest(icons) {
	return JSON.stringify(
		{
			icons: icons.map(({ name, kebabName }) => ({
				name,
				kebabName,
				path: `/icons/${kebabName}.svg`,
				import: `import { ${name} } from "@reltio/design/icons"`,
			})),
		},
		null,
		2,
	);
}

async function main() {
	if (!existsSync(ICONS_SOURCE_DIR)) {
		console.error(`Source directory ${ICONS_SOURCE_DIR} does not exist`);
		process.exit(1);
	}

	if (!existsSync(ICONS_OUTPUT_DIR)) {
		await mkdir(ICONS_OUTPUT_DIR, { recursive: true });
	}

	const files = await readdir(ICONS_SOURCE_DIR);
	const svgFiles = files.filter(
		(file) => file.endsWith(".svg") && !file.startsWith("."),
	);

	if (svgFiles.length === 0) {
		console.log("No SVG files found in", ICONS_SOURCE_DIR);
		return;
	}

	const icons = [];

	for (const file of svgFiles) {
		const kebabName = basename(file, ".svg");
		const iconName = kebabToPascal(kebabName);
		const svgPath = join(ICONS_SOURCE_DIR, file);
		const svgString = await readFile(svgPath, "utf-8");
		const svgContent = extractSvgContent(svgString);
		const viewBox = extractViewBox(svgString);

		const componentCode = generateComponent(iconName, svgContent, viewBox);
		const storiesCode = generateStories(iconName);

		await writeFile(join(ICONS_OUTPUT_DIR, `${iconName}.tsx`), componentCode);
		await writeFile(
			join(ICONS_OUTPUT_DIR, `${iconName}.stories.tsx`),
			storiesCode,
		);

		icons.push({ name: iconName, kebabName });
		console.log(`Generated: ${iconName}`);
	}

	const indexCode = generateIndex(icons);
	await writeFile(join(ICONS_OUTPUT_DIR, "index.ts"), indexCode);
	console.log("Generated: index.ts");

	const manifestCode = generateManifest(icons);
	await writeFile(join(ICONS_OUTPUT_DIR, "manifest.json"), manifestCode);
	console.log("Generated: manifest.json");

	console.log(`\nSuccessfully generated ${icons.length} icon components`);

	console.log("\nFormatting generated files...");
	execSync("npm run format", { stdio: "inherit" });
}

main().catch(console.error);
