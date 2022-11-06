import { FC, ReactElement } from "react"
import Link from "next/link"

const MainLayout: FC<{
	children: ReactElement
	rightPanel: ReactElement
	leftPanel: ReactElement
}> = ({ children, leftPanel, rightPanel }) => (
	<>
		<div className="min-h-screen grid grid-cols-4 bg-background gap-[40px] px-[60px] font-sans sticky top-0">
			<div className="h-screen col-span-1 sticky top-0">
				<Link href="/home" className="w-fit">
					<div className="w-min pt-6 h-16 text-2xl">
						<span className="cursor-pointer bg-gradient-to-br from-[#1E5DFF] to-[#864AFF] bg-clip-text text-fill-transparent">
							HSpost
						</span>
					</div>
				</Link>
				{leftPanel}
			</div>
			<div className="col-span-2">{children}</div>
			<div className="h-screen col-span-1 sticky top-0 pt-14">
				{rightPanel}
			</div>
		</div>
	</>
)

export default MainLayout
