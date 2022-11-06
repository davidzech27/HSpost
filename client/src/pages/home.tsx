import api from "lib/api"
import useQuery from "lib/useQuery"

import useModalStore from "stores/modalStore"
import GetAuth from "components/layouts/GetAuth"
import WithModal from "components/layouts/WithModal"
import Post from "components/post/Post"
import NewPostModal from "components/post/NewPostModal"
import DefaultLeftPanel from "components/layouts/DefaultLeftPanel"
import MainLayout from "components/layouts/MainLayout"
import Header from "components/layouts/Header"
import ProfileDisplay from "components/profile/ProfileDisplay"
import UserInfo from "components/user/UserInfo"

const HomePage = () => {
	const openModal = useModalStore((state) => state.openModal)
	const closeModal = useModalStore((state) => state.closeModal)

	const openPostModal = () => {
		openModal(<NewPostModal close={closeModal} />)
	}

	const { data: feed, isLoading } = useQuery(
		["feed"],
		async () => (await api.GetFeed()).feed
	)

	const { data: friendRequests } = useQuery(
		["friendRequests"],
		async () => (await api.GetFriendRequests()).friendRequests
	)

	const rightPanel = (
		<div className="mt-[2rem] flex flex-col">
			<ProfileDisplay />

			{friendRequests && (
				<div className="bg-bold-surface rounded-[14px] w-full p-5 pb-6 mt-2.5">
					<div className="text-main-text font-extralight h-8 w-full">
						Friend requests
					</div>

					<div className="flex flex-col gap-3 mt-2">
						{friendRequests.length ? (
							friendRequests.map((friendRequest) => (
								<div
									key={friendRequest.email}
									className="flex items-center justify-between pr-4"
								>
									<UserInfo {...friendRequest} />

									<div
										onClick={() =>
											api.AcceptFriendRequest({
												fromEmail: friendRequest.email
											})
										}
										className="text-sub-text text-xl cursor-pointer"
									>
										Accept
									</div>
								</div>
							))
						) : (
							<div className="text-sub-text font-extralight italic">
								No friend requests yet...
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)

	const children = (
		<>
			<Header>
				<div className="flex justify-between items-center text-2xl">
					<div>
						<span className="text-main-text font-light ml-4 mr-8">
							Your feed
						</span>
						<span className="h-[3.75rem] px-4 inline-flex items-center text-sub-text hover:text-main-text font-thin italic bg-medium-surface hover:bg-bold-surface transition-colors duration-[400ms] rounded-xl cursor-pointer">
							from your school
						</span>
					</div>

					<button
						onClick={openPostModal}
						className="h-[3.75rem] w-48 rounded-xl bg-white bg-gradient-to-br from-[#1E5DFF] to-[#864AFF] text-main-text font-light hover:opacity-90 transition-opacity duration-[400ms]"
					>
						New post
					</button>
				</div>
			</Header>
			<div className="grid gap-4">
				{!isLoading &&
					feed?.map((post) => <Post key={post.id} {...post} />)}
			</div>
		</>
	)

	return (
		<WithModal>
			<GetAuth>
				<MainLayout
					rightPanel={rightPanel}
					leftPanel={<DefaultLeftPanel />}
					children={children}
				/>
			</GetAuth>
		</WithModal>
	)
}

export default HomePage
