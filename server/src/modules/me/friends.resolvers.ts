import { GraphQLYogaError } from "@graphql-yoga/node"
import jwt from "jsonwebtoken"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Query: {
		friends: async (_, __, { db, req }) => {
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

			const friendships = await db.friendship.findMany({
				where: {
					userEmail: email
				},
				select: {
					friend: true,
					relationshipDescription: true
				}
			})

			return friendships.map((friendship) => friendship.friend)
		}
	}
}

export default resolvers
