import { ydotool } from '@vdegenne/py-server'
import { store } from './store.js'

export function switchToRight() {
	ydotool('125:1 38:1 38:0 125:0')
}

let timer: ReturnType<typeof setTimeout> | undefined

export function switchToRightDebounce(): void {
	cancelSwitch()

	// toast({ message: 'will switch', timeoutMs: 500 })

	timer = setTimeout(() => {
		timer = undefined
		switchToRight()
	}, store.timerMs)
}

export function cancelSwitch(): void {
	if (timer !== undefined) {
		clearTimeout(timer)
		timer = undefined
	}
}
