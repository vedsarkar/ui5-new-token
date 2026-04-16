export const FullscreenDecorator = (Story: React.ComponentType) => (
	<div style={{ height: "100vh", padding: 16, boxSizing: "border-box" }}>
		<Story />
	</div>
);
