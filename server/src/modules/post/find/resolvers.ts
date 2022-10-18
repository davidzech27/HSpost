import { PrismaClient } from "@prisma/client"

const resolvers = {
	Query: {
		posts: async (_: any, __: any, { db }: { db: PrismaClient }) => {
			return await db.post.findMany({})
		}
	}
}

export default resolvers
