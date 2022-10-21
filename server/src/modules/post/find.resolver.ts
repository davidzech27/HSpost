import { Resolvers } from "types/graphql"
import { Post } from "types/models"
import { Maybe } from "types/util"

const resolvers: Resolvers = {
	Query: {
		posts: async (_, __, { db }): Promise<Maybe<Post[]>> => {
			return await db.post.findMany({})
		}
	}
}

export default resolvers
