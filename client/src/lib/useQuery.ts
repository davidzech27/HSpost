import {
	useQuery as useReactQueryQuery,
	UseQueryOptions
} from "@tanstack/react-query"

const useQuery = <TData>(
	key: Array<string | number>,
	queryFn: () => Promise<TData>,
	options?: UseQueryOptions<TData, { message: string }>
) => {
	return useReactQueryQuery<TData, { message: string }>(key, queryFn, options)
}

export default useQuery
