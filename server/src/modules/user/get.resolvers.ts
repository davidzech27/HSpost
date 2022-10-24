import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Query: {
		user: async (_, { email }, { db }) => {
			return await db.user.findUnique({
				where: {
					email
				}
			})
		}
	}
}

export default resolvers
