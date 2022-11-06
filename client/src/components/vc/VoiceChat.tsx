import { useEffect, useState, useRef, FC } from "react"
import useCallOnce from "hooks/useCallOnce"
import UserInfo from "components/user/UserInfo"
import { ProfileFragment } from "hooks/generated"
import api from "lib/api"
import Script from "next/script"
import useMeteredStore from "stores/meteredStore"
import queryClient from "lib/queryClient"

interface Window {
	[key: string]: any
}

const VoiceChat: FC<{ postId: string | undefined }> = ({ postId }) => {
	const [joined, setJoined] = useState(false)
	const [muted, setMuted] = useState(true)

	const { Metered, setMetered } = useMeteredStore()
	const meeting = useRef<any>()
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
	const [profiles, setProfiles] = useState<ProfileFragment[]>([])

	const joinMeeting = async () => {
		meeting.current = new Metered.Meeting()

		console.log(queryClient.getQueryData(["profile"]))

		setProfiles((prev) => [
			...prev,
			queryClient.getQueryData(["profile"]) as ProfileFragment
		])

		const { onlineParticipants } = await meeting.current.join({
			roomURL: `hspost.metered.live/${postId}`,
			name: (queryClient.getQueryData(["profile"]) as any).email
		})

		const emailsInVC: string[] = onlineParticipants.map(
			(user: any) => user.name
		)

		emailsInVC.forEach((email) => {
			if (
				email !== (queryClient.getQueryData(["profile"]) as any).email
			) {
				api.GetUserInfo({ email }).then(({ user }) => {
					setProfiles((prev) => [...prev, user!])
				})
			}
		})

		meeting.current.on("participantJoined", (participantInfo: any) => {
			console.log("Participant joined")

			api.GetUserInfo({ email: participantInfo.name }).then(
				({ user }) => {
					setProfiles((prev) => [...prev, user!])
				}
			)
		})

		meeting.current.on("participantLeft", (participantInfo: any) => {
			console.log("Participant left")

			setProfiles((prev) =>
				prev.filter((profile) => profile.email !== participantInfo.name)
			)
		})

		meeting.current.on("remoteTrackStarted", (remoteTrackItem: any) => {
			console.log("Remote track started")
			const existingTracks = mediaStream ? mediaStream.getTracks() : []

			const remoteTrack: MediaStreamTrack = remoteTrackItem.track

			const remoteStream = new MediaStream([
				remoteTrack,
				...existingTracks
			])

			setMediaStream(remoteStream)

			audioRef.current!.srcObject = remoteStream
			audioRef.current!.play()
		})
	}

	const leaveMeeting = () => {
		meeting.current.leaveMeeting()

		setProfiles((prev) =>
			prev.filter(
				(profile) =>
					profile.email !==
					(queryClient.getQueryData(["profile"]) as any).email
			)
		)

		meeting.current = undefined
	}

	const unmute = () => {
		try {
			meeting.current.startAudio()
		} catch {}
	}

	const mute = () => {
		meeting.current.stopAudio()
	}

	return (
		<>
			<Script
				onLoad={() => setMetered((window as Window).Metered)}
				src="https://cdn.metered.ca/sdk/video/1.4.3/sdk.min.js"
			></Script>
			<div
				className={`bg-faint-surface rounded-[14px] w-full h-[28rem] flex flex-col relative border border-bold-border ${
					joined ? "shadow-lg shadow-main-text/10" : ""
				}`}
			>
				{profiles.map((profile) => (
					<div key={profile.email} className="my-2 mx-6 first:mt-6">
						<UserInfo {...profile} />
					</div>
				))}

				<div className="flex justify-around items-center h-fit py-3 w-full absolute bottom-0 bg-bold-surface rounded-b-[14px] border-t border-medium-border">
					<button
						onClick={() => {
							if (joined) leaveMeeting()
							else joinMeeting()

							setJoined((prev) => !prev)
						}}
						className={`h-fit w-fit border ${
							!joined
								? "border-medium-border"
								: "border-transparent"
						} text-main-text/90 hover:bg-opacity-[0.09] hover:text-main-text/100 transition-all duration-[200ms] py-2 px-4 rounded-full bg-main-text bg-opacity-[0.07]`}
					>
						{joined ? "Leave" : "Join"}
					</button>

					{joined ? (
						<button
							onClick={() => {
								if (muted) unmute()
								else mute()
								setMuted((prev) => !prev)
							}}
							className="h-fit w-fit text-main-text/90 hover:bg-opacity-[0.09] hover:text-main-text/100 transition-all duration-[200ms] py-2 px-4 rounded-full bg-main-text bg-opacity-[0.07]"
						>
							{muted ? "Unmute" : "Mute"}
						</button>
					) : null}
				</div>
			</div>
			<audio ref={audioRef} autoPlay></audio>
		</>
	)
}

export default VoiceChat
