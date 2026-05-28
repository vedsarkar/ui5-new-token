import preview from "@/.storybook/preview";
import { Details } from "./Details";

const meta = preview.meta({
	component: Details,
	tags: ["test"],
});

export default meta;

// Default story - no summary element provided (fallback)
export const Default = meta.story({
	args: {
		children: [
			<p key="1">This is the default content inside the details block.</p>,
			<p key="2">
				When no summary is provided, it uses "Details" as the fallback.
			</p>,
		],
	},
});

// Custom summary (with summary element)
export const WithSummary = meta.story({
	args: {
		children: [
			<summary key="summary">Click to reveal more information</summary>,
			<p key="1">This content is hidden by default.</p>,
			<p key="2">Click the summary above to expand and see this content.</p>,
		],
	},
});

// Nested Markdown content inside details
export const WithNestedContent = meta.story({
	args: {
		children: [
			<summary key="summary">Technical Specifications</summary>,
			<ul key="ul">
				<li>Processor: 8-core CPU</li>
				<li>Memory: 16GB RAM</li>
				<li>Storage: 512GB SSD</li>
			</ul>,
			<p key="p">
				<strong>Note:</strong> These specifications are subject to change.
			</p>,
		],
	},
});

// Open state (initially expanded)
export const InitiallyOpen = meta.story({
	args: {
		open: true,
		children: [
			<summary key="summary">This details block is open by default</summary>,
			<p key="1">
				You can see this content immediately because the details element is set
				to open.
			</p>,
			<p key="2">You can still collapse it by clicking the summary.</p>,
		],
	},
});

// Closed state (initially collapsed)
export const InitiallyClosed = meta.story({
	args: {
		open: false,
		children: [
			<summary key="summary">This details block is closed by default</summary>,
			<p key="1">This content is hidden until you click the summary above.</p>,
		],
	},
});

// Multiple details blocks
export const MultipleDetails = meta.story({
	render: () => (
		<div>
			<Details>
				<summary>First Details Block</summary>
				<p>Content for the first details block.</p>
			</Details>
			<Details>
				<summary>Second Details Block</summary>
				<p>Content for the second details block.</p>
			</Details>
			<Details>
				<summary>Third Details Block</summary>
				<p>Content for the third details block.</p>
			</Details>
		</div>
	),
});

// Complex nested content
export const ComplexContent = meta.story({
	args: {
		children: [
			<summary key="summary">Advanced Configuration Options</summary>,
			<h3 key="h3a">Server Settings</h3>,
			<p key="p1">Configure your server with the following options:</p>,
			<ul key="ul">
				<li>Enable SSL/TLS encryption</li>
				<li>Set up firewall rules</li>
				<li>Configure backup schedules</li>
			</ul>,
			<h3 key="h3b">Database Configuration</h3>,
			<p key="p2">Database settings include:</p>,
			<ol key="ol">
				<li>Connection pooling</li>
				<li>Query optimization</li>
				<li>Index management</li>
			</ol>,
			<p key="p3">
				<em>Remember to test all changes in a staging environment first.</em>
			</p>,
		],
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

// Content with inline code
export const WithInlineCode = meta.story({
	args: {
		children: [
			<summary key="summary">API usage</summary>,
			<p key="p1">
				Use the <code key="c1">fetch()</code> method to retrieve data from the
				endpoint. Set <code key="c2">Content-Type: application/json</code> in
				the request headers.
			</p>,
			<p key="p2">
				Example: <code key="c3">const response = await fetch(url);</code>
			</p>,
		],
	},
});

// Content with pre/code block
export const WithPreBlock = meta.story({
	args: {
		children: [
			<summary key="summary">Example script</summary>,
			<pre key="pre">
				<code>{`function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("World"));`}</code>
			</pre>,
			<p key="p">Run the script with Node.js to see the output.</p>,
		],
	},
});
