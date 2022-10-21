import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Query: {
		feed: async (_, { take = 20, afterId }, { db }) => {
			if (!afterId) {
				return await db.post.findMany({
					orderBy: {
						usersCommented: "desc"
					},
					take
				})
			} else {
				return await db.post.findMany({
					orderBy: {
						usersCommented: "desc"
					},
					cursor: {
						id: afterId
					},
					skip: 1,
					take
				})
			}
		}
	}
}

export default resolvers
