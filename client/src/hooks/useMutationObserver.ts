import { useEffect, useState } from "react"

const DEFAULT_OPTIONS: MutationObserverInit = {
	attributes: true,
	childList: true,
	subtree: true
}

function useMutationObserver(
	targetElement: HTMLElement | null,
	callback: MutationCallback,
	options?: MutationObserverInit
) {
	options = Object.assign(DEFAULT_OPTIONS, options)

	const [observer, setObserver] = useState<MutationObserver | null>(null)

	useEffect(() => {
		const obs = new MutationObserver(callback)
		setObserver(obs)
	}, [callback, options, setObserver])

	useEffect(() => {
		if (!observer || !targetElement) return
		observer.observe(targetElement, options)
		return () => {
			if (observer) {
				observer.disconnect()
			}
		}
	}, [observer, targetElement, options])
}

export default useMutationObserver
