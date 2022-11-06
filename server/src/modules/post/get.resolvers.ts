import Resolvers from "types/resolvers"
import { parseResolveInfo, ResolveTree } from "graphql-parse-resolve-info"

const resolvers: Resolvers = {
	Query: {
		post: async (_, { id }, { db }, info) => {
			const {
				fieldsByTypeName: { Post: postFields }
			} = parseResolveInfo(info) as ResolveTree

			const includeComments = !!postFields.comments

			console.log(includeComments)

			return await db.post.findUnique({
				where: {
					id
				},
				include: {
					poster: true,
					comments: includeComments
						? {
								include: {
									commenter: true
								}
						  }
						: false
				}
			})
		}
	}
}

export default resolvers
