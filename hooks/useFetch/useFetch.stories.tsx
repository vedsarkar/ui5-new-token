import { delay, HttpResponse, http } from "msw";
import { expect, waitFor } from "storybook/test";
import preview from "@/.storybook/preview";
import { useFetch } from "@/hooks/useFetch";
import readme from "./README.md?raw";

const MOCK_URL = "/api/entities";
const LOADING_URL = "/api/entities/loading";
const DEDUPE_URL = "/api/entities/dedupe";
const DEFAULT_URL = "/api/entities/default";

type Entity = { id: string; name: string };

// Url only, no action: the hook issues a minimal GET and parses the JSON body.
const DefaultDemo = () => {
	const result = useFetch<Entity[]>(DEFAULT_URL);

	return <pre>{JSON.stringify(result, null, 2)}</pre>;
};

// Read request: passes a url, so concurrent consumers are deduplicated and the
// action receives the url.
const FetchDemo = ({ url = MOCK_URL }: { url?: string }) => {
	const result = useFetch<Entity[], Error>(url, (requestUrl) =>
		fetch(requestUrl).then((r) => {
			if (!r.ok) throw r.status;
			return r.json();
		}),
	);

	return <pre>{JSON.stringify(result, null, 2)}</pre>;
};

type RealApiProps = { url: string; token: string };

const RealApiDemo = ({ url, token }: RealApiProps) => {
	const result = useFetch(url, (requestUrl) =>
		fetch(requestUrl, {
			headers: { Authorization: `Bearer ${token}` },
		}).then((r) => {
			if (!r.ok) throw r.status;
			return r.json();
		}),
	);

	return <pre>{JSON.stringify(result, null, 2)}</pre>;
};

const meta = preview.meta({
	component: FetchDemo,
	parameters: {
		// Hook stories demonstrate runtime behaviour, not visual UI, so the
		// dual-theme decorator and Chromatic snapshots add no value here.
		dualTheme: false,
		chromatic: { disableSnapshot: true },
		docs: {
			description: {
				component: readme,
			},
			source: {
				code: 'import { useFetch } from "@reltio/design/hooks"',
			},
		},
	},
});

export default meta;

export const Success = meta.story({
	parameters: {
		msw: {
			handlers: [
				http.get(MOCK_URL, () =>
					HttpResponse.json([
						{ id: "1", name: "Entity A" },
						{ id: "2", name: "Entity B" },
					]),
				),
			],
		},
	},
	play: async ({ canvasElement }) => {
		await waitFor(() => {
			const pre = canvasElement.querySelector("pre");
			const result = JSON.parse(pre?.textContent ?? "{}");
			expect(result.isLoading).toBe(false);
			expect(result.data).toEqual([
				{ id: "1", name: "Entity A" },
				{ id: "2", name: "Entity B" },
			]);
		});
	},
});

export const Loading = meta.story({
	render: () => <FetchDemo url={LOADING_URL} />,
	parameters: {
		msw: {
			handlers: [
				http.get(LOADING_URL, async () => {
					await delay("infinite");
				}),
			],
		},
	},
	play: async ({ canvasElement }) => {
		await waitFor(() => {
			const pre = canvasElement.querySelector("pre");
			const result = JSON.parse(pre?.textContent ?? "{}");
			expect(result.isLoading).toBe(true);
		});
	},
});

export const ErrorState = meta.story({
	parameters: {
		msw: {
			handlers: [
				http.get(MOCK_URL, () => new HttpResponse(null, { status: 500 })),
			],
		},
	},
	play: async ({ canvasElement }) => {
		await waitFor(() => {
			const pre = canvasElement.querySelector("pre");
			const result = JSON.parse(pre?.textContent ?? "{}");
			expect(result.isLoading).toBe(false);
			expect(result.error).toBe(500);
		});
	},
});

let dedupeRequestCount = 0;

export const Deduplication = meta.story({
	beforeEach: () => {
		dedupeRequestCount = 0;
	},
	render: () => (
		<>
			<FetchDemo url={DEDUPE_URL} />
			<FetchDemo url={DEDUPE_URL} />
			<FetchDemo url={DEDUPE_URL} />
		</>
	),
	parameters: {
		msw: {
			handlers: [
				http.get(DEDUPE_URL, () => {
					dedupeRequestCount += 1;
					return HttpResponse.json([
						{ id: "1", name: "Entity A" },
						{ id: "2", name: "Entity B" },
					]);
				}),
			],
		},
	},
	play: async ({ canvasElement }) => {
		await waitFor(() => {
			const results = canvasElement.querySelectorAll("pre");
			expect(results).toHaveLength(3);
			for (const pre of results) {
				const result = JSON.parse(pre.textContent ?? "{}");
				expect(result.isLoading).toBe(false);
				expect(result.data).toHaveLength(2);
			}
		});
		// All three consumers share a single in-flight request for the same url.
		expect(dedupeRequestCount).toBe(1);
	},
});

export const DefaultFetcher = meta.story({
	render: () => <DefaultDemo />,
	parameters: {
		msw: {
			handlers: [
				http.get(DEFAULT_URL, () =>
					HttpResponse.json([
						{ id: "1", name: "Entity A" },
						{ id: "2", name: "Entity B" },
					]),
				),
			],
		},
	},
	play: async ({ canvasElement }) => {
		await waitFor(() => {
			const pre = canvasElement.querySelector("pre");
			const result = JSON.parse(pre?.textContent ?? "{}");
			expect(result.isLoading).toBe(false);
			expect(result.data).toHaveLength(2);
		});
	},
});

export const RealApi = meta.story({
	render: (args) => {
		const { url, token } = args as unknown as RealApiProps;
		return <RealApiDemo key={`${url}:${token}`} url={url} token={token} />;
	},
	args: {
		url: "https://tst-01.reltio.com/reltio/api/enhancedTenants",
		token: "",
	},
	argTypes: {
		url: { control: "text" },
		token: { control: "text" },
	},
});
