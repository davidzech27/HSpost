import SendButton from "components/common/SendButton"
import Router from "next/router"
import Image from "next/image"

const AboutPage = () => {
	return (
		<div className="w-screen bg-background">
			<div className="h-screen flex flex-col items-center pt-40 relative">
				<div className="font-semibold text-[7rem] leading-tight text-main-text w-5/6">
					<span className="bg-gradient-to-br from-[#1E5DFF] to-[#864AFF] bg-clip-text text-fill-transparent">
						HSpost
					</span>{" "}
					is about making unexpected connections
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#efefef"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="absolute bottom-12"
					style={{
						animation: "fadeInAnimation ease 2.5s",
						animationIterationCount: 1,
						animationFillMode: "forwards"
					}}
				>
					<polyline points="6 9 12 15 18 9"></polyline>
				</svg>
			</div>

			<div className="h-screen flex flex-col justify-between items-center pt-20 pb-16 relative">
				<div className="text-main-text text-3xl font-light w-2/3">
					HSpost was designed to connect high school students with
					others from their school and beyond. It was made to make it
					as easy as possible to form new relationships, with peers
					both new and familiar.
				</div>

				<div className="h-96 w-[43rem] my-8 border border-main-text shadow-lg shadow-main-text/10 rounded-xl relative overflow-hidden">
					<Image src="/appdemo.png" layout="fill"></Image>
				</div>

				<div className="text-sub-text font-extralight text-sm mb-2">
					Sign in with your school email
				</div>

				<div className="h-16 w-44">
					<SendButton
						onClick={() =>
							Router.push(
								`${process.env.NEXT_PUBLIC_SERVER_URL}/oauth/signin`
							)
						}
						className="h-16 w-44 text-xl"
					>
						Sign in
					</SendButton>
				</div>
			</div>
		</div>
	)
}

export default AboutPage
