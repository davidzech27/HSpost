import { YogaInitialContext, PubSub } from "@graphql-yoga/node"
import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

interface Context extends YogaInitialContext {
	userEmail: string | undefined
	db: PrismaClient
	pubSub: PubSub<{
		[key: string]: [] | [any] | [string | number, any]
	}>
	req: Request
	res: Response
}

type Resolver = (parent: any, args: any, context: Context, info: any) => any

export default interface Resolvers {
	[key: "Query" | "Mutation" | "Subscription" | string]: {
		[key: string]: Resolver | { [key: string]: Resolver }
	}
}
