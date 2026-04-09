import { useCallback, useEffect, useRef, useState } from "react";
import { defaultFetcher } from "./defaultFetcher";
import { sseJsonParser } from "./sseJsonParser";
import type {
	TextStreamEvent,
	TextStreamState,
	UseTextStreamOptions,
	UseTextStreamReturn,
} from "./useTextStream.types";

const initialState: TextStreamState = {
	text: "",
	status: "idle",
	event: null,
	error: null,
};

/**
 * Streams text from an SSE endpoint by accumulating `delta` (append) and `content` (replace) fields
 * from server-sent JSON events. Returns the assembled text, connection status, the latest event, and
 * `send` / `abort` controls. Accepts a custom `fetcher` for auth or non-standard transports.
 */
export const useTextStream = <TPayload = unknown>({
	url,
	fetcher = defaultFetcher,
	...requestOptions
}: UseTextStreamOptions = {}): UseTextStreamReturn<TPayload> => {
	const [state, setState] = useState<TextStreamState>(initialState);

	const optionsRef = useRef({ url, fetcher, requestOptions });
	optionsRef.current = { url, fetcher, requestOptions };

	const abortControllerRef = useRef<AbortController | null>(null);
	const abortedRef = useRef(false);

	const abort = useCallback(() => {
		abortedRef.current = true;
		abortControllerRef.current?.abort();
		setState((prev) => ({ ...prev, status: "aborted" }));
	}, []);

	const send = useCallback((payload: TPayload) => {
		abortControllerRef.current?.abort();
		abortedRef.current = false;

		const abortController = new AbortController();
		abortControllerRef.current = abortController;

		setState({ text: "", status: "connecting", event: null, error: null });

		const { url, fetcher, requestOptions } = optionsRef.current;
		const body = payload != null ? JSON.stringify(payload) : undefined;

		const doFetch = fetcher({
			url,
			...requestOptions,
			body,
			signal: abortController.signal,
		});

		const consume = async () => {
			try {
				const response = await doFetch;

				if (!response.body) {
					throw new Error("Response body is null");
				}

				let text = "";
				let lastEvent: TextStreamEvent | null = null;

				for await (const event of sseJsonParser<TextStreamEvent>(
					response.body,
				)) {
					if (abortedRef.current) return;

					lastEvent = event;

					if (event.delta != null) text += event.delta;
					if (event.content != null) text = event.content;

					setState({ text, status: "streaming", event, error: null });
				}

				if (abortedRef.current) return;

				setState({
					text,
					status: "done",
					event: lastEvent,
					error: lastEvent ? null : new Error("Stream ended without events"),
				});
			} catch (err) {
				if (err instanceof DOMException && err.name === "AbortError") return;
				if (abortedRef.current) return;
				setState((prev) => ({
					...prev,
					status: "error",
					error: err instanceof Error ? err : new Error(String(err)),
				}));
			}
		};

		consume();
	}, []);

	useEffect(() => {
		return () => {
			abortControllerRef.current?.abort();
		};
	}, []);

	return { ...state, send, abort };
};
