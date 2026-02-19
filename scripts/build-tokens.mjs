import fs from "node:fs";
import path from "node:path";

const TOKENS_DIR = path.resolve(import.meta.dirname, "../tokens");
const OUTPUT_FILE = path.resolve(
	import.meta.dirname,
	"../public/variables.css",
);

const LIGHT_FILE = path.join(TOKENS_DIR, "Light.tokens.json");
const DARK_FILE = path.join(TOKENS_DIR, "Dark.tokens.json");
const MAP_FILE = path.join(TOKENS_DIR, "token-map.json");

const tokenMap = JSON.parse(fs.readFileSync(MAP_FILE, "utf-8"));

function hexToRgb(hex) {
	const h = hex.replace("#", "");
	return {
		r: Number.parseInt(h.substring(0, 2), 16),
		g: Number.parseInt(h.substring(2, 4), 16),
		b: Number.parseInt(h.substring(4, 6), 16),
	};
}

function tokenToCssValue(token) {
	const { hex, alpha } = token.$value;
	if (alpha === 1) {
		return hex.toLowerCase();
	}
	const { r, g, b } = hexToRgb(hex);
	const a = Math.round(alpha * 1000) / 1000;
	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function collectTokens(data) {
	const tokens = [];
	for (const [group, groupValue] of Object.entries(data)) {
		if (group === "$extensions") continue;
		if (typeof groupValue !== "object" || groupValue === null) continue;

		for (const [name, token] of Object.entries(groupValue)) {
			if (token.$type !== "color") continue;
			const figmaKey = `${group}/${name}`;
			const cssName = tokenMap[figmaKey];
			if (!cssName) {
				console.warn(
					`WARNING: unmapped token "${figmaKey}" — add it to token-map.json`,
				);
				continue;
			}
			tokens.push({ figmaKey, cssName, token });
		}
	}
	return tokens;
}

function generateCssBlock(selector, tokens) {
	const lines = tokens.map(({ cssName, token }) => {
		const cssValue = tokenToCssValue(token);
		return `\t--reltio-color-${cssName}: ${cssValue};`;
	});
	return `${selector} {\n${lines.join("\n")}\n}`;
}

const light = JSON.parse(fs.readFileSync(LIGHT_FILE, "utf-8"));
const dark = JSON.parse(fs.readFileSync(DARK_FILE, "utf-8"));

const lightTokens = collectTokens(light);
const darkTokens = collectTokens(dark);

const css = [
	"/* Auto-generated from tokens/ — do not edit manually */",
	"/* Run: npm run build-tokens */",
	"",
	generateCssBlock(":root", lightTokens),
	"",
	generateCssBlock('[data-theme="dark"]', darkTokens),
	"",
].join("\n");

fs.writeFileSync(OUTPUT_FILE, css, "utf-8");

console.log(
	`Generated ${OUTPUT_FILE} (${lightTokens.length} light + ${darkTokens.length} dark tokens)`,
);
