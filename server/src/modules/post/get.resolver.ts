import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Query: {
		posts: async (_, { id }, { db }) => {
			return await db.post.findUnique({
				where: {
					id
				}
			})
		}
	}
}

export default resolvers
