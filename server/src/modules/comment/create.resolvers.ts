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
				const [newComment, _] = await db.$transaction([
					db.comment.create({
						data: {
							text,
							commenterEmail: userEmail,
							replyToId,
							postId
						}
					}),
					db.post.update({
						where: {
							id: postId
						},
						data: {
							commentCount: {
								increment: 1
							}
						}
					})
				])

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
