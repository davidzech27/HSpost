import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Query: {
		post: async (_, { id }, { db }) => {
			return await db.post.findUnique({
				where: {
					id
				}
			})
		}
	}
}

export default resolvers
