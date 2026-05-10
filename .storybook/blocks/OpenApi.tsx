import type { OpenApiSpec } from "../utils/openapi";

type OpenApiProps = {
	spec: OpenApiSpec;
};

export const OpenApi = ({ spec }: OpenApiProps) => (
	<>
		<h1>{spec.info.title}</h1>
		{spec.info.description && <p>{spec.info.description}</p>}
	</>
);
