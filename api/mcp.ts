import { createStorybookMcpHandler } from "@storybook/mcp";

const MANIFESTS_BASE = `https://${process.env.VERCEL_URL}`;

let handlerPromise: ReturnType<typeof createStorybookMcpHandler>;

function getHandler() {
	if (!handlerPromise) {
		handlerPromise = createStorybookMcpHandler({
			manifestProvider: async (
				_request: Request | undefined,
				path: string,
			) => {
				const fileName = path.split("/").pop() || path;
				const url = `${MANIFESTS_BASE}/manifests/${fileName}`;
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(
						`Failed to fetch manifest: ${url} (${response.status})`,
					);
				}
				return response.text();
			},
		});
	}
	return handlerPromise;
}

export default async function handler(request: Request) {
	try {
		const mcpHandler = await getHandler();
		const url = new URL(request.url, MANIFESTS_BASE);
		const fullRequest = new Request(url.toString(), request);
		const response = await mcpHandler(fullRequest);
		return response ?? new Response("Storybook MCP server is running", {
			status: 200,
			headers: { "Content-Type": "text/plain" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: String(error) }),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
}
