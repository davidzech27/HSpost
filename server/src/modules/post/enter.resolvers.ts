import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Mutation: {
		enterPost: (_, { id }, { redis, userEmail }) => {
			console.log(1)
			if (userEmail) {
				redis.setex(`${userEmail}:onpost`, 60, id)
			}

			return true
		}
	}
}

export default resolvers
