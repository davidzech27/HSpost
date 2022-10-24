import { GraphQLYogaError } from "@graphql-yoga/node"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Mutation: {
		createPost: async (_, { text, postVisibility }, { db, userEmail }) => {
			if (userEmail) {
				return await db.post.create({
					data: {
						posterEmail: userEmail,
						text,
						postVisibility
					}
				})
			} else {
				return Promise.reject(
					new GraphQLYogaError(
						"You must be signed in to create a post"
					)
				)
			}
		}
	}
}

export default resolvers
