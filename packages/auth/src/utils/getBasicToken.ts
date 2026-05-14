/**
 * HTTP Basic authentication helper.
 *
 * Encodes `clientId:clientSecret` as base64 for use in an
 * `Authorization: Basic <token>` header.
 *
 * Uses `btoa` (a Web standard available since Node 16) rather than the
 * `Buffer` API so the implementation works in any runtime that supports
 * Web Crypto and Fetch.
 */
export function getBasicToken(clientId: string, clientSecret: string): string {
	return btoa(`${clientId}:${clientSecret}`);
}
