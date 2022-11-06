import { GraphQLClient } from "graphql-request"
import queryClient from "./queryClient"

const gqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_SERVER_URL!, {
	headers: () => {
		const accessToken = queryClient.getQueryData(["accessToken"])

		if (accessToken) return { authorization: `Bearer ${accessToken}` }
	},
	credentials: "include"
})

export default gqlClient
