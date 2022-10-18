import { PrismaClient } from "@prisma/client"

const resolvers = {
	Mutation: {
		createPost: async (
			_: any,
			{ text, posterEmail, postVisibility }: any,
			{ db }: { db: PrismaClient }
		) => {
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
