export type TreeLevelLinesProps = {
	// [verticalLinesPerLevel[], isLastChild] — array of booleans for each depth to draw vertical guides
	// and a boolean flag for the current node being the last child.
	levelLine: [boolean[], boolean];
};
