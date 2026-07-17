import { forwardRef } from "react";

type LinkProps = {
	href: string;
	children?: React.ReactNode;
	[key: string]: unknown;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
	({ href, children, ...props }, ref) => (
		<a href={href} ref={ref} {...props}>
			{children}
		</a>
	),
);

Link.displayName = "Link";

export default Link;
