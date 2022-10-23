import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	Comment: {
		commenter: async (parent, _, { db }) => {
			return await db.comment
				.findUnique({
					where: {
						id: parent.id
					}
				})
				.commenter({
					select: {
						email: true,
						name: true,
						photo: true,
						bio: true,
						schoolName: true,
						joinedOn: true
					}
				})
		},
		replyTo: async (parent, _, { db }) => {
			return await db.comment
				.findUnique({
					where: {
						id: parent.id
					}
				})
				.replyTo()
		}
	}
}

export default resolvers
