export const ChevronIcon = ({ expanded }: { expanded: boolean }) => {
	return (
		<svg
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
};
