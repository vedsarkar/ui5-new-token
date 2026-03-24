import { basename } from "node:path";
import { createStorybookMcpHandler } from "@storybook/mcp";

const MANIFESTS_BASE = `https://${process.env.VERCEL_URL}`;

let handlerPromise: ReturnType<typeof createStorybookMcpHandler>;

function getHandler() {
	if (!handlerPromise) {
		handlerPromise = createStorybookMcpHandler({
			manifestProvider: async (_request: Request | undefined, path: string) => {
				const url = `${MANIFESTS_BASE}/manifests/${basename(path)}`;
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
	const mcpHandler = await getHandler();
	return mcpHandler(request);
}
