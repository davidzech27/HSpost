import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Query: {
		getUser: async (_, { email }, { db }) => {
			return await db.user.findUnique({
				where: {
					email
				}
			})
		}
	}
}

export default resolvers
