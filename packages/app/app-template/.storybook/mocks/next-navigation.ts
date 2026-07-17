import { createContext, useContext } from "react";
import { fn } from "storybook/test";

type NavigationState = {
	pathname: string;
	searchParams: URLSearchParams;
	params: Record<string, string>;
};

const defaultState: NavigationState = {
	pathname: "/",
	searchParams: new URLSearchParams(),
	params: {},
};

/**
 * React context that isolates navigation state per story.
 * The `withAppShell` decorator wraps each story in a provider
 * so multiple stories on the Docs page don't share state.
 */
export const NavigationContext = createContext<NavigationState>(defaultState);

export const useRouter = () => ({
	push: fn().mockName("router.push"),
	replace: fn().mockName("router.replace"),
	back: fn().mockName("router.back"),
	forward: fn().mockName("router.forward"),
	refresh: fn().mockName("router.refresh"),
	prefetch: fn().mockName("router.prefetch"),
});

export const usePathname = () => useContext(NavigationContext).pathname;

export const useSearchParams = () => useContext(NavigationContext).searchParams;

export const useParams = () => useContext(NavigationContext).params;

export const redirect = fn().mockName("redirect");

export const notFound = fn().mockName("notFound");

export const useSelectedLayoutSegment = () => null;

export const useSelectedLayoutSegments = () => [];
