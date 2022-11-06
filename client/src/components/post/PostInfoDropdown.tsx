import { FC } from "react"
import useQuery from "lib/useQuery"
import api from "lib/api"
import UserInfo from "components/user/UserInfo"
import Link from "next/link"

const PostInfoDropdown: FC<{ postId: string }> = ({ postId }) => {
	const { data: postInfo } = useQuery(
		["postInfo", postId],
		async () => (await api.GetPostInfo({ id: postId })).post
	)

	return (
		<Link href={`/post/${postId}`}>
			<div className="cursor-pointer">
				<div className="mt-2 mb-4">
					{postInfo?.poster && (
						<UserInfo
							email={postInfo?.poster.email}
							name={postInfo?.poster.name}
							bio={postInfo?.poster.bio}
							photo={postInfo?.poster.photo}
							schoolAbbreviation={
								postInfo?.poster.schoolAbbreviation
							}
						/>
					)}
				</div>
				<div
					className="opacity-90 hover:opacity-100 text-main-text text-sm font-light transition-opacity duration-[400ms] mb-[0.625rem] overflow-hidden overflow-ellipsis"
					style={{
						WebkitLineClamp: 5,
						WebkitBoxOrient: "vertical",
						display: "-webkit-box"
					}}
				>
					{postInfo?.text}
				</div>
			</div>
		</Link>
	)
}

export default PostInfoDropdown
