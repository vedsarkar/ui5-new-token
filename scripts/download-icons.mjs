import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ICONS_DIR = "public/icons";

const ICONS = [
	"arrow_back",
	"arrow_forward",
	"chevron_left",
	"chevron_right",
	"keyboard_arrow_down",
	"keyboard_arrow_up",
	"menu",
	"close",
	"expand_more",
	"expand_less",
	"search",
	"add",
	"remove",
	"edit",
	"delete",
	"save",
	"refresh",
	"download",
	"upload",
	"share",
	"check",
	"check_circle",
	"error",
	"warning",
	"info",
	"help",
	"content_copy",
	"content_paste",
	"filter_list",
	"sort",
	"visibility",
	"visibility_off",
	"email",
	"notifications",
	"chat",
	"comment",
	"folder",
	"description",
	"attachment",
	"person",
	"people",
	"account_circle",
	"settings",
	"logout",
];

function toKebabCase(str) {
	return str.replace(/_/g, "-");
}

async function downloadIcon(iconName) {
	const url = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${iconName}/default/24px.svg`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to download ${iconName}: ${response.status}`);
	}

	return response.text();
}

async function main() {
	if (!existsSync(ICONS_DIR)) {
		await mkdir(ICONS_DIR, { recursive: true });
	}

	console.log(`Downloading ${ICONS.length} icons from Material Symbols...`);

	for (const icon of ICONS) {
		try {
			const svg = await downloadIcon(icon);
			const filename = `${toKebabCase(icon)}.svg`;
			await writeFile(join(ICONS_DIR, filename), svg);
			console.log(`Downloaded: ${filename}`);
		} catch (error) {
			console.error(`Error downloading ${icon}:`, error.message);
		}
	}

	console.log("\nDone!");
}

main().catch(console.error);
