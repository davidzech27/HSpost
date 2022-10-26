import create from "zustand"
import { combine } from "zustand/middleware"
import { ReactElement } from "react"

const useModalStore = create(
	combine(
		{
			modal: null as ReactElement | null
		},
		(set) => ({
			openModal: (newModal: ReactElement) => {
				set({ modal: newModal })
			},
			closeModal: () => set({ modal: null })
		})
	)
)

export default useModalStore
