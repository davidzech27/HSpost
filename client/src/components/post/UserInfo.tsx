import { FC } from "react"

import { Profile } from "hooks/generated"

const UserInfo: FC<Profile> = ({
	email,
	name,
	photo,
	schoolAbbreviation,
	schoolName
}) => {
	return (
		<div className="h-fit flex items-center group">
			<span className="h-12 w-12 mr-4">
				{photo ? (
					<img
						src={photo}
						alt="profile photo"
						className="rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-[400ms]"
					/>
				) : (
					<img
						src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cmcaindia.org%2Fwp-content%2Fuploads%2F2015%2F11%2Fdefault-profile-picture-gmail-2.png&f=1&nofb=1&ipt=04fac6ac1068c8be71e36e7e5aba22079127d05908d754e34ed035d928771b62&ipo=images"
						alt="profile photo"
						className="h-8 w-10 rounded-full"
					/>
				)}
			</span>

			<div className="-mt-[0.125rem] flex flex-col">
				<span className="opacity-80 group-hover:opacity-100 text-main-text text-lg font-medium tracking-wide transition-opacity duration-[400ms]">
					{name}
				</span>
				<span className="opacity-80 group-hover:opacity-100 text-sub-text text-md font-extralight tracking-wide transition-opacity duration-[400ms]">
					{schoolAbbreviation
						? email.slice(0, email.indexOf("@") + 1) +
						  schoolAbbreviation
						: email}
				</span>
			</div>
		</div>
	)
}

export default UserInfo
