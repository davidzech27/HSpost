import { GraphQLYogaError } from "@graphql-yoga/node"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Mutation: {
		createComment: async (
			_,
			{ postId, text, replyToId },
			{ db, userEmail, pubSub }
		) => {
			if (userEmail) {
				const newComment = await db.post.update({
					data: {
						comments: {
							create: {
								text,
								commenterEmail: userEmail,
								replyToId
							}
						},
						commentCount: {
							increment: 1
						}
					},
					where: {
						id: postId
					}
				})

				pubSub.publish("NEW_COMMENT", postId, newComment)

				return newComment
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
