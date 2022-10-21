import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Post: {
		poster: async (parent, _, { db }) => {
			return await db.post
				.findUnique({
					where: {
						id: parent.id
					}
				})
				.poster()
		},
		comments: async (parent, _, { db }) => {
			return await db.post
				.findUnique({
					where: {
						id: parent.id
					}
				})
				.comments()
		}
	}
}

export default resolvers
