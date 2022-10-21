import { YogaInitialContext } from "@graphql-yoga/node"
import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

interface Context extends YogaInitialContext {
	userEmail: string | undefined
	db: PrismaClient
	req: Request
	res: Response
}

type Resolver = (parent: any, args: any, context: Context, info: any) => any

export default interface Resolvers {
	[key: "Query" | "Mutation" | "Subscription" | string]: {
		[key: string]: Resolver | { [key: string]: Resolver }
	}
}
