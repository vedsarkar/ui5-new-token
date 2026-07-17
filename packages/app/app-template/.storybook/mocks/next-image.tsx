type ImageProps = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	fill?: boolean;
	[key: string]: unknown;
};

export default function Image({
	src,
	alt,
	width,
	height,
	fill,
	priority: _priority,
	quality: _quality,
	loader: _loader,
	placeholder: _placeholder,
	blurDataURL: _blurDataURL,
	unoptimized: _unoptimized,
	...props
}: ImageProps) {
	const style = fill
		? { objectFit: "cover" as const, width: "100%", height: "100%" }
		: undefined;
	return (
		<img
			src={typeof src === "string" ? src : ""}
			alt={alt}
			width={width}
			height={height}
			style={style}
			{...props}
		/>
	);
}
