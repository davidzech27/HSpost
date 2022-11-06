import Resolvers from "types/resolvers"

const resolvers: Resolvers = {
	User: {
		posts: async (parent, _, { db }) => {
			return await db.post.findMany({
				where: {
					posterEmail: parent.email
				}
			})
		},
		friendships: async (parent, _, { db }) => {
			return await db.friendship.findMany({
				where: {
					userEmail: parent.email
				},
				select: {
					friend: true,
					relationshipDescription: true
				}
			})
		},
		commentCount: async (parent, _, { db }) => {
			return await db.comment.count({
				where: { commenterEmail: parent.email }
			})
		},
		postCount: async (parent, _, { db }) => {
			return await db.post.count({
				where: { posterEmail: parent.email }
			})
		}
	}
}

export default resolvers
