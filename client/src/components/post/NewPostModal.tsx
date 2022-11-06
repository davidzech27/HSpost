import { FC, useEffect, useRef, useState } from "react"
import SendButton from "components/common/SendButton"
import api from "lib/api"
import useMutation from "lib/useMutation"
import { PostVisibility } from "hooks/generated"
import Router from "next/router"

const NewPostModal: FC<{ close: () => void }> = ({ close }) => {
	const modalRef = useRef<HTMLDivElement | null>(null)

	const [text, setText] = useState("")

	const { mutate: createPost } = useMutation()(
		async () =>
			(
				await api.CreatePost({
					text,
					postVisibility: PostVisibility.Public
				})
			).createPost,
		{ onSuccess: ({ id }) => Router.push(`/post/${id}`) }
	)

	Router.events.on("routeChangeComplete", close)

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (
				!modalRef.current ||
				modalRef.current.contains(event.target as Node)
			) {
				return
			}
			close()
		}

		document.addEventListener("mousedown", listener)

		return () => {
			document.removeEventListener("mousedown", listener)
		}
	}, [modalRef, close])

	return (
		<div className="backdrop-blur-md backdrop-brightness-50 h-screen w-screen fixed top-0 left-0 flex justify-center items-center z-50">
			<div
				ref={modalRef}
				className="bg-bold-surface h-[50%] w-[45%] rounded-2xl relative flex flex-col justify-between p-8"
			>
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Speak your mind here"
					className="h-full px-4 py-3 resize-none border border-medium-border focus:border-bold-border rounded-lg bg-medium-surface focus:bg-bold-surface transition-all duration-[400ms] placeholder:opacity-70 hover:placeholder:opacity-100 focus:placeholder:opacity-100 placeholder:duration-[400ms] placeholder:font-light text-main-text outline-none text-lg"
				></textarea>

				<SendButton
					onClick={createPost}
					className="w-1/4 h-[5.5rem] mt-4 text-2xl"
				>
					Post
				</SendButton>
			</div>
		</div>
	)
}

export default NewPostModal
