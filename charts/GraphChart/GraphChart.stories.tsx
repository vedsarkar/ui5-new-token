import { faker } from "@faker-js/faker";
import { FullscreenDecorator } from "@/.storybook/blocks/FullscreenDecorator";
import preview from "@/.storybook/preview";
import { GraphChart } from "./GraphChart";
import type { GraphChartLink, GraphChartNode } from "./GraphChart.types";

faker.seed(42);

const ENTITY_TYPES = ["Person", "Organization", "Address", "Phone", "Email"];

const RELATIONSHIP_TYPES = [
	"lives at",
	"works for",
	"phone",
	"email",
	"related to",
	"managed by",
	"parent of",
	"sibling of",
];

function generateEntityGraph(entityCount: number): {
	nodes: GraphChartNode[];
	links: GraphChartLink[];
} {
	const nodes: GraphChartNode[] = [];
	const links: GraphChartLink[] = [];

	for (let i = 0; i < entityCount; i++) {
		nodes.push({
			id: `n${i}`,
			name: faker.person.fullName(),
			value: faker.number.int({ min: 1, max: 20 }),
			category: faker.helpers.arrayElement(ENTITY_TYPES),
		});
	}

	for (let i = 1; i < entityCount; i++) {
		const target = faker.number.int({ min: 0, max: i - 1 });
		links.push({
			source: `n${i}`,
			target: `n${target}`,
			label: faker.helpers.arrayElement(RELATIONSHIP_TYPES),
		});
	}

	const extraLinks = Math.floor(entityCount * 0.3);
	for (let i = 0; i < extraLinks; i++) {
		const a = faker.number.int({ min: 0, max: entityCount - 1 });
		let b = faker.number.int({ min: 0, max: entityCount - 2 });
		if (b >= a) b++;
		links.push({
			source: `n${a}`,
			target: `n${b}`,
			label: faker.helpers.arrayElement(RELATIONSHIP_TYPES),
		});
	}

	return { nodes, links };
}

const smallGraph = generateEntityGraph(15);
const mediumGraph = generateEntityGraph(50);
const largeGraph = generateEntityGraph(120);

const meta = preview.meta({
	title: "Charts/GraphChart",
	component: GraphChart,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [FullscreenDecorator],
	args: {
		nodes: smallGraph.nodes,
		links: smallGraph.links,
	},
});

export default meta;

export const Default = meta.story({});

export const MediumGraph = meta.story({
	args: {
		nodes: mediumGraph.nodes,
		links: mediumGraph.links,
	},
});

export const LargeGraph = meta.story({
	args: {
		nodes: largeGraph.nodes,
		links: largeGraph.links,
	},
});

export const WithUnits = meta.story({
	args: {
		units: "connections",
	},
});

export const Empty = meta.story({
	args: {
		nodes: [],
		links: [],
	},
});

export const CircularLayout = meta.story({
	args: {
		nodes: mediumGraph.nodes,
		links: mediumGraph.links,
		layout: "circular",
	},
});
