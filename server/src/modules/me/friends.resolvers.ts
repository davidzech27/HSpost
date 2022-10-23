import { GraphQLYogaError } from "@graphql-yoga/node"
import jwt from "jsonwebtoken"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Query: {
		getFriends: async (_, __, { db, req }) => {
			if (!req.cookies.refresh_token) {
				return Promise.reject(new GraphQLYogaError("Not signed in"))
			}

			let email: string
			try {
				email = (
					jwt.verify(
						req.cookies.refresh_token,
						process.env.REFRESH_TOKEN_SECRET!
					) as jwt.JwtPayload
				).email
			} catch {
				return Promise.reject(new GraphQLYogaError("Session expired"))
			}

			const friendShips = await db.friendship.findMany({
				where: {
					userEmail: email
				},
				select: {
					friend: {
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

			return friendShips.map((friendship) => friendship.friend)
		}
	}
}

export default resolvers
