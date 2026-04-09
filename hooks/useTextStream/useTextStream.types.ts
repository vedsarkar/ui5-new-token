export type TextStreamEvent = {
	delta?: string;
	content?: string;
	error?: unknown;
	[key: string]: unknown;
};

export type StreamFetcherInput = {
	url: string | undefined;
	body: string | undefined;
	signal: AbortSignal;
} & Omit<RequestInit, "body" | "signal">;

export type StreamFetcher = (input: StreamFetcherInput) => Promise<Response>;

export type TextStreamStatus =
	| "idle"
	| "connecting"
	| "streaming"
	| "done"
	| "error"
	| "aborted";

export type TextStreamState = {
	text: string;
	status: TextStreamStatus;
	event: TextStreamEvent | null;
	error: Error | null;
};

export type UseTextStreamOptions = {
	url?: string;
	fetcher?: StreamFetcher;
} & Omit<RequestInit, "body" | "signal">;

export type UseTextStreamReturn<TPayload> = TextStreamState & {
	send: (payload: TPayload) => void;
	abort: () => void;
};
