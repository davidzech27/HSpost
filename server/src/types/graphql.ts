import { YogaInitialContext } from "@graphql-yoga/node"
import { PrismaClient } from "@prisma/client"

interface Context extends YogaInitialContext {
	db: PrismaClient
	req: any
	res: any
}

type Resolver = (parent: any, args: any, context: Context, info: any) => any

export interface Resolvers {
	[key: string]: {
		[key: string]: Resolver | { [key: string]: Resolver }
	}
}
