"use client";

import { ShellBar, UserMenu } from "@reltio/design/components";
import type { ReactNode } from "react";

type AppShellProps = {
	/** Signed-in user, from the introspected token (see lib/session.ts). */
	user: { username: string; email: string };
	children: ReactNode;
};

/**
 * Application chrome: the Reltio ShellBar with a UserMenu. Sign Out delegates
 * to the `@reltio/auth` logout endpoint, which clears the session cookies and
 * redirects back to the login flow.
 */
export function AppShell({ user, children }: AppShellProps) {
	return (
		<>
			<ShellBar
				primaryTitle="App Template"
				userMenu={
					<UserMenu
						user={user}
						appVersion="0.1.0"
						onSignOut={() => {
							window.location.href = "/auth/logout";
						}}
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
