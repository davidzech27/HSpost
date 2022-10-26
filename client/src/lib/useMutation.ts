import {
	useMutation as useReactQueryMutation,
	UseMutationOptions
} from "@tanstack/react-query"

const useMutation =
	<TVariables>() =>
	<TData>(
		mutationFn: (variables: TVariables) => Promise<TData>,
		options?: UseMutationOptions<TData, { message: string }, TVariables>
	) => {
		return useReactQueryMutation<TData, { message: string }, TVariables>(
			mutationFn,
			options
		)
	}

export default useMutation
