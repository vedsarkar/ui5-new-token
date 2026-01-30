import preview from "@/.storybook/preview";
import { MarkdownDetails } from "./MarkdownDetails";

const meta = preview.meta({
	component: MarkdownDetails,
	parameters: {
		layout: "padded",
	},
});

// Default story - no summary element provided (fallback)
export const Default = meta.story({
	args: {
		children: (
			<>
				<p>This is the default content inside the details block.</p>
				<p>When no summary is provided, it uses "Details" as the fallback.</p>
			</>
		),
	},
});

// Custom summary (with summary element)
export const WithSummary = meta.story({
	args: {
		children: (
			<>
				<summary>Click to reveal more information</summary>
				<p>This content is hidden by default.</p>
				<p>Click the summary above to expand and see this content.</p>
			</>
		),
	},
});

// Nested Markdown content inside details
export const WithNestedContent = meta.story({
	args: {
		children: (
			<>
				<summary>Technical Specifications</summary>
				<ul>
					<li>Processor: 8-core CPU</li>
					<li>Memory: 16GB RAM</li>
					<li>Storage: 512GB SSD</li>
				</ul>
				<p>
					<strong>Note:</strong> These specifications are subject to change.
				</p>
			</>
		),
	},
});

// Open state (initially expanded)
export const InitiallyOpen = meta.story({
	args: {
		open: true,
		children: (
			<>
				<summary>This details block is open by default</summary>
				<p>
					You can see this content immediately because the details element is
					set to open.
				</p>
				<p>You can still collapse it by clicking the summary.</p>
			</>
		),
	},
});

// Closed state (initially collapsed)
export const InitiallyClosed = meta.story({
	args: {
		open: false,
		children: (
			<>
				<summary>This details block is closed by default</summary>
				<p>This content is hidden until you click the summary above.</p>
			</>
		),
	},
});

// Multiple details blocks
export const MultipleDetails = meta.story({
	render: () => (
		<div>
			<MarkdownDetails>
				<summary>First Details Block</summary>
				<p>Content for the first details block.</p>
			</MarkdownDetails>
			<MarkdownDetails>
				<summary>Second Details Block</summary>
				<p>Content for the second details block.</p>
			</MarkdownDetails>
			<MarkdownDetails>
				<summary>Third Details Block</summary>
				<p>Content for the third details block.</p>
			</MarkdownDetails>
		</div>
	),
});

// Complex nested content
export const ComplexContent = meta.story({
	args: {
		children: (
			<>
				<summary>Advanced Configuration Options</summary>
				<h3>Server Settings</h3>
				<p>Configure your server with the following options:</p>
				<ul>
					<li>Enable SSL/TLS encryption</li>
					<li>Set up firewall rules</li>
					<li>Configure backup schedules</li>
				</ul>
				<h3>Database Configuration</h3>
				<p>Database settings include:</p>
				<ol>
					<li>Connection pooling</li>
					<li>Query optimization</li>
					<li>Index management</li>
				</ol>
				<p>
					<em>Remember to test all changes in a staging environment first.</em>
				</p>
			</>
		),
	},
});

// Edge case: Empty content
export const EmptyContent = meta.story({
	args: {
		children: <summary>Empty Details Block</summary>,
	},
});

// Edge case: No summary, no content
export const MinimalContent = meta.story({
	args: {
		children: <p>Minimal content without summary</p>,
	},
});
