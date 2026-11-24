// import { MiniGamepad, Mode } from '@vdegenne/mini-gamepad'
// import { switchToRight } from './switcher.js'
//
// const minigp = new MiniGamepad({
// 	// pollSleepMs: 900,
// 	focusDeadTimeMs: 0,
// 	backgroundActivity: true,
// })
//
// minigp.onConnect((gamepad) => {
// 	// this.gamepad = gamepad
//
// 	gamepad.for(gamepad.mapping.RIGHT_BUTTONS_TOP).after(({ mode }) => {
// 		switch (mode) {
// 			case Mode.NORMAL:
// 				if (document.hasFocus()) {
// 					switchToRight()
// 				}
// 				break
// 		}
// 	})
// })

import { toast } from './snackbar.js'
import { store } from './store.js'
import { switchToRight } from './switcher.js'
import { getDeepActiveElement } from './utils.js'

export function listenForGamepadButtons(
	onYRelease: () => void,
	onBPress: (leftTrigger: boolean) => void,
): () => void {
	const previousStates = new Map<number, { y: boolean; b: boolean }>()
	let animationFrame = 0
	let running = true

	function poll(): void {
		if (!running) return

		const gamepads = navigator.getGamepads()

		for (const gamepad of gamepads) {
			if (!gamepad) continue

			const y = gamepad.buttons[3]?.pressed ?? false
			const b = gamepad.buttons[1]?.pressed ?? false
			const leftTrigger = gamepad.buttons[6]?.pressed ?? false
			const previous = previousStates.get(gamepad.index)

			if (previous) {
				if (previous.y && !y) onYRelease()
				if (previous.b && !b) onBPress(leftTrigger)
			}

			previousStates.set(gamepad.index, { y, b })
		}

		animationFrame = requestAnimationFrame(poll)
	}

	poll()

	return function dispose(): void {
		running = false
		cancelAnimationFrame(animationFrame)
		previousStates.clear()
	}
}

const stopListening = listenForGamepadButtons(
	function () {
		// Y
		store.switchOnFocus = true
		toast({ message: 'will switch', timeoutMs: 500 })
		switchToRight()
	},
	function (leftTrigger) {
		// B
		if (!leftTrigger) {
			const activeElement = getDeepActiveElement() as HTMLElement | null
			if (activeElement && activeElement !== document.body) {
				activeElement.click()
			} else {
				store.switchOnFocus = !store.switchOnFocus
			}
		} else {
			store.autoActivate = !store.autoActivate
		}
	},
)
