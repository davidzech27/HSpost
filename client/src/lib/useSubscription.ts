import { useEffect, useState } from "react"
import { createClient, SubscribePayload } from "graphql-ws"
import useCallOnce from "hooks/useCallOnce"
import WebSocket from "ws"
import { DocumentNode } from "graphql"
import queryClient from "./queryClient"

const isBrowser = typeof window !== "undefined"

const client = isBrowser
	? createClient({
			url: process.env.NEXT_PUBLIC_WS_URL!
	  })
	: null

const useSubscription = <TData>(payload: SubscribePayload) => {
	const [result, setResult] = useState<TData | null>(null)
	const [error, setError] = useState<{ message: string } | null>(null)

	useCallOnce(() => {
		if (isBrowser)
			client!.subscribe<TData>(payload, {
				next: (response) => setResult(response.data!),
				error: (response) => setError(response as { message: string }),
				complete: () => {}
			})
	})

	return result
}

export default useSubscription
