import { createServer, createPubSub } from "@graphql-yoga/node"
import express from "express"
import { loadFilesSync } from "@graphql-tools/load-files"
import { join } from "path"
import { PrismaClient } from "@prisma/client"

import initializeAuth from "./auth"

const prisma = new PrismaClient({ log: ["error", "info", "warn", "query"] })

const pubSub = createPubSub()

const startServer = () => {
	const server = createServer({
		schema: {
			typeDefs: loadFilesSync(
				join(__dirname, "./modules/**/*schema.graphql")
			),
			resolvers: loadFilesSync(
				join(__dirname, "./modules/**/*resolvers.ts")
			)
		},
		context: ({
			req,
			res
		}: {
			req: express.Request
			res: express.Response
		}) => {
			return {
				userEmail: req.user,
				db: prisma,
				pubSub,
				req,
				res
			}
		},
		cors: {
			origin: process.env.CLIENT_URL,
			credentials: true
		}
	})

	const app = express()

	initializeAuth(app, prisma)

	app.use(/\//, server)

	app.listen({ port: process.env.PORT }, () =>
		console.log(`Server running on port ${process.env.PORT}`)
	)
}

startServer()
