import { GraphQLYogaError } from "@graphql-yoga/node"
import jwt from "jsonwebtoken"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Query: {
		getInitialData: async (_, __, { db, req, res }) => {
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

			const profile = await db.user.findUnique({
				where: {
					email
				}
			})

			const refreshToken = jwt.sign(
				{ email },
				process.env.REFRESH_TOKEN_SECRET!,
				{
					expiresIn: "7d"
				}
			)

			res.cookie("refresh_token", refreshToken, {
				httpOnly: true,
				sameSite: "strict"
			})

			const accessToken = jwt.sign(
				{ email },
				process.env.ACCESS_TOKEN_SECRET!,
				{ expiresIn: "15m" }
			)

			return {
				profile,
				accessToken
			}
		}
	}
}

export default resolvers
