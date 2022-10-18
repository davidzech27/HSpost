import { PrismaClient } from "@prisma/client"

const resolvers = {
	Post: {
		poster: (parent: any, __: any, { db }: { db: PrismaClient }) => {
			return db.post
				.findUnique({
					where: {
						id: parent.id
					}
				})
				.poster()
		}
	}
}

export default resolvers
