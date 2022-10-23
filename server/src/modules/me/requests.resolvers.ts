import { GraphQLYogaError } from "@graphql-yoga/node"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Query: {
		getFriendRequests: async (_, __, { db, userEmail }) => {
			if (userEmail) {
				const friendRequests = await db.friendRequest.findMany({
					where: {
						toUserEmail: userEmail
					},
					select: {
						fromUser: {
							select: {
								email: true,
								name: true,
								photo: true,
								bio: true,
								schoolName: true,
								joinedOn: true
							}
						}
					}
				})

				return friendRequests.map(
					(friendRequest) => friendRequest.fromUser
				)
			} else {
				return Promise.reject(new GraphQLYogaError("Not signed in"))
			}
		}
	}
}

export default resolvers
