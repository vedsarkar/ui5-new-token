/**
 * Public entry for `@reltio/auth/next`.
 *
 * Consumers on the Next.js App Router install `@reltio/auth` and import
 * the handler factory from this subpath:
 *
 *   import { createNextAuth } from "@reltio/auth/next";
 *
 *   const { handlers } = createNextAuth({ ... });
 *   export const { GET, POST } = handlers;
 *
 * No Pages Router adapter is exported in v1. Pages Router applications
 * should integrate through `@reltio/auth/express` on a custom Express
 * server.
 */

export * from "./createNextAuth";
