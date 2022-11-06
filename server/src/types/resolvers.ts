import { YogaInitialContext, PubSub } from "@graphql-yoga/node"
import { GraphQLResolveInfo } from "graphql"
import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import Redis from "ioredis"

interface Context extends YogaInitialContext {
	userEmail: string | undefined
	db: PrismaClient
	pubSub: PubSub<{
		[key: string]: [] | [any] | [string | number, any]
	}>
	req: Request
	res: Response
	redis: Redis
}

type Resolver = (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
) => any

export default interface Resolvers {
	[key: "Query" | "Mutation" | "Subscription" | string]: {
		[key: string]: Resolver | { [key: string]: Resolver }
	}
}
