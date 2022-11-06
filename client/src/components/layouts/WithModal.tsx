import { FC, ReactElement } from "react"
import useModalStore from "stores/modalStore"

const WithModal: FC<{ children: ReactElement }> = ({ children }) => {
	const modal = useModalStore((state) => state.modal)

	return (
		<>
			{children}
			{modal}
		</>
	)
}

export default WithModal
