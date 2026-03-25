export const config = { runtime: "edge" };

import { createStorybookMcpHandler } from "@storybook/mcp";

const BASE_URL = `https://${process.env.VERCEL_URL ?? "reltio.design"}`;

let handlerPromise: ReturnType<typeof createStorybookMcpHandler>;

function getHandler() {
	if (!handlerPromise) {
		handlerPromise = createStorybookMcpHandler({
			manifestProvider: async (_request, path) => {
				const fileName = path.split("/").pop() || path;
				const url = `${BASE_URL}/manifests/${fileName}`;
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
	const response = await mcpHandler(request);
	return response ?? new Response("Not found", { status: 404 });
}
