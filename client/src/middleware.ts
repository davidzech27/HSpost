import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const middleware = (request: NextRequest) => {
	if (request.nextUrl.pathname.startsWith("/post"))
		return NextResponse.rewrite(
			new URL(`${request.nextUrl.protocol}//${request.nextUrl.host}/post`)
		)
}
