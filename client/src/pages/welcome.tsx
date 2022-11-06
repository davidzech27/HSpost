import { useEffect, useState } from "react"

import GetAuth from "components/layouts/GetAuth"
import api from "lib/api"
import useQuery from "lib/useQuery"
import useMutation from "lib/useMutation"
import queryClient from "lib/queryClient"
import { QueryObserver } from "@tanstack/react-query"
import SendButton from "components/common/SendButton"
import Router from "next/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

Router.events.on("routeChangeComplete", () => {
	NProgress.done()
})

const WelcomePage = () => {
	const [name, setName] = useState("")
	const [school, setSchool] = useState<string | null>(null)

	const [hasAccessToken, setHasAccessToken] = useState(false)

	useEffect(() => {
		const accessTokenObserver = new QueryObserver(queryClient, {
			queryKey: ["accessToken"]
		})

		const unsubscribe = accessTokenObserver.subscribe((accessToken) => {
			if (accessToken) setHasAccessToken(true)
		})

		return unsubscribe
	}, [queryClient])

	const { data: districtInfo } = useQuery(
		["schoolNames"],
		async () => (await api.GetDistrictInfo()).districtInfo,
		{ enabled: hasAccessToken }
	)

	const { mutate: updateProfile } = useMutation()(async () => {
		NProgress.start()
		await api.UpdateProfile({ name, schoolName: school })
		Router.push("/?signin")
	})

	return (
		<GetAuth>
			<div className="h-screen w-screen bg-background flex flex-col items-center">
				<div className="w-2/3">
					<div className="text-8xl text-main-text font-light mt-28">
						Welcome to HSpost!
					</div>
					<div className="text-5xl leading-normal text-main-text font-light opacity-[0.85] mt-6 mx-1">
						Before getting started, tell us more about yourself.
					</div>

					<label className="flex flex-col mt-6 ml-1 text-sub-text">
						What's your preferred name? You can change this later
						<input
							type="text"
							value={name}
							placeholder="Your preferred name"
							onChange={(e) => setName(e.target.value)}
							className="h-12 w-2/3 bg-bold-surface rounded-lg mt-1.5 pl-4 border border-medium-border focus:border-bold-border focus:bg-bold-surface transition-all duration-[400ms] placeholder:opacity-70 hover:placeholder:opacity-100 focus:placeholder:opacity-100 placeholder:duration-[400ms] outline-none"
						/>
					</label>

					<div className="flex justify-between">
						{districtInfo ? (
							<form>
								<label className="flex flex-col mt-10 ml-1 text-sub-text">
									<div className="mb-4">
										Which school in {districtInfo.district}{" "}
										do you attend?
									</div>
									{districtInfo.schools?.map((school) => (
										<label className="">
											<input
												type="radio"
												name="school"
												value={school}
												onChange={(e) =>
													setSchool(e.target.value)
												}
												key={school}
												className="ml-1 my-2 form-radio text-medium-border checked:border-4 bg-bold-surface checked:bg-bold-surface checked:ring-transparent"
											/>
											<span className="ml-2.5">
												{school}
											</span>
										</label>
									))}
								</label>
							</form>
						) : (
							<div></div>
						)}

						<SendButton
							onClick={updateProfile}
							className="h-[5.5rem] w-48 mt-[10.5rem] text-3xl"
							disabled={name === "" || school === null}
						>
							Sign up
						</SendButton>
					</div>
				</div>
			</div>
		</GetAuth>
	)
}

export default WelcomePage
