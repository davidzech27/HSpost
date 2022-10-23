import { GraphQLYogaError } from "@graphql-yoga/node"
import { Prisma } from "@prisma/client"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Mutation: {
		removeFriend: async (_, { ofEmail }, { db, userEmail }) => {
			if (userEmail) {
				try {
					await db.friendship.deleteMany({
						where: {
							OR: [
								{
									friendEmail: ofEmail,
									userEmail: userEmail
								},
								{
									friendEmail: userEmail,
									userEmail: ofEmail
								}
							]
						}
					})

					return true
				} catch (error) {
					if (error instanceof Prisma.PrismaClientKnownRequestError) {
						if (error.code === "P2025") {
							return Promise.reject(
								new GraphQLYogaError(
									"You are not friends with this user"
								)
							)
						} else throw new Error()
					}
				}
			} else {
				return Promise.reject(
					new GraphQLYogaError(
						"You must be signed in to remove a friend"
					)
				)
			}
		}
	}
}

export default resolvers
