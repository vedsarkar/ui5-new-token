"use client";

import { useTenants } from "@/lib/useTenants";

// Demo page for the `useTenants` hook: walks every configured environment and
// fetches the user's tenants from `{apiPath}/enhancedTenants` in parallel. Each
// environment's block renders on its own as soon as that request settles, so
// the page fills in progressively. Tenants are dumped as raw JSON.
export default function TenantsPage() {
	const { results, isLoading } = useTenants();

	return (
		<section>
			<h2 style={{ color: "var(--sapTitleColor)" }}>Tenants</h2>
			<p style={{ color: "var(--sapContent_LabelColor)" }}>
				Tenants available to you across every configured environment, fetched in
				parallel and shown as each response arrives.
			</p>

			{isLoading && (
				<p style={{ color: "var(--sapContent_LabelColor)" }}>
					Loading environments…
				</p>
			)}

			{results.map((result) => (
				<article
					key={result.environment.name}
					style={{ marginTop: 24 }}
				>
					<h3 style={{ color: "var(--sapTitleColor)", marginBottom: 8 }}>
						{result.environment.label}{" "}
						<span style={{ color: "var(--sapContent_LabelColor)" }}>
							({result.environment.name})
						</span>
					</h3>

					{result.isLoading && (
						<p style={{ color: "var(--sapContent_LabelColor)" }}>Loading…</p>
					)}

					{result.error != null && (
						<p style={{ color: "var(--sapNegativeColor)" }}>
							Failed to load tenants: {result.error}
						</p>
					)}

					{result.tenants != null && (
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
							{JSON.stringify(result.tenants, null, 2)}
						</pre>
					)}
				</article>
			))}
		</section>
	);
}
