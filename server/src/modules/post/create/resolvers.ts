import { Resolvers } from "types/graphql"
import { Post, PostVisibility } from "types/models"

const resolvers: Resolvers = {
	Mutation: {
		createPost: async (
			_,
			{
				text,
				posterEmail,
				postVisibility
			}: {
				text: string
				posterEmail: string
				postVisibility: PostVisibility
			},
			{ db }
		): Promise<Post> => {
			return await db.post.create({
				data: {
					text,
					posterEmail,
					postVisibility
				}
			})
		}
	}
}

export default resolvers
