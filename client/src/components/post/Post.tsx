import { FC } from "react"
import Link from "next/link"

import { PostInfoFragment, Profile } from "hooks/generated"
import UserInfo from "components/post/UserInfo"

const Post: FC<PostInfoFragment & { poster: Profile }> = ({
	id,
	text,
	commentCount,
	postedOn,
	poster
}) => {
	return (
		<Link href={`/post/${id}`}>
			<div className="min-h-[11rem] py-6 px-[44px] bg-faint-surface rounded-[0.875rem] border-faint-border border-[1.5px] hover:border-bold-border hover:shadow-lg hover:shadow-[rgba(122,130,149,0.2)] transition duration-[400ms] overflow-hidden cursor-pointer relative group">
				<div className="flex justify-between h-fit w-full z-10 relative">
					<UserInfo {...poster} />
					<div className="flex items-center">
						<span className="h-[0.55rem] w-[0.55rem] rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-[400ms] bg-gradient-to-br from-[#1E5DFF] to-[#864AFF] mr-2"></span>
						<span className="text-sm group-hover:font-light font-medium tracking-[-0.02rem] group-hover:tracking-normal text-main-text opacity-70 group-hover:opacity-100 transition-all duration-[400ms] mr-10">
							{commentCount}
						</span>
					</div>
				</div>

				<div
					className="opacity-80 group-hover:opacity-100 relative text-main-text font-light text-xl z-10 my-4 leading-normal transition-opacity duration-[400ms] px-[1px] overflow-hidden overflow-ellipsis"
					style={{
						WebkitLineClamp: 15,
						WebkitBoxOrient: "vertical",
						display: "-webkit-box"
					}}
				>
					{text}
				</div>

				<div className="h-fit ml-[1px] text-sm text-sub-text opacity-70 group-hover:opacity-100 transition-opacity duration-[400ms] relative z-10">
					{`Posted on ${new Date(postedOn)
						.toDateString()
						.split(" ")
						.slice(0, 3)
						.join(" ")} at ${
						((new Date(postedOn).getHours() - 1) % 12) + 1
					}:${
						new Date(postedOn).getMinutes() < 10 ? "0" : ""
					}${new Date(postedOn).getMinutes()} ${new Date(postedOn)
						.toLocaleString()
						.split(" ")
						.at(-1)}`}
				</div>

				<div
					className="w-full h-full absolute top-0 left-0 origin-bottom-left rotate-0 group-hover:rotate-[-98deg]"
					style={{
						transitionProperty: "transform",
						transitionTimingFunction:
							"cubic-bezier(0.8, 0.1, 0, 1)",
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
		</Link>
	)
}

export default Post
