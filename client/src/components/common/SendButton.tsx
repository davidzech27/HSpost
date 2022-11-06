import { EventHandler, FC, MouseEvent, ReactNode } from "react"

const SendButton: FC<{
	children?: ReactNode
	onClick?: EventHandler<MouseEvent>
	disabled?: boolean
	className?: string
}> = ({ onClick, className, children, disabled }) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`bg-background rounded-xl border-[1.5px] border-medium-border hover:border-medium-border/0 h-full transition duration-[400ms] flex justify-center items-center relative group overflow-hidden ${
				disabled && "opacity-70 pointer-events-none"
			} ${className}`}
		>
			<div className="text-main-text font-semibold group-hover:font-extralight align-middle relative z-50 transition-all duration-[400ms]">
				{children}
			</div>

			<div
				className="w-full h-full absolute top-0 left-0 origin-bottom-left rotate-[-98deg] group-hover:rotate-0"
				style={{
					transitionProperty: "transform",
					transitionTimingFunction: "cubic-bezier(0.8, 0.1, 0, 1)",
					transitionDuration: "400ms"
				}}
			>
				<div
					className="h-[130%] w-[136%] absolute bottom-[-3%] right-[-8%] bg-gradient-to-br from-[#1E5DFF] to-[#864AFF]"
					style={{
						borderRadius: "100% 50%"
					}}
				></div>

				<div className="w-full h-full top-0 absolute rotate-[98deg] origin-bottom-left bg-bold-surface from-[#1E5DFF] to-[#864AFF] -z-10">
					<div
						className="h-[130%] w-[136%] absolute bottom-[-3%] right-[-8%] bg-background"
						style={{
							borderRadius: "100% 50%"
						}}
					></div>
				</div>
			</div>
		</button>
	)
}

export default SendButton
