import create from "zustand"

const useMeteredStore = create<{
	Metered: any
	setMetered: (Metered: any) => void
}>()((set) => ({
	Metered: undefined,
	setMetered: (Metered: any) => set({ Metered })
}))

export default useMeteredStore
