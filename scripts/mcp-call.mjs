// Ad-hoc MCP debug helper: call a tool on the local Storybook MCP server
// and print the text payload + size metrics (bytes + rough token estimate).
//
// Usage:
//   node scripts/mcp-call.mjs <tool> '<jsonArgs>' [--raw]
// Examples:
//   node scripts/mcp-call.mjs tools/list
//   node scripts/mcp-call.mjs list-all-documentation '{}'
//   node scripts/mcp-call.mjs get-documentation '{"id":"components-button"}' --raw

const ENDPOINT = process.env.MCP_URL ?? "http://localhost:6006/mcp";

const [, , toolArg, argsArg = "{}", ...flags] = process.argv;
const raw = flags.includes("--raw");

if (!toolArg) {
	console.error(
		"Usage: node scripts/mcp-call.mjs <tool|tools/list> '<jsonArgs>' [--raw]",
	);
	process.exit(1);
}

const body =
	toolArg === "tools/list"
		? { jsonrpc: "2.0", id: 1, method: "tools/list", params: {} }
		: {
				jsonrpc: "2.0",
				id: 1,
				method: "tools/call",
				params: { name: toolArg, arguments: JSON.parse(argsArg) },
			};

const res = await fetch(ENDPOINT, {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json, text/event-stream",
	},
	body: JSON.stringify(body),
});

const text = await res.text();

// The server replies with an SSE stream: lines of `event: message` / `data: {json}`.
const dataLine = text
	.split("\n")
	.find((l) => l.startsWith("data: "))
	?.slice("data: ".length);

if (!dataLine) {
	console.error("No data line in response. Raw:\n", text.slice(0, 2000));
	process.exit(1);
}

const json = JSON.parse(dataLine);

const estimateTokens = (s) => Math.ceil(s.length / 4);
const fmt = (n) => n.toLocaleString("en-US");

if (toolArg === "tools/list") {
	for (const t of json.result.tools) {
		console.log(`- ${t.name}`);
	}
	process.exit(0);
}

const content = json.result?.content ?? [];
const fullText = content.map((c) => c.text ?? "").join("\n");

console.log("=".repeat(60));
console.log(`tool: ${toolArg}  args: ${argsArg}`);
console.log(
	`content blocks: ${content.length} | bytes: ${fmt(
		Buffer.byteLength(fullText, "utf8"),
	)} | chars: ${fmt(fullText.length)} | ~tokens: ${fmt(
		estimateTokens(fullText),
	)}`,
);
console.log("=".repeat(60));

if (raw) {
	console.log(fullText);
}
