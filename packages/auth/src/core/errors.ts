/**
 * Error types surfaced by `@reltio/auth`.
 *
 * `RequestError` preserves the shape exposed by the legacy `auth-middleware`
 * so consumer error handlers continue to work. Specifically, admin-tools and
 * other consumers read `err.response.json()` to extract the upstream error
 * body from their Express error middleware.
 */

/**
 * Error thrown by the OAuth client when an upstream HTTP call fails or
 * returns a non-2xx status. Network failures are surfaced with `statusCode`
 * `502`. Upstream 4xx and 5xx responses are surfaced with the upstream
 * status (5xx is normalised to `502`).
 */
export class RequestError extends Error {
	override readonly name = "RequestError";
	readonly response: Response | undefined;
	readonly statusCode: number;
	override readonly cause: unknown;

	constructor(
		message: string,
		options: {
			response?: Response;
			statusCode: number;
			cause?: unknown;
		},
	) {
		super(message);
		this.response = options.response;
		this.statusCode = options.statusCode;
		this.cause = options.cause;
	}
}

/**
 * Returns `true` when the value is a `RequestError` instance. Useful in
 * adapter error mapping code that needs to distinguish auth-server failures
 * from other thrown errors.
 */
export function isRequestError(value: unknown): value is RequestError {
	return value instanceof RequestError;
}
