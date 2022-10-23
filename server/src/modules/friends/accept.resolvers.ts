import { GraphQLYogaError } from "@graphql-yoga/node"
import { Prisma } from "@prisma/client"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Mutation: {
		acceptFriend: async (_, { fromEmail }, { db, userEmail }) => {
			if (userEmail) {
				try {
					await db.$transaction([
						db.friendRequest.delete({
							where: {
								toUserEmail_fromUserEmail: {
									toUserEmail: userEmail,
									fromUserEmail: fromEmail
								}
							}
						}),
						db.friendship.createMany({
							data: [
								{
									friendEmail: fromEmail,
									userEmail: userEmail
								},
								{
									friendEmail: userEmail,
									userEmail: fromEmail
								}
							]
						})
					])
				} catch (error) {
					if (error instanceof Prisma.PrismaClientKnownRequestError) {
						if (error.code === "P2025") {
							return Promise.reject(
								new GraphQLYogaError(
									"You do not have a friend request from this user"
								)
							)
						} else throw new Error()
					}
				}

				return true
			} else {
				return Promise.reject(
					new GraphQLYogaError(
						"You must be signed in to accept a friend request"
					)
				)
			}
		}
	}
}

export default resolvers
