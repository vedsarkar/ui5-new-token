import type { OpenApiProps } from "./OpenApi.types";

export const OpenApi = ({ spec }: OpenApiProps) => (
	<>
		<h1>{spec.info.title}</h1>
		{spec.info.description && <p>{spec.info.description}</p>}
	</>
);
