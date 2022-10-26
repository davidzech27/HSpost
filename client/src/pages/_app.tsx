import "../styles/globals.css"
import type { AppProps } from "next/app"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Head from "next/head"
import queryClient from "lib/queryClient"
import api from "lib/api"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import useCallOnce from "hooks/useCallOnce"
import useModalStore from "stores/modalStore"

const App = ({ Component }: AppProps) => {
	const modal = useModalStore((state) => state.modal)

	return (
		<>
			<Head>
				<meta name="referrer" content="no-referrer" />
			</Head>

			<QueryClientProvider client={queryClient}>
				<Component />
				{/* <ReactQueryDevtools /> */}
			</QueryClientProvider>
			{modal}
		</>
	)
}

export default App
