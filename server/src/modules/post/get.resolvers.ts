import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Query: {
		post: async (_, { id }, { db }) => {
			return await db.post.findUnique({
				where: {
					id
				},
				include: {
					poster: true,
					comments: {
						include: {
							commenter: true
						}
					}
				}
			})
		}
	}
}

export default resolvers
