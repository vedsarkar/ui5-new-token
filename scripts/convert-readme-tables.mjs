/**
 * One-shot helper: walk every `components/<X>/README.md` and replace tables
 * (both leftover markdown pipe-tables AND the HTML <table> blocks we
 * generated in a previous pass) with plain bullet lists. Storybook's MDX
 * renderer rejected the HTML <table> form because micromark parses
 * `<thead><tr>...` as a paragraph and then can't reconcile the closing
 * `</tr>`. Bullet lists are pure markdown and render reliably everywhere.
 *
 * Rendering convention:
 *   - 2-column row → `- **<col0>** — <col1>`
 *   - 3+ column row → `- **<col0>** — <col1>. <col2>. <col3>…`
 * The first column is always treated as the "key" and rendered in bold.
 *
 * The script is idempotent — running it twice does nothing the second time.
 *
 * Run once: `node scripts/convert-readme-tables.mjs`
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const READMES = [];
for (const parent of ["components", "charts"]) {
	const parentPath = path.join(ROOT, parent);
	if (!fs.existsSync(parentPath)) continue;
	for (const entry of fs.readdirSync(parentPath, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const readme = path.join(parentPath, entry.name, "README.md");
		if (fs.existsSync(readme)) READMES.push(readme);
	}
}

/** Reverse the HTML-ification we did in the previous pass:
 *   <code>x</code>     → `x`
 *   <strong>x</strong> → **x**
 *   <em>x</em>         → *x*
 *   <a href="u">l</a>  → [l](u)
 * Anything else stays as-is. Used when reading back HTML cells. */
const htmlCellToMarkdown = (html) => {
	let out = html;
	out = out.replace(/<code>([\s\S]*?)<\/code>/g, "`$1`");
	out = out.replace(/<strong>([\s\S]*?)<\/strong>/g, "**$1**");
	out = out.replace(/<em>([\s\S]*?)<\/em>/g, "*$1*");
	out = out.replace(
		/<a\s+href="([^"]+)">([\s\S]*?)<\/a>/g,
		(_, url, label) => `[${label}](${url})`,
	);
	return out.trim();
};

/** Join trailing cells with `. ` separator, but never produce `..` when a
 * cell already ends in a terminal punctuation character. */
const joinTail = (cells) => {
	const isTerminal = (s) => /[.!?]$/.test(s);
	const filtered = cells.filter((c) => c.length > 0);
	if (filtered.length === 0) return "";
	let out = filtered[0];
	for (let i = 1; i < filtered.length; i++) {
		out += isTerminal(out) ? " " : ". ";
		out += filtered[i];
	}
	return out;
};

/** Render the parsed table as a bullet list. */
const renderList = ({ rows }) => {
	const lines = [];
	for (const row of rows) {
		const [first, ...rest] = row;
		const key = first.startsWith("**") ? first : `**${first}**`;
		const tail = joinTail(rest);
		lines.push(tail.length > 0 ? `- ${key} — ${tail}` : `- ${key}`);
	}
	return lines.join("\n");
};

// ---------------------------------------------------------------------------
// Pass A — markdown pipe tables → bullet list
// ---------------------------------------------------------------------------

const parseMdTable = (lines, start) => {
	const isRow = (line) => /^\s*\|.*\|\s*$/.test(line);
	const isSep = (line) =>
		/^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(line);

	if (!isRow(lines[start])) return null;
	if (!lines[start + 1] || !isSep(lines[start + 1])) return null;

	const splitRow = (line) =>
		line
			.trim()
			.replace(/^\|/, "")
			.replace(/\|$/, "")
			.split("|")
			.map((c) => c.trim());

	const header = splitRow(lines[start]);
	const rows = [];
	let i = start + 2;
	while (i < lines.length && isRow(lines[i]) && !isSep(lines[i])) {
		rows.push(splitRow(lines[i]));
		i++;
	}

	return { header, rows, endIndex: i };
};

// ---------------------------------------------------------------------------
// Pass B — HTML <table> blocks → bullet list
// ---------------------------------------------------------------------------

const parseHtmlTable = (lines, start) => {
	if (!/^\s*<table[\s>]/.test(lines[start])) return null;
	let endIndex = -1;
	for (let i = start; i < lines.length; i++) {
		if (/^\s*<\/table>\s*$/.test(lines[i])) {
			endIndex = i + 1;
			break;
		}
	}
	if (endIndex === -1) return null;

	const block = lines.slice(start, endIndex).join("\n");

	const rowMatches = [...block.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map(
		(m) => m[1],
	);
	if (rowMatches.length === 0) return null;

	const parseRow = (inner) => {
		const cells = [
			...inner.matchAll(/<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/g),
		].map((m) => htmlCellToMarkdown(m[1]));
		return cells;
	};

	const parsed = rowMatches.map(parseRow);
	// First row containing <th> is the header, the rest are data rows. If no
	// <th> at all, the table is body-only — treat every row as data.
	const headerIdx = block.indexOf("<th") !== -1 ? 0 : -1;
	const header = headerIdx === 0 ? parsed[0] : [];
	const rows = headerIdx === 0 ? parsed.slice(1) : parsed;

	return { header, rows, endIndex };
};

// ---------------------------------------------------------------------------
// File walker
// ---------------------------------------------------------------------------

const convertFile = (file) => {
	const original = fs.readFileSync(file, "utf8");
	const lines = original.split("\n");
	const out = [];
	let i = 0;
	let inFence = false;
	let converted = 0;
	while (i < lines.length) {
		const line = lines[i];
		if (/^```/.test(line)) inFence = !inFence;
		if (!inFence) {
			const html = parseHtmlTable(lines, i);
			if (html) {
				out.push(renderList(html));
				i = html.endIndex;
				converted++;
				continue;
			}
			const md = parseMdTable(lines, i);
			if (md) {
				out.push(renderList(md));
				i = md.endIndex;
				converted++;
				continue;
			}
		}
		out.push(line);
		i++;
	}

	if (converted > 0) {
		// Collapse 3+ blank lines that may appear after stripping tables.
		const cleaned = out.join("\n").replace(/\n{3,}/g, "\n\n");
		fs.writeFileSync(file, cleaned, "utf8");
		console.log(
			`✓ ${path.relative(ROOT, file)} — converted ${converted} table(s) to lists`,
		);
	}
	return converted;
};

let total = 0;
for (const file of READMES) total += convertFile(file);
console.log(
	`\nDone. ${total} table(s) converted to bullet lists across ${READMES.length} README(s).`,
);
