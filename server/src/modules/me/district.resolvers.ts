import { GraphQLYogaError } from "@graphql-yoga/node"
import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Query: {
		districtInfo: async (_, __, { userEmail, db }) => {
			if (userEmail) {
				const emailDomain = userEmail.slice(userEmail.indexOf("@") + 1)

				const [district, schools] = await Promise.all([
					db.district.findUnique({
						where: {
							emailDomain
						}
					}),
					db.school.findMany({
						where: {
							emailDomain
						}
					})
				])

				return {
					district: district?.name,
					schools: schools.map((school) => school.name)
				}
			} else {
				return Promise.reject(
					new GraphQLYogaError(
						"You must be signed in to get information about your district"
					)
				)
			}
		}
	}
}

export default resolvers
