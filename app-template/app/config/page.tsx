"use client";

import { useConfig } from "@/lib/useConfig";

// Test page: dumps the public config (whatever `/api/config` chooses to expose)
// as raw JSON, so you can eyeball what actually reaches the browser.
export default function ConfigTestPage() {
	const { data, error, isLoading } = useConfig();

	return (
		<section>
			<h2 style={{ color: "var(--sapTitleColor)" }}>Public config</h2>

			{isLoading && (
				<p style={{ color: "var(--sapContent_LabelColor)" }}>Loading…</p>
			)}

			{error != null && (
				<p style={{ color: "var(--sapNegativeColor)" }}>
					Failed to load the config.
				</p>
			)}

			{data && (
				<pre
					style={{
						margin: 0,
						padding: 16,
						borderRadius: 8,
						overflow: "auto",
						fontSize: 13,
						lineHeight: 1.5,
						color: "var(--sapTextColor)",
						background: "var(--sapList_Background)",
						border: "1px solid var(--sapGroup_ContentBorderColor)",
					}}
				>
					{JSON.stringify(data, null, 2)}
				</pre>
			)}
		</section>
	);
}
