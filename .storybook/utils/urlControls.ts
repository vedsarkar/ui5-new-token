const extractUrlVariables = (template: string): string[] => {
	const matches = template.matchAll(/\{(\w+)\}/g);
	return [...new Set([...matches].map((m) => m[1]))];
};

export const urlControls = (storyUrl: string) => {
	const vars = extractUrlVariables(storyUrl);
	const argTypes: Record<
		string,
		{ control: "text" } | { table: { disable: true } }
	> = {};
	for (const v of vars) {
		argTypes[v] = { control: "text" as const };
	}
	return { argTypes };
};
