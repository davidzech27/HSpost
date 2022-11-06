import { FC, useState } from "react"
import Link from "next/link"

import { PostInfoFragment, ProfileFragment } from "hooks/generated"
import UserInfo from "components/user/UserInfo"
import useMutation from "lib/useMutation"
import api from "lib/api"

const Post: FC<
	PostInfoFragment & { poster: ProfileFragment } & {
		individualPost?: boolean
	}
> = ({ id, text, commentCount, postedOn, poster, individualPost = false }) => {
	const [clicked, setClicked] = useState(false)

	const { mutate: report } = useMutation()(() =>
		api.ReportPost({ postId: id })
	)

	const [reported, setReported] = useState(false)

	const UI = (
		<div
			onClick={() => setClicked((prev) => !prev)}
			className={`pt-6 pb-2 px-[44px] bg-faint-surface rounded-[0.875rem] border-faint-border border-[1.5px] hover:border-bold-border hover:shadow-lg ${
				individualPost
					? "border-bold-border shadow-lg"
					: "min-h-[11rem] border-faint-border shadow-none cursor-pointer group"
			} hover:shadow-[rgba(122,130,149,0.2)] transition duration-[400ms] overflow-hidden relative`}
		>
			<div className="flex h-fit w-full z-10 relative">
				<UserInfo {...poster} />
				{!individualPost ? (
					<div className="ml-[48%] flex items-center text-center">
						<span
							className={`h-[0.55rem] w-[0.55rem] rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-[400ms] bg-gradient-to-br from-[#1E5DFF] to-[#864AFF] mr-[0.55rem]`}
						></span>
						<span
							className={`text-sm font-medium group-hover:font-light text-main-text opacity-70 group-hover:opacity-100 transition-all duration-[400ms] mr-10`}
						>
							{commentCount}
						</span>
					</div>
				) : !reported ? (
					<span
						onClick={(e) => {
							e.stopPropagation()
							report({})
							setReported(true)
						}}
						className="ml-[44%] text-sub-text opacity-70 hover:underline text-sm cursor-pointer"
					>
						Report post
					</span>
				) : (
					<span className="ml-[44%] text-sub-text opacity-70 text-sm">
						Reported
					</span>
				)}
			</div>

			<div
				className={`${
					individualPost
						? !clicked
							? "opacity-80 cursor-pointer"
							: "cursor-pointer overflow-scroll"
						: "opacity-80 group-hover:opacity-100"
				} relative text-main-text font-light text-xl z-10 my-4 leading-normal transition-opacity duration-[400ms] px-[1px] overflow-hidden overflow-ellipsis`}
				style={{
					WebkitLineClamp: !individualPost
						? 15
						: clicked
						? undefined
						: 1,
					WebkitBoxOrient: "vertical",
					display: "-webkit-box"
				}}
			>
				{text}
			</div>

			<div
				className={`h-fit pb-4 ml-[1px] text-sm text-sub-text group-hover:opacity-100 ${
					individualPost ? "opacity-100" : "opacity-70"
				} transition-opacity duration-[400ms] relative z-10 ${
					individualPost && !clicked && "hidden"
				}`}
			>
				{`Posted on ${new Date(postedOn)
					.toDateString()
					.split(" ")
					.slice(0, 3)
					.join(" ")} at ${
					((new Date(postedOn).getHours() - 1) % 12) + 1
				}:${new Date(postedOn).getMinutes() < 10 ? "0" : ""}${new Date(
					postedOn
				).getMinutes()} ${new Date(postedOn)
					.toLocaleString()
					.split(" ")
					.at(-1)}`}
			</div>

			<div
				className={`w-full h-full absolute top-0 left-0 origin-bottom-left group-hover:rotate-[-98deg] ${
					individualPost ? "rotate-[-98deg]" : "rotate-0"
				}`}
				style={{
					transitionProperty: "transform",
					transitionTimingFunction: "cubic-bezier(0.8, 0.1, 0, 1)",
					transitionDuration: "400ms"
				}}
			>
				<div
					className="h-[130%] w-[136%] absolute bottom-[-3%] right-[-8%] bg-background"
					style={{
						borderRadius: "100% 50%"
					}}
				></div>

				<div className="w-full h-full absolute rotate-[98deg] origin-bottom-left bg-background -z-10">
					<div
						className="h-[130%] w-[136%] absolute bottom-[-3%] right-[-8%] bg-faint-surface"
						style={{
							borderRadius: "100% 50%"
						}}
					></div>
				</div>
			</div>
		</div>
	)

	return <>{!individualPost ? <Link href={`/post/${id}`}>{UI}</Link> : UI}</>
}

export default Post
