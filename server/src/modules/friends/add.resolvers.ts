import { GraphQLYogaError } from "@graphql-yoga/node"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Mutation: {
		addFriend: async (_, { toEmail }, { db, userEmail }) => {
			if (userEmail) {
				if (userEmail === toEmail) {
					return Promise.reject(
						new GraphQLYogaError(
							"You can't be friends with yourself"
						)
					)
				}

				await db.friendRequest.create({
					data: {
						toUserEmail: toEmail,
						fromUserEmail: userEmail
					}
				})

				return true
			} else {
				return Promise.reject(
					new GraphQLYogaError(
						"You must be signed in to add a friend"
					)
				)
			}
		}
	}
}

export default resolvers
