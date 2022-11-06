import useQuery from "lib/useQuery"
import api from "lib/api"
import UserInfo from "components/user/UserInfo"
import Link from "next/link"
import PostInfoDropdown from "components/post/PostInfoDropdown"

const DefaultLeftPanel = () => {
	const { data: friends } = useQuery(
		["friends"],
		async () => (await api.GetFriends()).friends
	)

	const activeFriends = friends?.filter((friend) => !!friend.onPostId) || []
	const offlineFriends = friends?.filter((friend) => !friend.onPostId) || []

	return (
		<div className="flex flex-col">
			{friends?.length ? (
				<div className="text-main-text font-light text-2xl mt-10 mb-4 h-[3.75rem]">
					Friends
				</div>
			) : null}

			{activeFriends.length ? (
				<>
					<div className="text-sub-text font-light text-lg mb-4">
						Active
					</div>
					{activeFriends?.map((friend) => (
						<div key={friend.profile.email} className="mb-5">
							<UserInfo
								email={friend.profile.email}
								name={friend.profile.name}
								bio={friend.profile.bio}
								photo={friend.profile.photo}
								schoolAbbreviation={
									friend.profile.schoolAbbreviation
								}
								subText={
									friend.onPostId && (
										<Link href={`/post/${friend.onPostId}`}>
											<span className="hover:underline">
												Go to post
											</span>
										</Link>
									)
								}
								dropdown={
									<PostInfoDropdown
										postId={friend.onPostId!}
									/>
								}
							/>
						</div>
					))}
				</>
			) : null}

			{offlineFriends.length ? (
				<>
					<div className="text-sub-text font-light text-lg mb-4">
						Offline
					</div>
					{offlineFriends?.map((friend) => (
						<div key={friend.profile.email} className="mb-5">
							<UserInfo
								email={friend.profile.email}
								name={friend.profile.name}
								bio={friend.profile.bio}
								photo={friend.profile.photo}
								schoolAbbreviation={
									friend.profile.schoolAbbreviation
								}
								subText={
									friend.onPostId && (
										<Link href={`/post/${friend.onPostId}`}>
											<span className="hover:underline">
												Go to post
											</span>
										</Link>
									)
								}
							/>
						</div>
					))}
				</>
			) : null}
		</div>
	)
}

export default DefaultLeftPanel
