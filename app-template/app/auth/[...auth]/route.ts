import { handlers } from "@/lib/auth";

// Mounts the five Reltio auth endpoints on this catch-all route:
//   /auth/login  /auth/logout  /auth/callback  /auth/refreshToken  /auth/checkToken
export const { GET, POST } = handlers;
