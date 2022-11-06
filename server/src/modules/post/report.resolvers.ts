import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Mutation: {
		report: async (_, { postId }, { db, userEmail }) => {
			if (userEmail) {
				await db.post.update({
					where: {
						id: postId
					},
					data: {
						underReview: true
					}
				})

				return true
			}
		}
	}
}

export default resolvers
