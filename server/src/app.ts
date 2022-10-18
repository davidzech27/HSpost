import { createServer } from "@graphql-yoga/node"
import { DateTimeTypeDefinition, DateTimeResolver } from "graphql-scalars"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const typeDefs = /* GraphQL */ `
	type User {
		email: ID!
		name: String!
		photo: String
		bio: String
		posts: [Post!]
		comments: [Comment!]
		joinedOn: DateTime!
	}

	type Post {
		id: ID!
		text: String!
		poster: User!
		comments: [Comment!]
		postVisibility: PostVisibility!
		postedOn: DateTime!
	}

	enum PostVisibility {
		PUBLIC
		PRIVATE
	}

	type Comment {
		id: ID!
		text: String!
		commenter: User!
		replyTo: Comment
		commentedOn: DateTime!
	}

	type Query {
		posts: [Post!]
	}

	type Mutation {
		createPost(
			text: String
			posterEmail: String
			postVisibility: PostVisibility
		): Post
	}

	${DateTimeTypeDefinition}
`

const resolvers = {
	Query: {
		posts: async (_: any, __: any, { db }: { db: PrismaClient }) => {
			return await db.post.findMany({})
		}
	},
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
	},
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
	},
	DateTime: DateTimeResolver
}

const server = createServer({
	schema: {
		typeDefs,
		resolvers
	},
	context: ({ req, res }) => ({
		req,
		res,
		db: prisma
	}),
	endpoint: "/"
})

server.start()
