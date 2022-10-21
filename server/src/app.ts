import { createServer } from "@graphql-yoga/node"
import express from "express"
import { loadFilesSync } from "@graphql-tools/load-files"
import { join } from "path"
import { PrismaClient } from "@prisma/client"

import initializeAuth from "./auth"

const prisma = new PrismaClient({ log: ["error", "info", "warn", "query"] })

const startServer = () => {
	const server = createServer({
		schema: {
			typeDefs: loadFilesSync(
				join(__dirname, "./modules/**/*schema.graphql")
			),
			resolvers: loadFilesSync(
				join(__dirname, "./modules/**/*resolver.ts")
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
				req,
				res,
				db: prisma
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

	app.listen({ port: process.env.PORT })
}

startServer()
