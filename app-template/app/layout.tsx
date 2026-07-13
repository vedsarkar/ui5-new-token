import type { ReactNode } from "react";
import { AppShell } from "./AppShell";
import "./globals.css";

export const metadata = {
	title: "Reltio App",
	description:
		"A Reltio application starter built with @reltio/design and @reltio/auth",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	// Client-first: no server-side auth or data. `AppShell` fetches the session
	// in the browser (showing a preloader) and only renders the chrome and the
	// page once there is a valid session.
	return (
		<html lang="en" data-theme="sap-reltio-light">
			<head>
				{/* SAP Horizon design tokens + SAP 72 fonts from the Reltio Design CDN.
				    Self-host these if you prefer — see https://reltio.design. */}
				<link rel="stylesheet" href="https://reltio.design/variables.css" />
				<link rel="stylesheet" href="https://reltio.design/fonts.css" />
			</head>
			<body>
				<AppShell>{children}</AppShell>
			</body>
		</html>
	);
}
