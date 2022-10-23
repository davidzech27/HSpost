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
				.poster({
					select: {
						email: true,
						name: true,
						photo: true,
						bio: true,
						schoolName: true,
						joinedOn: true
					}
				})
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
