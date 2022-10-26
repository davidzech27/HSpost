import { FC } from "react"

const NewPostModal: FC<{ close: () => void }> = ({ close }) => {
	return (
		<div className="backdrop-blur-md backdrop-brightness-50 h-screen w-screen fixed top-0 left-0 flex justify-center items-center z-50">
			<div
				onClick={close}
				className="bg-bold-surface h-[55%] w-1/2 rounded-2xl relative"
			>
				<button className="box-content border-[1.5px] border-medium-border hover:border-medium-border/0 transition duration-[400ms] flex h-20 w-44 bg-background absolute bottom-6 right-6 rounded-xl group overflow-hidden">
					<div className="text-main-text font-semibold group-hover:font-extralight text-3xl mx-auto self-center relative z-50 transition-all duration-[400ms]">
						Post
					</div>

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
			</div>
		</div>
	)
}

export default NewPostModal
