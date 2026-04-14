import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rename, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const ICONS_SOURCE_DIR = "public/icons";
const ICONS_OUTPUT_DIR = "icons";

function toKebabCase(name) {
	return name
		.toLowerCase()
		.replace(/[()]/g, "")
		.replace(/[_\s]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

async function normalizeIconFilenames() {
	const files = await readdir(ICONS_SOURCE_DIR);
	const svgFiles = files.filter(
		(file) => file.endsWith(".svg") && !file.startsWith("."),
	);

	let renamed = 0;

	for (const file of svgFiles) {
		const name = basename(file, ".svg");
		const kebabName = toKebabCase(name);
		const targetFile = `${kebabName}.svg`;

		if (file === targetFile) continue;

		await rename(
			join(ICONS_SOURCE_DIR, file),
			join(ICONS_SOURCE_DIR, targetFile),
		);
		renamed++;
		console.log(`Renamed: "${file}" → "${targetFile}"`);
	}

	if (renamed > 0) {
		console.log(`\nNormalized ${renamed} icon filenames to kebab-case\n`);
	}
}

function kebabToPascal(str) {
	return str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("");
}

function convertStyleAttributes(content) {
	return content.replace(/style="([^"]*)"/g, (_, styleString) => {
		const properties = styleString
			.split(";")
			.filter(Boolean)
			.map((prop) => {
				const colonIdx = prop.indexOf(":");
				const key = prop.slice(0, colonIdx).trim();
				const value = prop.slice(colonIdx + 1).trim();
				const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
				return `${camelKey}: "${value}"`;
			})
			.join(", ");
		return `style={{${properties}}}`;
	});
}

const PRESERVED_FILLS = new Set([
	"#fff",
	"#ffff",
	"#ffffff",
	"#ffffffff",
	"#d9d9d9",
]);

function removeHardcodedFills(content) {
	return content.replace(/\s*fill="(#[0-9a-fA-F]{3,8})"/g, (match, hex) => {
		if (PRESERVED_FILLS.has(hex.toLowerCase())) return match;
		return "";
	});
}

function extractSvgContent(svgString) {
	const match = svgString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
	if (!match) return "";
	return removeHardcodedFills(convertStyleAttributes(match[1].trim()));
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
	...props
}: IconProps) => {
	return (
		<svg
			className={classNames(styles.root, styles[size], styles[color], className)}
			viewBox="${viewBox}"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			${svgContent}
		</svg>
	);
};
`;
}

function generateUnifiedStories(icons) {
	const sortedIcons = [...icons].sort((a, b) => a.name.localeCompare(b.name));

	const firstIcon = sortedIcons[0].name;

	const stories = sortedIcons
		.map(
			({ name }) =>
				`export const ${name}: Story = { args: { name: "${name}" } };`,
		)
		.join("\n\n");

	return `import { ArgTypes, Description as Desc, Subtitle, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react";
import type { IconProps } from "./Icon.types";
import { IconLibrary } from "./IconLibrary";
import styles from "./IconStories.module.css";
import { ${firstIcon} as IconRef, iconMap } from "./index";

type StoryProps = IconProps & { name: string };

const meta: Meta<StoryProps> = {
	title: "Icons",
	component: IconRef as React.FC,
	argTypes: {
		color: {
			control: "select",
			options: ["inherited", "primary", "secondary", "success", "warning", "error"],
		},
	},
	parameters: {
		layout: "centered",
		docs: {
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Desc />
					<h3>Props</h3>
					<ArgTypes />
					<IconLibrary />
        </>
			),
		},
	},
	render: ({ name }) => {
		const Icon = iconMap[name];
		return (
			<div className={styles.story}>
				<Icon size="small" color="success" />
				<Icon />
				<Icon size="large" color="error" />
			</div>
		);
	},
};

export default meta;
type Story = StoryObj<StoryProps>;

${stories}
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

	await normalizeIconFilenames();

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

		await writeFile(join(ICONS_OUTPUT_DIR, `${iconName}.tsx`), componentCode);

		icons.push({ name: iconName, kebabName });
		console.log(`Generated: ${iconName}`);
	}

	const indexCode = generateIndex(icons);
	await writeFile(join(ICONS_OUTPUT_DIR, "index.ts"), indexCode);
	console.log("Generated: index.ts");

	const storiesCode = generateUnifiedStories(icons);
	await writeFile(join(ICONS_OUTPUT_DIR, "Icons.stories.tsx"), storiesCode);
	console.log("Generated: Icons.stories.tsx");

	const manifestCode = generateManifest(icons);
	await writeFile(join(ICONS_OUTPUT_DIR, "manifest.json"), manifestCode);
	console.log("Generated: manifest.json");

	console.log(`\nSuccessfully generated ${icons.length} icon components`);

	console.log("\nFormatting generated files...");
	execSync("npm run format", { stdio: "inherit" });
}

main().catch(console.error);
