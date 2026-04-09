function* parseDataLine<T>(line: string): Iterable<T> {
	const trimmed = line.trim();
	if (trimmed === "" || trimmed.startsWith(":")) return;
	if (!trimmed.startsWith("data: ")) return;
	try {
		yield JSON.parse(trimmed.slice(6)) as T;
	} catch {}
}

export async function* sseJsonParser<T>(
	body: ReadableStream<Uint8Array>,
): AsyncIterable<T> {
	const reader = body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";

	try {
		while (true) {
			const { done, value } = await reader.read();

			if (done) {
				break;
			}

			buffer += decoder.decode(value, { stream: true });
			const lines = buffer.split("\n");
			buffer = lines.pop() ?? "";

			for (const line of lines) {
				yield* parseDataLine<T>(line);
			}
		}

		yield* parseDataLine<T>(buffer);
	} finally {
		reader.releaseLock();
	}
}
