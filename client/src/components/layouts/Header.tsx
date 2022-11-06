import { FC, ReactElement } from "react"

const Header: FC<{ children: ReactElement }> = ({ children }) => {
	return (
		<div className="bg-background pb-2.5 mb-4 sticky top-0 z-30">
			<input
				type="text"
				placeholder="Search for users, comments, or posts"
				className="h-12 w-full mt-2 mb-8 pl-5 border border-medium-border focus:border-bold-border rounded-lg bg-medium-surface focus:bg-bold-surface transition-all duration-[400ms] placeholder:opacity-70 hover:placeholder:opacity-100 focus:placeholder:opacity-100 placeholder:duration-[400ms] outline-none"
			></input>
			{children}
		</div>
	)
}

export default Header
