import type { StreamFetcherInput } from "./useTextStream.types";

export const defaultFetcher = ({
	url,
	body,
	signal,
	...requestOptions
}: StreamFetcherInput): Promise<Response> => {
	if (!url) {
		return Promise.reject(
			new Error("useTextStream: url is required when no fetcher is provided"),
		);
	}

	return fetch(url, { ...requestOptions, body, signal }).then((response) => {
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}
		return response;
	});
};
