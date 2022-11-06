import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Query: {
		feed: async (_, { take = 20, skip = 0 }, { db }) => {
			return await db.post.findMany({
				orderBy: [
					{
						commentCount: "desc"
					},
					{
						postedOn: "desc"
					}
				],
				take,
				skip
			})
		}
	}
}

export default resolvers
