import create from "zustand"
import { combine, persist } from "zustand/middleware"

const SIGNED_IN_KEY = "signed-in"

const useSignedInStore = create(
	persist(
		combine(
			{
				signedIn: JSON.parse(
					(typeof window !== "undefined" &&
						localStorage.getItem(SIGNED_IN_KEY)) ||
						"false"
				) as Boolean
			},
			(set) => ({
				signIn: () => {
					set({ signedIn: true })
				}
			})
		),
		{
			name: SIGNED_IN_KEY
		}
	)
)

export default useSignedInStore
