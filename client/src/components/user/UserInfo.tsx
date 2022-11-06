import { FC, ReactNode, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePopper } from "react-popper"
import useMutation from "lib/useMutation"
import api from "lib/api"
import SendButton from "components/common/SendButton"

const UserInfo: FC<{
	email: string
	name: string
	bio?: string | null
	photo?: string | null
	schoolAbbreviation?: string | null
	subText?: ReactNode
	dropdown?: ReactNode
}> = ({ email, name, bio, photo, schoolAbbreviation, subText, dropdown }) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const [clicked, setClicked] = useState(false)

	const { styles, attributes } = usePopper(
		containerRef.current,
		dropdownRef.current,
		{
			placement: "bottom-start"
		}
	)

	const { mutate: addFriend } = useMutation()(
		async () => await api.AddFriend({ toEmail: email })
	)

	const [dropdownVisibility, setDropdownVisibility] = useState(false)

	const isHovered = useRef(false)

	const content = (
		<div
			onMouseEnter={() => {
				isHovered.current = true

				setTimeout(
					() => isHovered.current && setDropdownVisibility(true),
					700
				)
			}}
			onMouseLeave={() => {
				isHovered.current = false
				setTimeout(
					() => !isHovered.current && setDropdownVisibility(false),
					200
				)
			}}
			ref={containerRef}
			className="h-12 w-fit flex items-center cursor-pointer group peer"
		>
			<Link href={`/user/${email}`}>
				<span className="h-full w-12 mr-4">
					{photo && (
						<img
							src={photo}
							alt="profile photo"
							className="rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-[400ms]"
						/>
					)}
				</span>
			</Link>

			<div className="-mt-[0.4rem] flex flex-col h-full justify-between">
				<Link href={`/user/${email}`}>
					<span className="opacity-80 group-hover:opacity-100 text-main-text text-lg font-medium tracking-wide transition-opacity duration-[400ms]">
						{name}
					</span>
				</Link>

				<span className="opacity-80 group-hover:opacity-100 text-sub-text text-md font-extralight tracking-wide transition-opacity duration-[400ms]">
					{subText
						? subText
						: schoolAbbreviation
						? email.slice(0, email.indexOf("@") + 1) +
						  schoolAbbreviation
						: email}
				</span>
			</div>
		</div>
	)

	return (
		<>
			{!subText ? (
				<Link href={`/user/${email}`}>{content}</Link>
			) : (
				content
			)}

			{createPortal(
				<div
					onMouseEnter={() => {
						isHovered.current = true
						dropdownVisibility && setDropdownVisibility(true) // this line takes advantage of the delay between states being set and the actual variables being changed
					}}
					onMouseLeave={() => {
						isHovered.current = false
						setTimeout(() => setDropdownVisibility(false), 100)
					}}
					ref={dropdownRef}
					style={styles.popper}
					{...attributes.popper}
					className={`w-64 ${
						dropdownVisibility
							? "opacity-100 relative"
							: "opacity-0 relative -z-50" // unhover transition not working
					} transition-opacity duration-[200ms]`}
				>
					<div className="h-full mt-3 px-6 py-4 flex flex-col items-center justify-between border border-bold-border bg-bold-surface rounded-xl shadow-lg shadow-bold-border/10">
						{dropdown ? (
							dropdown
						) : (
							<>
								<Link href={`/user/${email}`}>
									<div className="w-16 mb-[0.625rem]">
										{photo && (
											<img
												src={photo}
												alt="profile photo"
												className="rounded-full opacity-90 hover:opacity-100 transition-opacity duration-[400ms] cursor-pointer"
											/>
										)}
									</div>
								</Link>

								<Link href={`/user/${email}`}>
									<div className="opacity-80 hover:opacity-100 text-main-text text-md font-medium tracking-wide transition-opacity duration-[400ms] cursor-pointer">
										{name}
									</div>
								</Link>

								<Link href={`/user/${email}`}>
									<div className="opacity-80 hover:opacity-100 text-sub-text text-sm font-extralight tracking-wide transition-opacity duration-[400ms] mb-2 cursor-pointer">
										{email}
									</div>
								</Link>

								<div
									className="opacity-90 hover:opacity-100 text-main-text text-sm font-light px-2 transition-opacity duration-[400ms] mb-[0.625rem] overflow-hidden overflow-ellipsis"
									style={{
										WebkitLineClamp: 5,
										WebkitBoxOrient: "vertical",
										display: "-webkit-box"
									}}
								>
									{bio}
								</div>

								<SendButton
									onClick={() => {
										setClicked(true)
										addFriend({})
									}}
									disabled={clicked}
									className="h-[4.5rem] w-full"
								>
									<span className="text-xl">
										{!clicked ? "Add friend" : "Sent"}
									</span>
								</SendButton>
							</>
						)}
					</div>
				</div>,
				document.querySelector("#__next") as Element
			)}
		</>
	)
}

export default UserInfo
