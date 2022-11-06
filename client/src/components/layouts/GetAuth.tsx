import { FC, ReactElement } from "react"
import useQuery from "lib/useQuery"
import queryClient from "lib/queryClient"
import api from "lib/api"
import useCallOnce from "hooks/useCallOnce"

const GetAuth: FC<{ children: ReactElement }> = ({ children }) => {
	const { data: accessToken, refetch } = useQuery(
		["accessToken"],
		async () => (await api.GetAccessToken()).accessToken,
		{
			onSuccess: () => {
				queryClient.prefetchQuery(
					["profile"],
					async () => (await api.GetProfile()).profile
				)
			}
		}
	)

	useCallOnce(() =>
		setTimeout(() => setInterval(refetch, 1000 * 60 * 15), 1000 * 60 * 14)
	)

	return children
}

export default GetAuth
