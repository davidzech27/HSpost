import { useEffect, useState } from "react"
import queryClient from "lib/queryClient"
import { ProfileFragment } from "hooks/generated"
import useQuery from "lib/useQuery"
import { QueryObserver } from "@tanstack/react-query"
import api from "lib/api"

const ProfileDisplay = () => {
	const { data: profile } = useQuery(
		["profile"],
		async () => (await api.GetProfile()).profile
	)

	return (
		<>
			{profile ? (
				<div className="bg-bold-surface rounded-[14px] w-full p-5">
					<div className="flex flex-col items-start">
						{profile.photo ? (
							<img
								src={profile.photo}
								alt="profile photo"
								className="h-24 w-24 rounded-full"
							/>
						) : (
							<div className="h-24 w-24"></div>
						)}

						<span className="mt-3 text-main-text text-lg font-medium tracking-wide">
							{profile.name}
						</span>
						<span className="text-sub-text text-md font-extralight tracking-wide break-all">
							{profile.email}
						</span>

						<div className="grid grid-cols-2 mt-1.5">
							<div>
								<span className="text-main-text text-md font-medium">
									{profile.postCount}
								</span>{" "}
								<span className="text-sub-text text-md font-extralight tracking-wide">
									posts
								</span>
							</div>

							<div>
								<span className="text-main-text text-md font-medium">
									{profile.commentCount}
								</span>{" "}
								<span className="text-sub-text text-md font-extralight tracking-wide">
									comments
								</span>
							</div>
						</div>

						<div className="text-sub-text text-md font-extralight mt-2.5">
							{profile.bio}
						</div>

						{profile.schoolName && (
							<div className="mt-6 text-main-text opacity-80 font-">
								Student at {profile.schoolName}
							</div>
						)}
					</div>
				</div>
			) : null}
		</>
	)
}

export default ProfileDisplay
