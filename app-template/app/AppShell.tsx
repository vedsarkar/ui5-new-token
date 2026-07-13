"use client";

import type { CheckTokenResponse } from "@reltio/auth/types";
import { BusyIndicator, ShellBar, UserMenu } from "@reltio/design/components";
import type { CSSProperties, ReactNode } from "react";
import { useFetch } from "@/lib/useFetch";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const fullScreen: CSSProperties = {
	display: "flex",
	height: "100vh",
	alignItems: "center",
	justifyContent: "center",
};

// Send the browser to the logout flow; afterwards it lands on the app root
// (which then bounces to login). The `returnTo` is client-set — only the
// browser knows the real public URL.
const signOut = (): void => {
	const returnTo = encodeURIComponent(`${window.location.origin}${BASE_PATH}/`);
	window.location.href = `${BASE_PATH}/auth/logout?returnTo=${returnTo}`;
};

/**
 * Application chrome and the client-first session gate in one.
 *
 * It fetches the signed-in user with `useFetch` (the browser's first request,
 * `POST /auth/checkToken`) — no context/provider: any other component that needs
 * the user just calls `useFetch` for the same URL and shares the deduplicated
 * (and, later, cached) result. Until it resolves the user sees a blank screen
 * with a preloader; a `401` is handled inside `useFetch` (refresh, then login).
 */
export function AppShell({ children }: { children: ReactNode }) {
	const { data: session, error } = useFetch<CheckTokenResponse>(
		"/auth/checkToken",
		{ method: "POST" },
	);

	if (error) {
		return (
			<div style={{ ...fullScreen, color: "var(--sapNegativeColor)" }}>
				Could not reach the server. Please try again later.
			</div>
		);
	}

	if (!session) {
		return (
			<div style={fullScreen}>
				<BusyIndicator active delay={0} />
			</div>
		);
	}

	const { username, email } = session.user;

	return (
		<>
			<ShellBar
				primaryTitle="App Template"
				userMenu={
					<UserMenu
						user={{ username, email }}
						appVersion="0.1.0"
						onSignOut={signOut}
					/>
				}
			/>
			<main
				style={{ maxWidth: "760px", margin: "0 auto", padding: "24px 16px" }}
			>
				{children}
			</main>
		</>
	);
}
