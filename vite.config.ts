import { defineConfig } from "vite";

export default defineConfig({
	css: {
		modules: {
			generateScopedName: (name, filename) => {
				const componentName = filename
					.split("/")
					.pop()
					?.replace(/\.module\.css$/, "");
				const hash = Buffer.from(`${filename}${name}`)
					.toString("base64")
					.slice(0, 5);
				return `${componentName}_${name}__${hash}`;
			},
		},
	},
});
