import "../styles/globals.css"
import type { AppProps } from "next/app"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Head from "next/head"
import queryClient from "lib/queryClient"

const App = ({ Component }: AppProps) => {
	return (
		<>
			<Head>
				<meta name="referrer" content="no-referrer" />
			</Head>

			<QueryClientProvider client={queryClient}>
				<Component />
				{/* <ReactQueryDevtools /> */}
			</QueryClientProvider>
		</>
	)
}

export default App
