import type { NextPage } from "next"
import Router from "next/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

import queryClient from "lib/queryClient"
import useCallOnce from "hooks/useCallOnce"
import api from "lib/api"
import useSignedInStore from "stores/signedInStore"

Router.events.on("routeChangeComplete", () => {
	NProgress.done()
})

const Home: NextPage = () => {
	const signedInStore = useSignedInStore()

	useCallOnce(() => {
		NProgress.start()

		if (JSON.stringify(Router.asPath.endsWith("signin"))) {
			signedInStore.signIn()
		}

		if (!signedInStore.signedIn) {
			return Router.push("/about")
		}

		const prefetchQueries = async () => {
			await Promise.all([
				(async () => {
					await queryClient.prefetchQuery(
						["accessToken"],
						async () => (await api.GetAccessToken()).accessToken
					)

					await queryClient.prefetchQuery(
						["profile"],
						async () => (await api.GetProfile()).profile
					)
				})(),
				queryClient.prefetchQuery(
					["feed"],
					async () => (await api.GetFeed()).feed
				)
			])

			Router.push("/home")
		}

		prefetchQueries()
	})

	return (
		<div className="h-screen w-screen bg-gradient-to-br from-blue to-purple text-[18rem] font-sans font-light text-center pt-[10%] text-main-text">
			HSpost
		</div>
	)
}

export default Home
