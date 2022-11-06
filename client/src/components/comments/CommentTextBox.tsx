import { FC, useState } from "react"
import useMutation from "lib/useMutation"
import SendButton from "components/common/SendButton"

const CommentTextBox: FC<{
	onSend: ({ text }: { text: string }) => any
	posterName: string
}> = ({ onSend, posterName }) => {
	const [text, setText] = useState("")

	const { mutate: sendComment } = useMutation()(async () => {
		setText("")

		return await onSend({ text })
	})

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				sendComment({})
			}}
			className="sticky bottom-0 h-20 bg-medium-surface rounded-b-xl px-4 py-3 flex"
		>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder={`Send a message on ${posterName}'s post`}
				autoCorrect="false"
				className="border border-medium-border focus:border-bold-border rounded-lg bg-faint-surface h-full grow pl-6 placeholder:text-sub-text placeholder:opacity-60 hover:placeholder:opacity-100 focus:placeholder:opacity-100 placeholder:transition-opacity transition-all focus:bg-opacity-60 text-main-text outline-none"
			></input>
			<SendButton
				className={`ml-1 h-14 w-32 text-lg rounded-lg`}
				disabled={text === ""}
				onClick={sendComment}
			>
				Send
			</SendButton>
		</form>
	)
}

export default CommentTextBox
