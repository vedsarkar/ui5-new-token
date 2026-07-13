export type TUseFetchAction<R> = (url: string) => Promise<R>;

export type TUseFetch<R, E> = {
	data?: R;
	error?: E;
	isLoading: boolean;
};
