import { create } from "storybook/theming";

const fontBase =
	'"72", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const fontCode =
	'"72 Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace';

export default create({
	base: "light",
	brandTitle: "Reltio Design Platform",
	brandUrl: "https://reltio.design",
	brandImage: "/logo.png",
	brandTarget: "_self",
	fontBase,
	fontCode,
});
