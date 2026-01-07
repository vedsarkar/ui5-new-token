import fs from "node:fs";
import postcss from "postcss";
import postcssModules from "postcss-modules";

const template = (result) => `import styleInject from 'style-inject';
import json from './${result.opts.from.split("/").pop()}.json';
styleInject(\`\n${result.css}\`);
export default json;
`;

fs.glob("../../components/**/*.module.css", (err, matches) => {
	if (err) throw err;
	matches.forEach(async (path) => {
		const css = fs.readFileSync(path);
		const result = await postcss([postcssModules]).process(css, { from: path });
		fs.writeFileSync(`${path}.ts`, template(result));
	});
});
