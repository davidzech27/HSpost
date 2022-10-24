import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Comment: {
		commenter: async (parent, _, { db }) => {
			return await db.comment
				.findUnique({
					where: {
						id: parent.id
					}
				})
				.commenter()
		}
	}
}

export default resolvers
