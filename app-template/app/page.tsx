import { requireUser } from "@/lib/session";

export default async function DashboardPage() {
	const { username, email, tenants } = (await requireUser()).user;

	return (
		<>
			<section>
				<h2 style={{ color: "var(--sapTitleColor)" }}>You are signed in</h2>
				<dl
					style={{
						display: "grid",
						gridTemplateColumns: "auto 1fr",
						gap: "8px 24px",
					}}
				>
					<dt style={{ color: "var(--sapContent_LabelColor)" }}>User</dt>
					<dd style={{ margin: 0 }}>{username}</dd>
					<dt style={{ color: "var(--sapContent_LabelColor)" }}>Email</dt>
					<dd style={{ margin: 0 }}>{email}</dd>
				</dl>
			</section>

			<section style={{ marginTop: "24px" }}>
				<h2 style={{ color: "var(--sapTitleColor)" }}>
					Tenants ({tenants.length})
				</h2>
				{tenants.length > 0 ? (
					<ul style={{ margin: 0, paddingLeft: "20px" }}>
						{tenants.map((tenant) => (
							<li key={tenant}>{tenant}</li>
						))}
					</ul>
				) : (
					<p style={{ color: "var(--sapContent_LabelColor)" }}>
						No tenants are available for this account.
					</p>
				)}
			</section>
		</>
	);
}
