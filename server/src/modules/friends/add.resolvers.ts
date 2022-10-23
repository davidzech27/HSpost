import { GraphQLYogaError } from "@graphql-yoga/node"
import { Prisma } from "@prisma/client"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Mutation: {
		addFriend: async (_, { toEmail }, { db, userEmail }) => {
			if (userEmail) {
				if (userEmail === toEmail) {
					return Promise.reject(
						new GraphQLYogaError(
							"You can't be friends with yourself"
						)
					)
				}

				try {
					await db.friendRequest.create({
						data: {
							toUserEmail: toEmail,
							fromUserEmail: userEmail
						}
					})

					return true
				} catch (error) {
					if (error instanceof Prisma.PrismaClientKnownRequestError) {
						if (error.code === "P2002") {
							return Promise.reject(
								new GraphQLYogaError(
									"You've already sent this user a friend request"
								)
							)
						} else throw new Error()
					}
				}
			} else {
				return Promise.reject(
					new GraphQLYogaError(
						"You must be signed in to add a friend"
					)
				)
			}
		}
	}
}

export default resolvers
