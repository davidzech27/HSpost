import { GraphQLYogaError } from "@graphql-yoga/node"
import { Prisma } from "@prisma/client"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Mutation: {
		updateRelationshipDescription: async (
			_,
			{ friendEmail, description },
			{ db, userEmail }
		) => {
			if (userEmail) {
				try {
					await db.friendship.update({
						data: {
							relationshipDescription: description
						},
						where: {
							friendEmail_userEmail: {
								friendEmail,
								userEmail
							}
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
						"You must be signed in to update relationship descriptions"
					)
				)
			}
		}
	}
}

export default resolvers
