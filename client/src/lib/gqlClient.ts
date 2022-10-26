import { GraphQLClient } from "graphql-request"
import queryClient from "./queryClient"
import { GetAccessTokenQuery } from "hooks/generated"

const gqlClient = new GraphQLClient("http://localhost:4000", {
	headers: () => {
		const accessToken = queryClient.getQueryData(["accessToken"])

		if (accessToken) return { authorization: `Bearer ${accessToken}` }
	},
	credentials: "include"
})

export default gqlClient
