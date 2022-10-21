import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	User: {
		posts: async (parent, _, { db }) => {
			return await db.post.findMany({
				where: {
					posterEmail: parent.email
				}
			})
		}
	}
}

export default resolvers
