import { useRouter } from "next/router"

import WithModal from "components/layouts/WithModal"
import DefaultLeftPanel from "components/layouts/DefaultLeftPanel"
import GetAuth from "components/layouts/GetAuth"
import MainLayout from "components/layouts/MainLayout"
import Post from "components/post/Post"
import UserInfo from "components/user/UserInfo"
import { GetPostQuery } from "hooks/generated"

import useQuery from "lib/useQuery"
import useMutation from "lib/useMutation"
import api from "lib/api"
import { ReactElement, useState, useRef, useCallback, useEffect } from "react"
import queryClient from "lib/queryClient"
import useMutationObserver from "hooks/useMutationObserver"
import useSubscription from "lib/useSubscription"
import CommentTextBox from "components/comments/CommentTextBox"
import VoiceChat from "components/vc/VoiceChat"

const PostPage = () => {
	const router = useRouter()

	const postId = router.asPath.split("/").at(-1) as string

	const commentListRef = useRef<HTMLDivElement | null>(null)

	const { mutate: sendOnPost } = useMutation()(async () =>
		api.EnterPost({ id: postId })
	)

	useEffect(() => {
		if (queryClient.getQueryData(["accessToken"])) {
			sendOnPost({})

			let intervalId: NodeJS.Timer

			const timeOutId = setTimeout(() => {
				intervalId = setInterval(() => sendOnPost({}), 60 * 1000)
			}, 50 * 1000)

			return () => {
				clearTimeout(timeOutId)
				clearInterval(intervalId)
			}
		}
	}, [queryClient.getQueryData(["accessToken"])])

	const { data: postInfo } = useQuery(
		["post", postId],
		async () => (await api.GetPost({ id: postId })).post,
		{
			onSuccess: (post) => {
				setComments(post?.comments)

				setTimeout(() => {
					if (commentListRef.current) {
						commentListRef.current.scrollTop =
							commentListRef.current?.scrollHeight!
					}
				})
			},
			initialData: (): GetPostQuery["post"] => {
				const feed: any[] | undefined = queryClient.getQueryData([
					"feed"
				])

				return feed && feed.find((post) => (post.id = postId))
			}
		}
	)

	const nextCommentSubscription: any = useSubscription({
		query: /* GraphQL */ `
			subscription GetNextComment($postId: ID!) {
				getNextComment(postId: $postId) {
					id
					text
					commenter {
						email
						name
						photo
						bio
						schoolName
						schoolAbbreviation
						joinedOn
					}
					replyToId
					commentedOn
				}
			}
		`,
		variables: {
			postId
		}
	})

	const nextComment = nextCommentSubscription?.getNextComment

	useEffect(() => {
		if (nextComment) {
			isAtBottom.current =
				Math.abs(
					commentListRef.current?.clientHeight! +
						commentListRef.current?.scrollTop! -
						commentListRef.current?.scrollHeight!
				) < 1

			if (
				nextComment?.commenter.email !==
				(queryClient.getQueryData(["profile"]) as any).email
			) {
				setComments((prev: any) => {
					return [...prev, nextComment]
				})
			}
		}
	}, [nextComment])

	const [comments, setComments] = useState(postInfo?.comments)

	const isAtBottom = useRef(true)

	const onSend = async ({ text }: { text: string }) => {
		isAtBottom.current =
			Math.abs(
				commentListRef.current?.clientHeight! +
					commentListRef.current?.scrollTop! -
					commentListRef.current?.scrollHeight!
			) < 1

		setComments((prev: any) => [
			...prev,
			{
				text,
				commenter: queryClient.getQueryData(["profile"]),
				commentedOn: new Date().toString()
			}
		])

		return await api.CreateComment({ text, postId })
	}

	useMutationObserver(
		commentListRef.current,
		useCallback((mutatedCommentList) => {
			if (isAtBottom.current && mutatedCommentList[0].addedNodes[0]) {
				commentListRef.current!.scrollTop =
					commentListRef.current?.scrollHeight!
			}
		}, [])
	)

	const rightPanel = (
		<div className="mt-[6.75rem]">
			<VoiceChat postId={postInfo?.id} />
		</div>
	)

	let postElement: ReactElement = <div></div>
	let commentsElement: ReactElement = <div></div>
	if (postInfo) {
		const post = postInfo

		postElement = (
			<div className="pt-[0.625rem] z-40 bg-background rounded-b-xl">
				<Post {...post} individualPost />
			</div>
		)

		commentsElement = (
			<div
				ref={commentListRef}
				className="border border-bold-border rounded-xl mt-[0.625rem] relative h-fit overflow-scroll mb-[0.625rem]"
			>
				<div className="rounded-xl bg-faint-surface relative">
					{comments?.length === 0 ? (
						<div className="h-14 flex items-center pl-8 pt-1.5 italic font-extralight text-sub-text">
							<div>No comments yet...</div>
						</div>
					) : null}
					{comments?.map((comment) => (
						<div
							key={comment.id}
							className="bg-faint-surface hover:bg-medium-surface transition-colors duration-[100ms] h-fit py-4 first:pt-8 px-8 text-sub-text group"
							id={comment.id}
						>
							<div className="flex justify-between">
								<UserInfo {...comment.commenter} subText=" " />
								<div className="h-fit pb-4 ml-[1px] text-sm text-sub-text group-hover:opacity-100 opacity-70 transition-opacity duration-[400ms] relative z-0">
									Commented at{" "}
									{new Date(
										comment.commentedOn
									).toLocaleTimeString()}
								</div>
							</div>

							<div className="relative ml-[4.03rem] -mt-[1.45rem] opacity-[0.55] group-hover:opacity-[0.75] text-main-text text-md font-extralight tracking-wide transition-opacity duration-[400ms]">
								{comment.text}
							</div>
						</div>
					))}

					<CommentTextBox
						onSend={onSend}
						posterName={postInfo.poster.name}
					/>
				</div>
			</div>
		)
	}

	const children = (
		<div className="h-screen flex flex-col">
			{postElement}
			{commentsElement}
		</div>
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

export default PostPage
