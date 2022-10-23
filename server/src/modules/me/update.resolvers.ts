import { GraphQLYogaError } from "@graphql-yoga/node"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Mutation: {
		updateProfile: async (
			_,
			{ name, photo, bio, schoolName },
			{ db, userEmail }
		) => {
			if (userEmail) {
				if (
					schoolName &&
					!(await db.school.findUnique({
						where: {
							name_emailDomain: {
								name: schoolName,
								emailDomain: userEmail.slice(
									userEmail.indexOf("@") + 1
								)
							}
						}
					}))
				) {
					return Promise.reject(
						new GraphQLYogaError(
							"This school is not yet registered with HSpost"
						)
					)
				}

				await db.user.update({
					data: {
						name,
						photo,
						bio,
						schoolName
					},
					where: {
						email: userEmail
					}
				})

				return true
			} else {
				return Promise.reject(
					new GraphQLYogaError(
						"You must be signed in to update your profile"
					)
				)
			}
		}
	}
}

export default resolvers
