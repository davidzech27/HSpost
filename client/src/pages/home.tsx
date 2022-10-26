import { useState } from "react"

import api from "lib/api"
import { PostVisibility } from "hooks/generated"
import useQuery from "lib/useQuery"
import useMutation from "lib/useMutation"
import useCallOnce from "hooks/useCallOnce"
import useModalStore from "stores/modalStore"

import Post from "components/post/Post"
import NewPostModal from "components/post/NewPostModal"

const HomePage = () => {
	const { refetch } = useQuery(
		["accessToken"],
		async () => (await api.GetAccessToken()).accessToken
	)

	useCallOnce(() =>
		setTimeout(() => setInterval(refetch, 1000 * 60 * 15), 1000 * 60 * 14)
	)

	const openModal = useModalStore((state) => state.openModal)
	const closeModal = useModalStore((state) => state.closeModal)

	const openPostModal = () => {
		openModal(<NewPostModal close={closeModal} />)
	}

	const [text, setText] = useState("")

	const { mutate } = useMutation<{ text: string }>()(
		async ({ text }) =>
			await api.CreatePost({
				text,
				postVisibility: PostVisibility.Public
			})
	)

	const { data: feed, isLoading } = useQuery(
		["feed"],
		async () => (await api.GetFeed()).feed
	)

	return (
		<div className="min-h-screen grid grid-cols-4 bg-background gap-[40px] px-[60px] font-sans">
			<div className="h-screen col-span-1">
				<div className="flex pt-14 bg-background sticky top-0 z-30">
					<div className="h-20 w-44 mx-auto mt-12 rounded-xl group overflow-hidden relative">
						<div
							className="w-full h-full absolute top-0 left-0 origin-bottom-left rotate-[-98deg] group-hover:rotate-0"
							style={{
								transitionProperty: "transform",
								transitionTimingFunction:
									"cubic-bezier(0.8, 0.1, 0, 1)",
								transitionDuration: "400ms"
							}}
						>
							<div
								className="h-[130%] w-[136%] absolute bottom-[-3%] right-[-8%] bg-gradient-to-br from-[#1E5DFF] to-[#864AFF]"
								style={{
									borderRadius: "100% 50%"
								}}
							></div>

							<div className="w-full h-full absolute rotate-[98deg] origin-bottom-left bg-gradient-to-br from-[#1E5DFF] to-[#864AFF] -z-10">
								<div
									className="h-[130%] w-[136%] absolute bottom-[-3%] right-[-8%] bg-background"
									style={{
										borderRadius: "100% 50%"
									}}
								></div>
							</div>
						</div>
					</div>
				</div>
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button
					onClick={() => mutate({ text })}
					className="bg-white w-6 h-6"
				></button>
			</div>
			<div className="min-h-screen col-span-2 flex flex-col gap-4">
				<div className="flex justify-between items-center pt-14 pb-4 -mb-4 bg-background sticky top-0 z-30">
					<span className="text-2xl text-main-text font-light ml-4">
						Your feed
					</span>
					<span className="text-2xl text-sub-text font-thin italic bg-faint-surface hover:bg-bold-surface transition-colors duration-[400ms] p-4 rounded-xl cursor-pointer">
						from your school
					</span>

					<button
						onClick={openPostModal}
						className="rounded-xl text-center bg-white h-16 w-56 bg-gradient-to-br from-[#1E5DFF] to-[#864AFF] text-main-text text-2xl font-light hover:opacity-90 transition-opacity duration-[400ms]"
					>
						New post
					</button>
				</div>

				{!isLoading &&
					feed?.map((post) => <Post key={post.id} {...post} />)}
			</div>
			<div className="h-screen col-span-1 sticky top-0">
				<div className="mt-14 bg-medium-surface rounded-[14px] h-96 w-full"></div>
			</div>
		</div>
	)
}

export default HomePage
