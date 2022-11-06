import { createServer, createPubSub } from "@graphql-yoga/node"
import express from "express"
import { WebSocketServer } from "ws"
import { useServer } from "graphql-ws/lib/use/ws"
import cors from "cors"
import { loadFilesSync } from "@graphql-tools/load-files"
import { join } from "path"
import { PrismaClient } from "@prisma/client"
import Redis from "ioredis"
import { createRedisEventTarget } from "@graphql-yoga/redis-event-target"
import "dotenv/config"

import initializeAuth from "./auth"

const prisma = new PrismaClient({
	log: ["error", "warn", { level: "query", emit: "event" }]
})
prisma.$on("query", (event) => {
	console.log("Query duration: " + event.duration + "ms")
})

const publishClient = new Redis(process.env.REDIS_URL!)
const subscribeClient = new Redis(process.env.REDIS_URL!)
const mainRedisClient = new Redis(process.env.REDIS_URL!)

const eventTarget = createRedisEventTarget({
	publishClient,
	subscribeClient
})

const pubSub = createPubSub({
	eventTarget
})

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
		context: ({
			req,
			res
		}: {
			req: express.Request
			res: express.Response
		}) => {
			return {
				userEmail: req ? req.user : null,
				db: prisma,
				pubSub,
				req,
				res,
				redis: mainRedisClient
			}
		},
		graphiql: {
			subscriptionsProtocol: "WS"
		},
		maskedErrors: false,
		endpoint: "/"
	})

	const app = express()

	app.use(
		cors({
			origin: process.env.CLIENT_URL,
			credentials: true
		})
	)

	initializeAuth(app, prisma)

	app.use(/\//, server)

	const httpServer = app.listen({ port: process.env.PORT }, () =>
		console.log(`Server running on port ${process.env.PORT}`)
	)

	const wsServer = new WebSocketServer({
		server: httpServer,
		path: server.getAddressInfo().endpoint
	})

	useServer(
		{
			execute: (args: any) => args.rootValue.execute(args),
			subscribe: (args: any) => args.rootValue.subscribe(args),
			onSubscribe: async (ctx, msg) => {
				const {
					schema,
					execute,
					subscribe,
					contextFactory,
					parse,
					validate
				} = server.getEnveloped(ctx)
				const args = {
					schema,
					operationName: msg.payload.operationName,
					document: parse(msg.payload.query),
					variableValues: msg.payload.variables,
					contextValue: await contextFactory(),
					rootValue: {
						execute,
						subscribe
					}
				}
				const errors = validate(args.schema, args.document)
				return args
			}
		},
		wsServer
	)
}

startServer()
