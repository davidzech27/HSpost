import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Subscription: {
		getNextComment: {
			subscribe: (_, { postId }, { pubSub }) =>
				pubSub.subscribe("NEW_COMMENT", postId),
			resolve: (payload) => payload
		}
	}
}

export default resolvers
