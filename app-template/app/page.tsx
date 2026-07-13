export default function DashboardPage() {
	return (
		<section>
			<h2 style={{ color: "var(--sapTitleColor)" }}>
				Welcome to your Reltio app
			</h2>
			<p style={{ color: "var(--sapContent_LabelColor)" }}>
				You are signed in. Start building: fetch data from the Reltio APIs with
				the <code>useFetch</code> hook in <code>lib/useFetch</code> (it handles
				token refresh and login redirects for you), and compose the UI from{" "}
				<code>@reltio/design</code>.
			</p>
		</section>
	);
}
