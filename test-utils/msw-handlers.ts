import { HttpResponse, http } from "msw";

const encoder = new TextEncoder();

const toSseLine = <T>(chunk: T): string => `data: ${JSON.stringify(chunk)}\n`;

/** Streams all SSE chunks then closes the stream. */
export const sseHandler = <T>(url: string, chunks: T[], delay = 0) =>
	http.post(url, () => {
		const stream = new ReadableStream({
			async start(controller) {
				for (const chunk of chunks) {
					if (delay > 0) await new Promise((r) => setTimeout(r, delay));
					controller.enqueue(encoder.encode(toSseLine(chunk)));
				}
				controller.close();
			},
		});
		return new HttpResponse(stream, {
			headers: { "Content-Type": "text/event-stream" },
		});
	});

/** Streams SSE chunks but never closes the stream (for abort testing). */
export const hangingSseHandler = <T>(url: string, chunks: T[]) =>
	http.post(url, () => {
		const stream = new ReadableStream({
			start(controller) {
				for (const chunk of chunks) {
					controller.enqueue(encoder.encode(toSseLine(chunk)));
				}
			},
		});
		return new HttpResponse(stream, {
			headers: { "Content-Type": "text/event-stream" },
		});
	});

/** Returns an HTTP error response with the given status code. */
export const httpErrorHandler = (url: string, status: number) =>
	http.post(url, () => new HttpResponse(null, { status }));

/** Simulates a network failure (fetch rejects with TypeError). */
export const networkErrorHandler = (url: string) =>
	http.post(url, () => HttpResponse.error());

/** Returns a 200 response with a null body. */
export const nullBodyHandler = (url: string) =>
	http.post(url, () => new HttpResponse(null, { status: 200 }));

/** Streams raw SSE lines (strings sent as-is, no `data:` wrapping). */
export const rawSseHandler = (url: string, lines: string[], delay = 0) =>
	http.post(url, () => {
		const stream = new ReadableStream({
			async start(controller) {
				for (const line of lines) {
					if (delay > 0) await new Promise((r) => setTimeout(r, delay));
					controller.enqueue(encoder.encode(`${line}\n`));
				}
				controller.close();
			},
		});
		return new HttpResponse(stream, {
			headers: { "Content-Type": "text/event-stream" },
		});
	});

/** Fetch never resolves — simulates a pending request (for abort-before-response testing). */
export const pendingHandler = (url: string) =>
	http.post(url, () => new Promise(() => {}));
