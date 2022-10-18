import { createServer } from "@graphql-yoga/node"
import { loadFilesSync } from "@graphql-tools/load-files"
import { join } from "path"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({ log: ["error", "info", "warn"] })

const startServer = async () => {
	const server = createServer({
		schema: {
			typeDefs: loadFilesSync(
				join(__dirname, "./modules/**/*schema.graphql")
			),
			resolvers: loadFilesSync(
				join(__dirname, "./modules/**/*resolvers.ts")
			)
		},
		context: ({ req, res }) => ({
			req,
			res,
			db: prisma
		}),
		endpoint: "/"
	})

	server.start()
}

startServer()
