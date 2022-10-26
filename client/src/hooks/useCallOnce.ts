import { useRef, useEffect } from "react"

const useCallOnce = (callback: () => any) => {
	const called = useRef(false)

	useEffect(() => {
		if (!called.current) {
			callback()

			called.current = true
		}
	}, [])
}

export default useCallOnce
