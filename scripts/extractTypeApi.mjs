import path from "node:path";
import ts from "typescript";

/**
 * TypeScript Compiler API utility that fully resolves a component's props
 * type — walking through generics, intersections, and cross-package imports —
 * and returns a flat list of properties with JSDoc comments and tags.
 *
 * This is the engine that lets the build pipeline inline complete prop tables
 * for components whose canonical type is defined elsewhere (e.g. an endorsed
 * UI5 component re-exported via `ComponentPropsWithoutRef<typeof X>`).
 *
 * Public API:
 *   createTypeExtractor(projectRoot) → extractor
 *   extractor.extractProps(typesFilePath, exportedTypeName) → ResolvedProp[]
 *   extractor.dispose()
 *
 * The extractor lazily creates a single ts.Program covering the whole
 * project (driven by tsconfig.json) and reuses it across calls, so per-
 * component extraction is cheap once the program is warm.
 */

const TYPE_FORMAT_FLAGS =
	ts.TypeFormatFlags.NoTruncation |
	ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope |
	ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType |
	ts.TypeFormatFlags.WriteArrayAsGenericType;

const REACT_INTERNAL_PROPS = new Set([
	"ref",
	"key",
	"jsx",
	"suppressHydrationWarning",
	"suppressContentEditableWarning",
]);

/** Substrings that, when found in a property's declaration file path,
 * mark the property as a generic React/DOM attribute coming from
 * `@types/react` or TypeScript's built-in DOM lib. We skip those props by
 * default — they add hundreds of low-value rows (every aria-*, every event
 * handler, every legacy HTML attribute) and bury the component-specific
 * surface that authors actually care about.
 *
 * To opt back in, pass `keepReactDomProps: true` when calling
 * `extractor.extractProps`. */
const NOISY_DECLARATION_PATH_FRAGMENTS = [
	"node_modules/@types/react/",
	"node_modules/typescript/lib/lib.dom",
	"node_modules/typescript/lib/lib.dom.iterable",
	"node_modules/typescript/lib/lib.es",
];

const isNoisyDeclaration = (declarationFileName) => {
	if (!declarationFileName) return false;
	const normalized = declarationFileName.replaceAll("\\", "/");
	return NOISY_DECLARATION_PATH_FRAGMENTS.some((fragment) =>
		normalized.includes(fragment),
	);
};

const declarationFileFor = (symbol) => {
	const decl = symbol.valueDeclaration ?? symbol.declarations?.[0];
	return decl?.getSourceFile().fileName;
};

const loadTsConfig = (projectRoot) => {
	const configPath = ts.findConfigFile(
		projectRoot,
		ts.sys.fileExists,
		"tsconfig.json",
	);
	if (!configPath) {
		throw new Error(
			`Could not locate tsconfig.json starting from ${projectRoot}`,
		);
	}
	const { config, error } = ts.readConfigFile(configPath, ts.sys.readFile);
	if (error) {
		throw new Error(ts.flattenDiagnosticMessageText(error.messageText, "\n"));
	}
	const parsed = ts.parseJsonConfigFileContent(
		config,
		ts.sys,
		path.dirname(configPath),
	);
	if (parsed.errors.length > 0) {
		const messages = parsed.errors
			.map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"))
			.join("\n");
		throw new Error(`tsconfig parsing errors:\n${messages}`);
	}
	return { rootNames: parsed.fileNames, options: parsed.options };
};

/** Find an exported `type` or `interface` declaration with a specific name in
 * a source file. Returns the AST node or `undefined`. */
const findExportedTypeNode = (sourceFile, name) => {
	for (const stmt of sourceFile.statements) {
		if (
			(ts.isTypeAliasDeclaration(stmt) || ts.isInterfaceDeclaration(stmt)) &&
			stmt.name.text === name &&
			stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
		) {
			return stmt;
		}
	}
	return undefined;
};

/** Pull `@default` and `@deprecated` tags from a prop's JSDoc, plus return
 * any others as a plain map for callers that want to render them. */
const collectJsDocTags = (symbol, checker) => {
	const tags = symbol.getJsDocTags(checker);
	const result = { tags: {} };
	for (const tag of tags) {
		const text = tag.text
			? tag.text
					.map((t) => t.text)
					.join("")
					.trim()
			: "";
		if (tag.name === "default") {
			result.defaultValue = text;
		} else if (tag.name === "deprecated") {
			result.deprecated = text || true;
		} else {
			result.tags[tag.name] = text;
		}
	}
	return result;
};

/** Render the type of a property as a readable string. Long unions are
 * preserved as-is (NoTruncation), aliases outside the current file are kept
 * as their alias names so the cell stays readable. */
const renderType = (checker, symbol, contextNode) => {
	const type = checker.getTypeOfSymbolAtLocation(symbol, contextNode);
	const renderTarget =
		// Strip undefined from optional types (it's signaled by the `optional` flag separately)
		symbol.flags & ts.SymbolFlags.Optional
			? checker.getNonNullableType(type)
			: type;
	return checker.typeToString(renderTarget, contextNode, TYPE_FORMAT_FLAGS);
};

const renderDescription = (symbol, checker) => {
	const parts = symbol.getDocumentationComment(checker);
	if (!parts || parts.length === 0) return "";
	return ts.displayPartsToString(parts).trim();
};

const isOptional = (symbol) => Boolean(symbol.flags & ts.SymbolFlags.Optional);

const buildPropFilter = (options) => (symbol) => {
	if (REACT_INTERNAL_PROPS.has(symbol.getName())) return false;
	// Symbols starting with `__@` are internal (well-known symbols) — skip.
	if (symbol.getName().startsWith("__@")) return false;
	if (options.keepReactDomProps) return true;
	return !isNoisyDeclaration(declarationFileFor(symbol));
};

export const createTypeExtractor = (projectRoot) => {
	const { rootNames, options } = loadTsConfig(projectRoot);
	const program = ts.createProgram({
		rootNames,
		options: { ...options, noEmit: true, skipLibCheck: true },
	});
	const checker = program.getTypeChecker();

	const extractProps = (typesFilePath, exportedTypeName, options = {}) => {
		const filter = buildPropFilter({
			keepReactDomProps: options.keepReactDomProps ?? false,
		});
		const absolutePath = path.resolve(typesFilePath);
		const sourceFile = program.getSourceFile(absolutePath);
		if (!sourceFile) {
			throw new Error(
				`Source file not found in program: ${absolutePath}. Make sure it is included by tsconfig.json.`,
			);
		}

		const node = findExportedTypeNode(sourceFile, exportedTypeName);
		if (!node) {
			throw new Error(
				`Exported type "${exportedTypeName}" not found in ${absolutePath}.`,
			);
		}

		const symbol = checker.getSymbolAtLocation(node.name);
		if (!symbol) {
			throw new Error(
				`Could not resolve symbol for "${exportedTypeName}" in ${absolutePath}.`,
			);
		}

		const declaredType = checker.getDeclaredTypeOfSymbol(symbol);
		// `getApparentType` ensures intersections / generics / mapped types
		// resolve to a concrete object type whose properties we can list.
		const apparentType = checker.getApparentType(declaredType);

		const properties = apparentType
			.getProperties()
			.filter(filter)
			.map((propSymbol) => {
				const name = propSymbol.getName();
				const description = renderDescription(propSymbol, checker);
				const type = renderType(checker, propSymbol, node);
				const { defaultValue, deprecated, tags } = collectJsDocTags(
					propSymbol,
					checker,
				);
				return {
					name,
					type,
					optional: isOptional(propSymbol),
					required: !isOptional(propSymbol),
					defaultValue,
					deprecated,
					description,
					tags,
				};
			});

		properties.sort((a, b) => {
			if (a.required !== b.required) return a.required ? -1 : 1;
			return a.name.localeCompare(b.name);
		});

		return properties;
	};

	return {
		extractProps,
		dispose: () => {
			// ts.Program holds caches; nothing to release explicitly. Method
			// kept for callers that may want to drop references to free GC.
		},
	};
};
