import { Resolvers } from "types/graphql"
import { Post, User } from "types/models"
import { Maybe } from "types/util"

const resolvers: Resolvers = {
	Post: {
		poster: async (parent: Post, __, { db }): Promise<Maybe<User>> => {
			return await db.post
				.findUnique({
					where: {
						id: parent.id
					}
				})
				.poster({})
		}
	}
}

export default resolvers
