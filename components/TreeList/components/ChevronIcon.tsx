export const ChevronIcon = ({
	expanded,
	size = 16,
}: {
	expanded: boolean;
	size?: number;
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		style={{
			transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
			transition: "transform 0.2s ease",
			transformOrigin: "50% 50%",
		}}
		aria-hidden="true"
	>
		<polygon points="6,9 18,9 12,16" fill="currentColor" />
	</svg>
);
