import fs from "node:fs";
import postcss from "postcss";
import postcssModules from "postcss-modules";

const generateScopedName = (name, filename) => {
	const componentName = filename.split("/").pop()?.replace(/\.module\.css$/, "");
	const hash = Buffer.from(`${filename}${name}`).toString("base64").slice(0, 5);
	return `${componentName}_${name}__${hash}`;
};

const template = (result) => `import styleInject from 'style-inject';
import json from './${result.opts.from.split("/").pop()}.json';
styleInject(\`\n${result.css}\`);
export default json;
`;

fs.glob(
	["../components/**/*.module.css", "../icons/**/*.module.css"],
	(err, matches) => {
		if (err) throw err;
		matches.forEach(async (path) => {
			const css = fs.readFileSync(path);
			const result = await postcss([
				postcssModules({ generateScopedName }),
			]).process(css, {
				from: path,
			});
			fs.writeFileSync(`${path}.ts`, template(result));
		});
	},
);
