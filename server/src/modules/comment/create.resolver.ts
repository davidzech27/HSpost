import { GraphQLYogaError } from "@graphql-yoga/node"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Mutation: {
		createComment: async (_, { postId, text }, { db, userEmail }) => {
			if (userEmail) {
				return db.comment.create({
					data: {
						postId,
						text,
						commenterEmail: userEmail
					}
				})
			} else {
				return Promise.reject(
					new GraphQLYogaError(
						"You must be signed in to send a comment"
					)
				)
			}
		}
	}
}

export default resolvers
