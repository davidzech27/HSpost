import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Post: {
		poster: async (parent, __, { db }) => {
			return await db.post
				.findUnique({
					where: {
						id: parent.id
					}
				})
				.poster()
		}
	}
}

export default resolvers
