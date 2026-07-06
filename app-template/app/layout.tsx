import type { ReactNode } from "react";
import { getUser } from "@/lib/session";
import { AppShell } from "./AppShell";
import "./globals.css";

export const metadata = {
	title: "Reltio App",
	description:
		"A Reltio application starter built with @reltio/design and @reltio/auth",
};

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	// Every rendered page is behind auth (see proxy.ts), so the shell wraps the
	// whole app here — pages just render their content. When there is no valid
	// session the page's own `requireUser()` redirects to the login flow, so we
	// render children bare in that edge case.
	const session = await getUser();

	return (
		<html lang="en" data-theme="sap-reltio-light">
			<head>
				{/* SAP Horizon design tokens + SAP 72 fonts from the Reltio Design CDN.
				    Self-host these if you prefer — see https://reltio.design. */}
				<link rel="stylesheet" href="https://reltio.design/variables.css" />
				<link rel="stylesheet" href="https://reltio.design/fonts.css" />
			</head>
			<body>
				{session ? (
					<AppShell
						user={{
							username: session.user.username,
							email: session.user.email,
						}}
					>
						{children}
					</AppShell>
				) : (
					children
				)}
			</body>
		</html>
	);
}
