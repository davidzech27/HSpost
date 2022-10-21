import { GraphQLYogaError } from "@graphql-yoga/node"
import Resolvers from "types/resolvers"

// TODO: start using Profile instead of user wherever possible

const resolvers: Resolvers = {
	Mutation: {
		createPost: async (_, { text, postVisibility }, { db, userEmail }) => {
			if (userEmail) {
				return await db.post.create({
					data: {
						posterEmail: userEmail,
						text,
						postVisibility
					},
					select: {
						id: true,
						text: true,
						poster: true,
						usersCommented: true,
						postVisibility: true,
						postedOn: true
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
