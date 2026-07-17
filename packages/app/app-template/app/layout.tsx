import { Suspense, type ReactNode } from "react";
import { AppShell } from "./AppShell";
import "./globals.css";

export const metadata = {
	title: "Reltio App",
	description:
		"A Reltio application starter built with @reltio/design and @reltio/auth",
};

// This app is browser-only — it does not support SSR. Client hooks that read
// the URL (`useSearchParams`, `usePathname`) can only resolve in the browser,
// so at build time Next would abort prerendering any route with a
// "missing-suspense-with-csr-bailout" error. A single Suspense boundary around
// the whole app (which `AppShell` and every page live inside) makes Next emit
// this fallback as the static shell and defer the client render to the browser.
// It covers every current and future page, so template users never have to wrap
// `useSearchParams` themselves.
const fullScreen = {
	display: "flex",
	height: "100vh",
	alignItems: "center",
	justifyContent: "center",
} as const;

export default function RootLayout({ children }: { children: ReactNode }) {
	// Client-first: no server-side auth or data. `AppShell` fetches the session
	// in the browser (showing a preloader) and only renders the chrome and the
	// page once there is a valid session.
	return (
		<html lang="en" data-theme="sap-reltio-light">
			<head>
				<link rel="stylesheet" href="https://reltio.design/variables.css" />
				<link rel="stylesheet" href="https://reltio.design/fonts.css" />
			</head>
			<body>
				<Suspense fallback={<div style={fullScreen} />}>
					<AppShell>{children}</AppShell>
				</Suspense>
			</body>
		</html>
	);
}
