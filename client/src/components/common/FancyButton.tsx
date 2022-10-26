const FancyButton = () => {
	return (
		<div className="h-20 w-44 bg-background absolute bottom-6 right-6 rounded-xl group overflow-hidden">
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
	)
}

export default FancyButton
