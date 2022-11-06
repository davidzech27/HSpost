import { GraphQLYogaError } from "@graphql-yoga/node"
import Resolvers from "types/resolvers"
import axios from "axios"
import FormData from "form-data"

const resolvers: Resolvers = {
	Mutation: {
		createPost: async (_, { text, postVisibility }, { db, userEmail }) => {
			if (userEmail) {
				const sightEngineData = new FormData()

				sightEngineData.append("text", text)
				sightEngineData.append("lang", "en")
				sightEngineData.append("categories", "extremism")
				sightEngineData.append("mode", "standard")
				sightEngineData.append(
					"api_user",
					process.env.SIGHT_ENGINE_USER
				)
				sightEngineData.append(
					"api_secret",
					process.env.SIGHT_ENGINE_SECRET
				)

				const { data: sightEngineResult } = await axios({
					url: "https://api.sightengine.com/1.0/text/check.json",
					method: "post",
					data: sightEngineData,
					headers: sightEngineData.getHeaders()
				})

				const {
					profanity: { matches: profanity },
					extremism: { matches: extremism }
				} = sightEngineResult

				let highProfanity = false

				profanity.forEach((match: any) => {
					if (match.intensity === "high") highProfanity = true
				})

				if (highProfanity)
					return Promise.reject(
						new GraphQLYogaError("High level of profanity detected")
					)

				if (extremism.length !== 0)
					return Promise.reject(
						new GraphQLYogaError("Extremist content detected")
					)

				const newPost = await db.post.create({
					data: {
						posterEmail: userEmail,
						text,
						postVisibility
					}
				})

				axios({
					method: "post",
					url: "https://hspost.metered.live/api/v1/room",
					data: {
						roomName: newPost.id,
						privacy: "public",
						audioOnlyRoom: true,
						autoJoin: true,
						joinAudioOn: false,
						ejectAfterElapsedTimeInSec: 7200
					},
					params: {
						secretKey: process.env.METERED_API_KEY
					}
				})

				return newPost
			} else {
				return Promise.reject(
					new GraphQLYogaError(
						"You must be signed in to create a post"
					)
				)
			}
		}
	}
}

export default resolvers
